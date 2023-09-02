import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';

import createLogger from '../../utils/logger';

const logger = createLogger( 'floating' );

/**
 * Allow a component to be rendered as any HTML tag through the attribute `as`..
 * @implements {ReactiveController}
 */
class FloatingController {
	/** @type {ReactiveControllerHost} */
	host;

	/** @type {FloatingControllerOptions} */
	options;

	/** @type {boolean} */
	open;

	/** @type {() => void} */
	cleanup;

	/**
	 *
	 * @param {ReactiveControllerHost} host
	 * @param {FloatingControllerOptions} options
	 */
	constructor( host, options ) {
		this.options = options;

		( this.host = host ).addController( this );
	}

	hostConnected() {
		if ( this.open ) {
			this.reposition( 'show' );
		}

		this.cleanup = autoUpdate( this.reference, this.floating, () => {
			this.reposition( 'auto' );
		} );
	}

	hostDisconnected() {
		this.cleanup?.();
	}

	hostUpdate() {}

	get floating() {
		return this.options.getFloatingElement();
	}

	get reference() {
		return this.options.getReferenceElement();
	}

	show = () => {
		if ( this.open ) {
			return;
		}
		this.open = true;
		this.reposition( 'show' );
	};

	hide = () => {
		if ( ! this.open ) {
			return;
		}
		this.open = false;
	};

	toggle = () => {
		if ( this.open ) {
			this.hide();
		} else {
			this.show();
		}
	};

	/**
	 * @param {string} [reason]
	 */
	reposition = async ( reason ) => {
		if ( this.floating == null || this.reference == null ) {
			logger.warn( 'both floating and reference elements should be available', {
				reference: this.reference,
				floating: this.floating,
			} );

			return;
		}

		const { x, y } = await computePosition( this.reference, this.floating, {
			strategy: this.options.getPosition() ?? 'fixed',
			placement: this.options.getPlacement() ?? 'bottom-start',
			middleware: [
				// for adding distance between the reference and floating element
				offset( this.options.getFloatingOffset() ),
				// to prevent the floating element from overflowing on the main axis of its placement
				flip(),
				// preventing overflow while maintaining the desired placement as best as possible.
				shift(),
			],
		} );

		Object.assign( this.floating.style, {
			top: `${ y }px`,
			left: `${ x }px`,
		} );

		this.emit( 'xb-floating:reposition', { detail: { reason } } );
	};
}

export default FloatingController;

/**
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('../../common/xb-element').default} XBElement
 */

/**
 * @typedef {import('@floating-ui/dom').Strategy} FloatingElementPosition
 * @typedef {import('@floating-ui/dom').Placement} FloatingElementPlacement
 * @typedef {import('@floating-ui/dom').MiddlewareData} MiddlewareData
 */

/**
 * @typedef {Object} FloatingElementAttributes
 * @property {FloatingElementPosition} [position] - FloatingElement position.
 * @property {FloatingElementPlacement} [placement] - FloatingElement placement.
 * @property {boolean} [open] - Should FloatingElement's floating be open.
 */

/**
 * @typedef {Object} FloatingControllerProps
 * @property {[Shortcut, (event: KeyboardEvent) => void][]} keymap
 */

/**
 * @typedef {{
 *  getFloatingElement: () => HTMLElement;
 *  getReferenceElement: () => HTMLElement;
 *  getFloatingOffset: () => number;
 *  getPosition: () => FloatingElementPosition;
 *  getPlacement: () => FloatingElementPlacement;
 * }} FloatingControllerOptions
 */
