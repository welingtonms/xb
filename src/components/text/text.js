import { html } from 'lit';
import { property } from 'lit/decorators.js';

import { XBElement } from '../xb-element';
import { textStyles } from './text.styles';

export class Text extends XBElement {
	static styles = [ textStyles() ];

	/**
	 * Typography variant.
	 * @type {TextAttributes['variant']}
	 */
	@property( { type: String, reflect: true } ) accessor variant;

	/**
	 * Whether to ellipsize the text.
	 * @type {TextAttributes['ellipsize']}
	 */
	@property( { type: Boolean, reflect: true } ) accessor ellipsize;

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-text', ...config, type: Text } );
	}

	constructor() {
		super();

		this.variant = 'text-sm';
		this.ellipsize = false;
	}

	render() {
		return html`
			<span class="text-container">
				<slot></slot>
			</span>
		`;
	}
}

/**
 * @typedef {import('../../styles/typography.styles').TypographyVariant} TextVariant
 */

/**
 * @typedef {Object} TextAttributes
 * @property {TextVariant} variant
 * @property {boolean} [ellipsize]
 */
