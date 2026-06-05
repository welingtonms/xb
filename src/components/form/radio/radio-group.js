import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { ContextProvider } from '@lit/context';

import toArray from '../../../utils/to-array';

import createLogger from '../../../utils/logger';
import { FocusManagerController } from '../../../controllers/focus-manager';
import { KeyboardSupportController } from '../../../controllers/keyboard-support';
import { SelectionManagerController } from '../../../controllers/selection-manager';
import { WithSelectionMixin, fromAttribute } from '../../../mixins/with-selection';
import { XBElement } from '../../xb-element';
import { attachContextRoot } from '../../../utils/context';
import { radioGroupContext } from './radio-group.context';

import { radioGroupStyles } from './radio.styles';

import { Radio } from './radio';

const ITEM_QUERY = 'xb-radio';

attachContextRoot();

const logger = createLogger( 'radio-group' );

/**
 * This class uses the `withSelection` for "learning" purposes.
 * The `selection` props should not be exposed and changed at all.
 */
/**
 * @class
 * @template WithSelectionMixin, FormElement
 */
export class RadioGroup extends WithSelectionMixin( XBElement ) {
	static styles = [ radioGroupStyles() ];

	/**
	 * Radio name.
	 * @type {string}
	 */
	@property( { type: String, reflect: true } ) accessor name;

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
	@property( { type: String, attribute: 'initial-value', reflect: true } ) accessor initialValue;

	/**
	 * We use a different property name internally so the react wrapper can still
	 * keep track of the property while we can use custom getter/setter to
	 * set and reflect the `value` attribute.
	 * @type {String | undefined}
	 */
	@property( { type: String, attribute: 'value', reflect: true } ) accessor providedValue;

	/** @type {RadioGroupControllers} */
	#controllers;

	#contextProvider = new ContextProvider( this, {
		context: radioGroupContext,
		initialValue: {
			disabled: false,
		},
	} );

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
							this.#selectValue( element.value );
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
							this.#selectValue( element.value );
						} );
					},
				},
			] ),
			selection: new SelectionManagerController( this, {
				getSelectionType: () => 'single-strict',
			} ),
		};
	}

	async connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'role', 'radiogroup' );

		this.addEventListener( 'focusin', this.#onFocusIn );
		this.addEventListener( 'focusout', this.#onFocusOut );
		this.addEventListener( 'click', this.#onOptionSelect );

		// this is necessary for the React wrapper.
		await this.updateComplete;

		this.#initialize( this.getAttribute( 'value' ) ?? this.getAttribute( 'initial-value' ) );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.removeEventListener( 'focusin', this.#onFocusIn );
		this.removeEventListener( 'focusout', this.#onFocusOut );
		this.removeEventListener( 'click', this.#onOptionSelect );
	}

	/**
	 * @param {import('lit').PropertyValues<this>} changedProperties
	 */
	update( changedProperties ) {
		if ( changedProperties.has( 'disabled' ) ) {
			this.#onDisabledChange( Boolean( this.disabled ) );
			this.#updateContext();
		}

		if (
			changedProperties.has( 'providedValue' ) &&
			this.providedValue &&
			this.providedValue !== this.value
		) {
			this.value = this.providedValue;
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

	#initialize( value ) {
		// TODO: check if it's not hidden or disabled
		/** @type {Radio} */
		const firstRadio = this.#controllers.focus.queried?.[ 0 ];

		if ( ! firstRadio ) {
			logger.warn( 'No radio found in the group' );
			return;
		}

		/**
		 * Prioritize the value attribute set on the toggle-group
		 * over the `checked` property on the individual toggles.
		 */
		const consolidatedValue = toArray( value ?? this.initialValue ?? firstRadio?.value ).filter(
			Boolean
		);

		this.#onValueChange( consolidatedValue );

		this.#onDisabledChange( Boolean( this.disabled ) );
	}

	#onDisabledChange = ( disabled ) => {
		disabled = Boolean( disabled );

		if ( disabled ) {
			this.removeAttribute( 'tabindex' );
		} else {
			this.setAttribute( 'tabindex', 0 );
		}

		this.setAttribute( 'aria-disabled', String( disabled ) );
	};

	#onFocusIn = () => {
		const firstChecked = this.#controllers.focus.queried.find(
			( item ) => item.checked && ! item.hasAttribute( 'disabled' )
		);

		this.#controllers.keyboard.activate();

		if ( ! firstChecked ) {
			this.#controllers.focus.focusFirst();
		} else {
			this.#controllers.focus.focus( firstChecked );
		}
	};

	#onFocusOut = () => {
		this.#controllers.focus.clear();
		this.#controllers.keyboard.deactivate();
	};

	#onFormReset = () => {
		this.#initialize();
	};

	/**
	 * @param {MouseEvent} event
	 */
	#onOptionSelect = ( event ) => {
		const { target } = event;

		if ( target.matches( ITEM_QUERY ) ) {
			event.stopPropagation();

			this.#controllers.focus.focus( target );
			this.#selectValue( target.value );
		}
	};

	/**
	 * @param {string[]} value
	 */
	#onValueChange = ( value ) => {
		this.#controllers.selection.init( value );

		this.#updateRadios();
	};

	#selectValue = ( value ) => {
		this.#controllers.selection.toggle( value );

		this.#updateRadios();

		this.emit( 'change' );
	};

	#updateContext = () => {
		this.#contextProvider.setValue( {
			disabled: this.disabled,
		} );
	};

	#updateRadios = () => {
		for ( const element of this.#controllers.focus.queried ) {
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
