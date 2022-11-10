import { html } from 'lit';
import withClassy from '@welingtonms/classy';

import XBElement from '../../../common/xb-element';
import styles from './text-input.styles';

export class TextInput extends XBElement {
	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * Input type.
			 * @type {TextInputAttributes['type']}
			 */
			type: {
				type: String,
			},

			/**
			 * Should the button be disabled.
			 * @type {TextInputAttributes['disabled']}
			 */
			disabled: { type: Boolean, reflect: true },

			/**
			 * Button size.
			 * @type {TextInputAttributes['size']}
			 */
			size: { type: String },
		};
	}

	constructor() {
		super();

		/** @type {TextInputAttributes['type']} */
		this.type = 'text';

		/** @type {TextInputAttributes['disabled']} */
		this.disabled = false;

		/** @type {TextInputAttributes['size']} */
		this.size = 'small';
	}

	render() {
		const { when, classy } = withClassy( { size: this.size } );

		return html`
			<div
				class=${ classy( 'text-input', {
					'-small': when( { size: 'small' } ),
					'-medium': when( { size: 'medium' } ),
					'-large': when( { size: 'large' } ),
				} ) }
			>
				<slot name="leading"></slot>
				<input
					type="${ this.type }"
					value="The quick brown fox jumps over the lazy dog"
					?disabled="${ this.disabled }"
				/>
				<slot name="trailing"></slot>
			</div>
		`;
	}
}

window.customElements.define( 'xb-text-input', TextInput );

/**
 * @typedef {('text' | 'password' | 'number' )} TextInputType
 * @typedef {import('../../../styles/size.styles').ElementSize} TextInputSize
 */

/**
 * @typedef {Object} TextInputAttributes
 * @property {TextInputType} type
 * @property {boolean} disabled
 * @property {ButtonSize} size
 */