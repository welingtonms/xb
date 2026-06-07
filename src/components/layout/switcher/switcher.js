import { html } from 'lit';
import { property } from 'lit/decorators.js';

import { BaseLayout } from '../base-layout';

import styles from './switcher.styles';

export class SwitcherLayout extends BaseLayout {
	static styles = [ styles() ];

	/**
	 * The maximum number of elements allowed to appear in the horizontal configuration.
	 * @type {SwitcherAttributes['limit']}
	 */
	@property( { type: Number } ) accessor limit;

	/**
	 * @param {{
	 *  name?: string,
	 *  registry?: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		BaseLayout.defineLayout( { name: 'xb-switcher', type: SwitcherLayout, ...config } );
	}

	constructor() {
		super();

		this.limit = 4;
	}

	render() {
		return html`
			<style>
				::slotted( *:nth-last-child( n + ${ this.limit + 1 } ) ) {
					flex-basis: 100%;
				}

				::slotted( *:nth-last-child( n + ${ this.limit + 1 } ) ~ * ) {
					flex-basis: 100%;
				}
			</style>
			<slot></slot>
		`;
	}
}

/**
 * @typedef {import('../base-layout').BaseLayoutAttributes} BaseLayoutAttributes
 */

/**
 * @typedef {BaseLayoutAttributes & {
 * 	limit: number
 * }} SwitcherAttributes
 */
