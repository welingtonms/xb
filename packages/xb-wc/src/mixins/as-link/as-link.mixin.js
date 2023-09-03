import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { html } from 'lit';

/**
 * Mixin that adds the properties necessary for the `SelectionManagerController` to work.
 * @mixin
 * @param {XBElement} superClass
 * @returns {AsLink & XBElement}
 */
function AsLinkMixin( superClass ) {
	class AsLink extends superClass {
		/**
		 * When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`.
		 * @type {string}
		 */
		@property( { type: String } ) href;

		/**
		 * Tells the browser where to open the link. Only used when `href` is set.
		 * @type {string}
		 * */
		@property( { type: String } ) target;

		connectedCallback() {
			super.connectedCallback();

			this.setAttribute( 'role', 'link' );
		}
	}

	return AsLink;
}

AsLinkMixin.renderLink = function ( { href, target, download } ) {
	return html`
		<a
			aria-hidden="true"
			tabindex="-1"
			href=${ ifDefined( href ) }
			target=${ ifDefined( target ) }
			download=${ ifDefined( download ) }
			rel=${ ifDefined( target ? 'noreferrer noopener' : undefined ) }
		>
			<slot></slot>
		</a>
	`;
};

export default AsLinkMixin;

/**
 * @typedef {import('../../common/xb-element').default} XBElement
 */

/**
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionType} SelectionType
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionState} SelectionState
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionStrategy} SelectionStrategy
 */

/**
 * @typedef {Object} GenericSelectionOption
 * @property {string} label
 * @property {string} value
 */

/**
 * @typedef {Object} CustomSelectionOption
 * @property {string} _type
 */

/**
 * @typedef {string | GenericSelectionOption | CustomSelectionOption} SelectionOption
 */
