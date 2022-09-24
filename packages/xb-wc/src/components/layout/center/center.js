import { LitElement, html } from 'lit';
import withClassy from '@welingtonms/classy';

import { sided } from '../../../common/prop-toolset';
import { converterDirectionFromAttribute } from '../layout.helpers';
import styles from './center.styles';

export class CenterLayout extends LitElement {
	static styles = [ styles() ];

	static get properties() {
		return {
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

		this.borderless = 'none';
		this.paddingless = 'none';
	}

	render() {
		const { classy } = withClassy( {} );

		console.log(
			'border:',
			this.borderless,
			'padding:',
			this.paddingless,
			'|',
			classy(
				'xb-box',
				sided( 'border', this.borderless ),
				sided( 'padding', this.paddingless )
			)
		);

		return html`
			<div
				class=${ classy(
					'center',
					sided( 'border', this.borderless ),
					sided( 'padding', this.paddingless )
				) }
			>
				<slot></slot>
			</div>
		`;
	}
}

window.customElements.define( 'xb-center', CenterLayout );

// @ts-ignore
// declare global {
//   interface HTMLElementTagNameMap {
//     "xb-center": CenterLayout;
//   }
// }
