import { html } from 'lit';
import { property } from 'lit/decorators.js';

import { DisclosureFloatingElement } from '../disclosure-floating-element';
import { MenuButtonPatternController } from '../../controllers/menu-button-pattern';
import { XBElement } from '../xb-element';

import { dropdownStyles } from './dropdown.styles';

export class Dropdown extends DisclosureFloatingElement {
	static styles = [ dropdownStyles() ];

	/**
	 * Should the dropdown be disabled.
	 * @type {DropdownAttributes['disabled']}
	 */
	@property( { type: Boolean, reflect: true } ) accessor disabled;

	/** @type {MenuButtonPatternController} */
	#pattern;

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-dropdown', ...config, type: Dropdown } );
	}

	constructor() {
		super( { popover: true } );

		this.position = 'absolute';
		this.placement = 'bottom-end';
		this.disabled = false;

		this.#pattern = new MenuButtonPatternController( this );
	}

	connectedCallback() {
		super.connectedCallback();

		this.addEventListener( 'click', this.#onClick );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.removeEventListener( 'click', this.#onClick );
	}

	/** @protected */
	onDisclosureActivate() {
		this.#pattern.keyboard.activate();
	}

	/** @protected */
	onDisclosureDeactivate() {
		this.#pattern.keyboard.deactivate();
	}

	/**
	 *
	 * @param {import('lit').PropertyValues<this>} changedProperties
	 */
	firstUpdated( changedProperties ) {
		if ( this.floating?.id ) {
			this.reference?.setAttribute( 'aria-controls', this.floating.id );
		}

		if ( this.reference?.id ) {
			this.floating?.setAttribute( 'aria-labelledby', this.reference.id );
		}

		super.firstUpdated( changedProperties );
	}

	/**
	 * @param {import('lit').PropertyValues<this>} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'open' ) ) {
			if ( this.open ) {
				this.reference.setAttribute( 'aria-expanded', 'true' );
			} else {
				this.reference.removeAttribute( 'aria-expanded' );
			}
		}

		if ( changedProperties.has( 'disabled' ) && this.reference ) {
			this.reference.disabled = this.disabled;
		}

		if ( changedProperties.has( 'responsive' ) && this.floating && this.floating !== this ) {
			this.floating.toggleAttribute( 'responsive', this.responsive );
		}
	}

	/**
	 * @returns {HTMLElement | null}
	 */
	getReferenceElement() {
		return this.querySelector( '[aria-haspopup="true"]' );
	}

	/**
	 * @returns {HTMLElement | null}
	 */
	getFloatingElement() {
		return this.querySelector( '[role="menu"]' );
	}

	getArrowElement() {
		return null;
	}

	render() {
		return html`
			<slot></slot>
		`;
	}

	/**
	 * @param {import('../disclosure-floating-element').DisclosureExpandArgs} args
	 * @protected
	 */
	async onExpanded( args = {} ) {
		const { position = 'first', emit = true } = args;

		this.floating?.focus();
		this.#pattern.focus.focus( position );

		if ( emit !== false ) {
			this.emit( 'expand' );
		}
	}

	/**
	 * @param {import('../disclosure-floating-element').DisclosureCollapseArgs} args
	 * @protected
	 */
	async onCollapsed( args = {} ) {
		const { focusOnTrigger = false } = args;

		this.#pattern.focus.clear();

		if ( focusOnTrigger ) {
			this.reference?.focus();
		}

		this.emit( 'collapse' );
	}

	/**
	 * @param {Event} event
	 */
	#onClick = ( event ) => {
		const { target } = event;

		if ( ! target ) {
			return;
		}

		if ( target.matches( '[role="menuitem"]' ) ) {
			this.#pattern.focus.focus( target );

			this.collapse( { focusOnTrigger: true } );
			return;
		}

		if ( event.target.matches( '[aria-haspopup="true"]' ) && event.detail > 0 ) {
			this.toggle();
		}
	};
}

/**
 * @typedef {import('../floating-element').FloatingElementPlacement} DropdownPlacement
 * @typedef {import('../../styles/size.styles').ElementSize} DropdownSize
 */

/**
 * @typedef {Object} DropdownAttributes
 * @property {DropdownPlacement} [placement] - Dropdown placement.
 * @property {boolean} [open] - Should the dropdown menu be open.
 * @property {boolean} [disabled] - Should the dropdown be disabled.
 * @property {DropdownSize} size
 */
