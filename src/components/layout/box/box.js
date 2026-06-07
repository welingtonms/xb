import { html } from 'lit';

import { BaseLayout } from '../base-layout';

import styles from './box.styles';

export class BoxLayout extends BaseLayout {
	static styles = [styles()];

	/**
	 * @param {{
	 *  name?: string,
	 *  registry?: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		BaseLayout.defineLayout( { name: 'xb-box', type: BoxLayout, ...config } );
	}

	render() {
		return html`
			<slot name="leading"></slot>
			<slot></slot>
			<slot name="trailing"></slot>
		`;
	}
}

/**
 * @typedef {import('../base-layout').BaseLayoutAttributes} BaseLayoutAttributes
 */

/**
 * @typedef {BaseLayoutAttributes} BoxAttributes
 */
