import createLogger from '../../utils/logger';
import { isPrintableCharacter } from '../../utils/string';

const logger = createLogger( 'type-ahead' );

export const SEARCH_BUFFER_TIMEOUT = 500;

/**
 * @implements {BaseFocusControllerPlugin}
 */
export class TypeAheadPlugin {
	/**
	 * `buffer`: Keys (printable characters) the user typed.
	 * `timeout`: Timeout to clear the buffer.
	 * @type {{
	 * 	buffer: string;
	 * 	timeout: number | null;
	 * }}
	 */
	search;

	/** @type {BaseFocusController} */
	controller;

	constructor() {
		this.search = {
			buffer: '',
			timeout: null,
		};
	}

	/**
	 * @param {BaseFocusControllerHost} host
	 * @param {BaseFocusController} controller
	 */
	install( host, controller ) {
		this.controller = controller;
		// Plugin attaches its own event listener to the host

		//   this.keyupHandler = (event: KeyboardEvent) => {
		//     const { key } = event;

		//     if (!isPrintableCharacter(key)) {
		//       return;
		//     }

		//     this.searchBuffer += key;
		//     this.#clearBufferAfterDelay();

		//     const nextMatch = this.#findTypeAheadMatch(controller);
		//     if (nextMatch) {
		//       controller.focus(nextMatch);
		//     }
		//   };

		host.addEventListener( 'keyup', this.#onKeyPress );
	}

	/**
	 * @param {BaseFocusControllerHost} host
	 * @param {BaseFocusController} controller
	 */
	uninstall( host ) {
		this.controller = null;

		host.removeEventListener( 'keyup', this.#onKeyPress );
	}

	/**
	 * @param {BaseFocusControllerHost} host
	 * @param {BaseFocusController} controller
	 */
	// hostDisconnected( host ) {
	//   if (this.keyupHandler) {
	// 	host.removeEventListener( 'keyup', this.#onKeyPress );
	// 	//   }
	// }

	#onKeyPress = ( event ) => {
		if ( ! this.controller.focused ) {
			return;
		}

		const { key } = event;

		if ( ! isPrintableCharacter( key ) || event.ctrlKey || event.altKey || event.metaKey ) {
			return;
		}

		const queried = this.controller.queried;
		if ( queried.length === 0 ) return;

		const clearBufferAfterDelay = () => {
			if ( this.search.timeout ) {
				clearTimeout( this.search.timeout );
			}

			this.search.timeout = setTimeout( () => {
				this.search = {
					buffer: '',
					timeout: null,
				};
			}, SEARCH_BUFFER_TIMEOUT );
		};

		const findMatchInRange = ( startAt, endAt ) => {
			for ( let i = startAt; i < endAt; i++ ) {
				const item = queried[ i ];
				// Use textContent for better performance and less reliance on visual rendering.
				// Alternative: innerText (more expensive as it triggers reflow for computed styles)
				// but provides text as visually rendered. We choose textContent for consistency
				// and performance across both RovingFocusController and FocusManagerController.
				const label = item.textContent?.trim().toLowerCase() ?? '';
				if ( label.startsWith( this.search.buffer ) ) {
					return item;
				}
			}
			return null;
		};

		const currentIndex = this.controller.getIndexOf( this.controller.focused );

		// If multiple keys are typed quickly, concatenate them. Otherwise, start new search.
		this.search.buffer = this.search.timeout
			? this.search.buffer + key.toLowerCase()
			: key.toLowerCase();

		clearBufferAfterDelay();

		// Search from the item after the current one, wrapping around.
		const nextMatch =
			findMatchInRange( currentIndex + 1, queried.length ) ||
			findMatchInRange( 0, currentIndex + 1 ); // Include current index in wrap-around

		if ( nextMatch && nextMatch !== this.controller.focused ) {
			logger.debug( 'Found match for search:', nextMatch );
			this.controller.focus( nextMatch );
		}
	};
}

/**
 * @typedef {import('./base-focus.controller').BaseFocusControllerPlugin}  BaseFocusControllerPlugin
 * @typedef {import('./base-focus.controller').BaseFocusControllerHost}  BaseFocusControllerHost
 * @typedef {import('./base-focus.controller').BaseFocusController}  BaseFocusController
 */
