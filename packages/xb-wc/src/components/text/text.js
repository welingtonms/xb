import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import XBElement from '../../common/xb-element';
import styles from './text.styles';

@customElement( 'xb-text' )
export class Text extends XBElement {
	static styles = [ styles() ];

	/**
	 * Typography variant.
	 * @type {TextAttributes['variant']}
	 */
	@property( { type: String, reflect: true } ) accessor variant;

	constructor() {
		super();

		this.variant = 'body-1';
	}

	render() {
		return html`
			<slot></slot>
		`;
	}
}

/**
 * @typedef {('h-1' | 'h-2' | 'h-3' | 'h-4' | 'h-5' | 'h-6' | 'subtitle-1' | 'subtitle-2' | 'body-1' | 'body-2' | 'button' | 'caption' | 'overline')} TextVariant
 */

/**
 * @typedef {Object} TextAttributes
 * @property {TextVariant} variant
 */
