import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import FloatingElement from '../../common/floating-element';

import styles from './dropdown.styles';

import '../boundary';
import '../focus-trap';
import '../menu';
import '../resize-observer';
import './dropdown-item';
import './dropdown-menu';
import './dropdown-trigger';

@customElement( 'xb-dropdown' )
export class Dropdown extends FloatingElement {
	static styles = [ styles() ];

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

		this.position = 'absolute';
		this.placement = 'bottom-start';
		this.disabled = false;
	}

	connectedCallback() {
		super.connectedCallback();

		this.addEventListener( 'xb-dropdown-collapse', this._handleDropdownCollapse );
		this.addEventListener( 'xb-dropdown-expand', this._handleDropdownExpand );
		this.addEventListener( 'xb-dropdown-toggle', this._handleDropdownToggle );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.removeEventListener( 'xb-dropdown-collapse', this._handleDropdownCollapse );
		this.removeEventListener( 'xb-dropdown-expand', this._handleDropdownExpand );
		this.removeEventListener( 'xb-dropdown-toggle', this._handleDropdownToggle );
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
			<xb-resize-observer type="window" @xb-resize=${ this.reposition }>
				<xb-boundary @xb-interact-out=${ this._handleClickOutside }>
					<slot name="reference"></slot>

					<slot name="floating"></slot>
				</xb-boundary>
			</xb-resize-observer>
		`;
	}

	/**
	 * Expand dropdown menu.
	 * @param {boolean} emit - should emit `xb-dropdown-expand` event. Defaults to `true`.
	 */
	expand( emit = true ) {
		this.show();

		if ( emit ) {
			this.emit( 'xb-dropdown-expand' );
		}
	}

	/**
	 * Collapse dropdown menu.
	 * @param {boolean} emit - should emit `xb-dropdown-collapse` event. Defaults to `true`.
	 */
	collapse( emit = true ) {
		this.hide();

		if ( emit ) {
			this.emit( 'xb-dropdown-collapse' );
		}
	}

	/**
	 * Toggle dropdown menu.
	 * @param {boolean} emit - should emit `xb-dropdown-expand` or `xb-dropdown-collapse` event. Defaults to `true`.
	 */
	toggle( emit = true ) {
		if ( this.open ) {
			this.collapse( emit );
		} else {
			this.expand( emit );
		}
	}

	get trigger() {
		if ( this._trigger == null ) {
			const triggerSlot = this.shadowRoot.querySelector( 'slot[name="reference"]' );
			[ this._trigger ] = triggerSlot.assignedElements( { flatten: true } );
		}

		return this._trigger;
	}

	get menu() {
		if ( this._menu == null ) {
			const menuSlot = this.shadowRoot.querySelector( 'slot[name="floating"]' );
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

	_handleDropdownExpand() {
		this.expand( /** emit */ false );
	}

	_handleDropdownCollapse() {
		this.collapse( /** emit */ false );
	}

	_handleDropdownToggle() {
		this.toggle( /** emit */ false );
	}

	_handleClickOutside() {
		this.collapse();
	}
}

/**
 * @typedef {import('../../common/floating-element').FloatingElementPlacement} DropdownPlacement
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
