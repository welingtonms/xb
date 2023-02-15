import { customElement } from 'lit/decorators.js';
import { Menu } from '../menu';

/**
 * Doing this to avoid the "this constructor has already been used with this registry" error
 */
@customElement( 'xb-select-menu' )
export class SelectMenu extends Menu {}
