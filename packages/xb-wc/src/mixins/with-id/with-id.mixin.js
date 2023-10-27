import { property } from 'lit/decorators.js';

import generateID from '../../utils/id-generator';

/**
 * Ensures the element has an id.
 * @mixin
 * @param {import('../../common/prop-types').Constructor<XBElement>} superClass
 * @param {string} [prefix] - Prefix for the id.
 * @returns {T}
 */
const WithIdElementMixin = ( superClass, prefix = 'xb-element' ) => {
	class WithIdElement extends superClass {
		connectedCallback() {
			super.connectedCallback();

			if ( ! this.hasAttribute( 'id' ) ) {
				this.id = `${ prefix }-${ generateID() }`;
			}
		}
	}

	return WithIdElement;
};

export default WithIdElementMixin;

/**
 * @typedef {import('../../common/xb-element').default} XBElement
 */
