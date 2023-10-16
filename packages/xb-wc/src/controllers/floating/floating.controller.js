import { autoUpdate, computePosition, flip, offset, shift, hide, platform } from '@floating-ui/dom';
import isFunction from '@welingtonms/xb-toolset/dist/is-function';
import { offsetParent } from 'composed-offset-position';

import { isPopover, isDialog } from './floating.controller.helpers';
import topLayerMiddleware from './top-layer-middleware';
import createLogger from '../../utils/logger';

const logger = createLogger( 'floating' );

/**
 * @implements {ReactiveController}
 */
class FloatingController {
	/** @type {FloatingControllerHost} */
	host;

	/** @type {boolean} */
	open;

	/** @type {(() => void) | null} */
	cleanup;

	/** @type {FloatingElementPosition} */
	position;

	/** @type {FloatingElementPlacement} */
	placement;

	/**
	 * @param {FloatingControllerHost} host
	 */
	constructor( host ) {
		this.open = host.open;
		this.position = host.position;
		this.placement = host.placement;

		( this.host = host ).addController( this );
	}

	async hostConnected() {
		await this.host.updateComplete;

		if ( isPopover( this.floating ) ) {
			logger.debug( 'popover support detected' );
		} else {
			logger.debug( 'popover support not detected' );
		}

		this.cleanup = autoUpdate( this.reference, this.floating, () => {
			if ( this.open ) {
				logger.debug( 'auto update triggered reposition' );

				this.reposition( 'auto' );
			}
		} );
	}

	hostDisconnected() {
		this.cleanup?.();
	}

	hostUpdate() {
		if ( this.open !== this.host.open ) {
			if ( this.host.open ) {
				this.show();
			} else {
				this.hide();
			}
		} else if (
			this.open &&
			( this.host.position !== this.position || this.host.placement !== this.placement )
		) {
			this.position = this.host.position;
			this.placement = this.host.placement;

			this.reposition();
		}
	}

	get floating() {
		if ( ! isFunction( this.host.getFloatingElement ) ) {
			throw new Error( 'Not implemented' );
		}

		return this.host.getFloatingElement();
	}

	get reference() {
		if ( ! isFunction( this.host.getReferenceElement ) ) {
			throw new Error( 'Not implemented' );
		}

		return this.host.getReferenceElement();
	}

	get arrow() {
		if ( ! isFunction( this.host.getArrowElement ) ) {
			throw new Error( 'Not implemented' );
		}

		return this.host.getArrowElement();
	}

	show = () => {
		if ( this.open ) {
			return;
		}

		this.open = true;
		this.host.open = true;

		if ( isPopover( this.floating ) ) {
			this.floating.showPopover();
		} else if ( isDialog( this.floating ) ) {
			this.floating.show();
		}

		this.reposition( 'show' );
	};

	hide = () => {
		if ( ! this.open ) {
			return;
		}

		this.open = false;
		this.host.open = false;

		if ( isPopover( this.floating ) ) {
			this.floating.hidePopover();
		} else if ( isDialog( this.floating ) ) {
			this.floating.close();
		}
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
	reposition = async ( reason = 'auto' ) => {
		if ( this.floating == null || this.reference == null ) {
			logger.warn( 'both floating and reference elements should be available', {
				reference: this.reference,
				floating: this.floating,
			} );

			return;
		}

		const strategy = this.position || 'fixed';
		const placement = this.placement || 'bottom-start';

		computePosition( this.reference, this.floating, {
			strategy,
			placement,
			// source: https://floating-ui.com/docs/platform#shadow-dom-fix
			platform: {
				...platform,
				getOffsetParent: ( element ) => {
					return platform.getOffsetParent( element, offsetParent );
				},
			},
			middleware: [
				offset( 4 ),
				flip(),
				shift(),
				hide(),
				isPopover( this.floating ) || isDialog( this.floating )
					? topLayerMiddleware( this.host )
					: null,
			],
		} ).then( ( { x, y, placement } ) => {
			// logger.debug( 'positioning at ', placement, { x, y } );

			this.floating.style.setProperty( '--xb-floating-left', `${ x }px` );
			this.floating.style.setProperty( '--xb-floating-top', `${ y }px` );

			this.floating.style.setProperty(
				'--xb-floating-border-top-left-radius',
				`${ [ 'bottom-start', 'right-start' ].includes( placement ) ? 0 : 4 }px`
			);
			this.floating.style.setProperty(
				'--xb-floating-border-top-right-radius',
				`${ [ 'bottom-end', 'left-start' ].includes( placement ) ? 0 : 4 }px`
			);
			this.floating.style.setProperty(
				'--xb-floating-border-bottom-right-radius',
				`${ [ 'left-end', 'top-end' ].includes( placement ) ? 0 : 4 }px`
			);
			this.floating.style.setProperty(
				'--xb-floating-border-bottom-left-radius',
				`${ [ 'top-start', 'right-end' ].includes( placement ) ? 0 : 4 }px`
			);
		} );

		const event = new CustomEvent( 'xb-floating:reposition', {
			bubbles: true,
			cancelable: true,
			composed: true,
			detail: { reason },
		} );

		this.host.dispatchEvent( event );
	};
}

export default FloatingController;

/**
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('../../common/xb-element').default} XBElement
 */

/**
 * @typedef {ReactiveControllerHost & {
 *  open: boolean;
 * 	position: FloatingElementPosition;
 *  placement: FloatingElementPlacement;
 * 	getReferenceElement(): HTMLElement | null;
 *  getFloatingElement(): HTMLElement | null;
 * 	getArrowElement(): HTMLElement | null;
 * }} FloatingControllerHost
 */

/**
 * @typedef {import('@floating-ui/dom').Strategy} FloatingElementPosition
 * @typedef {import('@floating-ui/dom').Placement} FloatingElementPlacement
 * @typedef {import('@floating-ui/dom').MiddlewareData} MiddlewareData
 * @typedef {import('@floating-ui/dom').Middleware} Middleware
 * @typedef {import('@floating-ui/dom').MiddlewareState} MiddlewareState
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
