import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import XBElement from '../../common/xb-element';
import styles from './dropdown.styles';

import '../boundary';
import '../popover';
import './dropdown-trigger';
import './dropdown-menu';
import './dropdown-item';
import '../menu';
import '../focus-trap';

export class Dropdown extends XBElement {
	static styles = [ styles() ];

	/** @type {import('./dropdown-trigger').DropdownTrigger} */
	_trigger;

	/** @type {import('./dropdown-menu').DropdownMenu} */
	_menu;

	/** @type {import('../focus-trap').FocusTrap} */
	_trap;

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

		/** @type {DropdownAttributes['size']} */
		this.size = 'medium';

		/** @type {DropdownAttributes['disabled']} */
		this.disabled = false;
	}

	connectedCallback() {
		super.connectedCallback();

		this.addEventListener( 'xb-dropdown', this._handleDropdownEvent );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.removeEventListener( 'xb-dropdown', this._handleDropdownEvent );
	}

	/**
	 * @param {import('lit').PropertyValues<ToggleGroup>} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'open' ) ) {
			const trigger = this._getTrigger();
			trigger.open = this.open;

			if ( this.open ) {
				this._getFocusTrap().activate();
			} else {
				this._getFocusTrap()?.deactivate();
				this._getTrigger().focus();
			}
		}
	}

	render() {
		return html`
			<xb-boundary @xb-interact-out=${ this._handleClickOutside }>
				<xb-popover
					position="absolute"
					placement="${ ifDefined( this.placement ) }"
					?hidden=${ ! this.open }
				>
					<slot name="trigger" slot="anchor"></slot>

					<slot name="menu" slot="floating"></slot>
				</xb-popover>
			</xb-boundary>
		`;
	}

	expand() {
		this.open = true;
	}

	collapse() {
		this.open = false;
	}

	toggle() {
		if ( this.open ) {
			this.collapse();
		} else {
			this.expand();
		}
	}

	_getTrigger() {
		if ( this._trigger == null ) {
			const triggerSlot = this.shadowRoot.querySelector(
				'slot[name="trigger"]'
			);
			[ this._trigger ] = triggerSlot.assignedElements( { flatten: true } );
		}

		return this._trigger;
	}

	_getMenu() {
		if ( this._menu == null ) {
			const menuSlot = this.shadowRoot.querySelector( 'slot[name="menu"]' );
			[ this._menu ] = menuSlot.assignedElements( { flatten: true } );
		}

		return this._menu;
	}

	_getFocusTrap() {
		if ( this._trap == null ) {
			/**
			 * FIXME: find a better way to query the focus-trap element.
			 * For some reason, querySelector('xb-focus-trap') in the menu
			 * Shadow DOM is not working.
			 */
			[ this._trap ] = [ ...this._getMenu().shadowRoot.children ];
		}

		return this._trap;
	}

	_handleClick() {
		if ( this.disabled ) {
			return;
		}

		this.toggle();
	}

	_handleDropdownEvent( event ) {
		const {
			detail: { action },
		} = event;

		switch ( action ) {
			case 'open':
			case 'expand':
				this.expand();
				break;
			case 'close':
			case 'collapse':
				this.collapse();
				break;
			case 'toggle':
				this.toggle();
				break;
		}
	}

	_handleClickOutside() {
		this.collapse();
	}
}

window.customElements.define( 'xb-dropdown', Dropdown );

/**
 * @typedef {import('../popover/popover').PopoverPlacement} DropdownPlacement
 * @typedef {import('../../styles/size.styles').ElementSize} DropdownSize
 */

/**
 * @typedef {Object} DropdownAttributes
 * @property {DropdownPlacement} [placement] - Dropdown placement.
 * @property {boolean} [open] - Should the dropdown menu be open.
 * @property {boolean} [disabled] - Should the dropdown be disabled.
 * @property {DropdownSize} size
 */

/**
 * @typedef {import('./interaction-boundary').InteractionBoundary} InteractionBoundary
 */
