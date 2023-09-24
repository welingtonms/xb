import FocusManagerController from '../focus-manager';
import KeyboardSupportController from '../keyboard-support';

const ITEM_QUERY = '[role="menuitem"]';

/**
 * Wraps the controllers to implement the listbox pattern.
 * If you want to use the listbox pattern, you need to implement the following:
 * * Set the `role` (listbox) and `tabindex` (0) attributes in the `connectedCallback`
 * * Update the selection value on `update`
 * * Update the `aria-multiselectable` on `updated`
 * * Update the `selected` attribute of the queried elements on `updated`.
 * For reference, please check the `Menu` component.
 * @implements {ReactiveController}
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/menu-button ARIA APG, Menu Button Pattern}
 */
class MenuPatternController {
	/** @type {MenuPatternControllerHost} */
	host;

	/** @type {MenuPatternControllers} */
	controllers;

	/**
	 * @param {MenuPatternControllerHost} host
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
					shortcut: {
						key: 'ArrowUp',
					},
					callback: () => {
						this.controllers.focus.focusPrevious();
					},
				},
				{
					shortcut: {
						key: 'ArrowDown',
					},
					callback: () => {
						this.controllers.focus.focusNext();
					},
				},
				{
					shortcut: [
						{
							key: 'Enter',
						},
						{
							key: ' ',
						},
					],
					callback: () => {
						const item = this.controllers.focus.focused;

						item.click();
					},
				},
			] ),
		};

		this.host.addController( this );
	}

	get focus() {
		return this.controllers.focus;
	}

	get keyboard() {
		return this.controllers.keyboard;
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

	_handleFocusIn = () => {
		const firstSelected = this.queried.find( ( item ) => item.selected && ! item.disabled );

		if ( ! firstSelected ) {
			this.controllers.focus.focusFirst();
		} else {
			this.controllers.focus.focus( firstSelected );
		}
	};

	_handleFocusOut = () => {
		this.controllers.focus.clear();
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
	};
}

export default MenuPatternController;

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
 * }} MenuPatternControllers
 */

/**
 * @typedef {ReactiveControllerHost & XBElement & {
 * 	selection: SelectionType,
 * 	value: SelectionOption | SelectionOption[] | null
 * }} MenuPatternControllerHost
 */
