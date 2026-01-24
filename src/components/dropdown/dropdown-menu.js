import { XBElement } from '../xb-element';

import { menuStyles } from './dropdown.styles';
import { BaseMenu } from '../menu';

export class DropdownMenu extends BaseMenu {
	static styles = [ menuStyles() ];

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-dropdown-menu', ...config, type: DropdownMenu } );
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'tabindex', -1 );
	}

	firstUpdated() {
		super.firstUpdated();

		const trigger = this.parentNode.querySelector( '[aria-haspopup="true"]' );
		this.setAttribute( 'aria-labelledby', trigger.id );
		trigger.setAttribute( 'aria-controls', this.id );
	}
}
