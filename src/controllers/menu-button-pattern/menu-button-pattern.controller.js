import { FocusManagerController, TypeAheadPlugin } from '../focus-manager';
import { KeyboardSupportController } from '../keyboard-support';

const MENU_ITEM_QUERY = '[role="menuitem"]';
const MENU_QUERY = '[role="menu"]';
const TRIGGER_QUERY = '[aria-haspopup="true"]';

/**
 * Focus and keyboard policy for a menu-button disclosure host (Reference + menu Panel).
 *
 * Host must extend {@link DisclosureFloatingElement} (or equivalent) and implement
 * `getFloatingElement()`, `expand`, `collapse`, `toggle`, and `open`.
 *
 * @implements {import('lit').ReactiveController}
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/ ARIA APG, Menu Button Pattern}
 */
export class MenuButtonPatternController {
	/** @type {MenuButtonPatternControllerHost} */
	host;

	/** @type {MenuButtonPatternControllers} */
	controllers;

	/**
	 * @param {MenuButtonPatternControllerHost} host
	 */
	constructor( host ) {
		this.host = host;

		this.controllers = {
			focus: new FocusManagerController( host, {
				query: MENU_ITEM_QUERY,
				getControllerTarget: ( patternHost ) => {
					return patternHost.getFloatingElement();
				},
			} ).use( new TypeAheadPlugin() ),
			keyboard: new KeyboardSupportController( host, [
				{
					shortcut: {
						key: 'ArrowUp',
					},
					handler: ( event ) => {
						this.#handleArrowUp( event );
					},
				},
				{
					shortcut: {
						key: 'ArrowDown',
					},
					handler: ( event ) => {
						this.#handleArrowDown( event );
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
					handler: ( event ) => {
						this.#handleEnterOrSpace( event );
					},
				},
				{
					shortcut: {
						key: 'Escape',
					},
					handler: ( event ) => {
						this.#handleEscape( event );
					},
				},
			] ),
		};

		host.addController( this );
	}

	get focus() {
		return this.controllers.focus;
	}

	get keyboard() {
		return this.controllers.keyboard;
	}

	/**
	 * @param {KeyboardEvent} event
	 */
	#handleArrowUp( event ) {
		const { target } = event;

		if ( ! target || this.host.disabled ) {
			return;
		}

		if ( target.matches( TRIGGER_QUERY ) ) {
			this.host.expand( { position: 'last' } );

			return;
		}

		if ( event.target.matches( MENU_QUERY ) ) {
			this.controllers.focus.focusPrevious();
		}
	}

	/**
	 * @param {KeyboardEvent} event
	 */
	#handleArrowDown( event ) {
		const { target } = event;

		if ( ! target || this.host.disabled ) {
			return;
		}

		if ( target.matches( TRIGGER_QUERY ) ) {
			this.host.expand( { emit: false, position: 'first' } );

			return;
		}

		if ( event.target.matches( MENU_QUERY ) ) {
			this.controllers.focus.focusNext();
		}
	}

	/**
	 * @param {KeyboardEvent} event
	 */
	#handleEnterOrSpace( event ) {
		const { target } = event;

		if ( ! target || this.host.disabled ) {
			return;
		}

		if ( event.target.matches( TRIGGER_QUERY ) ) {
			this.host.toggle( { emit: false, position: 'first' } );

			return;
		}

		if ( event.target.matches( MENU_QUERY ) ) {
			const item = this.controllers.focus.focused;

			if ( item?.disabled ) {
				return;
			}

			item.click();
		}
	}

	/**
	 * @param {KeyboardEvent} event
	 */
	#handleEscape( event ) {
		const { target } = event;

		if ( ! target ) {
			return;
		}

		if ( this.host.open ) {
			this.host.collapse( { focusOnTrigger: true } );
		}
	}
}

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('../../components/disclosure-floating-element').DisclosureFloatingElement} DisclosureFloatingElement
 * @typedef {import('../focus-manager/focus-manager.controller').FocusManagerController} FocusManagerController
 * @typedef {import('../keyboard-support/keyboard-support.controller').KeyboardSupportController} KeyboardSupportController
 */

/**
 * @typedef {ReactiveControllerHost & DisclosureFloatingElement & {
 * 	disabled?: boolean;
 * }} MenuButtonPatternControllerHost
 */

/**
 * @typedef {{
 * 	focus: FocusManagerController;
 * 	keyboard: KeyboardSupportController;
 * }} MenuButtonPatternControllers
 */
