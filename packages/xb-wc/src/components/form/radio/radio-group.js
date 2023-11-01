import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import XBElement from '../../../common/xb-element';

import { groupStyles } from './radio.styles';

@customElement( 'xb-radio-group' )
export class RadioGroup extends XBElement {
	static styles = [ groupStyles() ];

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'role', 'radiogroup' );
	}

	render() {
		return html`
			<slot></slot>
		`;
	}
}
