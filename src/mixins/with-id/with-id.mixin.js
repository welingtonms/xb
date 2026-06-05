import generateID from '../../utils/id-generator';

/**
 * Ensures the element has an id.
 * @template {!Constructable} T
 * @param {T} BaseClass
 * @param {string} [prefix='xb-element']
 */
export function WithIDMixin( BaseClass, prefix = 'xb-element' ) {
	return class WithID extends BaseClass {
		connectedCallback() {
			super.connectedCallback();

			if ( ! this.hasAttribute( 'id' ) ) {
				this.id = `${ prefix }-${ generateID() }`;
			}
		}
	};
}

/**
 * @typedef {import('../xb-element').XBElement} XBElement
 * @typedef {import('../../utils/prop-types.js').Constructable} Constructable
 */
