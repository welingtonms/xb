import { html } from 'lit';
import { property } from 'lit/decorators.js';

import { BoundaryController } from '../../controllers/boundary';
import { ExpandableController } from '../../controllers/expandable';
import { FloatingElement } from '../floating-element';
import { FocusManagerController, TypeAheadPlugin } from '../../controllers/focus-manager';
import { isInsideElement } from '../../utils/events';
import { KeyboardSupportController } from '../../controllers/keyboard-support';
import { supportsPopover } from '../../utils/top-layer';
import { XBElement } from '../xb-element';

import { dropdownStyles } from './dropdown.styles';

export class Dropdown extends FloatingElement {
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
			boundary: new BoundaryController( this ),
			expandable: new ExpandableController( this, {
				getExpandableElement: () => {
					return this.getFloatingElement();
				},
				isExpanded: () => Boolean( this.open ),
			} ),
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
		this.addEventListener( 'focusin', this.#onFocusIn );
		this.addEventListener( 'xb:interact-out', this.#onClickOutside );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.removeEventListener( 'click', this.#onClick );
		this.removeEventListener( 'focusin', this.#onFocusIn );
		this.removeEventListener( 'xb:interact-out', this.#onClickOutside );
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
	 * Expand dropdown menu.
	 * @param {Object} args
	 * @param {'first' | 'last'} args.position - should focus on first or last dropdown item.
	 */
	async expand( args = { position: 'first' } ) {
		const { position = 'first' } = args;

		this.show();

		await this.updateComplete;

		this.floating.focus();
		this.#controllers.focus.focus( position );

		this.emit( 'xb:dropdown-expand' );
	}

	/**
	 * @see {@link FloatingElement.handleExternalClose}
	 */
	handleExternalClose() {
		this.collapse();
	}

	/**
	 * Collapse dropdown menu.
	 * @param {Object} args
	 * @param {boolean} args.focusOnTrigger - should focus on the trigger.
	 */
	collapse = async ( args = { focusOnTrigger: false } ) => {
		const { focusOnTrigger = false } = args;

		this.hide();

		await this.updateComplete;

		this.#controllers.focus.clear();
		if ( focusOnTrigger ) {
			this.reference.focus();
		}

		this.emit( 'xb:dropdown-collapse' );
	};

	/**
	 * Toggle dropdown menu.
	 * @param {Object} args
	 * @param {boolean} args.emit - should emit `xb:dropdown-expand` or `xb-dropdown-collapse` event. Defaults to `true`.
	 * @param {boolean} args.focusOnTrigger - should focus on the trigger.
	 */
	toggle( args ) {
		if ( this.open ) {
			this.collapse( args );
		} else {
			this.expand( args );
		}
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

	#onClickOutside = () => {
		this.#controllers.boundary.deactivate();
		this.#controllers.keyboard.deactivate();

		/**
		 * When collapsing, the floating element (which received focus in expand())
		 * will be hidden. The browser's default behavior is to automatically restore
		 * focus to the previously focused element (the trigger) when a focused element
		 * is removed or hidden from the DOM.
		 */
		this.collapse();
	};

	/**
	 * @param {FocusEvent} event
	 */
	#onFocusIn = ( event ) => {
		if ( isInsideElement( event, this ) ) {
			this.#controllers.boundary.activate();
			this.#controllers.keyboard.activate();
		}
	};
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
 * @typedef {import('../../controllers/focus-manager').default} FocusManagerController
 * @typedef {import('../../controllers/keyboard-support').default} KeyboardSupportController
 * @typedef {import('../../controllers/boundary').default} BoundaryController
 * @typedef {import('../../controllers/expandable').ExpandableController} ExpandableController
 */

/**
 * @typedef {{
 *  boundary: BoundaryController;
 * 	focus: FocusManagerController;
 * 	keyboard: KeyboardSupportController;
 * 	expandable: ExpandableController;
 * }} DropdownControllers
 */
