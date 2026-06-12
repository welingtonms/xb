import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { XBElement } from '../xb-element';
import { HasSlotController } from '../../controllers/has-slot';

import '../button/button.define';
import '../icon/icon.define';
import '../text/text.define';

import { dialogStyles } from './dialog.styles';

/**
 * A dialog (panel) based on the native `<dialog>` element.
 * Uses `showModal()` for **Top layer**, backdrop, focus trap, and escape-to-close.
 *
 * **Overlay adapter:** `native-dialog` — see CONTEXT.md (**Modal**) and `docs/adr/0002-overlay-adapters.md`.
 */
export class XBDialog extends XBElement {
	static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

	static styles = [ dialogStyles() ];

	/**
	 * Whether the dialog is open.
	 * @type {boolean}
	 */
	@property( { type: Boolean, reflect: true } ) accessor open = false;

	/**
	 * The title of the dialog.
	 * @type {string}
	 */
	@property( { type: String, reflect: true } ) accessor header;

	/**
	 * The element that closed the dialog.
	 * @type {'any' | 'closerequest' | 'none'}
	 *
	 * @see {https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#closedby}
	 */
	@property( { type: String, reflect: true, attribute: 'closed-by' } ) accessor closedBy;

	/** @type {HTMLDialogElement | null} */
	#dialog;

	/** @type {{
	 *  hasHeaderSlot: HasSlotController;
	 * }} */
	#controllers;

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-dialog', ...config, type: XBDialog } );
	}
	constructor() {
		super();

		this.closedBy = 'none';
		this.#controllers = {
			hasHeaderSlot: new HasSlotController( this, {
				slotName: 'header',
				onCheckHasSlot: ( has ) => {
					this.hasSlottedHeader = has;
				},
			} ),
		};
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	/**
	 * @param {import('lit').PropertyValues<this>} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		// this.#dialog = this.renderRoot?.querySelector( 'dialog' ) ?? this.#dialog;

		if ( ! this.dialog ) {
			return;
		}

		if ( changedProperties.has( 'open' ) ) {
			if ( this.open ) {
				// Defer so the dialog is fully in the DOM (helps when inside shadow roots)
				requestAnimationFrame( () => {
					if ( ! this.open || ! this.dialog ) return;
					if ( typeof this.dialog.showModal === 'function' ) {
						this.dialog.showModal();
					} else {
						this.dialog.setAttribute( 'open', '' );
					}
				} );
			} else {
				this.dialog?.close();
			}
		}
	}

	firstUpdated( changedProperties ) {
		super.firstUpdated( changedProperties );

		this.dialog?.addEventListener( 'close', this.#handleNativeClose );
		this.dialog?.addEventListener( 'cancel', this.#handleNativeCancel );
		this.dialog?.addEventListener( 'keydown', this.#handleNativeKeyDown );
	}

	#handleNativeKeyDown = ( event ) => {
		if ( event.key !== 'Escape' || this.closedBy === 'none' || ! this.open ) {
			return;
		}

		event.preventDefault();
		this.close();
	};

	#handleNativeCancel = ( event ) => {
		if ( this.closedBy === 'none' ) {
			event.preventDefault();
			return;
		}

		if ( this.open ) {
			this.open = false;
			this.emit( 'close' );
		}
	};

	#handleNativeClose = () => {
		if ( ! this.open ) {
			return;
		}

		this.open = false;
		this.emit( 'close' );
	};

	/**
	 * Close the dialog (e.g. escape key or programmatic).
	 */
	close() {
		this.open = false;
		this.emit( 'close' );
	}

	/**
	 * Open the dialog.
	 */
	show() {
		this.open = true;
		this.emit( 'open' );
	}

	get dialog() {
		return this.renderRoot?.querySelector( 'dialog' );
	}

	render() {
		// aria-label=${ this.getAttribute( 'aria-label' ) || 'XBDialog' }

		return html`
			<dialog aria-modal="true" closedby=${ this.closedBy }>
				<div class="container">
					<div class="header">
						<slot name="header">
							${ this.header
								? html`
										<xb-text variant="text-xl" style="font-weight: 600;">${ this.header }</xb-text>
								  `
								: nothing }
						</slot>

						<xb-button
							class="close-button"
							variant="icon"
							size="sm"
							icon="x"
							aria-label="Close dialog"
							@click=${ this.close }
						></xb-button>
					</div>
					<div class="body">
						<slot name="body"></slot>
					</div>
					<div class="footer">
						<slot name="footer"></slot>
					</div>
				</div>
			</dialog>
		`;
	}
}
