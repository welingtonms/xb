import { FocusManagerController } from '../focus-manager';
import { isInsideElement } from '../../utils/events';
import { KeyboardSupportController } from '../keyboard-support';

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
export class MenuPatternController {
	/** @type {MenuPatternControllerHost} */
	host;

	/** @type {MenuPatternControllers} */
	controllers;

	/**
	 * @param {MenuPatternControllerHost} host
	 */
	constructor( host ) {
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
					handler: () => {
						this.controllers.focus.focusPrevious();
					},
				},
				{
					shortcut: {
						key: 'ArrowDown',
					},
					handler: () => {
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
					handler: () => {
						const item = this.controllers.focus.focused;

						item.click();
					},
				},
			] ),
		};

		(this.host = host).addController( this );
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
		this.host.addEventListener( 'focusin', this.#onFocusIn );
		this.host.addEventListener( 'focusout', this.#onFocusOut );
		this.host.addEventListener( 'click', this.#onOptionClick );
	}

	hostDisconnected() {
		this.host.removeEventListener( 'focusin', this.#onFocusIn );
		this.host.removeEventListener( 'focusout', this.#onFocusOut );
		this.host.removeEventListener( 'click', this.#onOptionClick );
	}

	/**
	 * @param {FocusEvent} event
	 */
	#onFocusIn = ( event ) => {
		const firstSelected = this.queried.find( ( item ) => item.selected && ! item.disabled );

		if (isInsideElement(event, this.host)) {
			this.controllers.keyboard.activate();
		}

		if ( ! firstSelected ) {
			this.controllers.focus.focusFirst();
		} else {
			this.controllers.focus.focus( firstSelected );
		}
	};

	#onFocusOut = () => {
		this.controllers.focus.clear();
		this.controllers.keyboard.deactivate();
	};

	/**
	 * Handle selection events, listened by the `listen` attribute.
	 * @param {Event} event
	 * @returns
	 */
	#onOptionClick = ( event ) => {
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
 * @typedef {import('../xb-element').default} XBElement
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
