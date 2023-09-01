import { LitElement } from 'lit';

import { redispatchEvent } from '../utils/events';

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

	get tag() {
		return this.tagName.toLowerCase();
	}

	/**
	 * Emits a custom event with convenient defaults.
	 * @param {string} name - event name.
	 * @param {CustomEventInit} [options] - [Optional] Event additional options.
	 * @returns {CustomEvent}
	 */
	emit = ( name, options = {} ) => {
		const event = new CustomEvent( name, {
			bubbles: true,
			cancelable: true,
			composed: true,
			detail: {},
			...options,
		} );

		this.dispatchEvent( event );

		return event;
	};

	/**
	 * Re-dispatches an event from the provided element.
	 *
	 * Based on https://github.com/material-components/material-web/blob/master/controller/events.ts
	 *
	 * @example
	 * class MyInput extends XBElement {
	 *   render() {
	 *     return html`<input @change=${this.reemit}>`;
	 *   }
	 * }
	 *
	 * @param {Event} event The event to re-dispatch.
	 * @return Whether or not the event was dispatched (if cancelable).
	 */
	reemit = ( event ) => {
		return redispatchEvent( this, event );
	};

	/**
	 * Sets the provided attribute on the element if `value` is `true`;
	 * otherwise, removes the attribute.
	 * @param {*} name
	 * @param {*} value
	 */
	setBooleanAttribute( name, value ) {
		if ( value === true ) {
			this.setAttribute( name, true );
		} else {
			this.removeAttribute( name );
		}
	}
}
