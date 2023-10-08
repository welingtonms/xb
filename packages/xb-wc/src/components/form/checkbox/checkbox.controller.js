import KeyboardSupportController from '../../../controllers/keyboard-support';

/**
 * @implements {ReactiveController}
 */
class CheckboxController {
	/** @type {CheckboxControllerHost} */
	host;

	/** @type {CheckboxControllers} */
	controllers;

	/**
	 * @param {CheckboxControllerHost} host
	 */
	constructor( host ) {
		this.host = host;

		this.controllers = {
			keyboard: new KeyboardSupportController( host, {
				shortcut: {
					key: ' ',
				},
				handler: () => {
					this.toggle();
				},
			} ),
		};

		this.host.addController( this );
	}

	hostConnected() {
		this.host.setAttribute( 'aria-checked', this.host.checked );
		this.host.setAttribute( 'data-previously-checked', this.host.checked );

		this.host.addEventListener( 'click', this._handleClick );
	}

	hostDisconnected() {
		this.host.removeEventListener( 'click', this._handleClick );
	}

	hostUpdate() {
		this.host.setAttribute( 'aria-checked', this.host.checked );
	}

	toggle = () => {
		this.host.checked = ! this.host.checked;

		this.host.setAttribute( 'data-previously-checked', String( this.host.checked ) );
	};

	_handleClick = ( event ) => {
		if ( this.disabled ) {
			event.stopPropagation();
			event.preventDefault();
			return;
		}

		this.toggle();
	};
}

export default CheckboxController;

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('../../../common/xb-element').default} XBElement
 */

/**
 * @typedef {import('../../../controllers/keyboard-support').default} KeyboardSupportController
 */

/**
 * @typedef {{
 * 	keyboard: KeyboardSupportController;
 * }} CheckboxControllers
 */

/**
 * @typedef {ReactiveControllerHost & XBElement & {
 * checked: boolean;
 * indeterminate: boolean;
 * }} CheckboxControllerHost
 */
