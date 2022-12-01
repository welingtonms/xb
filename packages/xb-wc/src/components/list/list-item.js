import { html, LitElement } from 'lit';
import withClassy from '@welingtonms/classy';

import XBElement from '../../common/xb-element';

import styles from './list.styles';
import '../layout/box';

export class ListItem extends LitElement {
	static get properties() {
		return {
			/**
			 * Which HTML tag should be used to render this element..
			 * @type {HTMLTag}
			 * @public
			 */
			as: { type: String },

			/**
			 * Determine borders to be supressed.
			 * @type {ListItemAttributes['borderless']}
			 */
			borderless: {},

			/**
			 * Determine paddings to be supressed.
			 * @type {ListItemAttributes['hoverable']} paddingless
			 */
			hoverable: {
				type: Boolean,
			},

			/**
			 * Determine paddings to be supressed.
			 * @type {ListItemAttributes['striped']} paddingless
			 */
			striped: {
				type: Boolean,
			},
		};
	}

	constructor() {
		super();

		/** @type {ListItemAttributes['as']} */
		this.as = 'div';

		/** @type {ListItemAttributes['borderless']} */
		this.borderless = 'none';

		/** @type {ListItemAttributes['hoverable']} */
		this.hoverable = false;

		/** @type {ListItemAttributes['striped']} */
		this.striped = false;
	}

	render() {
		const { classy } = withClassy( {} );

		return html`
			<xb-box
				as="${ this.as }"
				class=${ classy( 'list-item', {
					'-hoverable': this.hoverable,
					'-striped': this.striped,
				} ) }
				borderless=${ this.borderless }
			>
				<slot></slot>
			</xb-box>
		`;
	}
}

window.customElements.define( 'xb-list-item', ListItem );

/**
 * @typedef {import('../../common/prop-types').BorderlessProp} BorderlessProp
 * @typedef {import('../../common/prop-types').HTMLTag} HTMLTag
 */

/**
 * @typedef {Object} ListItemAttributes
 * @property {HTMLTag} as - List tag to render, defaults to 'section'.
 * @property {BorderlessProp} borderless - Should list items be borderless
 * @property {boolean} hoverable - Should the list item be hoverable?
 * @property {boolean} striped - Should the list be striped?
 */
