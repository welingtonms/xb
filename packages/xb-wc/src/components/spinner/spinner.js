import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import XBElement from '../../common/xb-element';
import styles from './spinner.styles';

@customElement( 'xb-spinner' )
export class Spinner extends XBElement {
	static styles = [ styles() ];
	render() {
		return html`
			<span class="bar"></span>
			<slot></slot>
		`;
	}

	_isEmpty() {
		return this.element.value?.innerHTML === '';
	}
}
