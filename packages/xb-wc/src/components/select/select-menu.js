import { Menu } from '../menu';

/**
 * Doing this to avoid the "this constructor has already been used with this registry" error
 */
export class SelectMenu extends Menu {}

window.customElements.define( 'xb-select-menu', SelectMenu );
