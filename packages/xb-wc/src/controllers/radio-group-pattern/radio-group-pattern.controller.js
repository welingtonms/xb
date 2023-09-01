import FocusManagerController from '../focus-manager';
import KeyboardSupportController from '../keyboard-support';
import SelectionManagerController from '../selection-manager';

const ITEM_QUERY = '[role="radio"]';

/**
 * Wraps the controllers to implement the listbox pattern.
 * If you want to use the listbox pattern, you need to implement the following:
 * * Set the `role` (listbox) and `tabindex` (0) attributes in the `connectedCallback`
 * * Update the selection value on `update`
 * * Update the `aria-multiselectable` on `updated`
 * * Update the `selected` attribute of the queried elements on `updated`.
 * For reference, please check the `Menu` component.
 * @implements {ReactiveController}
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/listbox ARIA APG, Listbox Pattern}
 */
class RadioGroupPatternController {
	/** @type {RadioGroupPatternControllerHost} */
	host;

	/** @type {RadioGroupPatternControllers} */
	controllers;

	/**
	 * @param {RadioGroupPatternControllerHost} host
	 */
	constructor( host ) {
		this.host = host;

		this.controllers = {
			focus: new FocusManagerController( host, {
				// TODO: adjust to comply with https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#focusabilityofdisabledcontrols
				query: [ `${ ITEM_QUERY }:not([disabled])` ],
			} ),
			keyboard: new KeyboardSupportController( host, [
				{
					shortcut: [
						{
							key: 'ArrowUp',
						},
						{
							key: 'ArrowLeft',
						},
					],
					callback: () => {
						this.controllers.focus.focusPrevious();

						const target = this.controllers.focus.focused;
						this.controllers.selection.select( target.value );
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
					callback: () => {
						this.controllers.focus.focusNext();

						const target = this.controllers.focus.focused;
						this.controllers.selection.select( target.value );
					},
				},
				{
					shortcut: {
						key: ' ',
					},
					callback: () => {
						const target = this.controllers.focus.focused;

						this.controllers.selection.select( target.value );
					},
				},
			] ),
			selection: new SelectionManagerController( host ),
		};

		this.host.addController( this );
	}

	get focus() {
		return this.controllers.focus;
	}

	get keyboard() {
		return this.controllers.keyboard;
	}

	get selection() {
		return this.controllers.selection;
	}

	get queried() {
		return this.controllers.focus.queried;
	}

	hostConnected() {
		this.host.addEventListener( 'focusin', this._handleFocusIn );
		this.host.addEventListener( 'focusout', this._handleFocusOut );
		this.host.addEventListener( 'click', this._handleOptionClick );
	}

	hostDisconnected() {
		this.host.removeEventListener( 'focusin', this._handleFocusIn );
		this.host.removeEventListener( 'focusout', this._handleFocusOut );
		this.host.removeEventListener( 'click', this._handleOptionClick );
	}

	hostUpdate() {
		// TODO: delegate this to the element using this controller
		// if ( changedProperties.has( 'value' ) ) {
		// 	this.controllers.selection.value = toArray( value );
		// }
	}

	hostUpdated() {
		// TODO: delegate this to the element using this controller
		// this.setAttribute( 'aria-multiselectable', this.selection === 'multiple' );
		// for ( const element of this.controllers.focus.queried ) {
		// 	element.checked = this.controllers.selection.selection.has( element.value );
		// }
	}

	_handleFocusIn = () => {
		const firstChecked = this.queried.find( ( item ) => item.checked && ! item.disabled );

		if ( ! firstChecked ) {
			this.controllers.focus.focusFirst();
		} else {
			this.controllers.focus.focus( firstChecked );
		}
	};

	_handleFocusOut = () => {
		this.controllers.focus.clearFocus();
	};

	/**
	 * Handle selection events, listened by the `listen` attribute.
	 * @param {Event} event
	 * @returns
	 */
	_handleOptionClick = ( event ) => {
		const { target } = event;

		if ( ! target.matches( ITEM_QUERY ) ) {
			return;
		}

		this.controllers.focus.focus( target );
		this.controllers.selection.toggle( target.value );
	};
}

export default RadioGroupPatternController;

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('../../common/xb-element').default} XBElement
 */

/**
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionType} SelectionType
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionState} SelectionState
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionStrategy} SelectionStrategy
 * @typedef {'select' | 'unselect' | 'toggle'} SelectionOperation
 */

/**
 * @typedef {Object} GenericSelectionOption
 * @property {string} label
 * @property {string} value
 */

/**
 * @typedef {Object} CustomSelectionOption
 * @property {string} _type
 */

/**
 * @typedef {string | GenericSelectionOption | CustomSelectionOption} SelectionOption
 */

/**
 * @typedef {import('../focus-manager').default} FocusManagerController
 * @typedef {import('../keyboard-support').default} KeyboardSupportController
 * @typedef {import('../selection-manager').default} SelectionManagerController
 */

/**
 * @typedef {{
 * 	focus: FocusManagerController;
 * 	keyboard: KeyboardSupportController;
 * 	selection: SelectionManagerController;
 * }} RadioGroupPatternControllers
 */

/**
 * @typedef {ReactiveControllerHost & XBElement & {
 * 	selection: SelectionType,
 * 	value: SelectionOption | SelectionOption[] | null
 * }} RadioGroupPatternControllerHost
 */