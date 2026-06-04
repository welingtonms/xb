import createLogger from '../../utils/logger';

const logger = createLogger( 'media-query' );

/** Detects light-DOM children with a slot so we can show a class on the element. */
export class MediaQueryController {
	/** @type {MediaQueryList | null} */
	#mediaQuery = null;

	/**
	 * @param {import('lit').ReactiveControllerHost} host
	 * @param {object} options
	 * @param {string} options.query
	 * @param {(matches: boolean) => void} options.onMatch
	 */
	constructor( host, options ) {
		const { query, onMatch } = options;

		if ( ! query ) {
			throw new Error( 'query is required' );
		}

		if ( ! onMatch ) {
			throw new Error( 'onMatch is required' );
		}

		this.host = host;
		this.query = query;
		this.onMatch = onMatch;

		host.addController( this );
	}

	hostConnected() {
		this.#mediaQuery = window.matchMedia( this.query );

		this.#mediaQuery.addEventListener( 'change', this.#handleChange );

		this.#handleChange( this.#mediaQuery );
	}

	hostDisconnected() {
		if ( this.#mediaQuery ) {
			this.#mediaQuery.removeEventListener( 'change', this.#handleChange );
			this.#mediaQuery = null;
		}
	}

	/**
	 * @param {MediaQueryListEvent} [mql]
	 */
	#handleChange = ( mql ) => {
		this.onMatch?.( mql?.matches ?? false );
	};
}
