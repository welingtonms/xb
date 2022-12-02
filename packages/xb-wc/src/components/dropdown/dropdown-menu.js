import { Menu } from '../menu';

export class DropdownMenu extends Menu {
	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'slot', 'menu' );
	}
}

window.customElements.define( 'xb-dropdown-menu', DropdownMenu );
