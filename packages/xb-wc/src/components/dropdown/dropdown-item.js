import { MenuItem } from '../menu';

/**
 * Doing this to avoid the "this constructor has already been used with this registry" error
 */
export class DropdownMenuItem extends MenuItem {}

window.customElements.define( 'xb-dropdown-item', DropdownMenuItem );
