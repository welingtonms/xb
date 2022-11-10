import { html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import withClassy from '@welingtonms/classy';

import XBElement from '../../common/xb-element';
import styles from './spinner.styles';

// this.hostElement.innerHTML !== '';
export class Spinner extends XBElement {
	element = createRef();

	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * Loading message.
			 * @type {SpinnerAttributes['message']}
			 */
			message: {
				type: String,
			},
		};
	}

	constructor() {
		super();
	}

	render() {
		const { when, classy } = withClassy( {} );

		return html`
			<div ${ ref( this.element ) } class=${ classy( 'spinner', {} ) }>
				<span class="bar"></span>
				<slot></slot>
			</div>
		`;
	}

	_isEmpty() {
		return this.element.value?.innerHTML === '';
	}
}

window.customElements.define( 'xb-spinner', Spinner );

/**
 * @typedef {Object} SpinnerAttributes
 * @property {string} [message] - Loading message.
 */
