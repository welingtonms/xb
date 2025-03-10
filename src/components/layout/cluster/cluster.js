import { html } from 'lit';

import { XBElement } from '../../xb-element';
import BaseLayout from '../base-layout';

import styles from './cluster.styles';

export class ClusterLayout extends BaseLayout {
	static styles = [ styles() ];

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define(config) {
		XBElement.define({ name: 'xb-cluster', ...config, type: ClusterLayout });
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
 * @typedef {BaseLayoutAttributes} ClusterAttributes
 */
