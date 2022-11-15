import { html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import withClassy from '@welingtonms/classy';

import { sided } from '../../common/prop-toolset';
import { converterDirectionFromAttribute } from '../layout/layout.helpers';
import XBElement from '../../common/xb-element';
import styles from './button.styles';

export class Button extends XBElement {
	button = createRef();

	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * Determine borders to be supressed.
			 * @type {ButtonAttributes['borderless']}
			 */
			borderless: {
				converter: {
					fromAttribute: converterDirectionFromAttribute,
				},
			},

			/**
			 * Determine paddings to be supressed.
			 * @type {ButtonAttributes['paddingless']}
			 */
			paddingless: {
				converter: {
					fromAttribute: converterDirectionFromAttribute,
				},
			},

			/**
			 * Aria role
			 * @type {ButtonAttributes['role']}
			 */
			role: {
				reflect: true,
				attribute: false,
			},

			/**
			 * Should the button be disabled.
			 * @type {ButtonAttributes['disabled']}
			 */
			disabled: { type: Boolean, reflect: true },

			/**
			 * Button emphasis variant.
			 * @type {ButtonAttributes['emphasis']}
			 */
			emphasis: { type: String },

			/**
			 * Button size.
			 * @type {ButtonAttributes['size']}
			 */
			size: { type: String },
		};
	}

	constructor() {
		super();

		this.role = 'button';

		/** @type {ButtonAttributes['emphasis']} */
		this.emphasis = 'ghost';

		/** @type {ButtonAttributes['size']} */
		this.size = 'small';

		/** @type {ButtonAttributes['borderless']} */
		this.borderless = 'none';

		/** @type {ButtonAttributes['paddingless']} */
		this.paddingless = 'none';

		/** @type {ButtonAttributes['disabled']} */
		this.disabled = false;
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'role', 'button' );
	}

	focus() {
		const button = this._getButton();

		button.focus();
	}

	render() {
		const { classy, when } = withClassy( {
			emphasis: this.emphasis,
			size: this.size,
		} );

		return html`
			<button
				${ ref( this.button ) }
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

	/**
	 * @returns {HTMLInputElement}
	 */
	_getButton() {
		return this.button.value;
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
 * @typedef {import('../../styles/size.styles').ElementSize} ButtonSize
 * @typedef {import('../../common/prop-types').BorderlessProp} BorderlessProp
 * @typedef {import('../../common/prop-types').PaddinglessProp} PaddinglessProp
 */

/**
 * @typedef {Object} ButtonAttributes
 * @property {BorderlessProp} borderless
 * @property {PaddinglessProp} paddingless
 * @property {string} role
 * @property {boolean} disabled
 * @property {ButtonEmphasis} emphasis
 * @property {ButtonSize} size
 */
