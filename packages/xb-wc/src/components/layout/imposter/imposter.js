import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import BaseLayout from '../base-layout';

import styles from './imposter.styles';

@customElement( 'xb-imposter' )
export class ImposterLayout extends BaseLayout {
	static styles = [ styles() ];

	/**
	 * @type {ImposterAttributes['variant']}
	 */
	@property( { type: String, reflect: true } ) variant;

	/**
	 * @type {ImposterAttributes['breakout']}
	 */
	@property( { type: Boolean, reflect: true } ) breakout;

	constructor() {
		super();

		this.variant = 'absolute';
		this.breakout = false;
	}

	render() {
		return html`
			<slot></slot>
		`;
	}
}

/**
 * @typedef {import('../base-layout').BaseLayoutAttributes} BaseLayoutAttributes
 */

/**
 * @typedef {('absolute' | 'fixed')} ImposterVariant
 */

/**
 * @typedef {BaseLayoutAttributes & {
 * variant: ImposterVariant;
 * breakout: boolean
 * }} ImposterAttributes
 */
