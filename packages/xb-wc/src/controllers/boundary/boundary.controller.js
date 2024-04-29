import { isInsideElement } from '../../utils/events';
import Keyboard from '../../common/keyboard';

import createLogger from '../../utils/logger';

const logger = createLogger( 'boundary-controller' );

export class BoundaryController {
	/** @type {BoundaryControllerHost} */
	host;

	/**
	 * Should the boundary checking be active?
	 * @type {boolean}
	 **/
	active;

	/**
	 * @param {BoundaryControllerHost} host
	 * @param {boolean} [active] - Should the boundary check be active?
	 */
	constructor( host, active ) {
		this.host = host;
		this.active = Boolean( active ?? false );

		this.host.addController( this );
	}

	hostConnected() {
		if ( this.active ) {
			this.#subscribe();
		} else {
			this.#unsubscribe();
		}
	}

	hostDisconnected() {
		if ( this.active ) {
			this.#unsubscribe();
		}
	}

	activate = () => {
		if ( this.active ) {
			return;
		}

		logger.debug( 'activating boundary.' );
		this.#subscribe();
		this.active = true;
	};

	deactivate = () => {
		if ( ! this.active ) {
			return;
		}

		logger.debug( 'deactivating boundary.' );
		this.#unsubscribe();
		this.active = false;
	};

	#subscribe() {
		document.addEventListener( 'mousedown', this.#onEvent );
		document.addEventListener( 'keyup', this.#onEvent );
		document.addEventListener( 'touchend', this.#onEvent );
		// window.addEventListener( 'blur', this.#onBlurEvent, true );
	}

	#unsubscribe() {
		document.removeEventListener( 'mousedown', this.#onEvent );
		document.removeEventListener( 'keyup', this.#onEvent );
		document.removeEventListener( 'touchend', this.#onEvent );
		// window.removeEventListener( 'blur', this.#onBlurEvent, true );
	}

	#onEvent = ( event ) => {
		const isInside = isInsideElement( event, this.host );

		if ( ! isInside || Keyboard( event ).is( 'Escape' ) ) {
			logger.debug( 'event happened out host, or <esc> was pressed.' );

			this.host.emit( 'xb:interact-out' );
		} else if ( isInside ) {
			this.host.emit( 'xb:interact-in' );
		}
	};

	#onBlurEvent = ( event ) => {
		const isInside = isInsideElement( event, this.host );

		if ( ! isInside ) {
			logger.debug( 'host was blurred.' );

			this.host.emit( 'xb:interact-out' );
		}
	};
}

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('../../common/xb-element').default} XBElement
 */

/**
 * @typedef {ReactiveControllerHost & XBElement} BoundaryControllerHost
 */
