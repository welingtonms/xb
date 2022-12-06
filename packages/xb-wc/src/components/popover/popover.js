import { html } from 'lit';
import { computePosition, flip, shift, offset, arrow } from '@floating-ui/dom';

import XBElement from '../../common/xb-element';
import styles from './popover.styles';

import '../resize-observer';

export class Popover extends XBElement {
	/** @type {HTMLElement | null} */
	_anchor = null;

	/** @type {HTMLElement | null} */
	_floating = null;

	/** @type {HTMLElement | null} */
	_arrow = null;

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
		this._arrow = this.shadowRoot.querySelector( '.arrow' );
	}

	update() {
		super.update();

		this.reposition();
	}

	render() {
		return html`
			<xb-resize-observer type="window" @xb-resize=${ this._handleResize }>
				<slot name="anchor"></slot>
				<slot name="floating" @slotchange=${ this.reposition }></slot>
				<!-- <span class="arrow"></span> -->
			</xb-resize-observer>
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

		const strategy = this.position || 'fixed';
		const placement = this.placement || 'bottom-start';

		computePosition( anchor, floating, {
			strategy,
			placement,
			middleware: [
				offset( 4 ),
				flip(),
				shift(),
				// arrow( { element: this._getArrow() } ),
			],
		} ).then( ( { x, y, placement } ) => {
			console.debug(
				'[xb-popover]',
				'requested placement at',
				this.placement,
				'; was placed at',
				placement
			);

			// this.dataset.placedAt = placement;

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

			// Accessing the data
			// const { x: arrowX, y: arrowY } = arrow;

			// const staticSide = {
			// 	top: 'bottom',
			// 	right: 'left',
			// 	bottom: 'top',
			// 	left: 'right',
			// }[ placement.split( '-' )[ 0 ] ];

			// const anchorHeight = this._getAnchor().getBoundingClientRect().height;
			// const anchorWidth = this._getAnchor().getBoundingClientRect().width;
			// const batata = {
			// 	top: anchorHeight,
			// 	right: anchorWidth,
			// 	bottom: anchorHeight,
			// 	left: anchorWidth,
			// };

			// const cebola = {
			// 	top: {
			// 		left: `calc(${ Math.floor( anchorWidth / 2 ) }px - 4px)`, // left value
			// 	},
			// 	right: {
			// 		top: `calc(${ Math.floor( anchorHeight / 2 ) }px - 4px)`, // top value
			// 	},
			// 	bottom: {
			// 		left: `calc(${ Math.floor( anchorWidth / 2 ) }px - 4px)`, // left value
			// 	},
			// 	left: {
			// 		top: `calc(${ Math.floor( anchorHeight / 2 ) }px - 4px)`, // top value
			// 	},
			// };

			// console.log(
			// 	staticSide,
			// 	`calc(-4px + ${ batata[ staticSide ] }px)`,
			// 	cebola[ staticSide ]
			// );

			// Object.assign( this._getArrow().style, {
			// 	left: arrowX != null ? `${ arrowX }px` : '',
			// 	top: arrowY != null ? `${ arrowY }px` : '',
			// 	right: '',
			// 	bottom: '',
			// 	...cebola[ staticSide ],
			// 	[ staticSide ]: `calc(2px + ${ batata[ staticSide ] }px)`,
			// } );
		} );
	}

	_getAnchor() {
		return this._anchor;
	}

	_getFloating() {
		return this._floating;
	}

	_getArrow() {
		return this._arrow;
	}

	_handleResize() {
		this.reposition();
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
