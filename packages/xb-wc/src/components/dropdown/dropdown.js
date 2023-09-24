import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import BoundaryController from '../../controllers/boundary';
import FloatingElement from '../../common/floating-element';
import FocusManagerController from '../../controllers/focus-manager';
import KeyboardSupportController from '../../controllers/keyboard-support';

import styles from './dropdown.styles';

const ITEM_QUERY = '[role="menuitem"]';

@customElement( 'xb-dropdown' )
export class Dropdown extends FloatingElement {
	static styles = [ styles() ];

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
		this.placement = 'bottom-start';
		this.disabled = false;

		this._controllers = {
			boundary: new BoundaryController( this ),
			focus: new FocusManagerController( this, {
				query: [ `${ ITEM_QUERY }:not([disabled])` ],
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
					callback: ( event ) => {
						if ( event.target.matches( 'xb-dropdown-trigger' ) ) {
							this.expand( { position: 'last' } );

							return;
						}

						if ( event.target.matches( 'xb-dropdown-menu' ) ) {
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
					callback: ( event ) => {
						if ( event.target.matches( 'xb-dropdown-trigger' ) ) {
							this.expand( { emit: false, position: 'first' } );

							return;
						}

						if ( event.target.matches( 'xb-dropdown-menu' ) ) {
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
					callback: ( event ) => {
						if ( event.target.matches( 'xb-dropdown-trigger' ) ) {
							this.toggle( { emit: false, position: 'first' } );

							return;
						}

						if ( event.target.matches( 'xb-dropdown-menu' ) ) {
							const item = this._controllers.focus.focused;
							item.click();

							return;
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
					callback: ( event ) => {
						if ( event.target.matches( 'xb-dropdown-trigger' ) && this.open ) {
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
		this.reference.setAttribute( 'aria-controls', this.floating.id );
		this.floating.setAttribute( 'aria-labelledby', this.reference.id );
	}

	/**
	 * @param {import('lit').PropertyValues<ToggleGroup>} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'open' ) ) {
			this.reference.setBooleanAttribute( 'aria-expanded', this.open );
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
		if ( target.matches( ITEM_QUERY ) ) {
			/**
			 * we set focus so we can trigger the item click event when the user
			 * presses <Enter> or <Space>, through the KeyboardSupportController.
			 */
			this._controllers.focus.focus( target );

			this.collapse();
			return;
		}

		if ( event.target.matches( 'xb-dropdown-trigger' ) ) {
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
