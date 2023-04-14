import { customElement } from 'lit/decorators.js';
import { Menu } from '../menu';

@customElement( 'xb-dropdown-menu' )
export class DropdownMenu extends Menu {
	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'slot', 'floating' );
	}
}
