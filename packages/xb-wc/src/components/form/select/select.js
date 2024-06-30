import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { AsFormElementMixin } from '../../../mixins/as-form-element';
import { BoundaryController } from '../../../controllers/boundary';
import { FloatingElement } from '../../../common/floating-element';
import { FocusManagerController } from '../../../controllers/focus-manager';
import { FormElement } from '../../../common/form-element';
import { KeyboardSupportController } from '../../../controllers/keyboard-support';
import { SelectionManagerController } from '../../../controllers/selection-manager';
import { supportsPopover } from '../../../utils/top-layer';
import { WithSelectionMixin } from '../../../mixins/with-selection';
import { XBElement } from '../../../common/xb-element';
import toArray from '../../../utils/to-array';

import { selectStyles, menuStyles } from './select.styles';

import '../../layout/box';

const ITEM_QUERY = 'xb-option';

function createOption( { name, value, label, disabled, selected } ) {
	const option = Object.assign( document.createElement( 'xb-option' ), {
		innerHTML: label,
		disabled,
	} );

	option.setAttribute( 'value', value );
	option.setAttribute( 'name', name );

	option.selected = selected;

	return option;
}

/**
 * Factory function to create a static data source.
 * @param {Option[]} options -  An array of initial static options.
 * @returns {DataSource} A static data source object.
 */
function StaticDataSource( options ) {
	return {
		type: 'static',

		search: ( searchTerm ) => {
			searchTerm = searchTerm.trim().toLowerCase();

			if ( searchTerm === '' ) {
				return options;
			}

			return options.filter( ( option ) => option.label.toLowerCase().includes( searchTerm ) );
		},
	};
}

/**
 * Factory for asynchronous data sources.
 * @param {(searchTerm: string) => Promise<Option[]>} fetch - The function to fetch data asynchronously
 * @returns {DataSource} An asynchronous data source object.
 */
function AsyncDataSource( fetch ) {
	this.fetch = fetch;

	return {
		type: 'async',
		search: async ( searchTerm ) => {
			return await this.fetch( searchTerm );
		},
	};
}

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
	 * Is this a multiple selection?
	 * @type {Boolean}
	 */
	@property( { type: Boolean } ) accessor multiple;

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
	@property( { type: String, attribute: 'default-value', reflect: true } ) accessor defaultValue;

	/** @type {SelectControllers} */
	#controllers;

	/** @type {number} */
	#searchTimeout;

	/** @type {HTMLFormElement | null} */
	#form;

	/** @type {DataSource[]} */
	#datasources;

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

		this.datasources = [];
		this.multiple = false;
		this.placeholder = 'Search & Select';
		this.position = 'absolute';
		this.placement = 'bottom-start';

		this.#controllers = {
			boundary: new BoundaryController( this ),
			// data: new DataController( this, this.datasources ),
			focus: new FocusManagerController( this, {
				query: ITEM_QUERY,
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
								this.#controllers.focus.focusLast();
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
						handler: ( event ) => {
							if ( ! this.open ) {
								this.expand();
								this.#controllers.focus.focusFirst();
							} else {
								this.#controllers.focus.focusNext();
							}
						},
					},
					{
						shortcut: {
							key: 'Enter',
						},

						handler: () => {
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

		this.addEventListener( 'xb:interact-out', this.#onClickOutside );
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

		// this is necessary for the React wrapper.
		await this.updateComplete;

		this.#initialize();

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
	}

	/**
	 * @param {import('lit').PropertyValues<Select>} changedProperties
	 */
	willUpdate( changedProperties ) {
		if ( changedProperties.has( 'multiple' ) ) {
			this.type = this.multiple ? 'multiple' : 'single';
		}
	}

	/**
	 * @param {import('lit').PropertyValues<this>} changedProperties
	 */
	update( changedProperties ) {
		if ( changedProperties.has( 'disabled' ) ) {
			this.#onDisabledChange( this.disabled );
		}

		if ( changedProperties.has( 'value' ) ) {
			this.#onValueChange( this.getRawValue( value ) );
		}

		super.update( changedProperties );
	}

	async firstUpdated() {
		const defaultSlot = this.shadowRoot.querySelector( 'slot' );
		const nodes = defaultSlot.assignedNodes( { flatten: true } );

		/**
		 * Tabs and line breaks are valid nodes when rendering static nodes.
		 * The problem is that they prevent the slot fallback content (empty options message)
		 * from being shown. To prevent that, we remove all text nodes.
		 */
		nodes.forEach( ( node ) => {
			if ( node.nodeType == Node.TEXT_NODE && node.parentNode ) {
				node.parentNode.removeChild( node );
			}
		} );

		this.datasources = [
			StaticDataSource(
				Array.from( this.querySelectorAll( ITEM_QUERY ) ).map(
					( /** @type {SelectOption} */ option ) => {
						return {
							label: option.textContent,
							value: option.value,
						};
					}
				)
			),
		];

		if ( supportsPopover() ) {
			this.floating.setAttribute( 'popover', 'manual' );
		}
	}

	/**
	 * @returns {HTMLElement | null}
	 */
	getReferenceElement() {
		return this.renderRoot?.querySelector( '[aria-haspopup="true"]' );
	}

	/**
	 * @returns {HTMLElement | null}
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
					@click=${ this.#onHandleClick }
				>
					<xb-icon aria-hidden="true" name="expand-more" size="16"></xb-icon>
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
				<slot name="select-option"><xb-box borderless="all">No options.</xb-box></slot>
			</div>
		`;
	}

	/** @type {SelectOption[]} */
	get options() {
		return Array.from( this.querySelectorAll( 'xb-option' ) );
	}

	/** @type {import('./select-menu').SelectMenu} */
	get menu() {
		return this.renderRoot.querySelector( 'xb-select-menu' );
	}

	get value() {
		return this.#controllers.selection.value();
	}

	/**
	 * @param {string | string[]} value
	 */
	set value( value ) {
		this.#onValueChange( this.getRawValue( value ) );
	}

	/**
	 * Expand dropdown menu.
	 * @param {Object} args
	 * @param {'first' | 'last'} args.position - should focus on first or last dropdown item.
	 */
	expand = ( args = { position: 'first' } ) => {
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

		// FIXME: temporary solution ----start
		const responses = await Promise.all(
			this.datasources.map( ( source ) => source.search( '' ) )
		);

		const allOptions = responses.flat();

		this.#renderOptions( allOptions );
		// FIXME: temporary solution ----end

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
	search = async ( query ) => {
		this.loading = true;

		try {
			const responses = await Promise.all(
				this.datasources.map( ( source ) => source.search( query ) )
			);

			const allOptions = responses.flat();

			this.#renderOptions( allOptions );
		} catch ( error ) {
			console.error( 'Error fetching options', error );
			// Handle error, maybe display an error message
		} finally {
			this.loading = false;
		}
	};

	#initialize() {
		/**
		 * Prioritize the value attribute set on the select
		 * over the `selected` property on the individual options.
		 */
		const value = this.getRawValue( this.defaultValue );

		this.#onValueChange( value );
		// this.#controllers.selection.init( value );

		// this.#updateOptions();
		// this.#updateTrigger();
	}

	/**
	 * @param {Event} event
	 */
	#onClick = ( event ) => {
		// we are only interested in select options
		if ( event.target.matches( ITEM_QUERY ) ) {
			const { /** @type {Option} */ target } = event;

			this.#toggleValue( target.value );

			if ( ! this.multiple ) {
				this.collapse();
			}

			return;
		}

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

	#onTriggerChange = ( event ) => {
		event.stopPropagation();
	};

	#onTriggerInput = ( event ) => {
		event.stopPropagation();

		const query = String( event.target.value ).trim();
		clearTimeout( this.#searchTimeout );

		this.#searchTimeout = setTimeout( () => {
			this.expand();
			this.search( query );
		}, 450 );
	};

	/**
	 * @param {string[]} value
	 */
	#onValueChange = ( value ) => {
		this.#controllers.selection.init( value );

		this.#updateOptions();
		this.#updateTrigger();
	};

	#removeOptions() {
		this.options.forEach( ( option ) => {
			option.remove();
		} );
	}

	/**
	 * @param {Option[]} options
	 */
	#renderOptions( options ) {
		this.#removeOptions();

		options.forEach( ( option ) => {
			const element = createOption( {
				name: this.name,
				value: option.value,
				label: option.label,
				disabled: this.disabled, // TODO: set disabled state
				selected: this.#controllers.selection.has( option.value ),
			} );

			this.appendChild( element );
		} );
	}

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
		this.options.forEach( ( option ) => {
			option.name = this.name;
			option.selected = this.#controllers.selection.has( option.value );
		} );
	};

	#updateTrigger() {
		this.reference.value = toArray( this.#controllers.selection.value() ).join( ', ' );
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
 *  data: DataController;
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
