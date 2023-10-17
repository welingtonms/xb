import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import BoundaryController from '../../controllers/boundary';
import FloatingElement, { supportsPopover } from '../../common/floating-element';
import FocusManagerController from '../../controllers/focus-manager';
import KeyboardSupportController from '../../controllers/keyboard-support';

import { dropdownStyles } from './dropdown.styles';

@customElement( 'xb-dropdown' )
export class Dropdown extends FloatingElement {
	static styles = [ dropdownStyles() ];

	/**
	 * Should the dropdown be disabled.
	 * @type {DropdownAttributes['disabled']}
	 */
	@property( { type: Boolean, reflect: true } ) disabled;

	/** @type {DropdownControllers} */
	_controllers;

	constructor() {
		super();

		this.position = 'absolute';
		this.placement = 'bottom-end';
		this.disabled = false;

		this._controllers = {
			boundary: new BoundaryController( this ),
			focus: new FocusManagerController( this, {
				query: [ '[role="menuitem"]' ],
				getInteractiveElement: ( host ) => {
					return host.getFloatingElement();
				},
			} ),
			keyboard: new KeyboardSupportController( this, [
				{
					shortcut: {
						key: 'ArrowUp',
					},
					/**
					 * @param {KeyboardEvent} event
					 */
					handler: ( event ) => {
						if ( event.target.matches( '[aria-haspopup="true"]' ) ) {
							this.expand( { position: 'last' } );

							return;
						}

						if ( event.target.matches( '[role="menu"]' ) ) {
							this._controllers.focus.focusPrevious();

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
						if ( event.target.matches( '[aria-haspopup="true"]' ) ) {
							this.expand( { emit: false, position: 'first' } );

							return;
						}

						if ( event.target.matches( '[role="menu"]' ) ) {
							this._controllers.focus.focusNext();

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
					handler: ( event ) => {
						if ( event.target.matches( '[aria-haspopup="true"]' ) ) {
							this.toggle( { emit: false, position: 'first' } );

							return;
						}

						if ( event.target.matches( '[role="menu"]' ) ) {
							const item = this._controllers.focus.focused;
							if ( item?.disabled ) {
								return;
							}

							item.click();
						}
					},
				},
				{
					shortcut: [
						{
							key: 'Tab',
						},
						{
							key: 'Tab',
							shift: true,
						},
					],
					handler: ( event ) => {
						if ( event.target.matches( '[aria-haspopup="true"]' ) && this.open ) {
							this._handleClickOutside();
						}
					},
				},
			] ),
		};

		this.addEventListener( 'click', this._handleClick );
		this.addEventListener( 'xb:interact-out', this._handleClickOutside );
	}

	firstUpdated() {
		this.floating.setAttribute( 'aria-labelledby', this.reference.id );

		if ( supportsPopover() ) {
			this.floating.setAttribute( 'popover', 'manual' );
		}

		this.reference.setAttribute( 'aria-controls', this.floating.id );
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
		this._controllers.focus.focus( position );
		this._controllers.boundary.activate();

		this.emit( 'xb:dropdown-expand' );
	}

	/**
	 * Collapse dropdown menu.
	 */
	async collapse() {
		this.hide();

		await this.updateComplete;

		this._controllers.boundary.deactivate();
		this._controllers.focus.clear();
		this.reference.focus();

		this.emit( 'xb:dropdown-collapse' );
	}

	/**
	 * Toggle dropdown menu.
	 * @param {Object} args
	 * @param {boolean} args.emit - should emit `xb:dropdown-expand` or `xb-dropdown-collapse` event. Defaults to `true`.
	 */
	toggle( args ) {
		if ( this.open ) {
			this.collapse();
		} else {
			this.expand( args );
		}
	}

	/**
	 * @param {Event} event
	 */
	_handleClick = ( event ) => {
		const { target } = event;

		// we are only interested in dropdown items
		if ( target.matches( '[role="menuitem"]' ) ) {
			/**
			 * we set focus so we can trigger the item click event when the user
			 * presses <Enter> or <Space>, through the KeyboardSupportController.
			 */
			this._controllers.focus.focus( target );

			this.collapse();
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

	_handleClickOutside = () => {
		this.collapse();
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
 */

/**
 * @typedef {{
 *  boundary: BoundaryController;
 * 	focus: FocusManagerController;
 * 	keyboard: KeyboardSupportController;
 * }} DropdownControllers
 */
