import { html } from 'lit';
import { property } from 'lit/decorators.js';
import toArray from '../../../utils/to-array';

import { FocusManagerController } from '../../../controllers/focus-manager';
import { KeyboardSupportController } from '../../../controllers/keyboard-support';
import { SelectionManagerController } from '../../../controllers/selection-manager';
import { WithSelectionMixin, fromAttribute } from '../../../mixins/with-selection';
import { XBElement } from '../../../common/xb-element';

// import { groupStyles } from './radio.styles';

import { Radio } from './radio';

const ITEM_QUERY = 'xb-radio';

/**
 * This class uses the `withSelection` for "learning" purposes.
 * The `selection` props should not be exposed and changed at all.
 */
/**
 * @class
 * @template WithSelectionMixin, FormElement
 */
export class RadioGroup extends WithSelectionMixin( XBElement ) {
	// static styles = [ groupStyles() ];

	/**
	 * Radio name.
	 * @type {string}
	 */
	@property( { type: String } ) accessor name;

	/**
	 * Should the button be disabled.
	 * @type {boolean}
	 */
	@property( { type: Boolean, reflect: true } ) accessor disabled;

	/**
	 * Radio group initial value.
	 * `reflect` added for React.
	 * @type {String | undefined}
	 */
	@property( { type: String, attribute: 'default-value', reflect: true } ) accessor defaultValue;

	/** @type {RadioGroupControllers} */
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
		XBElement.define( { name: 'xb-radio-group', ...config, type: RadioGroup } );
	}

	constructor() {
		super();

		this.internals.role = 'radiogroup';

		this.type = 'single-strict';

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
						this.#controllers.focus.focusPrevious( ( /** @type {Radio} */ element ) => {
							this.#toggleValue( element.value );
						} );
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
						this.#controllers.focus.focusNext( ( /** @type {Radio} */ element ) => {
							this.#toggleValue( element.value );
						} );
					},
				},
			] ),
			selection: new SelectionManagerController( this ),
		};

		this.addEventListener( 'focusin', this.#onFocusIn );
		this.addEventListener( 'focusout', this.#onFocusOut );
		this.addEventListener( 'click', this.#onOptionClick );
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
			this.#onValueChange( this.getRawValue( this.value ) );
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
	 * @param {string} value
	 */
	set value( value ) {
		this.#onValueChange( value );
	}

	#initialize() {
		// TODO: check if it's not hidden or disabled
		let firstRadio = this.#controllers.focus.queried?.[ 0 ];

		/**
		 * Prioritize the value attribute set on the toggle-group
		 * over the `checked` property on the individual toggles.
		 */
		const value = toArray( this.defaultValue ?? firstRadio?.value ).filter( Boolean );

		this.#controllers.selection.init( value );

		this.#onValueChange( value );

		this.#onDisabledChange( this.disabled );
	}

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
		const firstChecked = this.#controllers.focus.queried.find(
			( item ) => item.checked && ! item.hasAttribute( 'disabled' )
		);

		if ( ! firstChecked ) {
			this.#controllers.focus.focusFirst();
		} else {
			this.#controllers.focus.focus( firstChecked );
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
	#onOptionClick = ( event ) => {
		const { target } = event;

		if ( target.matches( ITEM_QUERY ) ) {
			this.#controllers.focus.focus( target );
			this.#toggleValue( target.value );
		}
	};

	/**
	 * @param {string[]} value
	 */
	#onValueChange = ( value ) => {
		this.#controllers.selection.init( value );

		this.#updateRadios();
	};

	#toggleValue = ( value ) => {
		this.#controllers.selection.toggle( value );

		this.#updateRadios();

		this.emit( 'change' );
	};

	#updateRadios = () => {
		for ( const element of this.#controllers.focus.queried ) {
			element.name = this.name;
			element.checked = this.#controllers.selection.selection.has( element.value );
		}
	};
}

/**
 * @typedef {import('./radio').Radio} Radio
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
 * }} RadioGroupControllers
 */
