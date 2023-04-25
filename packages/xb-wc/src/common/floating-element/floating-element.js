import { property } from 'lit/decorators.js';
import { computePosition, flip, shift, offset } from '@floating-ui/dom';

import XBElement from '../xb-element';

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

	firstUpdated() {
		super.firstUpdated();

		const [ referenceSlot, floatingSlot ] = this.shadowRoot.querySelectorAll( 'slot' );

		[ this._reference ] = referenceSlot.assignedElements( { flatten: true } );
		[ this._floating ] = floatingSlot.assignedElements( { flatten: true } );
		// this._arrow = this.shadowRoot.querySelector( '.arrow' );
	}

	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'position' ) || changedProperties.has( 'placement' ) ) {
			this.reposition();
		}
	}

	get reference() {
		return this._reference;
	}

	get floating() {
		return this._floating;
	}

	get arrow() {
		return this._arrow;
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
			console.warn(
				'[popover-element]',
				'both floating and reference elements should be available',
				{ reference: this.reference, floating: this.floating }
			);

			return;
		}

		const strategy = this.position || 'fixed';
		const placement = this.placement || 'bottom-start';

		computePosition( this.reference, this.floating, {
			strategy,
			placement,
			middleware: [
				offset( 4 ),
				flip(),
				shift(),
				// arrow( { element: this.arrow() } ),
			],
		} ).then( ( { x, y, placement } ) => {
			// console.debug(
			// 	'[xb-popover]',
			// 	'requested placement at',
			// 	this.placement,
			// 	'; was placed at',
			// 	placement
			// );

			this.floating.style.setProperty( '--xb-popover-left', `${ x }px` );
			this.floating.style.setProperty( '--xb-popover-top', `${ y }px` );

			this.floating.style.setProperty(
				'--xb-popover-border-top-left-radius',
				`${ [ 'bottom-start', 'right-start' ].includes( placement ) ? 0 : 4 }px`
			);
			this.floating.style.setProperty(
				'--xb-popover-border-top-right-radius',
				`${ [ 'bottom-end', 'left-start' ].includes( placement ) ? 0 : 4 }px`
			);
			this.floating.style.setProperty(
				'--xb-popover-border-bottom-right-radius',
				`${ [ 'left-end', 'top-end' ].includes( placement ) ? 0 : 4 }px`
			);
			this.floating.style.setProperty(
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

			// const referenceHeight = this.reference.getBoundingClientRect().height;
			// const referenceWidth = this.reference.getBoundingClientRect().width;
			// const batata = {
			// 	top: referenceHeight,
			// 	right: referenceWidth,
			// 	bottom: referenceHeight,
			// 	left: referenceWidth,
			// };

			// const cebola = {
			// 	top: {
			// 		left: `calc(${ Math.floor( referenceWidth / 2 ) }px - 4px)`, // left value
			// 	},
			// 	right: {
			// 		top: `calc(${ Math.floor( referenceHeight / 2 ) }px - 4px)`, // top value
			// 	},
			// 	bottom: {
			// 		left: `calc(${ Math.floor( referenceWidth / 2 ) }px - 4px)`, // left value
			// 	},
			// 	left: {
			// 		top: `calc(${ Math.floor( referenceHeight / 2 ) }px - 4px)`, // top value
			// 	},
			// };

			// console.log(
			// 	staticSide,
			// 	`calc(-4px + ${ batata[ staticSide ] }px)`,
			// 	cebola[ staticSide ]
			// );

			// Object.assign( this.arrow().style, {
			// 	left: arrowX != null ? `${ arrowX }px` : '',
			// 	top: arrowY != null ? `${ arrowY }px` : '',
			// 	right: '',
			// 	bottom: '',
			// 	...cebola[ staticSide ],
			// 	[ staticSide ]: `calc(2px + ${ batata[ staticSide ] }px)`,
			// } );
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
