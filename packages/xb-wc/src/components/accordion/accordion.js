import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from 'lit/decorators.js';

import XBElement from '../../common/xb-element';
import styles from './accordion.styles';

@customElement( 'xb-accordion' )
export class Accordion extends XBElement {
	static styles = [ styles() ];

	/**
	 * Should accordion be open?
	 * @type {boolean}
	 */
	@property( { type: Boolean, reflect: true } ) accessor open;

	constructor() {
		super();

		this.open = false;

		this.addEventListener( 'click', this._handleClick );
	}

	firstUpdated() {
		this.header.setAttribute( 'aria-controls', this.panel.id );
		this.panel.setAttribute( 'aria-labelledby', this.header.id );
	}

	/**
	 * @param {import('lit').PropertyValues<this>} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'open' ) ) {
			this.header.setAttribute( 'aria-expanded', this.open );
			this.panel.style.display = this.open ? 'block' : 'none';
		}
	}

	/**
	 * @type {HTMLElement}
	 */
	get header() {
		return this.querySelector( 'xb-accordion-header' );
	}

	/**
	 * @type {HTMLElement}
	 */
	get panel() {
		return this.querySelector( 'xb-accordion-panel' );
	}

	render() {
		return html`
			<slot></slot>
		`;
	}

	expand() {
		if ( this.open ) {
			return;
		}

		this.open = true;
		this.emit( 'xb:accordion-expand' );
	}

	collapse() {
		if ( ! this.open ) {
			return;
		}

		this.open = false;
		this.emit( 'xb:accordion-collapse' );
	}

	toggle() {
		if ( this.open ) {
			this.collapse();
		} else {
			this.expand();
		}
	}

	/**
	 * @param {Event} event
	 */
	_handleClick = ( event ) => {
		const { target } = event;

		if ( target.matches( 'xb-accordion-header' ) ) {
			this.toggle();
		}
	};
}
