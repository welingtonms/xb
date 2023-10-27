import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import BaseLayout from '../base-layout';

import styles from './sidebar.styles';

@customElement( 'xb-sidebar' )
export class SidebarLayout extends BaseLayout {
	static styles = [ styles() ];

	/**
	 * Where the side content should be positioned.
	 * @type {SidebarAttributes['sidePosition']}
	 */
	@property( { attribute: 'side-position', reflect: true } ) accessor sidePosition;

	constructor() {
		super();

		this.sidePosition = 'left';
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
 * @typedef {'left' | 'right'} SidePosition
 */

/**
 * @typedef {BaseLayoutAttributes & {
 * 	sidePosition: SidePosition;
 * }} SidebarAttributes
 */
