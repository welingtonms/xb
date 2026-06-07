import { property } from 'lit/decorators.js';

import { BaseLayout } from '../base-layout';

import styles from './sidebar.styles';

export class SidebarLayout extends BaseLayout {
	static styles = [ styles() ];

	/**
	 * Where the side content should be positioned.
	 * @type {SidebarAttributes['sidePosition']}
	 */
	@property( { attribute: 'side-position', reflect: true } ) accessor sidePosition;

	/**
	 * @param {{
	 *  name?: string,
	 *  registry?: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		BaseLayout.defineLayout( { name: 'xb-sidebar', type: SidebarLayout, ...config } );
	}

	constructor() {
		super();

		/** @type {SidebarAttributes['sidePosition']} */
		this.sidePosition = 'left';
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
