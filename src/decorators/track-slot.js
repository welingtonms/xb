/**
 * Decorator that tracks slot content and updates a class property.
 * @param {string} [slotName=''] - Name of the slot to track. Empty string for default slot.
 */
export function trackSlot( slotName = '' ) {
	// Return the decorator function
	return ( protoOrTarget, nameOrContext ) => {
		// Handle standard decorators (using new decorator spec)
		if ( typeof nameOrContext === 'object' ) {
			return standardSlotDecorator( slotName, protoOrTarget, nameOrContext );
		}
		// Handle legacy decorators
		return legacySlotDecorator( slotName, protoOrTarget, nameOrContext );
	};
}

/**
 * Standard decorator implementation (new decorator spec)
 */
const standardSlotDecorator = ( slotName, target, context ) => {
	const { kind, name } = context;

	// We only support field and accessor decorators
	if ( ! [ 'field', 'accessor' ].includes( kind ) ) {
		throw new Error( `Unsupported decorator location: ${ kind }` );
	}

	// Create storage for tracking slot content
	const storage = new WeakMap();

	if ( kind === 'accessor' ) {
		return {
			get() {
				return storage.get( this ) ?? false;
			},
			set( value ) {
				const oldValue = storage.get( this );
				storage.set( this, value );
				if ( oldValue !== value ) {
					this.requestUpdate?.( name, oldValue );
				}
			},
			init( value ) {
				if ( value !== undefined ) {
					storage.set( this, value );
				}
				// Set up slot listener after element is connected
				this.addController( {
					hostConnected: () => {
						this.updateComplete.then( () => setupSlotListener( this, slotName, storage ) );
					},
					hostDisconnected: () => {
						cleanupSlotListener( this, slotName );
					},
				} );
				return value;
			},
		};
	}

	// For fields
	return {
		get() {
			return storage.get( this ) ?? false;
		},
		set( value ) {
			const oldValue = storage.get( this );
			storage.set( this, value );
			if ( oldValue !== value ) {
				this.requestUpdate?.( name, oldValue );
			}
		},
	};
};

/**
 * Legacy decorator implementation
 */
const legacySlotDecorator = ( slotName, proto, name ) => {
	// Create storage for tracking slot content
	const storage = new WeakMap();

	// Store original callbacks
	const originalConnected = proto.connectedCallback;
	const originalDisconnected = proto.disconnectedCallback;

	// Override connectedCallback
	proto.connectedCallback = function () {
		if ( originalConnected ) {
			originalConnected.call( this );
		}
		this.updateComplete?.then( () => setupSlotListener( this, slotName, storage ) );
	};

	// Override disconnectedCallback
	proto.disconnectedCallback = function () {
		cleanupSlotListener( this, slotName );
		if ( originalDisconnected ) {
			originalDisconnected.call( this );
		}
	};

	return {
		get() {
			return storage.get( this ) ?? false;
		},
		set( value ) {
			const oldValue = storage.get( this );
			storage.set( this, value );
			if ( oldValue !== value ) {
				this.requestUpdate?.( name, oldValue );
			}
		},
		configurable: true,
		enumerable: true,
	};
};

// Helper functions
function setupSlotListener( instance, slotName, storage ) {
	const slot = instance.renderRoot?.querySelector(
		slotName === '' ? 'slot:not([name])' : `slot[name="${ slotName }"]`
	);

	if ( ! slot ) {
		console.warn( `Slot ${ slotName } not found` );
		return;
	}

	const handleSlotChange = ( e ) => {
		const hasContent = e.target.assignedNodes( { flatten: true } ).length > 0;
		const oldValue = storage.get( instance );

		storage.set( instance, hasContent );

		if ( oldValue !== hasContent ) {
			instance.requestUpdate();
		}
	};

	// Set initial value and trigger update
	const initialNodes = slot.assignedNodes( { flatten: true } );

	const hasContent = initialNodes.length > 0;
	storage.set( instance, hasContent );

	// Store handler for cleanup
	slot._slotChangeHandler = handleSlotChange;
	slot.addEventListener( 'slotchange', handleSlotChange );

	// Manually trigger the handler once to handle initial content
	handleSlotChange( { target: slot } );

	// Request an update to ensure the component reflects the initial state
	instance.requestUpdate();
}

function cleanupSlotListener( instance, slotName ) {
	const slot = instance.renderRoot?.querySelector(
		slotName === '' ? 'slot:not([name])' : `slot[name="${ slotName }"]`
	);

	if ( slot?._slotChangeHandler ) {
		slot.removeEventListener( 'slotchange', slot._slotChangeHandler );
		delete slot._slotChangeHandler;
	}
}
