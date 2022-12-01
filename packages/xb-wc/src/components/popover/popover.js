import { html } from 'lit';
import { computePosition, flip, shift, offset } from '@floating-ui/dom';
import withClassy from '@welingtonms/classy';

import XBElement from '../../common/xb-element';
import styles from './popover.styles';

export class Popover extends XBElement {
	/** @type {HTMLElement | null} */
	_reference = null;

	/** @type {HTMLElement | null} */
	_floating = null;

	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * Popover positioning strategy.
			 * @type {PopoverAttributes['position']}
			 */
			position: { type: String },

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
		this.position = 'absolute';

		/** @type {PopoverAttributes['placement']} */
		this.placement = 'top-end';

		/** @type {PopoverAttributes['hidden']} */
		this.hidden = true;
	}

	firstUpdated() {
		const [ referenceSlot, floatingSlot ] =
			this.shadowRoot.querySelectorAll( 'slot' );

		[ this._reference ] = referenceSlot.assignedElements( { flatten: true } );
		[ this._floating ] = floatingSlot.assignedElements( { flatten: true } );
	}

	updated() {
		super.updated();

		const { when, classy } = withClassy( { position: this.position } );

		this.classList.add(
			'popover',
			classy( {
				'-absolute': when( { position: 'absolute' } ),
				'-fixed': when( { position: 'fixed' } ),
			} )
		);

		this._updateFloationPosition();
	}

	render() {
		return html`
			<slot name="reference"></slot>
			<slot
				name="floating"
				@slotchange=${ this._updateFloationPosition }
			></slot>
		`;
	}

	_updateFloationPosition() {
		const reference = this._getReference();
		const floating = this._getFloating();

		if ( floating == null || reference == null ) {
			console.warn(
				'[popover-host]',
				'both floating and reference elements should be available',
				{ reference, floating }
			);

			return;
		}

		const strategy = floating.position || 'fixed';
		const placement = floating.placement || 'bottom-start';

		computePosition( reference, floating, {
			strategy,
			placement,
			middleware: [ offset( 4 ), flip(), shift() ],
		} ).then( ( { x, y } ) => {
			floating.style.setProperty( '--xb-popover-left', `${ x }px` );
			floating.style.setProperty( '--xb-popover-top', `${ y }px` );
		} );
	}

	_getReference() {
		return this._reference;
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
