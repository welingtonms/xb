import { property } from 'lit/decorators.js';

import XBElement from '../../common/xb-element';

export default class BaseLayout extends XBElement {
	/**
	 * Determine borders to be supressed.
	 * @type {BaseLayoutAttributes['borderless']}
	 */
	@property( { type: String } ) accessor borderless;

	/**
	 * Determine paddings to be supressed.
	 * @type {BaseLayoutAttributes['paddingless']}
	 */
	@property( { type: String } ) accessor paddingless;

	constructor() {
		super();

		this.borderless = 'none';
		this.paddingless = 'none';
	}
}

/**
 * @typedef {import('../../common/prop-types').BorderlessProp} BorderlessProp
 * @typedef {import('../../common/prop-types').PaddinglessProp} PaddinglessProp
 */

/**
 * @typedef {Object} BaseLayoutAttributes
 * @property {BorderlessProp} [borderless] - sides where the border should be suppressed.
 * @property {PaddinglessProp} [paddingless] - sides where the padding should be suppressed.
 */
