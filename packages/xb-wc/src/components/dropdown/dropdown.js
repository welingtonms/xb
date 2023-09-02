import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ContextProvider } from '@lit-labs/context';

import { attachContextRoot } from '../../utils/context';
import { dropdownContext } from './dropdown-context';
import BoundaryController from '../../controllers/boundary';
import FloatingElement from '../../common/floating-element';

import styles from './dropdown.styles';

attachContextRoot();

@customElement( 'xb-dropdown' )
export class Dropdown extends FloatingElement {
	static styles = [ styles() ];

	/**
	 * Should the dropdown be disabled.
	 * @type {DropdownAttributes['disabled']}
	 */
	@property( { type: Boolean, reflect: true } ) disabled;

	/** @type {{ boundary: BoundaryController }} */
	_controllers;

	/** @type {ContextProvider<import('./dropdown-context').DropdownContext>} */
	_provider;

	constructor() {
		super();

		this.position = 'absolute';
		this.placement = 'bottom-start';
		this.disabled = false;

		this._controllers = {
			boundary: new BoundaryController( this ),
		};

		this._provider = new ContextProvider( this, {
			context: dropdownContext,
			initialValue: {
				open: false,
				disabled: false,
			},
		} );
	}

	connectedCallback() {
		super.connectedCallback();

		this.addEventListener( 'xb:dropdown-collapse', this._handleDropdownCollapse );
		this.addEventListener( 'xb:dropdown-expand', this._handleDropdownExpand );
		this.addEventListener( 'xb:dropdown-toggle', this._handleDropdownToggle );
		this.addEventListener( 'xb:interact-out', this._handleClickOutside );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.removeEventListener( 'xb:dropdown-collapse', this._handleDropdownCollapse );
		this.removeEventListener( 'xb:dropdown-expand', this._handleDropdownExpand );
		this.removeEventListener( 'xb:dropdown-toggle', this._handleDropdownToggle );
		this.removeEventListener( 'xb:interact-out', this._handleClickOutside );
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
			this._provider.setValue( { open: this.open, disabled: this.disabled } );
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
	 * @param {Object} options
	 * @param {boolean} options.emit - should emit `xb:dropdown-expand` event. Defaults to `true`.
	 * @param {'first' | 'last'} options.position - should focus on first or last dropdown item.
	 */
	async expand( options = { emit: true, position: 'first' } ) {
		const { emit = true, position = 'first' } = options;

		this.show();
		this._controllers.boundary.activate();

		/**
		 * this prevents that, when we expand the menu when the user presses <Enter> - the
		 * focus applied to the floating element, which goes to the first dropdown item - from triggering
		 * the action of that first dropdown item.
		 */
		window.setTimeout( () => {
			this.floating.focus();
			this.floating._controller.focus.focus( position );
		}, 150 );

		if ( emit ) {
			this.emit( 'xb:dropdown-expand' );
		}
	}

	/**
	 * Collapse dropdown menu.
	 * @param {Object} options
	 * @param {boolean} options.emit - should emit `xb:dropdown-collapse` event. Defaults to `true`.
	 */
	async collapse( { emit } = { emit: true } ) {
		this.hide();
		this._controllers.boundary.deactivate();

		window.setTimeout( () => {
			this.floating.blur(); // forcing clear focus
			this.reference.focus();
		}, 0 );

		if ( emit ) {
			this.emit( 'xb:dropdown-collapse' );
		}
	}

	/**
	 * Toggle dropdown menu.
	 * @param {Object} options
	 * @param {boolean} options.emit - should emit `xb:dropdown-expand` or `xb-dropdown-collapse` event. Defaults to `true`.
	 */
	toggle( { emit } = { emit: true } ) {
		if ( this.open ) {
			this.collapse( { emit } );
		} else {
			this.expand( { emit } );
		}
	}

	/**
	 *
	 * @param {CustomEvent<'up' | 'down'>} event
	 */
	_handleDropdownExpand = ( event ) => {
		const { detail } = event;
		this.expand( { emit: false, position: detail === 'up' ? 'last' : 'first' } );
	};

	_handleDropdownCollapse = () => {
		this.collapse( { emit: false } );
	};

	_handleDropdownToggle = () => {
		this.toggle( { emit: false } );
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
 * @typedef {import('./interaction-boundary').InteractionBoundary} InteractionBoundary
 */
