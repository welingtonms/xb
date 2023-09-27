import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import XBElement from '../../common/xb-element';
import { stepsStyles } from './steps.styles';

@customElement( 'xb-steps' )
export class Steps extends XBElement {
	static styles = [ stepsStyles() ];

	render() {
		return html`
			<slot></slot>
		`;
	}
}
