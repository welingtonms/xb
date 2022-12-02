import { MenuItem } from '../menu';

/**
 * Doing this to avoid the "this constructor has already been used with this registry" error
 */
export class SelectOption extends MenuItem {}

window.customElements.define( 'xb-option', SelectOption );
