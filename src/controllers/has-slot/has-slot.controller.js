import createLogger from '../../utils/logger';

const logger = createLogger( 'has-slot' );

/** Detects light-DOM children with a slot so we can show a class on the element. */
export class HasSlotController {
	/** @type {MutationObserver | null} */
	accessor observer = null;

	/** @param {import('lit').ReactiveControllerHost} host
	 * @param {{
	 *  slotName: string;
	 *  onCheckHasSlot: ( has: boolean ) => void;
	 * }} options
	 */
	constructor( host, options ) {
		const { slotName, onCheckHasSlot } = options;
		this.host = host;
		this.slotName = slotName;
		this.onCheckHasSlot = onCheckHasSlot;

		host.addController( this );
	}

	hostConnected() {
		const check = () => {
			const has = !! this.host.querySelector( `[slot="${ this.slotName }"]` );
			this.onCheckHasSlot( has );
		};

		this.host.updateComplete.then( check );
		this.observer = new MutationObserver( () => check() );
		this.observer.observe( this.host, { childList: true, subtree: true } );
	}

	hostDisconnected() {
		if ( this.observer ) {
			this.observer.disconnect();
			this.observer = null;
		}
	}
}
