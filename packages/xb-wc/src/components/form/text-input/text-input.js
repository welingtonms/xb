import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import withClassy from '@welingtonms/classy';

import { convertDirectionFromAttribute } from '../../layout/layout.helpers';
import { sided } from '../../../common/prop-toolset';
import XBElement from '../../../common/xb-element';
import styles from './text-input.styles';

@customElement( 'xb-text-input' )
export class TextInput extends XBElement {
	static styles = [ styles() ];

	/**
	 * Input type.
	 * @type {TextInputAttributes['type']}
	 */
	@property( { type: String } ) type;

	/**
	 * Should the button be disabled.
	 * @type {TextInputAttributes['disabled']}
	 */
	@property( { type: Boolean, reflect: true } ) disabled;

	/**
	 * Should the button be clearable.
	 * @type {TextInputAttributes['clearable']}
	 */
	@property( { type: Boolean, reflect: true } ) clearable;

	/**
	 * Button size.
	 * @type {TextInputAttributes['size']}
	 */
	@property( { type: String } ) size;

	/**
	 * Input value.
	 * @type {TextInputAttributes['value']}
	 */
	@property( { type: String, reflect: true } ) value;

	/**
	 * Placeholder value.
	 * @type {TextInputAttributes['placeholder']}
	 */
	@property( { type: String, reflect: true } ) placeholder;

	/**
	 * Determine borders to be supressed.
	 * @type {TextInputAttributes['borderless']}
	 */
	@property( { converter: { fromAttribute: convertDirectionFromAttribute } } ) borderless;

	/**
	 * Determine paddings to be supressed.
	 * @type {TextInputAttributes['paddingless']}
	 */
	@property( { converter: { fromAttribute: convertDirectionFromAttribute } } )
	paddingless;

	constructor() {
		super();

		this.type = 'text';

		this.clearable = false;

		this.disabled = false;

		this.size = 'small';

		this.value;

		this.placeholder = '';

		this.borderless = 'none';

		this.paddingless = 'none';
	}

	focus() {
		this.input?.focus();
	}

	clear() {
		const input = this.input;

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
	get input() {
		return this.shadowRoot.querySelector( 'input' );
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
