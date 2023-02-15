import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
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

@customElement( 'xb-dropdown' )
export class Dropdown extends XBElement {
	static styles = [ styles() ];

	/**
	 * Dropdown variant.
	 * @type {DropdownAttributes['placement']}
	 */
	@property( { type: String } ) placement;

	/**
	 * Should the dropdown menu be open.
	 * @type {DropdownAttributes['open']}
	 */
	@property( { type: Boolean, reflect: true } ) open;

	/**
	 * Should the dropdown be disabled.
	 * @type {DropdownAttributes['disabled']}
	 */
	@property( { type: Boolean, reflect: true } ) disabled;

	/** @type {import('./dropdown-trigger').DropdownTrigger} */
	_trigger;

	/** @type {import('./dropdown-menu').DropdownMenu} */
	_menu;

	/** @type {import('../focus-trap').FocusTrap} */
	_trap;

	constructor() {
		super();

		this.open = false;

		this.placement = 'bottom-start';

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
			this.trigger.open = this.open;

			if ( this.open ) {
				this.trap?.activate();
			} else {
				this.trap?.deactivate();
				this.trigger.focus();
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

		this.emit( 'xb-dropdown-expand' );
	}

	collapse() {
		this.open = false;

		this.emit( 'xb-dropdown-collapse' );
	}

	toggle() {
		if ( this.open ) {
			this.collapse();
		} else {
			this.expand();
		}
	}

	get trigger() {
		if ( this._trigger == null ) {
			const triggerSlot = this.shadowRoot.querySelector( 'slot[name="trigger"]' );
			[ this._trigger ] = triggerSlot.assignedElements( { flatten: true } );
		}

		return this._trigger;
	}

	get menu() {
		if ( this._menu == null ) {
			const menuSlot = this.shadowRoot.querySelector( 'slot[name="menu"]' );
			[ this._menu ] = menuSlot.assignedElements( { flatten: true } );
		}

		return this._menu;
	}

	get trap() {
		if ( this._trap == null ) {
			this._trap = this.menu.shadowRoot.querySelector( 'xb-focus-trap' );
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
