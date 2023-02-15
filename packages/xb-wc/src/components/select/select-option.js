import { customElement } from 'lit/decorators.js';
import { MenuItem } from '../menu';

@customElement( 'xb-option' )
export class SelectOption extends MenuItem {
	connectedCallback() {
		super.connectedCallback();

		this.addEventListener( 'xb-menu-item-click', this._handleMenuEvent );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.removeEventListener( 'xb-menu-item-click', this._handleMenuEvent );
	}

	_handleMenuEvent( event ) {
		event.stopPropagation();

		// informs the outside world about which item was clicked
		this.emit( 'xb-option-click', { detail: event.detail } );
	}
}
