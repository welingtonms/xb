import { html } from 'lit';

import { XBElement } from '../../common/xb-element';
import styles from './spinner.styles';

export class Spinner extends XBElement {
	static styles = [ styles() ];

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-spinner', ...config, type: Spinner } );
	}

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
