import { literal, unsafeStatic } from 'lit/static-html.js';
import { property } from 'lit/decorators.js';

/**
 * Allow a component to be rendered as any HTML tag through the attribute `as`..
 * @mixin
 * @param {XBElement} superClass
 * @returns {PolymorphicElement & XBElement}
 */
const PolymorphicElementMixin = ( superClass ) => {
	class PolymorphicElement extends superClass {
		/**
		 * Which HTML tag should be used to render this element..
		 * @type {HTMLTag}
		 * @public
		 */
		@property( { type: String } ) as;

		constructor() {
			super();

			this.as = 'span';
		}

		get tag() {
			return literal`${ unsafeStatic( this.as ) }`;
		}
	}

	return PolymorphicElement;
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
