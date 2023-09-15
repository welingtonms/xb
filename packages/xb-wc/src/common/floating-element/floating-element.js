import { property } from 'lit/decorators.js';
import { computePosition, flip, shift, offset } from '@floating-ui/dom';

import createLogger from '../../utils/logger';
import XBElement from '../xb-element';

const logger = createLogger( 'floating-element' );

/**
 * Offer the basic wiring to `@floating-ui/dom` to render a floating element.
 */
export default class FloatingElement extends XBElement {
	/**
	 * FloatingElement positioning strategy.
	 * @type {FloatingElementAttributes['position']}
	 */
	@property( { type: String, reflect: true } ) position;

	/**
	 * FloatingElement placement.
	 * @type {FloatingElementAttributes['placement']}
	 */
	@property( { type: String } ) placement;

	/**
	 * Should popover's floating be open.
	 * @type {FloatingElementAttributes['open']}
	 */
	@property( { type: Boolean, reflect: true } ) open;

	constructor() {
		super();

		/** @type {FloatingElementAttributes['position']} */
		this.position = 'fixed';

		/** @type {FloatingElementAttributes['placement']} */
		this.placement = 'top-end';

		/** @type {FloatingElementAttributes['open']} */
		this.open = false;
	}

	/**
	 *
	 * @param {import('lit').PropertyValueMap<FloatingElement>} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'position' ) || changedProperties.has( 'placement' ) ) {
			this.reposition();
		}
	}

	get reference() {
		return this.getReferenceElement();
	}

	get floating() {
		return this.getFloatingElement();
	}

	get arrow() {
		return this.getArrowElement();
	}

	/**
	 * @returns {HTMLElement | null}
	 */
	getReferenceElement() {
		throw new Error( 'Not implemented' );
	}
	/**
	 * @returns {HTMLElement | null}
	 */
	getFloatingElement() {
		throw new Error( 'Not implemented' );
	}
	/**
	 * @returns {HTMLElement | null}
	 */
	getArrowElement() {
		throw new Error( 'Not implemented' );
	}

	show() {
		if ( this.open ) {
			return;
		}

		this.open = true;

		this.reposition();
	}

	hide() {
		if ( ! this.open ) {
			return;
		}

		this.open = false;
	}

	toggle() {
		if ( this.open ) {
			this.hide();
		} else {
			this.show();
		}
	}

	reposition() {
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
			middleware: [ offset( 4 ), flip(), shift() ],
		} ).then( ( { x, y, placement } ) => {
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
	}
}

/**
 * @typedef {import('@floating-ui/dom').Strategy} FloatingElementPosition
 * @typedef {import('@floating-ui/dom').Placement} FloatingElementPlacement
 */

/**
 * @typedef {Object} FloatingElementAttributes
 * @property {FloatingElementPosition} [position] - FloatingElement position.
 * @property {FloatingElementPlacement} [placement] - FloatingElement placement.
 * @property {boolean} [open] - Should FloatingElement's floating be open.
 */
