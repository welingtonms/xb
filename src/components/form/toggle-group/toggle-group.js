// @ts-check
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { ContextProvider } from '@lit/context';

import toArray from '../../../utils/to-array';

import { FocusManagerController, RovingFocusController } from '../../../controllers/focus-manager';
import { KeyboardSupportController } from '../../../controllers/keyboard-support';
import { SelectionManagerController } from '../../../controllers/selection-manager';
import { WithSelectionMixin } from '../../../mixins/with-selection';
import { attachContextRoot } from '../../../utils/context';
import { toggleGroupContext } from './toggle-group.context';
import { XBElement } from '../../xb-element';
import '../../layout/cluster';

import { toggleGroupStyles } from './toggle-group.styles';

const ITEM_QUERY = 'xb-toggle';

attachContextRoot();

/**
 * @param {ToggleGroupType} role
 */
function getGroupRole( type ) {
	return [ 'single', 'single-strict' ].includes( type ) ? 'radiogroup' : 'group';
}

/**
 * @param {ToggleGroupType} role
 */
function getToggleRole( type ) {
	return [ 'single', 'single-strict' ].includes( type ) ? 'radio' : 'checkbox';
}

/**
 * @class
 * @template WithSelection, XBElement
 */
export class ToggleGroup extends WithSelectionMixin( XBElement ) {
	static styles = [ toggleGroupStyles() ];

	/**
	 * Radio name.
	 * @type {ToggleGroupAttributes['name']}
	 */
	@property( { type: String, reflect: true } ) accessor name;

	/**
	 * Should the button be disabled.
	 * @type {ToggleGroupAttributes['disabled']}
	 */
	@property( { type: Boolean, reflect: true } ) accessor disabled;

	/**
	 * Toggle group initial value.
	 * `reflect` added for React.
	 * @type {String | undefined}
	 */
	@property( { type: String, attribute: 'initial-value', reflect: true } ) accessor initialValue;

	/**
	 * Selection strategy.
	 * @type {SelectionType}
	 */
	@property( { type: String } ) accessor type;

	#isFocusWithin = false;

	/** @type {ToggleGroupControllers} */
	#controllers;

	/** @type {ContextProvider<ToggleGroupContext>} */
	#contextProvider = new ContextProvider( this, {
		context: toggleGroupContext,
		initialValue: {
			disabled: false,
			type: this.type,
		},
	} );

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-toggle-group', ...config, type: ToggleGroup } );
	}

	constructor() {
		super();

		this.type = 'single';
		this.disabled = false;

		this.#controllers = {
			// focus: new FocusManagerController( this, {
			// 	query: [ ITEM_QUERY ],
			// } ),
			keyboard: new KeyboardSupportController( this, [
				// {
				// 	shortcut: [
				// 		{
				// 			key: 'ArrowUp',
				// 		},
				// 		{
				// 			key: 'ArrowLeft',
				// 		},
				// 	],
				// 	handler: () => {
				// 		this.#controllers.focus.focusPrevious();
				// 	},
				// },
				// {
				// 	shortcut: [
				// 		{
				// 			key: 'ArrowDown',
				// 		},
				// 		{
				// 			key: 'ArrowRight',
				// 		},
				// 	],
				// 	handler: () => {
				// 		this.#controllers.focus.focusNext();
				// 	},
				// },
				{
					shortcut: {
						key: ' ',
					},
					handler: () => {
						const activeElement = document.activeElement;
						if ( ! activeElement.matches( ITEM_QUERY ) ) {
							return;
						}

						/** @type {Toggle | null} */
						const toggle = activeElement;
						if ( toggle ) {
							this.#toggleValue( toggle.value );
						}
					},
				},
			] ),
			selection: new SelectionManagerController( this, {
				getSelectionType: () => this.type,
			} ),
		};

		this.addEventListener( 'focusin', this.#onFocusIn );
		this.addEventListener( 'focusout', this.#onFocusOut );
		this.addEventListener( 'click', this.#onToggleClick );
	}

	async connectedCallback() {
		super.connectedCallback();

		// this is necessary for the React wrapper.
		await this.updateComplete;

		this.#initialize( this.getAttribute( 'value' ) ?? this.getAttribute( 'initial-value' ) );
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	/**
	 * @param {import('lit').PropertyValues<this>} changedProperties
	 */
	update( changedProperties ) {
		if ( changedProperties.has( 'disabled' ) ) {
			this.#onDisabledChange( this.disabled );
			this.#updateContext();
		}

		if ( changedProperties.has( 'value' ) ) {
			this.#onValueChange( this.getRawValue( value ) );
			this.#updateContext();
		}

		if ( changedProperties.has( 'type' ) ) {
			this.#onTypeChange( this.type );
			this.#updateContext();
		}

		super.update( changedProperties );
	}

	render() {
		return html`
			<slot></slot>
		`;
	}

	get value() {
		return this.#controllers.selection.value();
	}

	get options() {
		return Array.from( this.querySelectorAll( ITEM_QUERY ) );
	}

	/**
	 * @param {string | string[]} value
	 */
	set value( value ) {
		this.#onValueChange( this.getRawValue( value ) );
	}

	/**
	 * @param {string | string[]} value
	 */
	#initialize( value ) {
		/**
		 * Prioritize the value attribute set on the toggle-group
		 * over the `checked` property on the individual toggles.
		 */
		const consolidatedValue = toArray( value ?? this.initialValue ).filter( Boolean );

		this.#onValueChange( consolidatedValue );

		this.#onDisabledChange( Boolean( this.disabled ) );

		// this.#updateToggles();
	}

	/**
	 * @param {boolean} disabled
	 */
	#onDisabledChange = ( disabled ) => {
		disabled = Boolean( disabled );

		this.#contextProvider.setValue( {
			type: this.type,
			disabled,
		} );

		this.setAttribute( 'aria-disabled', disabled );
	};

	#onFocusIn = ( event ) => {
		// if ( ! event.target.matches( ITEM_QUERY ) || this.#isFocusWithin ) {
		// 	return;
		// }
		// this.#isFocusWithin = true;
		// console.log( 'onFocusIn', this.options, event.target );
		// // TODO: adjust to comply with https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#focusabilityofdisabledcontrols
		// const firstSelected = this.options.find(
		// 	( item ) => item.checked && ! item.hasAttribute( 'disabled' )
		// );
		// this.#controllers.keyboard.activate();
		// if ( ! firstSelected ) {
		// 	this.options[ 0 ].focus();
		// } else {
		// 	firstSelected.focus();
		// }
	};

	#onFocusOut = () => {
		// this.#isFocusWithin = false;
		// this.#controllers.keyboard.deactivate();
	};

	#onFormReset = () => {
		this.#initialize();
	};

	/**
	 * @param {Event} event
	 */
	#onToggleClick = ( event ) => {
		const { target } = event;

		if ( target.matches( ITEM_QUERY ) ) {
			event.stopPropagation();

			// this.#controllers.focus.focus( target );
			this.#toggleValue( target.value );
		}
	};

	/**
	 * @param {ToggleGroupType} type
	 */
	#onTypeChange = ( type ) => {
		this.internals.role = getGroupRole( type );

		const toggleRole = getToggleRole( type );
		this.options.forEach( ( /** @type {Toggle} */ item ) => {
			item.setAttribute( 'role', toggleRole );
			item.internals.role = toggleRole;
		} );
	};

	/**
	 * @param {string[]} value
	 */
	#onValueChange = ( value ) => {
		this.#controllers.selection.init( value );

		// this.#updateToggles();
	};

	#toggleValue = ( value ) => {
		this.#controllers.selection.toggle( value );

		this.#updateToggles();

		this.emit( 'change' );
	};

	#updateContext = () => {
		this.#contextProvider.setValue( {
			type: this.type,
			disabled: this.disabled,
		} );
	};

	#updateToggles = () => {
		for ( const element of this.options ) {
			element.checked = this.#controllers.selection.has( element.value );
		}
	};
}

/**
 * @typedef {import('./toggle').Toggle} Toggle
 * @typedef {import('../../../utils/selection').SelectionType} SelectionType
 * @typedef {import('../../../utils/selection').SelectionState} SelectionState
 */

/** @typedef {import('./toggle-group.context').ToggleGroupContext} ToggleGroupContext */

/**
 * @typedef {import('../../../controllers/focus-manager').FocusManagerController} FocusManagerController
 * @typedef {import('../../../controllers/keyboard-support').KeyboardSupportController} KeyboardSupportController
 * @typedef {import('../../../controllers/selection-manager').SelectionManagerController} SelectionManagerController
 */

/**
 * @typedef {{
 * 	keyboard: KeyboardSupportController;
 * 	selection: SelectionManagerController;
 * }} ToggleGroupControllers
 */
