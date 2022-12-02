import { html } from 'lit';
import { computePosition, flip, shift, offset } from '@floating-ui/dom';

import XBElement from '../../common/xb-element';
import styles from './popover.styles';

export class Popover extends XBElement {
	/** @type {HTMLElement | null} */
	_anchor = null;

	/** @type {HTMLElement | null} */
	_floating = null;

	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * Popover positioning strategy.
			 * @type {PopoverAttributes['position']}
			 */
			position: { type: String, reflect: true },

			/**
			 * Popover placement.
			 * @type {PopoverAttributes['placement']}
			 */
			placement: { type: String },

			/**
			 * Should popover's floating be hidden.
			 * @type {PopoverAttributes['hidden']}
			 */
			hidden: { type: Boolean },
		};
	}

	constructor() {
		super();

		/** @type {PopoverAttributes['position']} */
		this.position = 'fixed';

		/** @type {PopoverAttributes['placement']} */
		this.placement = 'top-end';

		/** @type {PopoverAttributes['hidden']} */
		this.hidden = true;
	}

	firstUpdated() {
		const [ anchorSlot, floatingSlot ] =
			this.shadowRoot.querySelectorAll( 'slot' );

		[ this._anchor ] = anchorSlot.assignedElements( { flatten: true } );
		[ this._floating ] = floatingSlot.assignedElements( { flatten: true } );
	}

	updated() {
		super.updated();

		this.reposition();
	}

	render() {
		return html`
			<slot name="anchor"></slot>
			<slot name="floating" @slotchange=${ this.reposition }></slot>
		`;
	}

	reposition() {
		const anchor = this._getAnchor();
		const floating = this._getFloating();

		if ( floating == null || anchor == null ) {
			console.warn(
				'[popover]',
				'both floating and anchor elements should be available',
				{ anchor, floating }
			);

			return;
		}

		const strategy = this.position || 'fixed'; // floating.position || 'fixed';
		const placement = this.placement || 'bottom-start'; // floating.placement || 'bottom-start';

		computePosition( anchor, floating, {
			strategy,
			placement,
			middleware: [ offset( 4 ), flip(), shift() ],
		} ).then( ( { x, y, placement } ) => {
			floating.style.setProperty( '--xb-popover-left', `${ x }px` );
			floating.style.setProperty( '--xb-popover-top', `${ y }px` );

			floating.style.setProperty(
				'--xb-popover-border-top-left-radius',
				`${ [ 'bottom-start', 'right-start' ].includes( placement ) ? 0 : 4 }px`
			);
			floating.style.setProperty(
				'--xb-popover-border-top-right-radius',
				`${ [ 'bottom-end', 'left-start' ].includes( placement ) ? 0 : 4 }px`
			);
			floating.style.setProperty(
				'--xb-popover-border-bottom-right-radius',
				`${ [ 'left-end', 'top-end' ].includes( placement ) ? 0 : 4 }px`
			);
			floating.style.setProperty(
				'--xb-popover-border-bottom-left-radius',
				`${ [ 'top-start', 'right-end' ].includes( placement ) ? 0 : 4 }px`
			);
		} );
	}

	_getAnchor() {
		return this._anchor;
	}

	_getFloating() {
		return this._floating;
	}
}

window.customElements.define( 'xb-popover', Popover );

/**
 * @typedef {import('@floating-ui/dom').Strategy} PopoverPosition
 * @typedef {import('@floating-ui/dom').Placement} PopoverPlacement
 */

/**
 * @typedef {Object} PopoverAttributes
 * @property {PopoverPosition} [position] - Popover position.
 * @property {PopoverPlacement} [placement] - Popover placement.
 * @property {boolean} [hidden] - Should Popover's floating be hidden.
 */
