import { MenuItem } from '../menu';

/**
 * Doing this to avoid the "this constructor has already been used with this registry" error
 */
export class DropdownMenuItem extends MenuItem {
	connectedCallback() {
		super.connectedCallback();

		this.addEventListener( 'xb-select', this._handleMenuEvent );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.removeEventListener( 'xb-select', this._handleMenuEvent );
	}

	_handleMenuEvent( event ) {
		event.stopPropagation();

		// handled by the dropdown
		this.emit( 'xb-dropdown', { detail: { action: 'collapse' } } );

		// informs the outside world about which item was clicked
		this.emit( 'xb-click', { detail: event.detail } );
	}
}

window.customElements.define( 'xb-dropdown-item', DropdownMenuItem );
