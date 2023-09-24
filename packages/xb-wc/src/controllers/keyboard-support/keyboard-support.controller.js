import toArray from '@welingtonms/xb-toolset/dist/to-array';

import createLogger from '../../utils/logger';

const logger = createLogger( 'keyboard-support' );

/**
 *
 * @param {Shortcut} shortcut
 */
export function getShortcutKey( shortcut ) {
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
 * Enable a component to implement behavior based on shortcuts.
 * @implements {ReactiveController}
 */
class KeyboardSupportController {
	/** @type {ReactiveControllerHost & XBElement} */
	host;

	/** @type {Map<string, CallableFunction>} */
	keymap;

	/**
	 * Get the element to which the keyboard event listener should be attached.
	 * This can useful when you want to prevent [retargetting](https://lit.dev/docs/components/events/#shadowdom), which happens for
	 * events fired from the component's shadow DOM.
	 *
	 * By default, the target element will be the `host` element.
	 *
	 * @see {@link https://lit.dev/docs/components/events/#adding-event-listeners-to-the-component-or-its-shadow-root Lit, Adding event listeners to the component or its shadow root}
	 * @type {(host: KeyboardSupportControllerHost) => HTMLElement}
	 */
	getEventTarget;

	/**
	 *
	 * @param {ReactiveControllerHost} host
	 * @param {KeyboardSupportProps['keymap']} keymap
	 * @param {KeyboardSupportControllerOptions} options
	 */
	constructor( host, keymap, options = {} ) {
		this.keymap = new Map(
			toArray( keymap ).reduce( ( map, { shortcut, callback } ) => {
				function createShortcut( shortcut ) {
					return [ getShortcutKey( shortcut ), callback ];
				}

				return map.concat( toArray( shortcut ).map( createShortcut ) );
			}, [] )
		);
		this.getEventTarget = options.getEventTarget ?? ( ( host ) => host );

		( this.host = host ).addController( this );
	}

	async hostConnected() {
		this.getEventTarget( this.host ).addEventListener( 'keyup', this._handleKeyUp );
	}

	hostDisconnected() {
		this.getEventTarget( this.host ).removeEventListener( 'keyup', this._handleKeyUp );
	}

	/**
	 * @param {KeyboardEvent} event
	 */
	_handleKeyUp = ( event ) => {
		const shortcut = getShortcutKey( {
			key: event.key,
			meta: event.metaKey,
			shift: event.shiftKey,
			ctrl: event.ctrlKey,
			alt: event.altKey,
		} );

		if ( ! this.keymap.has( shortcut ) ) {
			logger.debug( `[${ this.host.tag }]`, 'no calback for shortcut', shortcut );
			return;
		}

		const callback = this.keymap.get( shortcut );

		callback( event );
	};
}

export default KeyboardSupportController;

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
 * @property {boolean} alt - is the alt key pressed?
 */

/**
 * @typedef {{
 * 	shortcut: Shortcut | Shortcut[];
 * 	callback: (event: KeyboardEvent) => void
 * }} Keymap
 */

/**
 * @typedef {Object} KeyboardSupportProps
 * @property {Keymap | Keymap[]} keymap
 */

/**
 * @typedef {ReactiveControllerHost & XBElement} KeyboardSupportControllerHost
 */

/**
 * @typedef {{
 * 	getEventTarget: (host: KeyboardSupportControllerHost) => HTMLElement
 * }} KeyboardSupportControllerOptions
 */
