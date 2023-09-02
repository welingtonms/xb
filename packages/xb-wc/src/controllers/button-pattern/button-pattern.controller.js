import KeyboardSupportController from '../keyboard-support';

class ButtonPatternController {
	/** @type {ButtonPatternControllerHost} */
	host;

	/** @type {ButtonPatternControllers} */
	controllers;

	/**
	 * @param {ButtonPatternControllerHost} host
	 */
	constructor( host ) {
		this.host = host;

		this.controllers = {
			keyboard: new KeyboardSupportController( host, {
				shortcut: [
					{
						key: 'Enter',
					},
					{
						key: ' ',
					},
				],
				callback: () => {
					console.log( 'Button Controller', 'click' );
					this._dispatchClick();
				},
			} ),
		};

		this.host.addController( this );
	}

	hostConnected() {
		this.host.addEventListener( 'click', this._handleClick );
		this.host.addEventListener( 'keydown', this._handleKeyDown );
		this.host.addEventListener( 'keyup', this._handleKeyUp );
		this.host.addEventListener( 'focusout', this._handleKeyUp );
	}

	hostDisconnected() {
		this.host.removeEventListener( 'click', this._handleClick );
		this.host.removeEventListener( 'keydown', this._handleKeyDown );
		this.host.removeEventListener( 'keyup', this._handleKeyUp );
		this.host.removeEventListener( 'focusout', this._handleKeyUp );
	}

	_dispatchClick = () => {
		this.host.click();
	};

	_handleClick = ( event ) => {
		if ( this.disabled ) {
			event.stopPropagation();
			event.preventDefault();
			return;
		}
	};

	/**
	 * @param {KeyboardEvent} event
	 * @returns
	 */
	_handleKeyDown = ( event ) => {
		if ( this.disabled ) {
			event.stopPropagation();
			event.preventDefault();
			return;
		}

		if ( [ 'Enter', ' ' ].includes( event.key ) ) {
			this.host.classList.add( 'is-active' );
		}
	};

	_handleKeyUp = () => {
		this.host.classList.remove( 'is-active' );
	};
}

export default ButtonPatternController;

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('../../common/xb-element').default} XBElement
 */

/**
 * @typedef {import('../keyboard-support').default} KeyboardSupportController
 */

/**
 * @typedef {{
 * 	keyboard: KeyboardSupportController;
 * }} ButtonPatternControllers
 */

/**
 * @typedef {ReactiveControllerHost & XBElement & {
 * checked: boolean;
 * indeterminate: boolean;
 * }} ButtonPatternControllerHost
 */
