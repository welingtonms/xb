import { literal, unsafeStatic } from 'lit/static-html.js';

/**
 * Allow a component to be rendered as any HTML tag through the attribute `as`..
 * @mixin
 * @param {XBElement} superClass
 * @returns {PolymorphicElement}
 */
const PolymorphicElementMixin = ( superClass ) =>
	/**
	 * @class
	 */
	class PolymorphicElement extends superClass {
		static get properties() {
			return {
				/**
				 * Which HTML tag should be used to render this element..
				 * @type {HTMLTag}
				 * @public
				 */
				as: { type: String },
			};
		}

		constructor() {
			super();

			/**
			 * @type {HTMLTag}
			 **/
			this.as = 'span';
		}

		get tag() {
			return literal`${ unsafeStatic( this.as ) }`;
		}
	};

export default PolymorphicElementMixin;

/**
 * @typedef {import('../../common/prop-types').HTMLTag} HTMLTag
 * @typedef {import('../../common/xb-element').default} XBElement
 */

/**
 * @typedef {Object} PolymorphicElement
 * @property {HTMLTag} as
 */
