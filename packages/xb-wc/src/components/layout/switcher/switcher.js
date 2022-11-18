import { LitElement, html } from 'lit';
import withClassy from '@welingtonms/classy';

import { sided } from '../../../common/prop-toolset';
import { converterDirectionFromAttribute } from '../layout.helpers';
import styles from './switcher.styles';

export class SwitcherLayout extends LitElement {
	static styles = [ styles() ];

	static get properties() {
		return {
			limit: {
				type: Number,
			},
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
		this.limit = 4;
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
		// 		'xb-switcher',
		// 		sided( 'border', this.borderless ),
		// 		sided( 'padding', this.paddingless )
		// 	)
		// );

		return html`
			<style>
				::slotted( *:nth-last-child( n + ${ this.limit } ) ) {
					flex-basis: 100%;
				}

				::slotted( *:nth-last-child( n + ${ this.limit } ) ~ * ) {
					flex-basis: 100%;
				}
			</style>
			<div
				class=${ classy(
					'switcher',
					sided( 'border', this.borderless ),
					sided( 'padding', this.paddingless )
				) }
			>
				<slot></slot>
			</div>
		`;
	}
}

window.customElements.define( 'xb-switcher', SwitcherLayout );

// @ts-ignore
// declare global {
//   interface HTMLElementTagNameMap {
//     "xb-switcher": SwitcherLayout;
//   }
// }
