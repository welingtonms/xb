import { converterDirectionFromAttribute } from './layout.helpers';
import PolymorphicElementMixin from '../../mixins/polymorphic';
import XBElement from '../../common/xb-element';

/**
 * @class
 * @mixes PolymorphicElementMixin
 */
export default class BaseLayout extends PolymorphicElementMixin( XBElement ) {
	static get properties() {
		return {
			/**
			 * Determine borders to be supressed.
			 * @type {BaseLayoutAttributes['borderless']}
			 */
			borderless: {
				converter: {
					fromAttribute: converterDirectionFromAttribute,
				},
			},

			/**
			 * Determine paddings to be supressed.
			 * @type {BaseLayoutAttributes['paddingless']}
			 */
			paddingless: {
				converter: {
					fromAttribute: converterDirectionFromAttribute,
				},
			},
		};
	}

	constructor() {
		super();

		/** @type {BaseLayoutAttributes['as']} */
		this.as = 'div';

		/** @type {BaseLayoutAttributes['borderless']} */
		this.borderless = 'none';

		/** @type {BaseLayoutAttributes['paddingless']} */
		this.paddingless = 'none';
	}
}

/**
 * @typedef {import('../../../common/prop-types').BorderlessProp} BorderlessProp
 * @typedef {import('../../../common/prop-types').PaddinglessProp} PaddinglessProp
 * @typedef {import('../../../common/prop-types').HTMLTag} HTMLTag
 */

/**
 * @typedef {Object} BaseLayoutAttributes
 * @property {BorderlessProp} borderless
 * @property {PaddinglessProp} paddingless
 * @property {HTMLTag} as
 */
