import { html } from 'lit/static-html.js';
import { customElement } from 'lit/decorators.js';
import withClassy from '@welingtonms/classy';

import BaseLayout from '../base-layout';

import styles from './center.styles';

@customElement( 'xb-center' )
export class CenterLayout extends BaseLayout {
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
 * @typedef {BaseLayoutAttributes} CenterAttributes
 */
