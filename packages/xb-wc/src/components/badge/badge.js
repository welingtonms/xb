import { html } from 'lit';
import { property } from 'lit/decorators.js';

import { XBElement } from '../../common/xb-element';
import styles from './badge.styles';

export class Badge extends XBElement {
	static styles = [styles()];

	/**
	 * Badge variant.
	 * @type {BadgeAttributes['variant']}
	 */
	@property({ type: String, reflect: true }) accessor variant;

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define(config) {
		XBElement.define({ name: 'xb-badge', ...config, type: Badge });
	}

	constructor() {
		super();

		/** @type {BadgeAttributes['variant']} */
		this.variant = 'neutral';
	}

	render() {
		return html`
			<slot></slot>
		`;
	}
}

/**
 * @typedef {('neutral' | 'primary' | 'secondary' | 'tertiary')} BadgeVariant
 */

/**
 * @typedef {Object} BadgeAttributes
 * @property {BadgeVariant} [variant] - Badge variant.
 */
