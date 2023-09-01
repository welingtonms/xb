import { isInsideElement } from '../../utils/events';
import Keyboard from '../../common/keyboard';

import createLogger from '../../utils/logger';

const logger = createLogger( 'boundary' );

class BoundaryController {
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
		this.active = active ?? false;

		this.host.addController( this );
	}

	hostConnected() {
		if ( this.active ) {
			this._subscribe();
		} else {
			this._unsubscribe();
		}
	}

	hostDisconnected() {
		if ( this.active ) {
			this._unsubscribe();
		}
	}

	activate = () => {
		if ( this.active ) {
			return;
		}

		logger.debug( 'activating boundary.' );
		this._subscribe();
		this.active = true;
	};

	deactivate = () => {
		if ( ! this.active ) {
			return;
		}

		logger.debug( 'deactivating boundary.' );
		this._unsubscribe();
		this.active = false;
	};

	_subscribe() {
		document.addEventListener( 'mousedown', this._handleEvent );
		document.addEventListener( 'keyup', this._handleEvent );
		document.addEventListener( 'touchend', this._handleEvent );
		window.addEventListener( 'blur', this._handleBlurEvent );
	}

	_unsubscribe() {
		document.removeEventListener( 'mousedown', this._handleEvent );
		document.removeEventListener( 'keyup', this._handleEvent );
		document.removeEventListener( 'touchend', this._handleEvent );
		window.removeEventListener( 'blur', this._handleBlurEvent );
	}

	_handleEvent = ( event ) => {
		const isInside = isInsideElement( event, this.host );

		if ( ! isInside || Keyboard( event ).is( 'ESC' ) ) {
			logger.debug( 'event happened out host, or <esc> was pressed.' );

			// this.deactivate();
			this.host.emit( 'xb:interact-out' );
		} else if ( isInside ) {
			logger.debug( 'event happened inside host.' );

			// this.activate();
			this.host.emit( 'xb:interact-in' );
		}
	};

	_handleBlurEvent = ( event ) => {
		const isInside = isInsideElement( event, this.host );

		if ( ! isInside ) {
			logger.debug( 'host was blurred.' );

			/**
			 * if the blur event happened in the watched element and the boundary
			 * watcher is activated, then we deactivate it
			 */
			// this.deactivate();
			this.host.emit( 'xb:interact-out' );
		}
	};
}

export default BoundaryController;

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('../../common/xb-element').default} XBElement
 */

/**
 * @typedef {ReactiveControllerHost & XBElement} BoundaryControllerHost
 */
