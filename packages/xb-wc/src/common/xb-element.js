import { LitElement } from 'lit';

export default class XBElement extends LitElement {
	static get properties() {
		return {
			/**
			 * Specifies the text direction of the element's content.
			 * @type {import('../common/prop-types').DirProp}
			 */
			dir: {
				type: String,
			},
			/**
			 * Specifies the language of the element's content.
			 * @see {[Language Codes](https://www.w3schools.com/tags/ref_language_codes.asp)}
			 * @type {String}
			 */
			lang: {
				type: String,
			},
		};
	}

	/**
	 * Emits a custom event with convenient defaults.
	 * @param {string} name - event name.
	 * @param {CustomEventInit} [options] - [Optional] Event additional options.
	 * @returns {CustomEvent}
	 */
	emit( name, options = {} ) {
		const event = new CustomEvent( name, {
			bubbles: true,
			cancelable: false,
			composed: true,
			detail: {},
			...options,
		} );

		this.dispatchEvent( event );

		return event;
	}
}
