import { LitElement, html } from 'lit';
import withClassy from '@welingtonms/classy';

import { sided } from '../../common/prop-toolset';
import { converterDirectionFromAttribute } from '../layout/layout.helpers';
import XBElement from '../../common/xb-element';
import styles from './button.styles';

export class Button extends XBElement {
	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * Determine borders to be supressed.
			 * @type {import('../../common/prop-types').BorderlessProp} borderless
			 */
			borderless: {
				// type: String | Boolean,
				converter: {
					fromAttribute: converterDirectionFromAttribute,
				},
			},

			/**
			 * Determine paddings to be supressed.
			 * @type {import('../../../common/prop-types').PaddinglessProp}
			 */
			paddingless: {
				// type: String | Boolean,
				converter: {
					fromAttribute: converterDirectionFromAttribute,
				},
			},

			/**
			 * Aria role
			 */
			role: {
				reflect: true,
				attribute: false,
			},

			/**
			 * Should the button be disabled.
			 * @type {Boolean}
			 */
			disabled: { type: Boolean, reflect: true },

			/**
			 * Button emphasis variant.
			 * @type {ButtonEmphasis}
			 */
			emphasis: { type: String },

			/**
			 * Button size.
			 * @type {ButtonSize}
			 */
			size: { type: String },
		};
	}

	constructor() {
		super();

		this.role = 'button';
		this.emphasis = 'ghost';
		this.size = 'small';
		this.borderless = 'none';
		this.paddingless = 'none';
		this.disabled = false;
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'role', 'button' );
	}

	render() {
		const { classy, when } = withClassy( {
			emphasis: this.emphasis,
			size: this.size,
		} );

		return html`
			<button
				class=${ classy(
					'button',
					{
						'-flat': when( { emphasis: 'flat' } ),
						'-ghost': when( { emphasis: 'ghost' } ),
						'-text': when( { emphasis: 'text' } ),
					},
					{
						'-small': when( { size: 'small' } ),
						'-medium': when( { size: 'medium' } ),
						'-large': when( { size: 'large' } ),
					},
					sided( 'padding', this.paddingless ),
					sided( 'border', this.borderless )
				) }
				?disabled="${ this.disabled }"
				role="${ this.role }"
				aria-disabled=${ this.disabled ? 'true' : 'false' }
			>
				<slot name="leading"></slot>
				<slot></slot>
				<slot name="trailing"></slot>
			</button>
		`;
	}
}

window.customElements.define( 'xb-button', Button );

// @ts-ignore
// declare global {
//   interface HTMLElementTagNameMap {
//     "xb-button": Button;
//   }
// }

/**
 * @typedef {('text' | 'ghost' | 'flat')} ButtonEmphasis
 * @typedef {('small' | 'medium' | 'large')} ButtonSize
 */
