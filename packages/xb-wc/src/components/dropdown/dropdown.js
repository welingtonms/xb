import { html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import XBElement from '../../common/xb-element';
import styles from './dropdown.styles';

import '../boundary';
import '../popover';

export class Dropdown extends XBElement {
	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * Dropdown variant.
			 * @type {DropdownAttributes['placement']}
			 */
			placement: { type: String },

			/**
			 * Should the dropdown menu be open.
			 * @type {DropdownAttributes['open']}
			 */
			open: {
				type: Boolean,
				reflect: true,
			},

			/**
			 * Should the dropdown be disabled.
			 * @type {DropdownAttributes['disabled']}
			 */
			disabled: {
				type: Boolean,
				reflect: true,
			},
		};
	}

	constructor() {
		super();

		/** @type {DropdownAttributes['open']} */
		this.open = false;

		/** @type {DropdownAttributes['placement']} */
		this.placement = 'bottom-start';
	}

	render() {
		return html`
			<xb-boundary @xb-click-outside=${ this._handleClickOutside }>
				<xb-popover ?hidden=${ ! this.open }>
					<xb-button slot="reference" @click=${ this._handleClick }
						>&hearts;</xb-button
					>
					<div slot="floating">
						Proin facilisis mauris ut tortor vulputate placerat. Nulla ut ligula
						mattis, sagittis arcu non, venenatis urna. Praesent tincidunt odio
						vitae luctus aliquet. Morbi nisl ante, ultricies vel fringilla
						pulvinar, lacinia quis mi. Mauris a lectus quis est feugiat cursus
						non vel erat. In euismod nibh mi, ac volutpat elit placerat id.
						Nullam condimentum arcu quis massa consequat, nec sodales est
						rutrum. Duis nisi est, tempus nec hendrerit vel, lobortis a ante.
					</div>
				</xb-popover>
			</xb-boundary>
		`;
	}

	_handleClick() {
		if ( this.disabled ) {
			return;
		}

		this.open = ! this.open;

		const options = {
			detail: { value: this.open, type: 'toggle' },
		};

		this.emit( 'xb-dropdown', options );
	}

	_handleClickOutside() {
		this.open = false;
	}
}

window.customElements.define( 'xb-dropdown', Dropdown );

/**
 * @typedef {import('../popover/popover').PopoverPlacement} DropdownPlacement
 */

/**
 * @typedef {Object} DropdownAttributes
 * @property {DropdownPlacement} [placement] - Dropdown placement.
 * @property {boolean} [open] - Should the dropdown menu be open.
 * @property {boolean} [disabled] - Should the dropdown be disabled.
 */

/**
 * @typedef {import('./interaction-boundary').InteractionBoundary} InteractionBoundary
 */
