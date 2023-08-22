import { property } from 'lit/decorators.js';

import generateID from '../../utils/id-generator';

/**
 * Ensures the element has an id.
 * @mixin
 * @param {XBElement} superClass
 * @returns {WithIdElement & XBElement}
 */
const WithIdElementMixin = ( superClass ) => {
	class WithIdElement extends superClass {
		/**
		 * Element id.
		 * @type {String}
		 * @public
		 */
		@property( { type: String, reflect: true } ) id;

		connectedCallback() {
			super.connectedCallback();

			if ( ! this.hasAttribute( 'id' ) ) {
				this.id = `xb-element-${ generateID() }`;
			}
		}
	}

	return WithIdElement;
};

export default WithIdElementMixin;

/**
 * @typedef {import('../../common/xb-element').default} XBElement
 */
