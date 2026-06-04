import { html, nothing, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, state } from 'lit/decorators.js';

import { XBElement } from '../xb-element';
import { trackSlot } from '../../decorators/track-slot';
import { ExpandableController } from '../../controllers/expandable';
import { HasSlotController } from '../../controllers/has-slot';
import { FloatingElement } from '../floating-element';
import { supportsPopover } from '../../utils/top-layer';
import { topNavItemStyles } from './top-nav.styles';

/**
 * A top-nav menu item with optional icon, title, and description (two-line layout).
 */
export class TopNavItem extends FloatingElement {
	static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

	static styles = [ topNavItemStyles() ];

	/** @type {boolean} */
	@property( { type: Boolean, reflect: true } ) accessor disabled = false;

	/** @type {string} */
	@property( { type: String } ) accessor icon = '';

	/** @type {string} */
	@property( { type: String, reflect: true } ) accessor href = '';

	/** @type {boolean} */
	@trackSlot( 'leading' )
	accessor hasSlottedLeading;

	/** @type {boolean} */
	@state()
	accessor hasSlottedSubmenu = false;

	/** @type {boolean} */
	@state()
	accessor hasSlottedDescription = false;

	#controllers;

	constructor() {
		super();

		this.position = 'fixed';
		this.placement = 'bottom';

		this.#controllers = {
			hasSubmenuSlot: new HasSlotController( this, {
				slotName: 'sub-menu',
				onCheckHasSlot: ( has ) => {
					this.hasSlottedSubmenu = has;
				},
			} ),
			hasDescriptionSlot: new HasSlotController( this, {
				slotName: 'description',
				onCheckHasSlot: ( has ) => {
					this.hasSlottedDescription = has;
				},
			} ),
			hasLeadingSlot: new HasSlotController( this, {
				slotName: 'leading',
				onCheckHasSlot: ( has ) => {
					this.hasSlottedLeading = has;
				},
			} ),
			expandable: new ExpandableController( this, {
				getExpandableElement: () => {
					return this.getFloatingElement();
				},
				isExpanded: () => Boolean( this.open ),
			} ),
		};
	}

	static define( config ) {
		XBElement.define( { name: 'xb-top-nav-item', ...config, type: TopNavItem } );
	}

	connectedCallback() {
		super.connectedCallback();
	}

	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'disabled' ) ) {
			this.setAttribute( 'aria-disabled', this.disabled ? 'true' : 'false' );
		}
	}

	/**
	 * @returns {HTMLElement | null}
	 */
	getReferenceElement() {
		return this.renderRoot.querySelector( '.item-button' );
	}

	/**
	 * @returns {HTMLElement | null}
	 */
	getFloatingElement() {
		return this.querySelector( '[slot="sub-menu"]' );
	}

	getArrowElement() {
		return null;
	}

	#renderIcon() {
		return this.icon
			? html`
					<xb-icon name="${ this.icon }"></xb-icon>
			  `
			: nothing;
	}

	render() {
		return html`
			<div
				class=${ classMap( {
					'item-container': true,
					'has-slotted-sub-menu': this.hasSlottedSubmenu,
				} ) }
			>
				${ this.hasSlottedSubmenu
					? html`
							<button
								type="button"
								class=${ classMap( {
									'item-button': true,
									'has-slotted-leading': this.hasSlottedLeading,
									'has-slotted-description': this.hasSlottedDescription,
								} ) }
								aria-disabled=${ this.disabled ? 'true' : undefined }
								@click=${ this.#onToggle }
							>
								<slot name="leading">${ this.#renderIcon() }</slot>
								<span class="item-content">
									<span class="item-title"><slot></slot></span>
								</span>
								<xb-icon name="caret-down" size="12" rotate=${ this.open ? 180 : 0 }></xb-icon>
							</button>
					  `
					: html`
							<a
								class=${ classMap( {
									'item-button': true,
									'has-slotted-leading': this.hasSlottedLeading || this.icon,
									'has-slotted-description': this.hasSlottedDescription,
								} ) }
								href=${ this.href || undefined }
								aria-disabled=${ this.disabled ? 'true' : undefined }
							>
								<slot name="leading">${ this.#renderIcon() }</slot>
								<span class="item-content">
									<span class="item-title"><slot></slot></span>
									<span class="item-description"><slot name="description"></slot></span>
								</span>
							</a>
					  ` }
				<slot name="sub-menu"></slot>
			</div>
		`;
	}

	/**
	 * @param {Event} event
	 */
	#onToggle = ( event ) => {
		this.toggle();
	};
}
