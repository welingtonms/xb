import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import BaseLayout from '../base-layout';

import styles from './grid.styles';

@customElement( 'xb-grid' )
export class GridLayout extends BaseLayout {
	static styles = [ styles() ];

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
