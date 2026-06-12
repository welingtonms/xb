// @ts-check
import { BoundaryController } from '../../controllers/boundary';
import { ExpandableController } from '../../controllers/expandable';
import { isInsideElement } from '../../utils/events';
import { FloatingElement } from '../floating-element/floating-element';

/**
 * Floating **Element** with Reference + Panel disclosure lifecycle.
 *
 * Owns boundary/expandable wiring, focus-boundary listeners, outside dismiss,
 * and expand/collapse orchestration around {@link FloatingElement.show} / hide.
 *
 * Subclasses override protected hooks for focus guards and domain side effects.
 */
export class DisclosureFloatingElement extends FloatingElement {
	/** @type {DisclosureControllers} */
	disclosureControllers;

	/**
	 * @param {Object} [options]
	 * @param {boolean} [options.popover] - Passed to {@link FloatingElement}.
	 */
	constructor( options ) {
		super( options );

		this.disclosureControllers = {
			boundary: new BoundaryController( this ),
			expandable: new ExpandableController( this, {
				getExpandableElement: () => {
					return this.getFloatingElement();
				},
				isExpanded: () => Boolean( this.open ),
			} ),
		};
	}

	/**
	 * When true, registers `focusout` to deactivate boundary controllers.
	 * @returns {boolean}
	 * @protected
	 */
	get useFocusOutDeactivation() {
		return false;
	}

	connectedCallback() {
		super.connectedCallback();

		this.addEventListener( 'focusin', this.#handleFocusIn );

		if ( this.useFocusOutDeactivation ) {
			this.addEventListener( 'focusout', this.#handleFocusOut );
		}

		this.addEventListener( 'interact-out', this.#handleInteractOut );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.removeEventListener( 'focusin', this.#handleFocusIn );

		if ( this.useFocusOutDeactivation ) {
			this.removeEventListener( 'focusout', this.#handleFocusOut );
		}

		this.removeEventListener( 'interact-out', this.#handleInteractOut );
	}

	/**
	 * @param {FocusEvent} event
	 * @returns {boolean}
	 * @protected
	 */
	shouldActivateOnFocusIn( event ) {
		return isInsideElement( event, this );
	}

	/**
	 * @param {FocusEvent} event
	 * @returns {boolean}
	 * @protected
	 */
	shouldDeactivateOnFocusOut( event ) {
		return ! this.contains( event.relatedTarget );
	}

	/**
	 * @returns {boolean}
	 * @protected
	 */
	shouldCollapseOnInteractOut() {
		return true;
	}

	/** @protected */
	onDisclosureActivate() {}

	/** @protected */
	onDisclosureDeactivate() {}

	/** @protected */
	activateDisclosure() {
		this.disclosureControllers.boundary.activate();
		this.onDisclosureActivate();
	}

	/** @protected */
	deactivateDisclosure() {
		this.disclosureControllers.boundary.deactivate();
		this.onDisclosureDeactivate();
	}

	/**
	 * @param {FocusEvent} event
	 */
	#handleFocusIn = ( event ) => {
		if ( this.shouldActivateOnFocusIn( event ) ) {
			this.activateDisclosure();
		}
	};

	/**
	 * @param {FocusEvent} event
	 */
	#handleFocusOut = ( event ) => {
		if ( this.shouldDeactivateOnFocusOut( event ) ) {
			this.deactivateDisclosure();
		}
	};

	#handleInteractOut = () => {
		if ( ! this.shouldCollapseOnInteractOut() ) {
			return;
		}

		this.deactivateDisclosure();
		this.collapse();
	};

	/**
	 * @param {DisclosureExpandArgs} [args]
	 */
	async expand( args = {} ) {
		this.show();
		await this.updateComplete;
		await this.onExpanded( args );
	}

	/**
	 * @param {DisclosureCollapseArgs} [args]
	 */
	collapse = async ( args = {} ) => {
		this.hide();
		await this.updateComplete;
		await this.onCollapsed( args );
	};

	/**
	 * @param {DisclosureToggleArgs} [args]
	 */
	toggle( args ) {
		if ( this.open ) {
			this.collapse( args );
		} else {
			this.expand( args );
		}
	}

	/**
	 * @see {@link FloatingElement.handleExternalClose}
	 */
	handleExternalClose() {
		this.collapse();
	}

	/**
	 * @param {DisclosureExpandArgs} args
	 * @protected
	 */
	async onExpanded( args ) {
		if ( args.emit !== false ) {
			this.emit( 'expand' );
		}
	}

	/**
	 * @param {DisclosureCollapseArgs} args
	 * @protected
	 */
	async onCollapsed( args ) {
		this.emit( 'collapse' );
	}
}

/**
 * @typedef {Object} DisclosureExpandArgs
 * @property {boolean} [emit] - Emit `expand` when false.
 * @property {'first' | 'last'} [position] - Focus position in panel.
 * @property {boolean} [focusOnTrigger] - Focus reference after expand.
 */

/**
 * @typedef {Object} DisclosureCollapseArgs
 * @property {boolean} [focusOnTrigger] - Focus reference after collapse.
 */

/**
 * @typedef {DisclosureExpandArgs & DisclosureCollapseArgs} DisclosureToggleArgs
 */

/**
 * @typedef {{
 * 	boundary: BoundaryController;
 * 	expandable: ExpandableController;
 * }} DisclosureControllers
 */
