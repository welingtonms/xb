import { html } from 'lit';

import XBElement from '../../common/xb-element';
import styles from './dropdown.styles';

import '../boundary';
import '../popover';
import './dropdown-trigger';
import './dropdown-menu';
import './dropdown-item';

export class Dropdown extends XBElement {
	static styles = [ styles() ];

	/** @type {import('./dropdown-trigger').DropdownTrigger} */
	_trigger;

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
		}
	}

	render() {
		return html`
			<xb-boundary @xb-click-outside=${ this._handleClickOutside }>
				<xb-popover position="absolute" ?hidden=${ ! this.open }>
					<slot
						name="trigger"
						slot="anchor"
						@click=${ this._handleClick }
					></slot>

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
		this.open = ! this.open;
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

	_getTrigger() {
		if ( this._trigger ) {
			return this._trigger;
		}

		const [ triggerSlot ] = this.shadowRoot.querySelectorAll( 'slot' );
		[ this._trigger ] = triggerSlot.assignedElements( { flatten: true } );

		return this._trigger;
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
