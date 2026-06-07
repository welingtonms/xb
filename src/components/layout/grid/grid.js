import { BaseLayout } from '../base-layout';

import styles from './grid.styles';

export class GridLayout extends BaseLayout {
	static styles = [ styles() ];

	/**
	 * @param {{
	 *  name?: string,
	 *  registry?: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		BaseLayout.defineLayout( { name: 'xb-grid', type: GridLayout, ...config } );
	}
}

/**
 * @typedef {import('../base-layout').BaseLayoutAttributes} BaseLayoutAttributes
 */

/**
 * @typedef {BaseLayoutAttributes} GridAttributes
 */
