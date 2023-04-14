import { customElement } from 'lit/decorators.js';
import { MenuItem } from '../menu';

/**
 * Doing this to avoid the "this constructor has already been used with this registry" error
 */
@customElement( 'xb-dropdown-item' )
export class DropdownMenuItem extends MenuItem {
	connectedCallback() {
		super.connectedCallback();

		this.addEventListener( 'xb-menu-item-click', this._handleMenuClick );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.removeEventListener( 'xb-menu-item-click', this._handleMenuClick );
	}

	_handleMenuClick( event ) {
		event.stopPropagation();

		this.emit( 'xb-dropdown-collapse' );

		// informs the outside world about which item was clicked
		this.emit( 'xb-click', { detail: event.detail } );
	}
}
