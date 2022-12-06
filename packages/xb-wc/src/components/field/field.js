import { html, nothing } from 'lit';
import withClassy from '@welingtonms/classy';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import XBElement from '../../common/xb-element';

import styles from './field.styles';

import '../toggle-group';
import '../text';

import '../layout/stack';
import '../layout/box';

export class Field extends XBElement {
	static styles = [ styles() ];

	/** @type {HTMLSlotElement} */
	_defaultSlot;

	static get properties() {
		return {
			label: { type: String },
			tip: { type: String },
			prompt: { type: String },
			required: { type: Boolean },
		};
	}

	constructor() {
		super();

		/** @type {FieldAttributes['required']} */
		this.required = false;
	}

	render() {
		const { classy, when } = withClassy( {
			required: Boolean( this.required ),
		} );

		return html`<xb-stack
			paddingless=${ this.paddingless }
			borderless==${ this.borderless }
			class=${ classy( 'field', {
				'-required': when( { required: true } ),
			} ) }
		>

		<xb-cluster paddingless borderless>
			<label class="label">
				<slot name="label">
					${ this.label }
				</slot>
			</label>

			<slot name="tooltip">
				${
					this.tip == null
						? nothing
						: html`<xb-tooltip placement="right-end">
								<xb-box borderless slot="floating">${ this.tip }</xb-box>
								<xb-icon name="help"></xb-icon>
						  </xb-tooltip>`
				}
			</slot>
		</xb-cluster>

		<slot></slot>

		<slot name="prompt">
			${
				this.prompt == null
					? nothing
					: html`<xb-text variant="caption" as="small"
							>${ this.prompt }</xb-text
					  >`
			}
		</slot>
		</xb-stack>`;
	}
}

window.customElements.define( 'xb-field', Field );

/**
 * @typedef {import('../../common/prop-types').BorderlessProp} BorderlessProp
 * @typedef {import('../../common/prop-types').PaddinglessProp} PaddinglessProp
 * @typedef {import('../../common/prop-types').HTMLTag} HTMLTag
 */

/**
 * @typedef {Object} FieldAttributes
 * @property {BorderlessProp} borderless
 * @property {PaddinglessProp} paddingless
 * @property {HTMLTag} as
 * @property {string} tip
 * @property {boolean} [required] - Label to render.
 * @property {string} [prompt] - Auxiliary prompt to helper user about the label.
 */

/**
 * @typedef {Object} FieldFeedback
 * @property {string} [message] - feedback message
 * @property {IconProp} [icon] - feedback icon
 */

/**
 * @typedef {Object} CustomFieldProps
 * @property {React.ReactNode} label - Label to render.
 * @property {FieldVariant} [variant] - Style variant to apply.
 * @property {boolean} [required] - Label to render.
 * @property {string} [prompt] - Auxiliary prompt to helper user about the label.
 * @property {React.ReactNode} [trailing] - Element to be rendered in the leading area of this button.
 * @property {FieldFeedback} [feedback] - Feedback for this label
 */
