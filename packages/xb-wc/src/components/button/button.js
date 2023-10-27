import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { BaseButton } from './base-button';
import AsLink from '../../mixins/as-link';
import ButtonPatternController from '../../controllers/button-pattern';
import LinkPatternController from '../../controllers/link-pattern';

import styles from './button.styles';

/**
 * @class
 * @template AsLink, BaseButton
 */
@customElement( 'xb-button' )
export class Button extends AsLink( BaseButton ) {
	static styles = [ BaseButton.styles, styles() ];

	/**
	 * Button emphasis variant.
	 * @type {ButtonAttributes['emphasis']}
	 */
	@property( { type: String, reflect: true } ) accessor emphasis;

	/**
	 * The type of button. When the type is `submit`, the button will submit the surrounding form. Note that the default
	 * value is `button` instead of `submit`, which is opposite of how native `<button>` elements behave.
	 * @type {ButtonAttributes['type']}
	 */
	@property( { type: String } ) accessor type;

	constructor() {
		super();

		this.emphasis = 'ghost';
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

	render() {
		return html`
			${ BaseButton.renderButton() }
			${ this.href != null
				? AsLink.renderLink( { href: this.href, target: this.target, download: this.download } )
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
 * @typedef {import('../../mixins/as-link').AsLinkAttributes} AsLinkAttributes
 * @typedef {import('./base-button').BaseButtonAttributes} BaseButtonAttributes
 */

/**
 * @typedef {Object} DefaultButtonAttributes
 * @property {ButtonEmphasis} emphasis
 * @property {'button' | 'submit' | 'reset'} type
 */

/**
 * @typedef {AsLinkAttributes & BaseButtonAttributes & DefaultButtonAttributes} ButtonAttributes
 */
