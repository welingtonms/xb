import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import withClassy from '@welingtonms/classy';

import { convertTriggerFromAttribute } from './tooltip.helpers';
import Keyboard from '../../common/keyboard';
import XBElement from '../../common/xb-element';

import styles from './tooltip.styles';

import '../popover';

export class Tooltip extends XBElement {
	static styles = [ styles() ];

	/** @type {HTMLSlotElement} */
	_defaultSlot;

	static get properties() {
		return {
			/**
			 * Tooltip variant.
			 * @type {TooltipAttributes['placement']}
			 */
			placement: { type: String },

			/**
			 * Should the dropdown menu be open.
			 * @type {TooltipAttributes['open']}
			 */
			open: {
				type: Boolean,
				reflect: true,
			},

			/**
			 * Controls how the tooltip is activated. Possible options include `click`, `hover`, `focus`, and `manual`. Multiple
			 * options can be passed by separating them with a space. When manual is used, the tooltip must be activated
			 * programmatically.
			 * @type {string}
			 */
			trigger: {
				converter: {
					fromAttribute: convertTriggerFromAttribute,
				},
			},
		};
	}

	constructor() {
		super();

		/** @type {TooltipAttributes['open']} */
		this.open = false;

		/** @type {TooltipAttributes['placement']} */
		this.placement = 'top';

		/** @type {TooltipTrigger[]} */
		this.trigger = [ 'hover' ];
	}

	connectedCallback() {
		super.connectedCallback();

		this.updateComplete.then( () => {
			this.addEventListener( 'blur', this._handleBlur, true );
			this.addEventListener( 'click', this._handleClick );
			this.addEventListener( 'focus', this._handleFocus, true );
			this.addEventListener( 'keydown', this._handleKeyDown );
			this.addEventListener( 'mouseout', this._handleMouseOut );
			this.addEventListener( 'mouseover', this._handleMouseOver );
		} );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.removeEventListener( 'blur', this.handleBlur, true );
		this.removeEventListener( 'focus', this.handleFocus, true );
		this.removeEventListener( 'click', this.handleClick );
		this.removeEventListener( 'keydown', this.handleKeyDown );
		this.removeEventListener( 'mouseover', this.handleMouseOver );
		this.removeEventListener( 'mouseout', this.handleMouseOut );
	}

	/**
	 * @param {import('lit').PropertyValues<OptionGroup>} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );
	}

	render() {
		const { classy, when } = withClassy( {
			open: this.open,
		} );

		return html`<xb-popover
			class=${ classy( 'tooltip' ) }
			placement=${ ifDefined( this.placement ) }
			?hidden=${ ! this.open }
		>
			<slot slot="anchor" aria-describedby="content"></slot>
			<div
				slot="floating"
				id="content"
				class="content"
				role="tooltip"
				aria-hidden=${ this.open ? 'false' : 'true' }
			>
				<slot name="floating" aria-live=${ this.open ? 'polite' : 'off' }>
				</slot>
			</div>
		</xb-popover>`;
	}

	show() {
		if ( this.open ) {
			return;
		}

		this.open = true;
	}

	hide() {
		if ( ! this.open ) {
			return;
		}

		this.open = false;
	}

	toggle() {
		this.open = ! this.open;
	}

	_handleFocus() {
		if ( this._hasTrigger( 'focus' ) ) {
			this.show();
		}
	}

	_handleBlur() {
		if ( this._hasTrigger( 'focus' ) ) {
			this.hide();
		}
	}

	_handleClick() {
		if ( this._hasTrigger( 'click' ) ) {
			this.toggle();
		}
	}

	/**
	 * @param {KeyboardEvent} event
	 */
	_handleKeyDown( event ) {
		if ( this.open && Keyboard( event ).is( [ 'ESC' ] ) ) {
			event.stopPropagation();
			this.hide();
		}
	}

	_handleMouseOver() {
		if ( this._hasTrigger( 'hover' ) ) {
			clearTimeout( this.hoverTimeout );

			this.hoverTimeout = window.setTimeout( () => this.show(), 450 );
		}
	}

	_handleMouseOut() {
		if ( this._hasTrigger( 'hover' ) ) {
			clearTimeout( this.hoverTimeout );

			this.hoverTimeout = window.setTimeout( () => this.hide(), 250 );
		}
	}

	_hasTrigger( triggerType ) {
		return this.trigger.includes( triggerType );
	}
}

window.customElements.define( 'xb-tooltip', Tooltip );

/**
 * @typedef {import('../popover/popover').PopoverPlacement} TooltipPlacement
 * @typedef {'hover' | 'focus' | 'click'} TooltipTrigger
 */

/**
 * @typedef {Object} TooltipAttributes
 * @property {TooltipPlacement} [placement] - Tooltip placement.
 * @property {boolean} [open] - Should the dropdown menu be open.
 * @property {TooltipTrigger | TooltipTrigger[]} trigger
 */

/**
 * @typedef {import('./interaction-boundary').InteractionBoundary} InteractionBoundary
 */
