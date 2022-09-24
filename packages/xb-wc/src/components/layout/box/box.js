import { LitElement, html } from 'lit';
import withClassy from '@welingtonms/classy';

import { sided } from '../../../common/prop-toolset';
import { converterDirectionFromAttribute } from '../layout.helpers';
import styles from './box.styles';

export class BoxLayout extends LitElement {
	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * Tag to render.
			 * @type {HTMLElement}
			 */
			as: { type: String },

			/**
			 * Determine borders to be supressed.
			 * @type {import('../../../common/prop-types').BorderlessProp} borderless
			 */
			borderless: {
				// type: String | Boolean,
				converter: {
					fromAttribute: converterDirectionFromAttribute,
				},
			},

			/**
			 * Determine paddings to be supressed.
			 * @type {import('../../../common/prop-types').PaddinglessProp} paddingless
			 */
			paddingless: {
				// type: String | Boolean,
				converter: {
					fromAttribute: converterDirectionFromAttribute,
				},
			},
		};
	}

	constructor() {
		super();

		this.as = 'div';
		this.borderless = 'none';
		this.paddingless = 'none';
	}

	render() {
		const { classy } = withClassy( {} );

		// console.log(
		// 	'border:',
		// 	this.borderless,
		// 	'padding:',
		// 	this.paddingless,
		// 	'|',
		// 	classy(
		// 		'xb-box',
		// 		sided( 'border', this.borderless ),
		// 		sided( 'padding', this.paddingless )
		// 	)
		// );

		return html`
			<div
				class=${ classy(
					'box',
					sided( 'border', this.borderless ),
					sided( 'padding', this.paddingless )
				) }
			>
				<slot name="leading"></slot>
				<slot></slot>
				<slot name="trailing"></slot>
			</div>
		`;
	}
}

window.customElements.define( 'xb-box', BoxLayout );

// @ts-ignore
// declare global {
//   interface HTMLElementTagNameMap {
//     "xb-box": BoxLayout;
//   }
// }
