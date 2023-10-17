import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import XBElement from '../../common/xb-element';
import { styles } from './dialog.styles';

@customElement( 'xb-dialog' )
export class Dialog extends XBElement {
	static styles = [ styles() ];

	/**
	 * Should the dialog be open.
	 * @type {DialogAttributes['open']}
	 */
	@property( { type: Boolean, reflect: true } ) open;

	constructor() {
		super();

		this.open = false;
	}

	show() {
		if ( this.open ) {
			return;
		}

		this.open = true;
		this.dialog?.showModal();
	}

	hide() {
		if ( ! this.open ) {
			return;
		}

		this.open = false;
		this.dialog?.close();
	}

	render() {
		return html`
			<dialog @cancel=${ this._handleCancel }>
				<slot></slot>
			</dialog>
		`;
	}

	/** @type {HTMLDialogElement | null} */
	get dialog() {
		return this.renderRoot?.querySelector( 'dialog' );
	}

	_handleCancel = ( event ) => {
		event.preventDefault();
		event.stopPropagation();
	};
}

/**
 * @typedef {Object} DialogAttributes
 * @property {boolean} [open]
 */
