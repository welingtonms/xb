import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import withClassy from '@welingtonms/classy';

import XBElement from '../../common/xb-element';

import styles from './list-item.styles';
import '../layout/box';

@customElement( 'xb-list-item' )
export class ListItem extends XBElement {
	static styles = [ styles() ];

	/**
	 * Which HTML tag should be used to render this element..
	 * @type {HTMLTag}
	 * @public
	 */
	@property( { type: String } ) as;

	/**
	 * Determine borders to be supressed.
	 * @type {ListItemAttributes['borderless']}
	 */
	@property( {} ) borderless;

	/**
	 * Determine paddings to be supressed.
	 * @type {ListItemAttributes['hoverable']} paddingless
	 */
	@property( { type: Boolean } ) hoverable;

	/**
	 * Determine paddings to be supressed.
	 * @type {ListItemAttributes['striped']} paddingless
	 */
	@property( { type: Boolean } ) striped;

	constructor() {
		super();

		this.as = 'div';

		this.borderless = 'none';

		this.hoverable = false;

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
