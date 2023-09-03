import { customElement } from 'lit/decorators.js';

import { BaseMenu } from '../menu';

@customElement( 'xb-dropdown-menu' )
export class DropdownMenu extends BaseMenu {
	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'role', 'menu' );
		this.setAttribute( 'tabindex', 0 );
	}
}
