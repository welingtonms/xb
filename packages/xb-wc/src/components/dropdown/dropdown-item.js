import { customElement } from 'lit/decorators.js';

import { MenuItem } from '../menu';

@customElement( 'xb-dropdown-item' )
export class DropdownItem extends MenuItem {
	_handleClick = ( event ) => {
		if ( this.disabled ) {
			event.stopPropagation();
			event.preventDefault();

			return;
		}

		this.emit( 'xb:dropdown-collapse' );
	};
}
