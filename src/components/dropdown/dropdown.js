import { html } from 'lit';
import { property } from 'lit/decorators.js';

import { DisclosureFloatingElement } from '../disclosure-floating-element';
import { FocusManagerController, TypeAheadPlugin } from '../../controllers/focus-manager';
import { KeyboardSupportController } from '../../controllers/keyboard-support';
import { XBElement } from '../xb-element';

import { dropdownStyles } from './dropdown.styles';

export class Dropdown extends DisclosureFloatingElement {
	static styles = [ dropdownStyles() ];

	/**
	 * Should the dropdown be disabled.
	 * @type {DropdownAttributes['disabled']}
	 */
	@property( { type: Boolean, reflect: true } ) accessor disabled;

	/** @type {DropdownControllers} */
	#controllers;

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

		this.#controllers = {
			focus: new FocusManagerController( this, {
				query: '[role="menuitem"]',
				getControllerTarget: ( host ) => {
					return host.getFloatingElement();
				},
			} ).use( new TypeAheadPlugin() ),
			keyboard: new KeyboardSupportController( this, [
				{
					shortcut: {
						key: 'ArrowUp',
					},
					/**
					 * @param {KeyboardEvent} event
					 */
					handler: ( event ) => {
						const { target } = event;

						if ( ! target || this.disabled ) {
							return;
						}

						if ( target.matches( '[aria-haspopup="true"]' ) ) {
							this.expand( { position: 'last' } );

							return;
						}

						if ( event.target.matches( '[role="menu"]' ) ) {
							this.#controllers.focus.focusPrevious();

							return;
						}
					},
				},
				{
					shortcut: {
						key: 'ArrowDown',
					},
					/**
					 * @param {KeyboardEvent} event
					 */
					handler: ( event ) => {
						const { target } = event;

						if ( ! target || this.disabled ) {
							return;
						}

						if ( target.matches( '[aria-haspopup="true"]' ) ) {
							this.expand( { emit: false, position: 'first' } );

							return;
						}

						if ( event.target.matches( '[role="menu"]' ) ) {
							this.#controllers.focus.focusNext();

							return;
						}
					},
				},
				{
					shortcut: [
						{
							key: 'Enter',
						},
						{
							key: ' ',
						},
					],
					/**
					 * @param {KeyboardEvent} event
					 */
					handler: ( event ) => {
						const { target } = event;

						if ( ! target || this.disabled ) {
							return;
						}

						if ( event.target.matches( '[aria-haspopup="true"]' ) ) {
							this.toggle( { emit: false, position: 'first' } );

							return;
						}

						if ( event.target.matches( '[role="menu"]' ) ) {
							const item = this.#controllers.focus.focused;
							if ( item?.disabled ) {
								return;
							}

							item.click();
						}
					},
				},
				{
					shortcut: {
						key: 'Escape',
					},
					/**
					 * @param {KeyboardEvent} event
					 */
					handler: ( event ) => {
						const { target } = event;

						if ( ! target ) {
							return;
						}

						if ( this.open ) {
							this.collapse( { focusOnTrigger: true } );
						}
					},
				},
			] ),
		};
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
		this.#controllers.keyboard.activate();
	}

	/** @protected */
	onDisclosureDeactivate() {
		this.#controllers.keyboard.deactivate();
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
		this.#controllers.focus.focus( position );

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

		this.#controllers.focus.clear();

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

		// we are only interested in dropdown items
		if ( target.matches( '[role="menuitem"]' ) ) {
			/**
			 * we set focus so we can trigger the item click event when the user
			 * presses <Enter> or <Space>, through the KeyboardSupportController.
			 */
			this.#controllers.focus.focus( target );

			this.collapse( { focusOnTrigger: true } );
			return;
		}

		/**
		 * <Enter> or <Space> keys also trigger the click event.
		 * In that case, we do not want to respond to the key event, since
		 * the keyboard shortcut will handle it for us.
		 * To distinguish between a keypress event and click, we can use the `detail` property,
		 * which determines how many times the element was clicked. For a keyboard event, this
		 * should be 0; for a click event, it should be at least 1.
		 * References:
		 * - https://css-tricks.com/when-a-click-is-not-just-a-click/
		 * - https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail
		 */
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

/**
 * @typedef {import('../../controllers/focus-manager').default} FocusManagerController
 * @typedef {import('../../controllers/keyboard-support').default} KeyboardSupportController
 */

/**
 * @typedef {{
 * 	focus: FocusManagerController;
 * 	keyboard: KeyboardSupportController;
 * }} DropdownControllers
 */
