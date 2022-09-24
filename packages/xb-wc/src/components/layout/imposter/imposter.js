import { LitElement, html } from 'lit';
import withClassy from '@welingtonms/classy';

import { sided } from '../../../common/prop-toolset';
import { converterDirectionFromAttribute } from '../layout.helpers';
import styles from './imposter.styles';

export class ClusterLayout extends LitElement {
	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * imposter positioning variant.
			 * @type {ImposterVariant}
			 */
			variant: { type: String },

			/**
			 * Should the imposter breakout of the page content overflow.
			 * @type {Boolean}
			 */
			breakout: { type: Boolean },

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
		this.variant = 'absolute';
		this.breakout = false;
	}

	render() {
		const { when, classy } = withClassy( {
			variant: this.variant,
			breakout: this.breakout,
		} );

		// console.log(
		// 	'border:',
		// 	this.borderless,
		// 	'padding:',
		// 	this.paddingless,
		// 	'|',
		// 	classy(
		// 		'xb-imposter',
		// 		sided( 'border', this.borderless ),
		// 		sided( 'padding', this.paddingless )
		// 	)
		// );

		return html`
			<div
				class=${ classy(
					'imposter',
					{
						'-absolute': when( { variant: 'absolute' } ),
						'-fixed': when( { variant: 'fixed' } ),
						'-breakout': when( { breakout: true } ),
					},
					sided( 'border', this.borderless ),
					sided( 'padding', this.paddingless )
				) }
			>
				<slot></slot>
			</div>
		`;
	}
}

window.customElements.define( 'xb-imposter', ClusterLayout );

// @ts-ignore
// declare global {
//   interface HTMLElementTagNameMap {
//     "xb-imposter": ClusterLayout;
//   }
// }

/**
 * @typedef {('absolute' | 'fixed')} ImposterVariant
 */
