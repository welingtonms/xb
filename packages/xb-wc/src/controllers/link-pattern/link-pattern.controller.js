import KeyboardSupportController from '../keyboard-support';

class LinkPatternController {
	/** @type {LinkPatternControllerHost} */
	host;

	/** @type {LinkPatternControllers} */
	controllers;

	/**
	 * @param {LinkPatternControllerHost} host
	 */
	constructor( host ) {
		this.host = host;

		this.controllers = {
			keyboard: new KeyboardSupportController( host, {
				shortcut: {
					// TODO: should we support the space key too?
					key: 'Enter',
				},
				handler: ( event ) => {
					this._clickAnchor( event );
				},
			} ),
		};

		this.host.addController( this );
	}

	hostConnected() {
		this.host.setAttribute( 'role', 'link' );

		this.host.addEventListener( 'click', this._handleClick, false );

		this.host.addEventListener( 'keydown', this._handleKeyDown );
		this.host.addEventListener( 'keyup', this._handleKeyUp );
		this.host.addEventListener( 'focusout', this._handleKeyUp );
	}

	hostDisconnected() {
		this.host.removeEventListener( 'click', this._handleClick, false );

		this.host.removeEventListener( 'keydown', this._handleKeyDown );
		this.host.removeEventListener( 'keyup', this._handleKeyUp );
		this.host.removeEventListener( 'focusout', this._handleKeyUp );
	}

	get anchor() {
		return this.host.renderRoot.querySelector( 'a' );
	}

	_clickAnchor = ( event ) => {
		if ( this.disabled ) {
			event.stopPropagation();
			event.preventDefault();
			return;
		}

		this.anchor.click();
	};

	/**
	 * This event serves specifically for the click events triggered in the tests.
	 * Since the click event will be triggered at the host level, it will never reach the inner anchor
	 * element, unless we programatically "forward" the anchor's click event.
	 * @param {Event} event
	 */
	_handleClick = ( event ) => {
		if ( event.composedPath().at( 0 ) === this.anchor ) {
			// If the event was triggered by the anchor itself, there's no work to be done.
			return;
		}

		this._clickAnchor( event );
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

		if ( event.key === 'Enter' ) {
			this.host.classList.add( 'is-active' );
		}
	};

	_handleKeyUp = () => {
		this.host.classList.remove( 'is-active' );
	};
}

export default LinkPatternController;

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
 * }} LinkPatternControllers
 */

/**
 * @typedef {ReactiveControllerHost & XBElement & {
 * checked: boolean;
 * indeterminate: boolean;
 * }} LinkPatternControllerHost
 */
