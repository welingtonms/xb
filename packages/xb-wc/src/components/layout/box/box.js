import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import BaseLayout from '../base-layout';

import styles from './box.styles';

@customElement( 'xb-box' )
export class BoxLayout extends BaseLayout {
	static styles = [ styles() ];

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
