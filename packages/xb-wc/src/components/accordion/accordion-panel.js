import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import XBElement from '../../common/xb-element';
import WithID from '../../mixins/with-id';

@customElement( 'xb-accordion-panel' )
export class AccordionPanel extends WithID( XBElement ) {
	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'role', 'region' );
	}

	render() {
		return html`
			<slot></slot>
		`;
	}
}
