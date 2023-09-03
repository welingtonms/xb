import BoundaryController from '../../controllers/boundary';
import FocusManagerController from '../../controllers/focus-manager';
import KeyboardSupportController from '../../controllers/keyboard-support';

const ITEM_QUERY = '[role="menuitem"]';

/**
 * @implements {ReactiveController}
 */
class DropdownController {
	/** @type {DropdownControllerHost} */
	host;

	/** @type {DropdownControllers} */
	controllers;

	/**
	 * @param {DropdownControllerHost} host
	 */
	constructor( host ) {
		this.controllers = {
			boundary: new BoundaryController( host ),
			focus: new FocusManagerController( host, {
				query: [ `${ ITEM_QUERY }:not([disabled])` ],
			} ),
			keyboard: new KeyboardSupportController( host, [
				{
					shortcut: {
						key: 'ArrowUp',
					},
					/**
					 * @param {KeyboardEvent} event
					 */
					callback: ( event ) => {
						if ( event.target.matches( 'xb-dropdown-trigger' ) ) {
							this.host.expand( { emit: false, position: 'last' } );

							return;
						}

						if ( event.target.matches( 'xb-dropdown-menu' ) ) {
							this.controllers.focus.focusPrevious();

							return;
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
					callback: ( event ) => {
						if ( event.target.matches( 'xb-dropdown-trigger' ) ) {
							this.host.expand( { emit: false, position: 'first' } );

							return;
						}

						if ( event.target.matches( 'xb-dropdown-menu' ) ) {
							this.controllers.focus.focusNext();

							return;
						}
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
					callback: ( event ) => {
						if ( event.target.matches( 'xb-dropdown-trigger' ) ) {
							this.host.expand( { emit: false, position: 'first' } );

							return;
						}

						if ( event.target.matches( 'xb-dropdown-menu' ) ) {
							const item = this.controllers.focus.focused;
							item.click();

							return;
						}
					},
				},
			] ),
		};

		( this.host = host ).addController( this );
	}

	get boundary() {
		return this.controllers.boundary;
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
		this.host.addEventListener( 'focusout', this._handleFocusOut );
		this.host.addEventListener( 'click', this._handleOptionClick );
	}

	hostDisconnected() {
		this.host.removeEventListener( 'focusout', this._handleFocusOut );
		this.host.removeEventListener( 'click', this._handleOptionClick );
	}

	_handleFocusOut = () => {
		this.controllers.focus.clearFocus();
	};

	/**
	 * @param {Event} event
	 */
	_handleOptionClick = ( event ) => {
		const { target } = event;

		if ( ! target.matches( ITEM_QUERY ) ) {
			return;
		}

		this.controllers.focus.focus( target );
	};
}

export default DropdownController;

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('./dropdown').Dropdown} Dropdown
 */

/**
 * @typedef {import('../../controllers/focus-manager').default} FocusManagerController
 * @typedef {import('../../controllers/keyboard-support').default} KeyboardSupportController
 * @typedef {import('../../controllers/boundary').default} BoundaryController
 */

/**
 * @typedef {{
 *  boundary: BoundaryController;
 * 	focus: FocusManagerController;
 * 	keyboard: KeyboardSupportController;
 * 	selection: SelectionManagerController;
 * }} DropdownControllers
 */

/**
 * @typedef {ReactiveControllerHost & Dropdown & {
 * 	selection: SelectionType,
 * 	value: SelectionOption | SelectionOption[] | null
 * }} DropdownControllerHost
 */
