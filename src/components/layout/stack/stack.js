import { BaseLayout } from '../base-layout';

import styles from './stack.styles';

export class StackLayout extends BaseLayout {
	static styles = [ styles() ];

	/**
	 * @param {{
	 *  name?: string,
	 *  registry?: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		BaseLayout.defineLayout( { name: 'xb-stack', type: StackLayout, ...config } );
	}
}

/**
 * @typedef {import('../base-layout').BaseLayoutAttributes} BaseLayoutAttributes
 */

/**
 * @typedef {BaseLayoutAttributes} StackAttributes
 */
