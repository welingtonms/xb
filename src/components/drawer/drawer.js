import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { XBElement } from '../xb-element';
import { XBDialog } from '../dialog';

import { drawerStyles } from './drawer.styles';

/**
 * A drawer (panel) based on the native `<dialog>` element.
 * Style-only subclass of {@link XBDialog}; same **Modal** / `native-dialog` adapter.
 *
 * @see {@link XBDialog}
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
