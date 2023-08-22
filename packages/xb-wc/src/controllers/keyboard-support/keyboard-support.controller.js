import toArray from '@welingtonms/xb-toolset/dist/to-array';

import createLogger from '../../utils/logger';

const logger = createLogger( 'keyboard-support' );

/**
 *
 * @param {Shortcut} shortcut
 */
function getShortcutKey( shortcut ) {
	const keys = [
		shortcut.alt ? 'alt' : '',
		shortcut.ctrl ? 'ctrl' : '',
		shortcut.meta ? 'cmd' : '',
		shortcut.shift ? 'shift' : '',
		shortcut.key.toLowerCase(),
	];

	return keys.filter( Boolean ).join( '+' );
}

/**
 * Allow a component to be rendered as any HTML tag through the attribute `as`..
 * @implements {ReactiveController}
 */
class KeyboardSupport {
	/** @type {ReactiveControllerHost} */
	host;

	/** @type {Map<string, CallableFunction>} */
	keymap;

	/**
	 *
	 * @param {ReactiveControllerHost} host
	 * @param {KeyboardSupportProps['keymap']} keymap
	 */
	constructor( host, keymap ) {
		this.keymap = new Map(
			toArray( keymap ).map( ( [ shortcut, callback ] ) => {
				return [ getShortcutKey( shortcut ), callback ];
			} )
		);

		( this.host = host ).addController( this );
	}

	hostConnected() {
		this.host.addEventListener( 'keyup', this._handleKeyPress );
	}

	hostDisconnected() {
		this.host.removeEventListener( 'keyup', this._handleKeyPress );
	}

	hostUpdate() {}

	/**
	 * @param {KeyboardEvent} event
	 */
	_handleKeyPress = ( event ) => {
		const isInsideHost = event.composedPath().includes( this.host );

		// FIXME: Is this check still necessary?
		if ( ! isInsideHost ) {
			return;
		}

		const shortcut = getShortcutKey( {
			key: event.key,
			meta: event.metaKey,
			shift: event.shiftKey,
			ctrl: event.ctrlKey,
		} );

		if ( this.keymap.has( shortcut ) ) {
			logger.debug( 'triggering calback for shortcut', shortcut );
			const callback = this.keymap.get( shortcut );
			callback( event );
		}
	};
}

export default KeyboardSupport;

/**
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('../../common/xb-element').default} XBElement
 */

/**
 * @typedef {Object} Shortcut
 * @property {string} key - key identifier for the pressed key
 * @property {boolean} meta - is the meta (Command for Mac, Windows for MS Windows) key pressed?
 * @property {boolean} shift - is the shift key pressed?
 * @property {boolean} ctrl - is the ctrl key pressed?
 */

/**
 * @typedef {Object} KeyboardSupportProps
 * @property {[Shortcut, (event: KeyboardEvent) => void][]} keymap
 */
