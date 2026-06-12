import createLogger from '../../utils/logger';
import toArray from '../../utils/to-array';

const logger = createLogger( 'base-focus' );

/**
 * Abstract base class for focus management controllers.
 * Provides common functionality for focus navigation and search.
 * @abstract
 * @implements {ReactiveController}
 */
export class BaseFocusController {
	/** @type {BaseFocusControllerHost} */
	host;

	/**
	 * Query to get managed elements when `getFocusable` is not provided.
	 * @type {((host: BaseFocusControllerHost) => HTMLElement[])}
	 */
	query;

	/**
	 * Optional focus roster supplied by {@link QueryController} or the host.
	 * @type {(() => HTMLElement[]) | undefined}
	 */
	getFocusable;

	/**
	 * `buffer`: Keys (printable characters) the user typed.
	 * `timeout`: Timeout to clear the buffer.
	 * @type {{
	 * 	buffer: string;
	 * 	timeout: number | null;
	 * }}
	 */
	search;

	/** @type {BaseFocusControllerPlugin[]} */
	plugins = [];

	/** @type {Map<string, (event: Event) => void>} */
	handlers = new Map();

	/**
	 * @param {BaseFocusControllerHost} host
	 * @param {BaseFocusControllerOptions} options
	 */
	constructor( host, options = {} ) {
		// super( options );

		this.getFocusable = options.getFocusable;

		if ( options.getFocusable ) {
			this.query =
				typeof options.query === 'function'
					? options.query
					: () =>
							Array.from(
								this.host.querySelectorAll( toArray( options.query ?? [] ).join( ',' ) )
							);
		} else {
			this.query =
				typeof options.query === 'function'
					? options.query
					: () =>
							Array.from(
								this.host.querySelectorAll( toArray( options.query ).join( ',' ) )
							);
		}

		this.search = {
			buffer: '',
			timeout: null,
		};

		( this.host = host ).addController( this );
	}

	/**
	 * @param {BaseFocusControllerPlugin} plugin
	 */
	use( plugin ) {
		this.plugins.push( plugin );
		plugin.install( this.host, this );
		return this;
	}

	/**
	 * @param {string} event
	 * @param {((event: Event) => void)} handler
	 */
	addEventListener( event, handler ) {
		if ( ! this.handlers.has( event ) ) {
			this.handlers.set( event, handler );
			this.host.addEventListener( event, handler );
		}
	}

	/**
	 * @param {string} event
	 * @param {((event: Event) => void)} handler
	 */
	removeEventListener( event, handler ) {
		if ( this.handlers.has( event ) ) {
			this.host.removeEventListener( event, handler );
			this.handlers.delete( event );
		}
	}

	hostConnected() {

	}

	hostDisconnected() {
		this.plugins.forEach( ( plugin ) => {
			plugin.uninstall( this.host, this );
		} );

		this.handlers.forEach( ( handler, event ) => {
			this.host.removeEventListener( event, handler );
		} );

		this.handlers.clear();
	}

	/**
	 * Get the list of elements matching the given `options.query`.
	 * Filters out disabled elements.
	 * @return {HTMLElement[]}
	 */
	get queried() {
		if ( this.getFocusable ) {
			return Array.from( this.getFocusable() );
		}

		// Filter out disabled elements for focus management
		return Array.from( this.query( this.host ) ).filter(
			( el ) => ! el.disabled && ! el.hasAttribute( 'disabled' )
		);
	}

	/**
	 * Get the currently focused element.
	 * Must be implemented by subclasses.
	 * @abstract
	 * @return {HTMLElement | null}
	 */
	get focused() {
		throw new Error( 'focused getter must be implemented by subclass' );
	}

	/**
	 * Focus the given element or the element at the given index or position.
	 * Must be implemented by subclasses.
	 * @abstract
	 * @param {number | HTMLElement | ('first' | 'last' | 'previous' | 'next')} where
	 * @param {((element: HTMLElement) => void)} [callback]
	 */
	focus( where, callback ) {
		throw new Error( 'focus method must be implemented by subclass' );
	}

	/**
	 * Clear focus from the currently focused element.
	 * Must be implemented by subclasses.
	 * @abstract
	 * @param {any} [options]
	 */
	clear( options ) {
		throw new Error( 'clear method must be implemented by subclass' );
	}

	/**
	 * Moves focus to the next enabled element. Wraps around.
	 * @param {((element: HTMLElement) => void)} [callback]
	 */
	focusNext( callback ) {
		this.focus( 'next', callback );
	}

	/**
	 * Moves focus to the previous enabled element. Wraps around.
	 * @param {((element: HTMLElement) => void)} [callback]
	 */
	focusPrevious( callback ) {
		this.focus( 'previous', callback );
	}

	/**
	 * Focus the first enabled element.
	 * @param {((element: HTMLElement) => void)} [callback]
	 */
	focusFirst( callback ) {
		this.focus( 'first', callback );
	}

	/**
	 * Focus the last enabled element.
	 * @param {((element: HTMLElement) => void)} [callback]
	 */
	focusLast( callback ) {
		this.focus( 'last', callback );
	}

	/**
	 * Get the index of the given `element` in the queried list.
	 * @param {HTMLElement | null | undefined} element
	 * @returns {number}
	 */
	getIndexOf( element ) {
		if ( ! element ) {
			return -1;
		}
		return this.queried.indexOf( element );
	}
}

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('../../components/xb-element').XBElement} XBElement
 */

/**
 * @typedef {ReactiveControllerHost & XBElement & { focus: () => void }} BaseFocusControllerHost
 */

/**
 * @typedef {{
 * 	query?: string | string[] | ((host: BaseFocusControllerHost) => HTMLElement[]);
 * 	getFocusable?: () => HTMLElement[];
 * }} BaseFocusControllerOptions
 */

/**
 * @typedef {Object} BaseFocusControllerPlugin
 * @property {((host: BaseFocusControllerHost, controller: BaseFocusController) => void)} install
 * @property {((host: BaseFocusControllerHost, controller: BaseFocusController) => void)} uninstall
 */
