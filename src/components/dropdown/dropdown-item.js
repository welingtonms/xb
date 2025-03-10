import { XBElement } from '../xb-element';

import { MenuItem } from '../menu';

export class DropdownItem extends MenuItem {
	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-dropdown-item', ...config, type: DropdownItem } );
	}

	/**
	 * @override
	 */
	#onClick = ( event ) => {
		if ( this.disabled ) {
			event.stopPropagation();
			event.preventDefault();

			return;
		}
	};
}
