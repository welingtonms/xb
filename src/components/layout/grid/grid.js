import { html } from 'lit';

import { XBElement } from '../../xb-element';
import BaseLayout from '../base-layout';

import styles from './grid.styles';

export class GridLayout extends BaseLayout {
	static styles = [ styles() ];

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define(config) {
		XBElement.define({ name: 'xb-grid', ...config, type: GridLayout });
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
 * @typedef {BaseLayoutAttributes} GridAttributes
 */
