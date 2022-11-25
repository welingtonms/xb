import { createRef, ref } from 'lit/directives/ref.js';
import { html } from 'lit/static-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import withClassy from '@welingtonms/classy';

import { converterDirectionFromAttribute } from '../layout/layout.helpers';
import { sided } from '../../common/prop-toolset';
import PolymorphicElementMixin from '../../mixins/polymorphic';
import styles from './button.styles';
import XBElement from '../../common/xb-element';

/**
 * @class
 * @mixes PolymorphicElementMixin
 */
export class Button extends PolymorphicElementMixin( XBElement ) {
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

			/**
			 * The type of button. When the type is `submit`, the button will submit the surrounding form. Note that the default
			 * value is `button` instead of `submit`, which is opposite of how native `<button>` elements behave.
			 * @type {ButtonAttributes['type']}
			 */
			type: {
				type: String,
			},

			/**
			 * When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`.
			 * @type {ButtonAttributes['href']
			 */
			href: {
				type: String,
			},

			/**
			 * Tells the browser where to open the link. Only used when `href` is set.
			 * @type {ButtonAttributes['target']}
			 * */
			target: {
				type: String,
			},
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

		/** @type {ButtonAttributes['as']} */
		this.as = 'button';

		/** @type {ButtonAttributes['type']} */
		this.type = 'button';

		/** @type {ButtonAttributes['target']} */
		this.target = '_blank';
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

		const isLink = this._isLink();

		return html`
			<${ this.tag }
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
					{
						'is-disabled': this.disabled,
					},
					sided( 'padding', this.paddingless ),
					sided( 'border', this.borderless )
				) }
				?disabled=${ ifDefined( isLink ? undefined : this.disabled ) }
				aria-disabled=${ this.disabled ? 'true' : 'false' }
				role=${ ifDefined( isLink ? undefined : 'button' ) }
        		type=${ ifDefined( isLink ? undefined : this.type ) }
				href=${ ifDefined( isLink ? this.href : undefined ) }
				target=${ ifDefined( isLink ? this.target : undefined ) }
				download=${ ifDefined( isLink ? this.download : undefined ) }
				rel=${ ifDefined( isLink && this.target ? 'noreferrer noopener' : undefined ) }
			>
				<slot name="leading"></slot>
				<slot></slot>
				<slot name="trailing"></slot>
			</${ this.tag }>
		`;
	}

	/**
	 * @returns {HTMLInputElement}
	 */
	_getButton() {
		return this.button.value;
	}

	_isLink() {
		return this.href ? true : false;
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
 * @typedef {import('../../common/prop-types').HTMLTag} HTMLTag
 */

/**
 * @typedef {Object} ButtonAttributes
 * @property {BorderlessProp} borderless
 * @property {PaddinglessProp} paddingless
 * @property {boolean} disabled
 * @property {ButtonEmphasis} emphasis
 * @property {ButtonSize} size
 * @property {HTMLTag} as
 * @property {'button' | 'submit' | 'reset'} type
 * @property {string} href
 * @property {'_blank' | '_parent' | '_self' | '_top'} target
 */
