import { customElement } from 'lit/decorators.js';
import { MenuItem } from '../menu';

@customElement( 'xb-option' )
export class SelectOption extends MenuItem {
	connectedCallback() {
		super.connectedCallback();

		this.addEventListener( 'click', this._handleMenuClick );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.removeEventListener( 'click', this._handleMenuClick );
	}

	_handleMenuClick = ( event ) => {
		event.stopPropagation();

		// informs the outside world about which item was clicked
		this.emit( 'xb-option-click', { detail: { value: this.value } } );
	};
}
