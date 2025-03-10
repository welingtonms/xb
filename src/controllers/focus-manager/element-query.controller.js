import createLogger from '../../utils/logger';

const logger = createLogger( 'element-query' );

export class ElementQueryController {
	/** @type {HTMLElement} */
	#root;

	/** @type {HTMLElement[]} */
	#elements;

	/**
	 *
	 * @param {HTMLElement[]} [elements]
	 */
	constructor( elements ) {
		this.#elements = elements ?? [];
		// this.#currentIndex = currentIndex ?? elements.length > 0 ? 0 : -1;
	}

	/**
	 *
	 * @param {HTMLElement[]} elements
	 */
	set elements( elements ) {
		this.#elements = elements;
	}

	get first() {
		return this.#elements.at( 0 );
	}

	get last() {
		return this.#elements.at( -1 );
	}

	get length() {
		return this.#elements.length;
	}

	/**
	 * @param {number} index
	 */
	at( index ) {
		return this.#elements.at( index );
	}

	/**
	 * @param {(value: HTMLElement, index: number, array: HTMLElement[]) => void} callback
	 */
	each( callback ) {
		this.#elements.forEach( callback );
	}

	/**
	 * @param {(value: HTMLElement, index: number, array: HTMLElement[]) => void} callback
	 */
	find( callback ) {
		return this.#elements.find( callback );
	}

	/**
	 * @param {HTMLElement} element
	 */
	indexOf( element ) {
		return this.#elements.indexOf( element );
	}

	/**
	 * @param {HTMLElement} subject
	 * @param {(element: HTMLElement) => boolean} filter
	 * @returns
	 */
	static peersOf( subject, filter ) {
		const parent = subject.parentNode;

		if ( ! filter ) {
			filter = ( e ) => e.localName === selected.localName && ! e.hasAttribute( 'hidden' );
		}

		return new ElementSelection( Array.from( parent.children ).filter( filter ), selected );
	}
}

/**
 * @typedef {import('../xb-element').XBElement} XBElement
 * @typedef {import('../../mixins/with-selection').WithSelectionMixin} WithSelectionMixin
 */
