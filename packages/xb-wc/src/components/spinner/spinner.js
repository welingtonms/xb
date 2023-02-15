import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import withClassy from '@welingtonms/classy';

import XBElement from '../../common/xb-element';
import styles from './spinner.styles';

@customElement( 'xb-spinner' )
export class Spinner extends XBElement {
	static styles = [ styles() ];

	/**
	 * Loading message.
	 * @type {SpinnerAttributes['message']}
	 */
	@property( { type: String } ) message;

	element = createRef();

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

/**
 * @typedef {Object} SpinnerAttributes
 * @property {string} [message] - Loading message.
 */
