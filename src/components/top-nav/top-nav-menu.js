import { html } from 'lit';
import { property } from 'lit/decorators.js';

import { XBElement } from '../xb-element';
import { BoundaryController } from '../../controllers/boundary';

import '../icon/icon.define';
import { topNavMenuStyles } from './top-nav.styles';

const HOVER_DELAY_MS = 150;

/**
 * A submenu for the top-nav: trigger + panel.
 * Desktop (default): hover to open, panel is positioned below trigger.
 * Mobile (expandable): click to toggle, panel is inline (accordion).
 */
export class TopNavMenu extends XBElement {
	static styles = [ topNavMenuStyles() ];

	/** @type {boolean} */
	@property( { type: Boolean, reflect: true } ) accessor open = false;

	/**
	 * When true, panel is inline (accordion) and click toggles; when false, panel is floating and hover opens.
	 * @type {boolean}
	 */
	@property( { type: Boolean, reflect: true } ) accessor expandable = false;

	/** @type {ReturnType<typeof setTimeout> | null} */
	#hoverTimeout = null;

	/** @type {BoundaryController} */
	#boundary;

	constructor() {
		super();
		this.#boundary = new BoundaryController( this );
	}

	static define( config ) {
		XBElement.define( { name: 'xb-top-nav-menu', ...config, type: TopNavMenu } );
	}

	connectedCallback() {
		super.connectedCallback();
		// this.addEventListener( 'interact-out', this.#onInteractOut );
		// this.addEventListener( 'focusin', this.#onFocusIn );
	}

	disconnectedCallback() {
		this.clearHoverTimeout();
		this.removeEventListener( 'interact-out', this.#onInteractOut );
		this.removeEventListener( 'focusin', this.#onFocusIn );
		super.disconnectedCallback();
	}

	update( changedProperties ) {
		if ( changedProperties.has( 'open' ) ) {
			this.#syncTriggerAria();
			if ( this.open && ! this.expandable ) {
				this.#boundary.activate();
			} else {
				this.#boundary.deactivate();
			}
		}

		super.update( changedProperties );
	}

	#syncTriggerAria() {
		const trigger = this.renderRoot?.querySelector( '.trigger' );
		if ( trigger ) {
			trigger.setAttribute( 'aria-expanded', this.open ? 'true' : 'false' );
		}
	}

	#clearHoverTimeout = () => {
		if ( this.#hoverTimeout != null ) {
			clearTimeout( this.#hoverTimeout );
			this.#hoverTimeout = null;
		}
	};

	clearHoverTimeout() {
		this.#clearHoverTimeout();
	}

	#onInteractOut = () => {
		if ( ! this.expandable && this.open ) {
			this.open = false;
		}
	};

	#onFocusIn = () => {
		if ( this.open && ! this.expandable ) {
			this.#boundary.activate();
		}
	};

	#onTriggerClick = () => {
		if ( this.expandable ) {
			this.open = ! this.open;
		}
	};

	#onWrapperMouseEnter = () => {
		if ( this.expandable ) return;
		this.#clearHoverTimeout();
		this.#hoverTimeout = setTimeout( () => {
			this.#hoverTimeout = null;
			this.open = true;
		}, HOVER_DELAY_MS );
	};

	#onWrapperMouseLeave = () => {
		if ( this.expandable ) return;
		this.#clearHoverTimeout();
		this.#hoverTimeout = setTimeout( () => {
			this.#hoverTimeout = null;
			this.open = false;
		}, HOVER_DELAY_MS );
	};

	render() {
		return html`
			<slot></slot>
		`;
	}
}
