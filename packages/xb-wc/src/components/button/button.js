import { customElement, property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import withClassy from '@welingtonms/classy';

import { convertDirectionFromAttribute } from '../layout/layout.helpers';
import { sided } from '../../common/prop-toolset';
import PolymorphicElementMixin from '../../mixins/polymorphic';
import styles from './button.styles';
import XBElement from '../../common/xb-element';

/**
 * @class
 * @mixes PolymorphicElementMixin
 */
@customElement( 'xb-button' )
export class Button extends PolymorphicElementMixin( XBElement ) {
	static styles = [ styles() ];

	/**
	 * Determine borders to be supressed.
	 * @type {ButtonAttributes['borderless']}
	 */
	@property( {
		converter: {
			fromAttribute: convertDirectionFromAttribute,
		},
	} )
	borderless;

	/**
	 * Should the button be disabled.
	 * @type {ButtonAttributes['disabled']}
	 */
	@property( { type: Boolean, reflect: true } ) disabled;

	/**
	 * Button emphasis variant.
	 * @type {ButtonAttributes['emphasis']}
	 */
	@property( { type: String } ) emphasis;

	/**
	 * Determine paddings to be supressed.
	 * @type {ButtonAttributes['paddingless']}
	 */
	@property( {
		converter: {
			fromAttribute: convertDirectionFromAttribute,
		},
	} )
	paddingless;

	/**
	 * Button size.
	 * @type {ButtonAttributes['size']}
	 */
	@property( { type: String } ) size;

	/**
	 * The type of button. When the type is `submit`, the button will submit the surrounding form. Note that the default
	 * value is `button` instead of `submit`, which is opposite of how native `<button>` elements behave.
	 * @type {ButtonAttributes['type']}
	 */
	@property( { type: String } ) type;

	/**
	 * When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`.
	 * @type {ButtonAttributes['href']
	 */
	@property( { type: String } ) href;

	/**
	 * Tells the browser where to open the link. Only used when `href` is set.
	 * @type {ButtonAttributes['target']}
	 * */
	@property( { type: String } ) target;

	constructor() {
		super();

		this.role = 'button';

		this.emphasis = 'ghost';

		this.size = 'small';

		this.borderless = 'none';

		this.paddingless = 'none';

		this.disabled = false;

		this.as = 'button';

		this.type = 'button';

		this.target = '_blank';
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'role', 'button' );
	}

	focus() {
		const button = this.shadowRoot.querySelector( this.as );

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
				class=${ classy(
					'button',
					{
						'-flat': when( { emphasis: 'flat' } ),
						'-ghost': when( { emphasis: 'ghost' } ),
						'-text': when( { emphasis: 'text' } ),
					},
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

	_isLink() {
		return this.href ? true : false;
	}
}

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
