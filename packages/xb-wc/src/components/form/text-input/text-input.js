import { html, nothing } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import withClassy from '@welingtonms/classy';

import { convertDirectionFromAttribute } from '../../layout/layout.helpers';
import { sided } from '../../../common/prop-toolset';
import XBElement from '../../../common/xb-element';
import styles from './text-input.styles';

export class TextInput extends XBElement {
	input = createRef();

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
			 * Should the button be clearable.
			 * @type {TextInputAttributes['clearable']}
			 */
			clearable: { type: Boolean, reflect: true },

			/**
			 * Button size.
			 * @type {TextInputAttributes['size']}
			 */
			size: { type: String },

			/**
			 * Input value.
			 * @type {TextInputAttributes['value']}
			 */
			value: {
				type: String,
				reflect: true,
			},

			/**
			 * Placeholder value.
			 * @type {TextInputAttributes['placeholder']}
			 */
			placeholder: {
				type: String,
				reflect: true,
			},

			/**
			 * Determine borders to be supressed.
			 * @type {TextInputAttributes['borderless']}
			 */
			borderless: {
				converter: {
					fromAttribute: convertDirectionFromAttribute,
				},
			},

			/**
			 * Determine paddings to be supressed.
			 * @type {TextInputAttributes['paddingless']}
			 */
			paddingless: {
				converter: {
					fromAttribute: convertDirectionFromAttribute,
				},
			},
		};
	}

	constructor() {
		super();

		/** @type {TextInputAttributes['type']} */
		this.type = 'text';

		/** @type {TextInputAttributes['clearable']} */
		this.clearable = false;

		/** @type {TextInputAttributes['disabled']} */
		this.disabled = false;

		/** @type {TextInputAttributes['size']} */
		this.size = 'small';

		/** @type {TextInputAttributes['value']} */
		this.value;

		/** @type {TextInputAttributes['placeholder']} */
		this.placeholder = '';

		/** @type {TextInputAttributes['borderless']} */
		this.borderless = 'none';

		/** @type {TextInputAttributes['paddingless']} */
		this.paddingless = 'none';
	}

	focus() {
		this._getInput()?.focus();
	}

	clear() {
		const input = this._getInput();

		this.value = '';
		input.value = '';
	}

	render() {
		const { when, classy } = withClassy( { size: this.size } );

		return html`
			<div
				class=${ classy(
					'text-input',
					{
						'-extra-small': when( { size: 'extra-small' } ),
						'-small': when( { size: 'small' } ),
						'-medium': when( { size: 'medium' } ),
						'-large': when( { size: 'large' } ),
					},
					{
						'is-disabled': this.disabled,
					},
					sided( 'padding', this.paddingless ),
					sided( 'border', this.borderless )
				) }
			>
				<slot name="leading"></slot>
				<input
					${ ref( this.input ) }
					type="${ this.type }"
					?disabled="${ this.disabled }"
					value="${ ifDefined( this.value ) }"
					placeholder="${ this.placeholder }"
					@change=${ this._handleChange }
					@input=${ this._handleInput }
				/>

				${ this.clearable
					? html`
							<xb-button
								class=${ classy( 'clear', {
									/**
									 * we use this approach to avoid the layout shift
									 * when showing/hiding the clear button as the users
									 * changes the input value.
									 */
									'is-visible': this.value,
								} ) }
								paddingless
								emphasis="text"
								size="extra-small"
								@click=${ this._handleClear }
							>
								<xb-icon name="close" size="16"></xb-icon>
							</xb-button>
					  `
					: nothing }

				<slot name="trailing"></slot>
			</div>
		`;
	}

	/**
	 * @returns {HTMLInputElement}
	 */
	_getInput() {
		return this.input.value;
	}

	_handleChange( e ) {
		this.value = e.target.value;

		this.emit( 'xb-change', { detail: { value: e.target.value } } );
	}

	_handleInput( e ) {
		this.value = e.target.value;

		this.emit( 'xb-input', { detail: { value: e.target.value } } );
	}

	_handleClear( e ) {
		e.stopPropagation();

		this.clear();

		this.emit( 'xb-clear' );

		this.focus();
	}
}

window.customElements.define( 'xb-text-input', TextInput );

/**
 * @typedef {('text' | 'password' | 'number' )} TextInputType
 * @typedef {import('../../../styles/size.styles').ElementSize} TextInputSize
 * @typedef {import('../../../common/prop-types').BorderlessProp} BorderlessProp
 * @typedef {import('../../../common/prop-types').PaddinglessProp} PaddinglessProp
 */

/**
 * @typedef {Object} TextInputAttributes
 * @property {TextInputType} type
 * @property {boolean} disabled
 * @property {boolean} clearable
 * @property {ButtonSize} size
 * @property {string} value
 * @property {string} placeholder
 * @property {BorderlessProp} borderless
 * @property {PaddinglessProp} paddingless
 */
