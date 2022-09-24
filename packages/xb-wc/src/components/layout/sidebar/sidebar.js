import { LitElement, html } from 'lit';
import withClassy from '@welingtonms/classy';

import { sided } from '../../../common/prop-toolset';
import { converterDirectionFromAttribute } from '../layout.helpers';
import styles from './sidebar.styles';

export class SidebarLayout extends LitElement {
	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * Where the side content should be positioned.
			 * @type {SidePosition}
			 */
			sidePosition: {
				attribute: 'side-position',
			},

			/**
			 * Determine borders to be supressed.
			 * @type {import('../../../common/prop-types').BorderlessProp}
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
		this.sidePosition = 'left';
	}

	render() {
		const { when, classy } = withClassy( { sidePosition: this.sidePosition } );

		// console.log(
		// 	'border:',
		// 	this.borderless,
		// 	'padding:',
		// 	this.paddingless,
		// 	'|',
		// 	classy(
		// 		'xb-sidebar',
		// 		sided( 'border', this.borderless ),
		// 		sided( 'padding', this.paddingless )
		// 	)
		// );

		return html`
			<div
				class=${ classy(
					'sidebar',
					{
						'-side-on-the-left': when( { sidePosition: 'left' } ),
						'-side-on-the-right': when( { sidePosition: 'right' } ),
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

window.customElements.define( 'xb-sidebar', SidebarLayout );

// @ts-ignore
// declare global {
//   interface HTMLElementTagNameMap {
//     "xb-sidebar": SidebarLayout;
//   }
// }

/**
 * @typedef {'left' | 'right'} SidePosition
 */
