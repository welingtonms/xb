import { property } from 'lit/decorators.js';

import { BaseLayout } from '../base-layout';

import styles from './imposter.styles';

export class ImposterLayout extends BaseLayout {
	static styles = [ styles() ];

	/**
	 * @type {ImposterAttributes['variant']}
	 */
	@property( { type: String, reflect: true } ) accessor variant;

	/**
	 * @type {ImposterAttributes['breakout']}
	 */
	@property( { type: Boolean, reflect: true } ) accessor breakout;

	/**
	 * @param {{
	 *  name?: string,
	 *  registry?: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		BaseLayout.defineLayout( { name: 'xb-imposter', type: ImposterLayout, ...config } );
	}
}

/**
 * @typedef {import('../base-layout').BaseLayoutAttributes} BaseLayoutAttributes
 */

/**
 * @typedef {('absolute' | 'fixed')} ImposterVariant
 */

/**
 * @typedef {BaseLayoutAttributes & {
 * variant: ImposterVariant;
 * breakout: boolean
 * }} ImposterAttributes
 */
