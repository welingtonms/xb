import toArray from '../../utils/to-array';

import { every } from './predicates.js';

/**
 * Manages membership and filtered subsets for composite hosts.
 *
 * @implements {ReactiveController}
 */
export class QueryController {
	/** @type {QueryControllerHost} */
	host;

	/** @type {(host: QueryControllerHost) => HTMLElement[]} */
	#getMembers;

	/**
	 * @param {QueryControllerHost} host
	 * @param {QueryControllerOptions} [options]
	 */
	constructor( host, options = {} ) {
		this.host = host;

		if ( typeof options.getMembers === 'function' ) {
			this.#getMembers = options.getMembers;
		} else if ( typeof options.query === 'function' ) {
			this.#getMembers = options.query;
		} else if ( options.query ) {
			const selector = toArray( options.query ).join( ',' );

			this.#getMembers = ( queryHost ) => Array.from( queryHost.querySelectorAll( selector ) );
		} else {
			this.#getMembers = () => [];
		}

		host.addController( this );
	}

	hostConnected() {}

	hostDisconnected() {}

	/**
	 * Full managed set (no focus filters).
	 * @returns {HTMLElement[]}
	 */
	get members() {
		return Array.from( this.#getMembers( this.host ) );
	}

	/**
	 * @param {((element: HTMLElement) => boolean)[]} predicates
	 * @returns {HTMLElement[]}
	 */
	filter( ...predicates ) {
		return this.members.filter( every( ...predicates ) );
	}
}

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('lit').ReactiveController} ReactiveController
 */

/**
 * @typedef {ReactiveControllerHost & import('../../components/xb-element').XBElement} QueryControllerHost
 */

/**
 * @typedef {Object} QueryControllerOptions
 * @property {(host: QueryControllerHost) => HTMLElement[]} [getMembers]
 * @property {string | string[] | ((host: QueryControllerHost) => HTMLElement[])} [query]
 */
