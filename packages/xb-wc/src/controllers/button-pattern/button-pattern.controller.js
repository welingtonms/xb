import KeyboardSupportController from '../keyboard-support';

export class ButtonPatternController {
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
				handler: () => {
					this.#dispatchClick();
				},
			} ),
		};

		this.host.addController( this );
	}

	hostConnected() {
		this.host.addEventListener( 'click', this.#onClick );

		this.host.addEventListener( 'keydown', this.#onKeyDown );
		this.host.addEventListener( 'keyup', this.#onKeyUp );
		this.host.addEventListener( 'focusout', this.#onKeyUp );
	}

	hostDisconnected() {
		this.host.removeEventListener( 'click', this.#onClick );

		this.host.removeEventListener( 'keydown', this.#onKeyDown );
		this.host.removeEventListener( 'keyup', this.#onKeyUp );
		this.host.removeEventListener( 'focusout', this.#onKeyUp );
	}

	#dispatchClick = () => {
		this.host.click();
	};

	#onClick = ( event ) => {
		if ( this.host.disabled ) {
			event.stopPropagation();
			event.preventDefault();
			return;
		}
	};

	/**
	 * @param {KeyboardEvent} event
	 * @returns
	 */
	#onKeyDown = ( event ) => {
		if ( this.host.disabled ) {
			event.stopPropagation();
			event.preventDefault();
			return;
		}

		if ( [ 'Enter', ' ' ].includes( event.key ) ) {
			this.host.classList.add( 'is-active' );
		}
	};

	#onKeyUp = () => {
		this.host.classList.remove( 'is-active' );
	};
}

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
 * disabled: boolean;
 * }} ButtonPatternControllerHost
 */
