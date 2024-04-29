// @ts-check
import { property } from 'lit/decorators.js';

import { autoUpdate, computePosition, flip, offset, shift, hide, platform } from '@floating-ui/dom';
import isFunction from '../../utils/is-function';
import { offsetParent } from 'composed-offset-position';

import { supportsPopover, isPopover, isDialog } from '../../utils/top-layer';

import createLogger from '../../utils/logger';
// import { FloatingController } from '../../controllers/floating';
import { XBElement } from '../xb-element';

const logger = createLogger( 'floating-element' );

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

	/** @type {() => void} */
	#cleanup;

	constructor() {
		super();
	}

	connectedCallback() {
		super.connectedCallback();

		this.position = this.position ?? 'fixed';
		this.placement = this.placement ?? 'top-end';
		this.open = this.open ?? false;

		if ( supportsPopover ) {
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
	}

	firstUpdated() {
		// if ( supportsPopover() && this.floating ) {
		// 	this.floating.setAttribute( 'popover', 'manual' );
		// }

		if ( this.open ) {
			this.show();
		}
	}

	/**
	 * @param {PropertyValues} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( this.open && changedProperties.get( 'placement' ) != null && this.placement != null ) {
			this.reposition( 'placement' );
		}
	}

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

	show() {
		if ( this.open ) {
			return;
		}

		this.open = true;

		if ( ! this.reference || ! this.floating ) {
			return;
		}

		// if ( isPopover( this.floating ) ) {
		// 	this.floating.showPopover();
		// }

		this.#cleanup = autoUpdate( this.reference, this.floating, () => {
			this.reposition( 'auto' );
		} );
	}

	hide() {
		if ( ! this.open ) {
			return;
		}

		this.open = false;

		// if ( this.floating != null && isPopover( this.floating ) ) {
		// 	this.floating.hidePopover();
		// }

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

		const { x, y, placement } = await computePosition( this.reference, this.floating, {
			strategy: this.position || 'fixed',
			placement: this.placement || 'bottom-start',
			// source: https://floating-ui.com/docs/platform#shadow-dom-fix
			platform: {
				...platform,
				getOffsetParent: ( element ) => {
					return platform.getOffsetParent( element, offsetParent );
				},
			},
			middleware: [ offset( 4 ), flip(), shift(), hide() ],
		} );
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

		this.emit( 'xb-floating:reposition', {
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
