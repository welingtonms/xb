import { property } from 'lit/decorators.js';

import { convertDirectionFromAttribute } from './layout.helpers';
import withPolymorphicTag from '../../mixins/polymorphic';
import XBElement from '../../common/xb-element';

/**
 * @class
 * @mixes withPolymorphicTag
 */
export default class BaseLayout extends withPolymorphicTag( XBElement ) {
	/**
	 * Determine borders to be supressed.
	 * @type {BaseLayoutAttributes['borderless']}
	 */
	@property( { converter: { fromAttribute: convertDirectionFromAttribute } } ) borderless;

	/**
	 * Determine paddings to be supressed.
	 * @type {BaseLayoutAttributes['paddingless']}
	 */
	@property( { converter: { fromAttribute: convertDirectionFromAttribute } } )
	paddingless;

	constructor() {
		super();

		/** @type {BaseLayoutAttributes['as']} */
		this.as = 'div';

		this.borderless = 'none';

		this.paddingless = 'none';
	}
}

/**
 * @typedef {import('../../common/prop-types').BorderlessProp} BorderlessProp
 * @typedef {import('../../common/prop-types').PaddinglessProp} PaddinglessProp
 * @typedef {import('../../common/prop-types').HTMLTag} HTMLTag
 */

/**
 * @typedef {Object} BaseLayoutAttributes
 * @property {BorderlessProp} borderless
 * @property {PaddinglessProp} paddingless
 * @property {HTMLTag} as
 */
