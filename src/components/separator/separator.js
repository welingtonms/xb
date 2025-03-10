import { html } from 'lit';

import { XBElement } from '../xb-element';
import { separatorStyles } from './separator.styles';

export class Separator extends XBElement {
	static styles = [ separatorStyles() ];

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-separator', ...config, type: Separator } );
	}

	render() {
		return html`
			<hr />
		`;
	}

}
