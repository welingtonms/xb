import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { XBElement } from '../xb-element';
import { XBDialog } from '../dialog';

import { drawerStyles } from './drawer.styles';

/**
 * A drawer (panel) based on the native `<dialog>` element.
 * Uses `showModal()` for top-layer, backdrop, focus trap, and escape-to-close.
 */
export class XBDrawer extends XBDialog {
	static styles = [ drawerStyles() ];

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-drawer', ...config, type: XBDrawer } );
	}
}
