import { LitElement } from 'lit';

import { redispatchEvent } from '../utils/events';

export class XBElement extends LitElement {
	/** @type {ElementInternals} */
	#internals;

	/**
	 *
	 * @param {{
	 *  name: string,
	 * 	type: CustomElementConstructor,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		const { name, type, registry = customElements } = config;

		registry.define( name, type );
	}

	constructor() {
		super();

		this.#internals = this.attachInternals();
	}

	get tag() {
		return this.localName;
	}

	get internals() {
		return this.#internals;
	}

	/**
	 * Emits a custom event with convenient defaults.
	 * @param {string} name - event name.
	 * @param {CustomEventInit} [options] - [Optional] Event additional options.
	 * @returns {boolean}
	 */
	emit = ( name, options = {} ) => {
		if ( ! this.isConnected ) {
			return false;
		}

		const event = new CustomEvent( name, {
			bubbles: true,
			cancelable: true,
			composed: true,
			detail: {},
			...options,
		} );

		return this.dispatchEvent( event );
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
	 * Sets the provided attribute to `true` is value is truthy, remove attribute otherwise.
	 * @param {string} name
	 * @param {*} value
	 */
	setBooleanAttribute( name, value ) {
		if ( Boolean( value ) ) {
			this.setAttribute( name, 'true' );
		} else {
			this.removeAttribute( name );
		}
	}
}
/**
 * @typedef {Object} XBElementDefinition
 * @property {string} name
 * @property {CustomElementConstructor} type
 * @property {CustomElementRegistry} registry
 */
