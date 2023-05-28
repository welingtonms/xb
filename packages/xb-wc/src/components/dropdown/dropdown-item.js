import { customElement } from 'lit/decorators.js';
import { MenuItem } from '../menu';

/**
 * Doing this to avoid the "this constructor has already been used with this registry" error
 */
@customElement( 'xb-dropdown-item' )
export class DropdownMenuItem extends MenuItem {
	connectedCallback() {
		super.connectedCallback();

		this.addEventListener( 'click', this._handleMenuClick );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.removeEventListener( 'click', this._handleMenuClick );
	}

	_handleMenuClick = () => {
		this.emit( 'xb-dropdown-collapse' );
	};
}
