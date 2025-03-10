import { html, css } from 'lit';

import { XBElement } from '../xb-element';
import { tableBodyStyles } from './table.styles';

export class TableBody extends XBElement {
	static styles = [ tableBodyStyles() ];

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-table-body', ...config, type: TableBody } );
	}

	render() {
		return html`
			<div class="body-container">
				<slot></slot>
			</div>
		`;
	}
}
