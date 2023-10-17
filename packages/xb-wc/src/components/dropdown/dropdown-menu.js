import { customElement } from 'lit/decorators.js';

import { menuStyles } from './dropdown.styles';
import { BaseMenu } from '../menu';

@customElement( 'xb-dropdown-menu' )
export class DropdownMenu extends BaseMenu {
	static styles = [ menuStyles() ];

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'tabindex', -1 );
	}
}
