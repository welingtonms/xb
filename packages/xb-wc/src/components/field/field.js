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
			status: { type: String },
		};
	}

	constructor() {
		super();

		/** @type {FieldAttributes['required']} */
		this.required = false;

		/** @type {FieldAttributes['status']} */
		this.status = 'info';
	}

	/**
	 * @param {import('lit').PropertyValues<ToggleGroup>} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		this._getToggles();
		// if ( changedProperties.has( 'role' ) ) {
		// 	this._getToggles().forEach( ( toggle ) => {
		// 		this._setToggleRole( toggle );
		// 	} );
		// }

		// if ( changedProperties.has( 'disabled' ) ) {
		// 	this._getToggles().forEach( ( toggle ) => {
		// 		this._setToggleDisabled( toggle );
		// 	} );
		// }

		// if ( changedProperties.has( 'size' ) ) {
		// 	this._getToggles().forEach( ( toggle ) => {
		// 		this._setToggleSize( toggle );
		// 	} );
		// }

		// this._getToggles().forEach( ( toggle ) => {
		// 	this._setToggleChecked( toggle );
		// } );
	}

	render() {
		const { classy, when } = withClassy( {
			required: Boolean( this.required ),
			status: this.status,
		} );

		return html`<xb-stack
			paddingless=${ this.paddingless }
			borderless=${ this.borderless }
			class=${ classy(
				'field',
				{
					'-required': when( { required: true } ),
				},
				{
					'is-danger': when( { status: 'danger' } ),
				}
			) }
		>
			<xb-cluster paddingless borderless>
				${ this.label == null
					? html`<slot name="label"></slot>`
					: html`<label class="label"> ${ this.label } </label>` }

				<slot name="tooltip">
					${ this.tip == null
						? nothing
						: html`<xb-tooltip placement="right-end">
								<xb-box borderless slot="floating">${ this.tip }</xb-box>
								<xb-icon name="help"></xb-icon>
						  </xb-tooltip>` }
				</slot>
			</xb-cluster>

			<slot></slot>

			${ this.prompt == null
				? html`<slot name="prompt"></slot>`
				: html`<xb-text class="prompt" variant="caption" as="small"
						>${ this.prompt }</xb-text
				  >` }
		</xb-stack>`;
	}

	_getToggles() {
		this._defaultSlot =
			this._defaultSlot ?? this.shadowRoot.querySelector( 'slot:not([name])' );

		const batata = [
			...this._defaultSlot.assignedElements( { flatten: true } ),
		];

		// console.log( '>>', batata );
		// let el = [ ...this._defaultSlot.assignedElements() ].filter( ( item ) =>
		// 	[
		// 		'xb-text-input',
		// 		'xb-checkbox',
		// 		'xb-radio-group',
		// 		'xb-toggle-group',
		// 		'xb-select',
		// 	].includes( item.tagName.toLowerCase() )
		// );

		// el.forEach( ( e ) => {
		// 	e.classList.add( '-error' );
		// } );
	}
}

window.customElements.define( 'xb-field', Field );

/**
 * @typedef {import('../../common/prop-types').BorderlessProp} BorderlessProp
 * @typedef {import('../../common/prop-types').PaddinglessProp} PaddinglessProp
 * @typedef {import('../../common/prop-types').StatusProp} StatusProp
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
 * @property {StatusProp} [status]
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
 *
 */
