import { html } from 'lit';
import withClassy from '@welingtonms/classy';

import XBElement from '../../common/xb-element';
import styles from './popover.styles';

export class Popover extends XBElement {
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
		};
	}

	constructor() {
		super();

		/** @type {PopoverAttributes['position']} */
		this.position = 'absolute';

		/** @type {PopoverAttributes['placement']} */
		this.placement = 'top-end';
	}

	updated() {
		const { when, classy } = withClassy( { position: this.position } );

		this.classList.add(
			'popover',
			classy( {
				'-absolute': when( { position: 'absolute' } ),
				'-fixed': when( { position: 'fixed' } ),
			} )
		);
	}

	render() {
		return html`<slot></slot>`;
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
 */
