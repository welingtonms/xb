import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import BaseLayout from '../base-layout';

import styles from './cover.styles';

/**
 * The Cover has one principal element that should always gravitate towards the center.
 * In addition, it can have one top/header element and/or one bottom/footer element.
 */
@customElement( 'xb-cover' )
export class CoverLayout extends BaseLayout {
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
 * @typedef {BaseLayoutAttributes} CoverAttributes
 */
