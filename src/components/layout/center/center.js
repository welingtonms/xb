import { html } from 'lit/static-html.js';

import { XBElement } from '../../xb-element';
import BaseLayout from '../base-layout';

import styles from './center.styles';

export class CenterLayout extends BaseLayout {
	static styles = [ styles() ];

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define(config) {
		XBElement.define({ name: 'xb-center', ...config, type: CenterLayout });
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
 * @typedef {BaseLayoutAttributes} CenterAttributes
 */
