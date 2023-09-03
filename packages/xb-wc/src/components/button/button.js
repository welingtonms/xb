import { customElement, property } from 'lit/decorators.js';
import { html, nothing } from 'lit';

import asLink from '../../mixins/as-link';
import ButtonPatternController from '../../controllers/button-pattern';
import LinkPatternController from '../../controllers/link-pattern';
import XBElement from '../../common/xb-element';

import styles from './button.styles';

/**
 * @class
 */
@customElement( 'xb-button' )
export class Button extends asLink( XBElement ) {
	static styles = [ styles() ];

	/**
	 * Determine borders to be supressed.
	 * @type {ButtonAttributes['borderless']}
	 */
	@property( { type: String } )
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
	@property( { type: String, reflect: true } ) emphasis;

	/**
	 * Determine paddings to be supressed.
	 * @type {ButtonAttributes['paddingless']}
	 */
	@property( { type: String } )
	paddingless;

	/**
	 * Button size.
	 * @type {ButtonAttributes['size']}
	 */
	@property( { type: String, reflect: true } ) size;

	/**
	 * The type of button. When the type is `submit`, the button will submit the surrounding form. Note that the default
	 * value is `button` instead of `submit`, which is opposite of how native `<button>` elements behave.
	 * @type {ButtonAttributes['type']}
	 */
	@property( { type: String } ) type;

	constructor() {
		super();

		this.borderless = 'none';
		this.disabled = false;
		this.emphasis = 'ghost';
		this.paddingless = 'none';
		this.size = 'small';
		this.type = 'button';
	}

	connectedCallback() {
		super.connectedCallback();

		if ( this.href != null ) {
			new LinkPatternController( this );
		} else {
			new ButtonPatternController( this );
		}
	}

	/**
	 * @param {import('lit').PropertyValues<this>} changedProperties
	 */
	update( changedProperties ) {
		super.update( changedProperties );

		if ( changedProperties.has( 'disabled' ) ) {
			this.setBooleanAttribute( 'aria-disabled', this.disabled );

			/**
			 * FIXME: according to https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled
			 * "there can be instances where elements need to be exposed as disabled, but are still available for users to find when navigating via the Tab key"
			 */
			this.setAttribute( 'tabindex', this.disabled ? '-1' : '0' );
		}
	}

	render() {
		return html`
			<slot name="leading"></slot>
			<slot></slot>
			<slot name="trailing"></slot>

			${ this.href != null
				? asLink.renderLink( { href: this.href, target: this.target, download: this.download } )
				: nothing }
		`;
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

// return html`
// 			<${ this.tag }
// 				class=${ classy(
// 					'button',
// 					{
// 						'-flat': when( { emphasis: 'flat' } ),
// 						'-ghost': when( { emphasis: 'ghost' } ),
// 						'-text': when( { emphasis: 'text' } ),
// 					},
// 					{
// 						'-extra-small': when( { size: 'extra-small' } ),
// 						'-small': when( { size: 'small' } ),
// 						'-medium': when( { size: 'medium' } ),
// 						'-large': when( { size: 'large' } ),
// 					},
// 					{
// 						'is-disabled': this.disabled,
// 					},
// 					sided( 'padding', this.paddingless ),
// 					sided( 'border', this.borderless )
// 				) }
// 				?disabled=${ ifDefined( isLink ? undefined : this.disabled ) }
// 				aria-disabled=${ this.disabled ? 'true' : 'false' }
// 				role=${ ifDefined( isLink ? undefined : 'button' ) }
//         		type=${ ifDefined( isLink ? undefined : this.type ) }
// 				href=${ ifDefined( isLink ? this.href : undefined ) }
// 				target=${ ifDefined( isLink ? this.target : undefined ) }
// 				download=${ ifDefined( isLink ? this.download : undefined ) }
// 				rel=${ ifDefined( isLink && this.target ? 'noreferrer noopener' : undefined ) }
// 			>
// 				<slot name="leading"></slot>
// 				<slot></slot>
// 				<slot name="trailing"></slot>
// 			</${ this.tag }>
// 		`;
