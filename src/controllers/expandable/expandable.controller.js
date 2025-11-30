import createLogger from '../../utils/logger';
import { waitForAnimations } from '../../utils/wait-animations';

const logger = createLogger( 'expandable-controller' );

/**
 * @typedef {import('lit').ReactiveControllerHost & HTMLElement} ExpandableControllerHost
 */

/**
 * @typedef {Object} ExpandableControllerOptions
 * @property {function(ExpandableControllerHost): boolean} isExpanded - Function to check if the element is expanded
 * @property {function(ExpandableControllerHost): HTMLElement} getExpandableElement - Function to get the expandable element
 */

/**
 * Simple controller for expandable elements using CSS animations
 * @implements {import('lit').ReactiveController}
 */
export class ExpandableController {
	/**
	 * @param {ExpandableControllerHost} host - The host element
	 * @param {ExpandableControllerOptions} options - Configuration options
	 */
	constructor( host, options ) {
		/**
		 * @private
		 * @type {ExpandableControllerHost}
		 */
		this.host = host;

		/**
		 * @private
		 * @type {ExpandableControllerOptions}
		 */
		this.options = options;

		/**
		 * @private
		 * @type {boolean}
		 */
		this.wasExpanded = false;

		/**
		 * @private
		 * @type {boolean}
		 */
		this.isInitialized = false;

		logger.info( `expandable controller initialized (${ this.host.id || 'no id' })` );

		host.addController( this );
	}

	/**
	 * Called when the host element is updated
	 * @returns {void}
	 */
	hostUpdated() {
		const expandable = this.options.getExpandableElement( this.host );
		if ( ! expandable ) return;

		if ( ! this.isInitialized ) {
			this.isInitialized = true;
			this.wasExpanded = this.options.isExpanded( this.host );

			if ( ! this.wasExpanded ) {
				expandable.style.display = 'none';
			}
			return;
		}

		const isExpanded = this.options.isExpanded( this.host );

		if ( isExpanded !== this.wasExpanded ) {
			this.wasExpanded = isExpanded;
			this.updateExpandableState( expandable, isExpanded );
		}
	}

	/**
	 * Updates the expandable state with animation
	 * @private
	 * @param {HTMLElement} expandable - The expandable element
	 * @param {boolean} isExpanded - Whether the element should be expanded
	 * @returns {Promise<void>}
	 */
	async updateExpandableState( expandable, isExpanded ) {
		if ( isExpanded ) {
			expandable.style.setProperty( 'overflow', 'hidden' );
			expandable.style.removeProperty( 'display' );
			this.host.classList.add( 'is-showing' );

			await waitForAnimations( expandable );

			this.host.classList.remove( 'is-showing' );
			expandable.style.removeProperty( 'overflow' );
		} else {
			expandable.style.setProperty( 'overflow', 'hidden' );
			this.host.classList.add( 'is-hiding' );

			await waitForAnimations( expandable );

			expandable.style.setProperty( 'display', 'none' );
			this.host.classList.remove( 'is-hiding' );
			expandable.style.removeProperty( 'overflow' );
		}
	}

	/**
	 * Called when the host element is disconnected
	 * @returns {void}
	 */
	hostDisconnected() {
		this.isInitialized = false;
	}
}
