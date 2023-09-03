import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { html } from 'lit';

/**
 * Mixin that adds the properties necessary for a link element.
 * It is not a simple base classe because we apply it to buttons rendered as
 * links as well as to link elements.
 * @template {!Constructor} T
 * @param {T} BaseClass - The class to extend
 */
function AsLinkMixin( BaseClass ) {
	return class AsLink extends BaseClass {
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
	};
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
 * @typedef {import('../../common/prop-types').Constructor} Constructor
 */

/**
 * @typedef {Object} AsLinkAttributes
 * @property {string} [href]
 * @property {'_blank' | '_parent' | '_self' | '_top'} [target]
 */
