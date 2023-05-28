import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ContextProvider } from '@lit-labs/context';

import FloatingElement from '../../common/floating-element';
import { dropdownContext } from './dropdown-context';
import { attachContextRoot } from '../../utils/context';

import styles from './dropdown.styles';

import '../boundary';
import '../focus-trap';
import '../menu';
import './dropdown-item';
import './dropdown-menu';
import './dropdown-trigger';

attachContextRoot();

@customElement( 'xb-dropdown' )
export class Dropdown extends FloatingElement {
	static styles = [ styles() ];

	/**
	 * Should the dropdown be disabled.
	 * @type {DropdownAttributes['disabled']}
	 */
	@property( { type: Boolean, reflect: true } ) disabled;

	/** @type {ContextProvider<import('./dropdown-context').DropdownContext>} */
	_provider;

	constructor() {
		super();

		this.position = 'absolute';
		this.placement = 'bottom-start';
		this.disabled = false;

		this.context = {
			disabled: false,
			open: false,
		};

		this._provider = new ContextProvider( this, { context: dropdownContext } );
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
			this._provider.setValue( { open: this.open, disabled: this.disabled } );

			if ( this.open ) {
				this.trap?.activate();
			} else {
				this.trap?.deactivate();
				this.trigger.focus();
			}
		}
	}

	/**
	 * @returns {import('./dropdown-trigger').DropdownTrigger}
	 * */
	get trigger() {
		return this.reference;
	}

	/**
	 * @returns {import('./dropdown-menu').DropdownMenu}
	 * */
	get menu() {
		return this.floating;
	}

	/**
	 * @returns {import('../focus-trap').FocusTrap}
	 * */
	get trap() {
		return this.menu?.shadowRoot.querySelector( 'xb-focus-trap' );
	}

	render() {
		return html`
			<xb-boundary @xb-interact-out=${ this._handleClickOutside }>
				<slot name="reference"></slot>
				<slot name="floating"></slot>
			</xb-boundary>
		`;
	}

	/**
	 * @returns {HTMLElement | null}
	 */
	getReferenceElement() {
		const referenceSlot = this.shadowRoot.querySelector( 'slot[name="reference"]' );
		const [ reference ] = referenceSlot?.assignedElements( { flatten: true } ) ?? [];

		return reference;
	}

	/**
	 * @returns {HTMLElement | null}
	 */
	getFloatingElement() {
		const floatingSlot = this.shadowRoot.querySelector( 'slot[name="floating"]' );
		const [ floating ] = floatingSlot?.assignedElements( { flatten: true } ) ?? [];

		return floating;
	}

	getArrowElement() {
		return null;
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
