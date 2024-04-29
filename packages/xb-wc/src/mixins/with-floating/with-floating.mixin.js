import { autoUpdate, computePosition, flip, offset, shift, hide, platform } from '@floating-ui/dom';
import { offsetParent } from 'composed-offset-position';
import { property } from 'lit/decorators.js';

import { isPopover, isDialog } from '../../utils/top-layer';
// import topLayerMiddleware from './top-layer-middleware';
import createLogger from '../../utils/logger';

const logger = createLogger( 'with-floating' );

/**
 * @template {!Constructable} T
 * @param {T} BaseClass
 */
export function WithFloatingMixin( BaseClass ) {
	return class WithFloating extends BaseClass {
		/**
		 * FloatingElement positioning strategy.
		 * @type {WithFloatingAttributes['position']}
		 */
		@property( { type: String, reflect: true } ) accessor position;

		/**
		 * FloatingElement placement.
		 * @type {WithFloatingAttributes['placement']}
		 */
		@property( { type: String, reflect: true } ) accessor placement;

		/**
		 * Should popover's floating be open.
		 * @type {WithFloatingAttributes['open']}
		 */
		@property( { type: Boolean, reflect: true } ) accessor open;

		/** @type {(() => void) | null} */
		_cleanup;

		get reference() {
			return this.getReferenceElement();
		}

		get floating() {
			return this.getFloatingElement();
		}

		get arrow() {
			return this.getArrowElement();
		}

		getReferenceElement() {
			logger.warn( 'getReferenceElement is not implemented' );
			return null;
		}

		getFloatingElement() {
			logger.warn( 'getReferenceElement is not implemented' );
			return null;
		}

		getArrowElement() {
			logger.warn( 'getReferenceElement is not implemented' );
			return null;
		}

		connectedCallback() {
			super.connectedCallback();

			if ( isPopover( this.floating ) ) {
				logger.debug( 'popover support detected' );
			} else {
				logger.debug( 'popover support not detected' );
			}

			// this._cleanup = autoUpdate( this.reference, this.floating, () => {
			// 	if ( this.open ) {
			// 		logger.debug( 'auto update triggered reposition' );

			// 		this.reposition( 'auto' );
			// 	}
			// } );
		}

		disconnectedCallback() {
			super.disconnectedCallback();

			this._cleanup?.();
		}

		/**
		 * @param {import('lit').PropertyValues<this>} changedProperties
		 */
		update( changedProperties ) {
			super.update( changedProperties );

			if ( changedProperties.has( 'open' ) ) {
				if ( this.open ) {
					this.show();
				} else {
					this.hide();
				}
			}
		}

		show = () => {
			if ( this.open ) {
				return;
			}

			this.open = true;

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
					// isPopover( this.floating ) || isDialog( this.floating ) ? topLayerMiddleware() : null,
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

			this.dispatchEvent( event );
		};
	};
}

/**
 * @typedef {import('../../common/xb-element').XBElement} XBElement
 * @typedef {import('../../common/prop-types').Constructable} Constructable
 */

/**
 * @typedef {Object} WithFloatingAttributes
 * @property {import('@floating-ui/dom').Strategy} [position] - FloatingElement position.
 * @property {import('@floating-ui/dom').Placement} [placement] - FloatingElement placement.
 * @property {boolean} [open] - Should FloatingElement's floating be open.
 */
