import { html } from 'lit';
import { property } from 'lit/decorators.js';

import toArray from '../../../utils/to-array';

import { FocusManagerController } from '../../../controllers/focus-manager';
import { KeyboardSupportController } from '../../../controllers/keyboard-support';
import { SelectionManagerController } from '../../../controllers/selection-manager';
import { WithSelectionMixin } from '../../../mixins/with-selection';
import { XBElement } from '../../../common/xb-element';

import '../../layout/cluster';

const ITEM_QUERY = 'xb-toggle';

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
	// static styles = [ styles() ];

	/**
	 * Radio name.
	 * @type {ToggleGroupAttributes['name']}
	 */
	@property( { type: String } ) accessor name;

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
	@property( { type: String, attribute: 'default-value', reflect: true } ) accessor defaultValue;

	/** @type {ToggleGroupControllers} */
	#controllers;

	/** @type {HTMLFormElement | null} */
	#form;

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

		this.disabled = false;

		this.#controllers = {
			focus: new FocusManagerController( this, {
				query: [ ITEM_QUERY ],
			} ),
			keyboard: new KeyboardSupportController( this, [
				{
					shortcut: [
						{
							key: 'ArrowUp',
						},
						{
							key: 'ArrowLeft',
						},
					],
					handler: () => {
						this.#controllers.focus.focusPrevious();
					},
				},
				{
					shortcut: [
						{
							key: 'ArrowDown',
						},
						{
							key: 'ArrowRight',
						},
					],
					handler: () => {
						this.#controllers.focus.focusNext();
					},
				},
				{
					shortcut: {
						key: ' ',
					},
					handler: () => {
						/** @type {Toggle | null} */
						const toggle = this.#controllers.focus.focused;
						if ( toggle?.disabled ) {
							return;
						}

						this.#toggleValue( toggle.value );
					},
				},
			] ),
			selection: new SelectionManagerController( this ),
		};

		this.addEventListener( 'focusin', this.#onFocusIn );
		this.addEventListener( 'focusout', this.#onFocusOut );
		this.addEventListener( 'click', this.#onToggleClick );
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
	 * @param {import('lit').PropertyValues<this>} changedProperties
	 */
	update( changedProperties ) {
		if ( changedProperties.has( 'disabled' ) ) {
			this.#onDisabledChange( this.disabled );
		}

		if ( changedProperties.has( 'value' ) ) {
			this.#onValueChange( this.getRawValue( value ) );
		}

		if ( changedProperties.has( 'type' ) ) {
			this.#onTypeChange( this.type );
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

	/**
	 * @param {string | string[]} value
	 */
	set value( value ) {
		this.#onValueChange( this.getRawValue( value ) );
	}

	#initialize() {
		/**
		 * Prioritize the value attribute set on the select
		 * over the `selected` property on the individual options.
		 */
		const value = this.getRawValue( this.defaultValue );

		this.#controllers.selection.init( value );

		this.#updateToggles();
	}

	/**
	 * @param {boolean} disabled
	 */
	#onDisabledChange = ( disabled ) => {
		disabled = Boolean( disabled );

		if ( disabled ) {
			this.removeAttribute( 'tabindex' );
		} else {
			this.setAttribute( 'tabindex', 0 );
		}

		this.setAttribute( 'aria-disabled', disabled );

		this.#controllers.focus.queried.forEach( ( item ) => {
			item.disabled = disabled || item.hasAttribute( 'disabled' );
		} );
	};

	#onFocusIn = () => {
		// TODO: adjust to comply with https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#focusabilityofdisabledcontrols
		const firstSelected = this.#controllers.focus.queried.find(
			( item ) => item.checked && ! item.disabled
		);

		if ( ! firstSelected ) {
			this.#controllers.focus.focusFirst();
		} else {
			this.#controllers.focus.focus( firstSelected );
		}
	};

	#onFocusOut = () => {
		this.#controllers.focus.clear();
	};

	#onFormReset = () => {
		this.#initialize();
	};

	/**
	 * @param {Event} event
	 */
	#onToggleClick = ( event ) => {
		const { target } = event;

		if ( ! target.matches( ITEM_QUERY ) ) {
			return;
		}

		this.#toggleValue( target.value );
	};

	/**
	 * @param {ToggleGroupType} type
	 */
	#onTypeChange = ( type ) => {
		this.internals.role = getGroupRole( type );

		const toggleRole = getToggleRole( type );
		this.#controllers.focus.queried.forEach( ( /** @type {Toggle} */ item ) => {
			item.internals.role = toggleRole;
		} );
	};

	/**
	 * @param {string[]} value
	 */
	#onValueChange = ( value ) => {
		/** @type {Toggle[]} */
		const queried = toArray( this.#controllers.focus.queried );

		this.#controllers.selection.init( value );

		this.#updateToggles();
	};

	#toggleValue = ( value ) => {
		this.#controllers.selection.toggle( value );

		this.#updateToggles();

		this.emit( 'change' );
	};

	#updateToggles = () => {
		for ( const element of this.#controllers.focus.queried ) {
			element.name = this.name;
			element.checked = this.#controllers.selection.has( element.value );
		}
	};
}

/**
 * @typedef {import('./toggle').Toggle} Toggle
 * @typedef {import('../../../utils/selection').SelectionType} SelectionType
 * @typedef {import('../../../utils/selection').SelectionState} SelectionState
 */

/**
 * @typedef {import('../../../controllers/focus-manager').FocusManagerController} FocusManagerController
 * @typedef {import('../../../controllers/keyboard-support').KeyboardSupportController} KeyboardSupportController
 * @typedef {import('../../../controllers/selection-manager').SelectionManagerController} SelectionManagerController
 */

/**
 * @typedef {{
 * 	focus: FocusManagerController;
 * 	keyboard: KeyboardSupportController;
 * 	selection: SelectionManagerController;
 * }} ToggleGroupControllers
 */
