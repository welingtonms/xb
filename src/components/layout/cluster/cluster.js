import { BaseLayout } from '../base-layout';

import styles from './cluster.styles';

export class ClusterLayout extends BaseLayout {
	static styles = [ styles() ];

	/**
	 * @param {{
	 *  name?: string,
	 *  registry?: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		BaseLayout.defineLayout( { name: 'xb-cluster', type: ClusterLayout, ...config } );
	}
}

/**
 * @typedef {import('../base-layout').BaseLayoutAttributes} BaseLayoutAttributes
 */

/**
 * @typedef {BaseLayoutAttributes} ClusterAttributes
 */
