// @ts-check
import { property } from 'lit/decorators.js';
import { offsetParent } from 'composed-offset-position';

import { autoUpdate, computePosition, flip, offset, shift, hide, platform } from '@floating-ui/dom';
import { supportsPopover, isPopover, isDialog } from '../../utils/top-layer';
import { XBElement } from '../xb-element';
import createLogger from '../../utils/logger';
import isFunction from '../../utils/is-function';

const logger = createLogger( 'floating-element' );

/**
 * Get manually calculated offset because floating-ui's offset middleware fails
 * to calculate the correct offset when the reference is small.
 * @param {boolean} arrow
 * @param {string} direction
 * @param {number} offset
 * @returns {string}
 */
export function getPositionOffset( arrow, direction, offset ) {
	const size = 'var(--m-popover-arrow-size)';

	switch ( direction ) {
		case 'top':
		case 'left':
			return arrow ? `-1 * ${ size } - ${ offset }px` : `-1 * ${ offset }px`;
		case 'bottom':
		case 'right':
			return arrow ? `${ size } + ${ offset }px` : `${ offset }px`;
		default:
			return '0px';
	}
}

/**
 * Offer the basic wiring to `@floating-ui/dom` to render a floating element.
 */
export class FloatingElement extends XBElement {
	/**
	 * FloatingElement positioning strategy.
	 * @type {FloatingElementAttributes['position']}
	 */
	@property( { type: String, reflect: true } ) accessor position;

	/**
	 * FloatingElement placement.
	 * @type {FloatingElementAttributes['placement']}
	 */
	@property( { type: String, reflect: true } ) accessor placement;

	/**
	 * Should popover's floating be open.
	 * @type {FloatingElementAttributes['open']}
	 */
	@property( { type: Boolean, reflect: true } ) accessor open;

	/**
	 * Should the floating element be responsive.
	 * @type {boolean}
	 */
	@property( { type: Boolean, reflect: true } ) accessor responsive;

	/** @type {() => void} */
	#cleanup;

	/** @type {boolean} */
	#usePopover;

	/**
	 * @param {Object} options
	 * @param {boolean} [options.popover] - Should the floating element use the popover API. Defaults to `false`.
	 */
	constructor( options ) {
		super();

		const { popover = false } = options || {};
		this.#usePopover = popover;
	}

	connectedCallback() {
		super.connectedCallback();

		this.position = this.position ?? 'fixed';
		this.placement = this.placement ?? 'top-end';
		this.open = this.open ?? false;
		this.responsive = this.responsive ?? false;

		if ( this.#usePopover && supportsPopover() ) {
			logger.debug( 'popover support detected' );
		} else {
			logger.debug( 'popover support not detected' );
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		if ( this.#cleanup ) {
			this.#cleanup();
		}

		if ( this.#usePopover && this.floating && supportsPopover() ) {
			this.floating.removeEventListener( 'toggle', this.#onPopoverToggle );
		}
	}

	/**
	 * @param {PropertyValues} changedProperties
	 */
	firstUpdated( changedProperties ) {
		super.firstUpdated( changedProperties );

		if ( this.#usePopover && this.floating && supportsPopover() ) {
			this.floating.popover = 'auto';
			this.floating.addEventListener( 'toggle', this.#onPopoverToggle );
		}

		if ( this.open ) {
			this.show();
		}
	}

	/**
	 * @param {PropertyValues} changedProperties
	 */
	willUpdate( changedProperties ) {
		super.willUpdate( changedProperties );

		if ( this.open && changedProperties.get( 'placement' ) != null && this.placement != null ) {
			this.reposition( 'placement' );
		}
	}

	/**
	 * @param {ToggleEvent} event
	 */
	#onPopoverToggle = ( event ) => {
		if ( event.newState === 'closed' && this.open ) {
			this.handleExternalClose();
		}
	};

	/**
	 * @returns {HTMLElement | null}
	 */
	get reference() {
		if ( ! isFunction( this.getReferenceElement ) ) {
			throw new Error( 'Not implemented' );
		}

		return this.getReferenceElement();
	}

	/**
	 * @returns {HTMLElement |  HTMLDialogElement | null}
	 */
	get floating() {
		if ( ! isFunction( this.getFloatingElement ) ) {
			throw new Error( 'Not implemented' );
		}

		return this.getFloatingElement();
	}

	/**
	 * @returns {HTMLElement | null}
	 */
	get arrow() {
		if ( ! isFunction( this.getArrowElement ) ) {
			throw new Error( 'Not implemented' );
		}

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

	/*
	 * @returns {{ mainAxis: number; crossAxis: number }}
	 */
	getFloatingOffset() {
		return {
			mainAxis: 4,
			crossAxis: 0,
		};
	}

	show() {
		if ( this.open ) {
			return;
		}

		this.open = true;

		if ( ! this.reference || ! this.floating ) {
			return;
		}

		if ( isPopover( this.floating ) ) {
			this.floating.showPopover();
		}

		this.#cleanup = autoUpdate( this.reference, this.floating, () => {
			this.reposition( 'auto' );
		} );
	}

	hide() {
		if ( ! this.open ) {
			return;
		}

		this.open = false;

		if ( this.floating != null && isPopover( this.floating ) ) {
			this.floating.hidePopover();
		}

		this.#cleanup?.();
	}

	toggle() {
		if ( this.open ) {
			this.hide();
		} else {
			this.show();
		}
	}

	/**
	 * Handle the event where the floating element is closed by an external
	 * mechanism (e.g. browser light dismiss, ESC key on popover).
	 *
	 * Subclasses should override this if they need to perform state cleanup
	 * beyond just hiding the element.
	 * @protected
	 */
	handleExternalClose() {
		this.hide();
	}

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

		const { x, y, placement, middlewareData } = await computePosition(
			this.reference,
			this.floating,
			{
				strategy: this.position || 'fixed',
				placement: this.placement || 'bottom-start',
				// source: https://floating-ui.com/docs/platform#shadow-dom-fix
				platform: {
					...platform,
					getOffsetParent: ( element ) => {
						return platform.getOffsetParent( element, offsetParent );
					},
				},
				middleware: [
					offset( this.getFloatingOffset() ),
					// to prevent the floating element from overflowing on the main axis of its placement
					flip(),
					// preventing overflow while maintaining the desired placement as best as possible.
					shift(),
					// to hide the floating element in applicable situations.
					hide(),
				],
			}
		);
		// logger.debug( 'positioning at ', placement, { x, y } );

		if ( middlewareData.hide?.referenceHidden ) {
			// we skip repositioning if the reference element is hidden
			this.floating.style.setProperty( 'visibility', 'hidden' );

			return;
		}

		const [ side ] = placement.split( '-' );
		const hasArrow = this.arrow != null;

		const floatingOffset = this.getFloatingOffset();
		/** @type {Record<string, { x: string; y: string }>} */
		const mainSideIncrement = {
			top: {
				x: '0px',
				y: getPositionOffset( hasArrow, 'top', floatingOffset.mainAxis ),
			},
			bottom: {
				x: '0px',
				y: getPositionOffset( hasArrow, 'bottom', floatingOffset.mainAxis ),
			},
			right: {
				x: getPositionOffset( hasArrow, 'right', floatingOffset.mainAxis ),
				y: '0px',
			},
			left: {
				x: getPositionOffset( hasArrow, 'left', floatingOffset.mainAxis ),
				y: '0px',
			},
		};

		this.floating.style.setProperty( 'visibility', 'visible' );
		this.floating.style.setProperty(
			'--xb-floating-left',
			`calc(${ x }px + ${ mainSideIncrement[ side ].x })`
		);
		this.floating.style.setProperty(
			'--xb-floating-top',
			`calc(${ y }px + ${ mainSideIncrement[ side ].y })`
		);

		// this.floating.style.setProperty(
		// 	'--xb-floating-border-top-left-radius',
		// 	`${ [ 'bottom-start', 'right-start' ].includes( placement ) ? 0 : 4 }px`
		// );
		// this.floating.style.setProperty(
		// 	'--xb-floating-border-top-right-radius',
		// 	`${ [ 'bottom-end', 'left-start' ].includes( placement ) ? 0 : 4 }px`
		// );
		// this.floating.style.setProperty(
		// 	'--xb-floating-border-bottom-right-radius',
		// 	`${ [ 'left-end', 'top-end' ].includes( placement ) ? 0 : 4 }px`
		// );
		// this.floating.style.setProperty(
		// 	'--xb-floating-border-bottom-left-radius',
		// 	`${ [ 'top-start', 'right-end' ].includes( placement ) ? 0 : 4 }px`
		// );

		this.emit( 'reposition', {
			detail: { reason },
		} );
	};
}

/**
 * @typedef {import('@floating-ui/dom').Strategy} FloatingElementPosition
 * @typedef {import('@floating-ui/dom').Placement} FloatingElementPlacement
 * @typedef {import('lit').PropertyValues} PropertyValues
 */

/**
 * @typedef {Object} FloatingElementAttributes
 * @property {FloatingElementPosition} [position] - FloatingElement position.
 * @property {FloatingElementPlacement} [placement] - FloatingElement placement.
 * @property {boolean} [open] - Should FloatingElement's floating be open.
 */
