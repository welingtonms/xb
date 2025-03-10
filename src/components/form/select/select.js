import { html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { AsFormElementMixin } from '../../../mixins/as-form-element';
import { BoundaryController } from '../../../controllers/boundary';
import { FloatingElement } from '../../floating-element';
import { FocusManagerController } from '../../../controllers/focus-manager';
import { FormElement } from '../../form-element';
import { KeyboardSupportController } from '../../../controllers/keyboard-support';
import { SelectionManagerController } from '../../../controllers/selection-manager';
import { supportsPopover } from '../../../utils/top-layer';
import { WithSelectionMixin } from '../../../mixins/with-selection';
import { XBElement } from '../../xb-element';
import createLogger from '../../../utils/logger';
import toArray from '../../../utils/to-array';

import { selectStyles, menuStyles } from './select.styles';

import '../../layout/box';

const ITEM_QUERY = 'xb-option';

const logger = createLogger( 'select' );

/**
 * @class
 * @template WithSelectionMixin, FloatingElement
 */
export class Select extends WithSelectionMixin( FloatingElement ) {
	static styles = [ selectStyles(), menuStyles() ];

	/**
	 * Radio name.
	 * @type {string}
	 */
	@property( { type: String, reflect: true } ) accessor name;

	/**
	 * Should the dropdown be disabled.
	 * @type {Boolean}
	 */
	@property( { type: Boolean, reflect: true } ) accessor disabled;

	/**
	 * Select is loading options.
	 * @type {Boolean}
	 */
	@property( { type: Boolean, reflect: true } ) accessor loading;

	/**
	 * Select placeholder.
	 * @type {String | undefined}
	 */
	@property( { type: String } ) accessor placeholder;

	/**
	 * Select initial value.
	 * `reflect` added for React.
	 * @type {String | undefined}
	 */
	@property( { type: String, attribute: 'initial-value', reflect: true } ) accessor initialValue;

	/** @type {SelectOption[]} */
	@state() accessor slottedOptions;

	/** @type {SelectOption[]} */
	@state() accessor filteredOptions;

	/** @type {SelectControllers} */
	#controllers;

	/** @type {number} */
	#searchTimeout;

	/** @type {string} */
	#searchTerm;

	/** @type {HTMLFormElement | null} */
	#form;

	/** @type {DataSource[]} */
	// #datasources;

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-select', ...config, type: Select } );
	}

	constructor() {
		super();

		// this.datasources = [];
		this.type = 'single';
		this.placeholder = 'Search & Select';
		this.position = 'fixed';
		this.placement = 'bottom-start';

		this.slottedOptions = [];
		this.filteredOptions = [];

		this.#controllers = {
			boundary: new BoundaryController( this ),
			// data: new DataController( this, this.datasources ),
			focus: new FocusManagerController( this, {
				query: () => {
					const selectors = 'xb-option:not([hidden])';

					return Array.from( this.querySelectorAll( selectors ) );
				},
				// search should happen via the input, not keyboard shortcuts.
				searchable: false,
				getControllerTarget: ( host ) => {
					return host.getFloatingElement();
				},
			} ),
			keyboard: new KeyboardSupportController(
				this,
				[
					{
						shortcut: {
							key: 'ArrowUp',
						},
						/**
						 * @param {KeyboardEvent} event
						 */
						handler: () => {
							if ( ! this.open ) {
								this.expand();

								const firstSelected = this.#getFirstSelected();
								if ( firstSelected ) {
									this.#controllers.focus.focus( firstSelected );
								} else {
									this.#controllers.focus.focusLast();
								}
							} else {
								this.#controllers.focus.focusPrevious();
							}
						},
					},
					{
						shortcut: {
							key: 'ArrowDown',
						},
						/**
						 * @param {KeyboardEvent} event
						 */
						handler: () => {
							if ( ! this.open ) {
								this.expand();

								const firstSelected = this.#getFirstSelected();
								if ( firstSelected ) {
									this.#controllers.focus.focus( firstSelected );
								} else {
									this.#controllers.focus.focusFirst();
								}
							} else {
								this.#controllers.focus.focusNext();
							}
						},
					},
					{
						shortcut: {
							key: 'Enter',
						},

						/**
						 * @param {KeyboardEvent} event
						 */
						handler: ( event ) => {
							/** @type {HTMLElement} */
							const element = event.target;

							/**
							 * we are only intested when the event happens during the selection of an option,
							 * in which case the trigger selector will be the target.
							 */
							if ( ! element.matches( '[aria-haspopup="true"]' ) ) {
								return;
							}

							/** @type {Option | null} */
							const option = this.#controllers.focus.focused;
							if ( ! option || option.disabled ) {
								return;
							}

							this.#controllers.focus.focus( option );
							this.#toggleValue( option.value );

							if ( ! this.multiple ) {
								this.collapse();
							}
						},
					},
				],
				{
					getControllerTarget: () => this.renderRoot,
				}
			),
			selection: new SelectionManagerController( this ),
		};
	}

	createRenderRoot() {
		const root = super.createRenderRoot();

		/**
		 * We add the event listener to the shadow root because we want
		 * to avoid retargetting.
		 * @see {@link https://lit.dev/docs/components/events/#adding-event-listeners-to-the-component-or-its-shadow-root|Lit Docs}
		 */
		root.addEventListener( 'click', this.#onClick );

		return root;
	}

	async connectedCallback() {
		super.connectedCallback();

		this.addEventListener( 'xb:interact-out', this.#onClickOutside );
		this.addEventListener( 'toggle', this.#onOptionToggle );

		// this is necessary for the React wrapper.
		await this.updateComplete;

		this.#initialize( this.getAttribute( 'value' ) ?? this.getAttribute( 'initial-value' ) );

		this.#form = this.closest( 'form' );

		if ( this.#form ) {
			this.#form.addEventListener( 'reset', this.#onFormReset );
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		if ( this.#form ) {
			this.#form.removeEventListener( 'reset', this.#onFormReset );
		}

		this.removeEventListener( 'xb:interact-out', this.#onClickOutside );
		this.removeEventListener( 'toggle', this.#onOptionToggle );
	}

	/**
	 * @param {import('lit').PropertyValues<this>} changedProperties
	 */
	update( changedProperties ) {
		if ( changedProperties.has( 'disabled' ) ) {
			this.#onDisabledChange( Boolean( this.disabled ) );
		}

		if ( changedProperties.has( 'type' ) ) {
			this.#onTypeChange();
		}

		if ( changedProperties.has( 'slottedOptions' ) ) {
			this.search( this.#searchTerm, { expand: false } );
		}

		if ( changedProperties.has( 'providedValue' ) ) {
			this.value = this.providedValue;
		}

		super.update( changedProperties );
	}

	/**
	 * @param {import('lit').PropertyValues<this>} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'slottedOptions' ) ) {
			this.#updateTrigger();
		}
	}

	firstUpdated() {
		this.queuedWorkManager.flush();
	}

	/**
	 * @returns {HTMLInputElement | null}
	 */
	getReferenceElement() {
		return this.renderRoot?.querySelector( '[aria-haspopup="true"]' );
	}

	/**
	 * @returns {HTMLInputElement | null}
	 */
	getFloatingElement() {
		return this.renderRoot?.querySelector( '[role="listbox"]' );
	}

	getArrowElement() {
		return null;
	}

	render() {
		return html`
			<div id="picker">
				<span id="leading"></span>

				<input
					aria-autocomplete="list"
					aria-controls="menu"
					aria-expanded=${ this.open ? 'true' : 'false' }
					aria-haspopup="true"
					id="trigger"
					placeholder="${ this.placeholder }"
					role="combobox"
					type="text"
					@change=${ this.#onTriggerChange }
					@input=${ this.#onTriggerInput }
					?disabled=${ this.disabled }
				/>
				<button
					id="handle"
					tabindex="-1"
					aria-controls="menu"
					aria-expanded=${ this.open ? 'true' : 'false' }
					?disabled=${ this.disabled }
					@click=${ this.#onHandleClick }
				>
					<xb-icon aria-hidden="true" name="caret-down"></xb-icon>
				</button>
			</div>

			<div
				id="menu"
				aria-labelledby="trigger"
				role="listbox"
				tabindex="-1"
				aria-multiselectable=${ this.multiple ? 'true' : 'false' }
			>
				<xb-spinner id="spinner"></xb-spinner>
				<slot name="select-option" @slotchange=${ this.#onSlotChange }></slot>
				${ this.filteredOptions.length === 0
					? html`
							<xb-box borderless="all">No options.</xb-box>
					  `
					: nothing }
			</div>
		`;
	}

	get value() {
		return this.#controllers.selection.value();
	}

	/**
	 * @param {string | string[] | null} value
	 */
	set value( value ) {
		this.#onValueChange( this.getRawValue( value ) );
	}

	get leading() {
		return this.renderRoot?.querySelector( '#leading' );
	}

	/**
	 * Expand dropdown menu.
	 * @param {Object} args
	 * @param {'first' | 'last'} args.position - should focus on first or last dropdown item.
	 */
	expand = ( args = { position: 'first' } ) => {
		if ( this.disabled ) {
			return;
		}

		const { position } = args;

		this.show();

		this.#controllers.boundary.activate();

		this.emit( 'expand' );
	};

	/**
	 * Collapse dropdown menu.
	 */
	collapse = async () => {
		this.hide();

		this.#controllers.boundary.deactivate();
		this.#controllers.focus.clear();

		this.reference.focus();

		await this.#clearSearch();
		this.#updateTrigger();

		this.emit( 'collapse' );
	};

	/**
	 * Toggle select menu.
	 */
	toggle = async () => {
		if ( this.open ) {
			await this.collapse();
		} else {
			this.expand();
		}
	};

	/**
	 * Trigger search operation for the select.
	 * @param {string} query
	 */
	search = async ( query = '', options = { expand: true } ) => {
		const normalizedQuery = query.trim().toLowerCase();

		if ( this.disabled ) {
			return;
		}

		if ( options.expand ) {
			this.expand();
		}

		this.loading = true;

		try {
			this.filteredOptions = this.slottedOptions.filter( ( slottedOption ) => {
				const itemTextLowerCase = this.#getCleanOptionLabel( slottedOption ).toLowerCase();
				const matches = itemTextLowerCase.includes( normalizedQuery );

				slottedOption.toggleAttribute( 'hidden', ! matches );

				return matches;
			} );
		} catch ( error ) {
			logger.error( 'Error filtering options', error );
		} finally {
			this.loading = false;
		}
	};

	#clearSearch = async () => {
		if ( ! this.#searchTerm ) {
			return;
		}

		this.#searchTerm = '';

		this.#clearSearchDebounce();

		for ( const slottedOption of this.slottedOptions ) {
			slottedOption.toggleAttribute( 'hidden', false );
		}

		this.filteredOptions = this.slottedOptions;
	};

	#clearSearchDebounce = () => {
		window.clearTimeout( this.#searchTimeout );
	};

	#getCleanOptionLabel = ( option ) => {
		const text = option.textContent ?? '';

		return text.trim().replace( /\s{2,}/g, ' ' );
	};

	#getFirstSelected = () =>
		this.filteredOptions.find(
			( option ) => option.selected && ! option.hasAttribute( 'disabled' )
		);

	#getOptionByValue = ( value ) => {
		if ( ! value ) {
			return null;
		}

		return this.slottedOptions.find( ( option ) => option.value === value ) ?? null;
	};

	/**
	 * @param {string | string[] | null} value
	 */
	#initialize( value ) {
		/** @type {SelectOption | undefined} */
		const firstOption = this.#controllers.focus.queried?.[ 0 ];

		if ( ! firstOption ) {
			logger.warn( 'No options found in the select' );
			return;
		}

		let consolidatedValue;

		if ( this.type === 'single-strict' ) {
			/**
			 * In this case, we need to ensure there will always be a value;
			 * we do this by fallbacking to the first option's value.
			 */
			consolidatedValue = this.getRawValue( value || this.initialValue || firstOption.value );
		} else {
			consolidatedValue = this.getRawValue( value || this.initialValue || null );
		}

		this.#onValueChange( consolidatedValue );
		// this.#controllers.selection.init( value );

		// this.#updateOptions();
		// this.#updateTrigger();
	}

	/**
	 * @param {Event} event
	 */
	#onClick = ( event ) => {
		// if ( event.target.matches( ITEM_QUERY ) ) {
		// 	const { /** @type {Option} */ target } = event;

		// 	this.#toggleValue( target.value );

		// 	if ( ! this.multiple ) {
		// 		this.collapse();
		// 	}

		// 	return;
		// }

		/**
		 * <Enter> or <Space> keys also trigger the click event.
		 * In that case, we do not want to respond to the key event, since
		 * the keyboard shortcut will handle it for us.
		 * To distinguish between a keypress event and click, we can use the `detail` property,
		 * which determines how many times the element was clicked. For a keyboard event, this
		 * should be 0; for a click event, it should be at least 1.
		 * References:
		 * - https://css-tricks.com/when-a-click-is-not-just-a-click/
		 * - https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail
		 */
		if ( event.target.matches( '[aria-haspopup="true"]' ) && event.detail > 0 ) {
			this.toggle();
		}
	};

	#onClickOutside = async () => {
		this.collapse();
	};

	/**
	 * @param {boolean} disabled
	 */
	#onDisabledChange = ( disabled ) => {
		disabled = Boolean( disabled );

		this.setAttribute( 'aria-disabled', disabled );

		this.#controllers.focus.queried.forEach( ( item ) => {
			item.disabled = disabled || item.hasAttribute( 'disabled' );
		} );
	};

	#onFormReset = () => {
		this.#initialize();
	};

	#onHandleClick = () => {
		this.toggle();

		this.reference.focus();
	};

	#onSlotChange = () => {
		this.queuedWorkManager.push(
			() => {
				return Boolean( this.renderRoot?.querySelector( 'slot[name="select-option"]' ) );
			},
			() => {
				/** @type {HTMLSlotElement} */
				const optionSlot = this.renderRoot?.querySelector( 'slot[name="select-option"]' );

				/** @type {SelectOption[]} */
				const elements = optionSlot
					.assignedElements( {
						flatten: true,
					} )
					.filter( ( descendant ) => {
						return descendant.matches( 'xb-option' );
					} );

				this.slottedOptions = elements;
				// this.filteredOptions = elements;
			}
		);
	};

	/**
	 * @param {CustomEvent} event
	 */
	#onOptionToggle = ( event ) => {
		// we are only interested in select options
		if ( event.target.matches( ITEM_QUERY ) ) {
			event.stopPropagation();
			const { /** @type {Option} */ target } = event;

			this.#toggleValue( target.value );

			if ( ! this.multiple ) {
				this.collapse();
			}
		}
	};

	#onTriggerChange = ( event ) => {
		event.stopPropagation();
	};

	#onTriggerInput = ( event ) => {
		event.stopPropagation();

		this.#searchTerm = String( event.target.value ).trim();
		this.#clearSearchDebounce();

		/**
		 * we clear the focus manager when the user starts typing;
		 * if we don't clear the focused option, we may reach a scenario
		 * where a previously focused option is hidden due to a search,
		 * but still keeping its virtual focus state (represented by the `is-focused` class).
		 */
		this.#controllers.focus.clear();

		this.#searchTimeout = setTimeout( () => {
			this.expand();
			this.search( this.#searchTerm );
		}, 450 );
	};

	#onTypeChange = () => {
		this.#updateOptions();
		this.#updateTrigger();
	};

	/**
	 * @param {string[]} value
	 */
	#onValueChange = ( value ) => {
		this.#controllers.selection.init( value );

		this.#updateOptions();
		this.#updateTrigger();
	};

	/**
	 * @param {string} value
	 */
	#toggleValue = ( value ) => {
		this.#controllers.selection.toggle( value );

		this.#updateOptions();
		this.#updateTrigger();

		this.emit( 'change' );
	};

	/**
	 * Sync the `disabled`, and `selected` attributes for the provided
	 * `options`, or all the rendered options, if no `options` is provided.
	 */
	#updateOptions = () => {
		for ( const element of this.slottedOptions ) {
			element.selected = this.#controllers.selection.has( element.value );
		}
	};

	#updateTrigger() {
		const values = this.#controllers.selection.value();

		this.queuedWorkManager.push(
			() => Boolean( this.reference ),
			() => {
				const leading = this.leading;
				const trigger = this.reference;

				// we clear the input in case there was a search query
				trigger.value = '';
				leading.innerHTML = '';

				trigger.value = toArray( values )
					.map( ( value ) => {
						const option = this.#getOptionByValue( value );

						if ( ! option ) {
							logger.warn( 'Option not found for value', value );
							return null;
						}

						if (
							[ 'single', 'single-strict' ].includes( this.type ) &&
							leading != null &&
							option.leading
						) {
							leading.append( option.leading.cloneNode( true ) );
						}

						return this.#getCleanOptionLabel( option );
					} )
					.filter( Boolean )
					/**
					 * We know there's no need for the `join` here - since it's a single or single-strict selection -
					 * but this is just to leverage the value handling via the `toArray` utility.
					 */
					.join( ', ' );
			}
		);
	}
}

/**
 * @typedef {import('../../../utils/selection').SelectionType} SelectionType
 * @typedef {import('../../../utils/selection').SelectionState} SelectionState
 */

/**
 * @typedef {import('./select-option').Option} SelectOption
 */

/**
 * @typedef {{
 * 	focus: FocusManagerController;
 * 	keyboard: KeyboardSupportController;
 *  boundary: BoundaryController;
 *  selection: SelectionManagerController;
 * }} SelectControllers
 */

/**
 * Represents an option within the custom select.
 * @typedef {Object} Option
 * @property {string} label - The displayed text for the option.
 * @property {string} value - The value associated with the option.
 */

/**
 * A data source for the custom select.
 * @typedef {Object} DataSource
 * @property {'static' | 'async'} type - The type of data source ('static' | 'async').
 * @property {Option[]} [options] - The current list of options.
 * @property {(searchTerm: string) => Option[] | Promise<Option[]>} search -  A function to search for options (synchronous or asynchronous).
 */
