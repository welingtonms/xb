import { html } from 'lit';

import { XBElement } from '../../xb-element';
import BaseLayout from '../base-layout';

import styles from './cover.styles';

/**
 * The Cover has one principal element that should always gravitate towards the center.
 * In addition, it can have one top/header element and/or one bottom/footer element.
 */
export class CoverLayout extends BaseLayout {
	static styles = [ styles() ];

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define(config) {
		XBElement.define({ name: 'xb-cover', ...config, type: CoverLayout });
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
 * @typedef {BaseLayoutAttributes} CoverAttributes
 */
