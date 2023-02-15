import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import withClassy from '@welingtonms/classy';

import XBElement from '../../common/xb-element';

import styles from './field.styles';

import '../toggle-group';
import '../text';

import '../layout/stack';
import '../layout/box';

@customElement( 'xb-field' )
export class Field extends XBElement {
	static styles = [ styles() ];

	/**
	 * Field label string.
	 * @type {FieldAttributes['label']}
	 */
	@property( { type: String } ) label;

	/**
	 * Auxiliary tooltip message.
	 * @type {FieldAttributes['tip']}
	 */
	@property( { type: String } ) tip;

	/**
	 * Auxiliary prompt to helper user about the field or the validation `status`.
	 * @type {FieldAttributes['prompt']}
	 */
	@property( { type: String } ) prompt;

	/**
	 * Is field required?
	 * @type {FieldAttributes['required']}
	 */
	@property( { type: Boolean } ) required;

	/**
	 * Field validation status.
	 * @type {FieldAttributes['status']}
	 */
	@property( { type: String } ) status;

	/** @type {HTMLSlotElement} */
	_defaultSlot;

	constructor() {
		super();

		this.required = false;

		this.status = 'info';
	}

	/**
	 * @param {import('lit').PropertyValues<ToggleGroup>} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		this._getControls();
		// if ( changedProperties.has( 'role' ) ) {
		// 	this._getControls().forEach( ( toggle ) => {
		// 		this._setToggleRole( toggle );
		// 	} );
		// }

		// if ( changedProperties.has( 'disabled' ) ) {
		// 	this._getControls().forEach( ( toggle ) => {
		// 		this._setToggleDisabled( toggle );
		// 	} );
		// }

		// if ( changedProperties.has( 'size' ) ) {
		// 	this._getControls().forEach( ( toggle ) => {
		// 		this._setToggleSize( toggle );
		// 	} );
		// }

		// this._getControls().forEach( ( toggle ) => {
		// 	this._setToggleChecked( toggle );
		// } );
	}

	render() {
		const { classy, when } = withClassy( {
			required: Boolean( this.required ),
			status: this.status,
		} );

		return html`
			<xb-stack
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
						? html`
								<slot name="label"></slot>
						  `
						: html`
								<label class="label">${ this.label }</label>
						  ` }

					<slot name="tooltip">
						${ this.tip == null
							? nothing
							: html`
									<xb-tooltip placement="right-end">
										<xb-box borderless slot="floating">${ this.tip }</xb-box>
										<xb-icon name="help"></xb-icon>
									</xb-tooltip>
							  ` }
					</slot>
				</xb-cluster>

				<slot></slot>

				${ this.prompt == null
					? html`
							<slot name="prompt"></slot>
					  `
					: html`
							<xb-text class="prompt" variant="caption" as="small">
								${ this.prompt }
							</xb-text>
					  ` }
			</xb-stack>
		`;
	}

	_getControls() {
		this._defaultSlot =
			this._defaultSlot ?? this.shadowRoot.querySelector( 'slot:not([name])' );

		const batata = [ ...this._defaultSlot.assignedElements( { flatten: true } ) ];

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

/**
 * @typedef {import('../../common/prop-types').StatusProp} StatusProp
 * @typedef {import('../../common/prop-types').HTMLTag} HTMLTag
 */

/**
 * @typedef {Object} FieldAttributes
 * @property {BorderlessProp} borderless
 * @property {PaddinglessProp} paddingless
 * @property {HTMLTag} as
 * @property {string} [label] - Label to render.
 * @property {string} [tip] - Auxiliary tooltip message.
 * @property {string} [prompt] - Auxiliary prompt to helper user about the label.
 * @property {boolean} [required] - Is field required.
 * @property {StatusProp} [status] - Validation status.
 */
