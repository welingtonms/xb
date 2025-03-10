/**
 * A reactive controller that tracks whether slots have content.
 */
export class SlotContentController {
	/**
	 * @param {import('lit').ReactiveElement} host
	 * @param {Object} config
	 * @param {string[]} config.slots - Array of slot selectors to track
	 * @param {(slotName: string, hasContent: boolean) => void} [config.onChange] - Optional callback when slot content changes
	 */
	constructor( host, { slots, onChange } = { slots: [ '' ] } ) {
		this.host = host;
		this.slots = slots;
		this.onChange = onChange;
		this.slotStates = new Map();

		// Initialize state for each slot
		slots.forEach( ( slot ) => {
			this.slotStates.set( slot, false );
		} );

		host.addController( this );
	}

	/**
	 * Called when the host is connected to the DOM
	 */
	hostConnected() {
		// Wait for first update to access shadow root
		this.host.updateComplete.then( () => {
			this.setupSlotListeners();
		} );
	}

	/**
	 * Called when the host is disconnected from the DOM
	 */
	hostDisconnected() {
		this.removeSlotListeners();
	}

	/**
	 * Sets up slot change listeners for all tracked slots
	 */
	setupSlotListeners() {
		this.slots.forEach( ( slotSelector ) => {
			const slot = this.host.renderRoot?.querySelector(
				slotSelector === '' ? 'slot:not([name])' : `slot[name="${ slotSelector }"]`
			);

			if ( slot ) {
				slot.addEventListener( 'slotchange', this.handleSlotChange );
				// Initialize state
				this.updateSlotState( slotSelector, slot );
			}
		} );
	}

	/**
	 * Removes slot change listeners
	 */
	removeSlotListeners() {
		this.slots.forEach( ( slotSelector ) => {
			const slot = this.host.renderRoot?.querySelector(
				slotSelector === '' ? 'slot:not([name])' : `slot[name="${ slotSelector }"]`
			);

			if ( slot ) {
				slot.removeEventListener( 'slotchange', this.handleSlotChange );
			}
		} );
	}

	/**
	 * Handles slot change events
	 * @param {Event} e
	 */
	handleSlotChange = ( e ) => {
		const slot = e.target;
		const slotName = slot.name || '';
		this.updateSlotState( slotName, slot );
	};

	/**
	 * Updates the state for a given slot
	 * @param {string} slotName
	 * @param {HTMLSlotElement} slot
	 */
	updateSlotState( slotName, slot ) {
		const hasContent = slot.assignedNodes( { flatten: true } ).length > 0;
		this.slotStates.set( slotName, hasContent );

		if ( this.onChange ) {
			this.onChange( slotName, hasContent );
		}

		// Request an update from the host
		this.host.requestUpdate();
	}

	/**
	 * Checks if a slot has content
	 * @param {string} slotName
	 * @returns {boolean}
	 */
	hasContent( slotName = '' ) {
		return this.slotStates.get( slotName ) || false;
	}
}
