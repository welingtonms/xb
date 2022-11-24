import { html } from 'lit/static-html.js';
import withClassy from '@welingtonms/classy';

import { converterDirectionFromAttribute } from '../layout.helpers';
import { sided } from '../../../common/prop-toolset';
import PolymorphicElementMixin from '../../../mixins/polymorphic';
import styles from './box.styles';
import XBElement from '../../../common/xb-element';

/**
 * @class
 * @mixes PolymorphicElementMixin
 */
export class BoxLayout extends PolymorphicElementMixin( XBElement ) {
	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * Determine borders to be supressed.
			 * @type {BoxAttributes['borderless']}
			 */
			borderless: {
				converter: {
					fromAttribute: converterDirectionFromAttribute,
				},
			},

			/**
			 * Determine paddings to be supressed.
			 * @type {BoxAttributes['paddingless']}
			 */
			paddingless: {
				converter: {
					fromAttribute: converterDirectionFromAttribute,
				},
			},
		};
	}

	constructor() {
		super();

		/** @type {BoxAttributes['as']} */
		this.as = 'div';

		/** @type {BoxAttributes['borderless']} */
		this.borderless = 'none';

		/** @type {BoxAttributes['paddingless']} */
		this.paddingless = 'none';
	}

	render() {
		const { classy } = withClassy( {} );
		const tag = this.getTag();

		return html`
			<${ tag }
				class=${ classy(
					'box',
					sided( 'border', this.borderless ),
					sided( 'padding', this.paddingless )
				) }
			>
				<slot name="leading"></slot>
				<slot></slot>
				<slot name="trailing"></slot>
			</${ tag }>
		`;
	}
}

window.customElements.define( 'xb-box', BoxLayout );

/**
 * @typedef {import('../../../common/prop-types').BorderlessProp} BorderlessProp
 * @typedef {import('../../../common/prop-types').PaddinglessProp} PaddinglessProp
 * @typedef {import('../../../common/prop-types').HTMLTag} HTMLTag
 */

/**
 * @typedef {Object} BoxAttributes
 * @property {BorderlessProp} borderless
 * @property {PaddinglessProp} paddingless
 * @property {HTMLTag} as
 */
