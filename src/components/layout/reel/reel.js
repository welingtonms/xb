import { html } from 'lit';

import { XBElement } from '../../xb-element';
import BaseLayout from '../base-layout';

import styles from './reel.styles';

export class ReelLayout extends BaseLayout {
	static styles = [ styles() ];

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define(config) {
		XBElement.define({ name: 'xb-reel', ...config, type: ReelLayout });
	}

	connectedCallback() {
		super.connectedCallback();

		// TODO: should we do this separately and reuse here?
		this.resizeObserver = new ResizeObserver( ( entries ) => {
			console.debug( '[xb-reel]', 'resizeObserver' );
			this._toggleOverflowClass( entries[ 0 ].target );
		} );

		this.mutationObserver = new MutationObserver( ( entries ) => {
			console.debug( '[xb-reel]', 'mutationObserver' );
			this._toggleOverflowClass( entries[ 0 ].target );
		} );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		console.debug( '[xb-reel]', 'disconnectedCallback' );
		this.resizeObserver.disconnect();
		this.mutationObserver.disconnect();
	}

	firstUpdated() {
		super.firstUpdated();

		console.log( 'connectedCallback', this.element );
		this.resizeObserver.observe( this );
		this.mutationObserver.observe( this, { childList: true } );
	}

	_toggleOverflowClass( elem ) {
		console.debug( '[xb-reel]', elem.scrollWidth > elem.clientWidth );
		elem.classList.toggle( 'is-overflowing', elem.scrollWidth > elem.clientWidth );
	}

	render() {
		return html`
			<slot></slot>
		`;
	}
}

/**
 * @typedef {import('../base-layout').BaseLayoutAttributes} BaseLayoutAttributes
 */

/**
 * @typedef {BaseLayoutAttributes} ReelAttributes
 */
