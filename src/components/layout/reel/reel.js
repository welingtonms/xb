import { BaseLayout } from '../base-layout';

import styles from './reel.styles';

export class ReelLayout extends BaseLayout {
	static styles = [ styles() ];

	/**
	 * @param {{
	 *  name?: string,
	 *  registry?: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		BaseLayout.defineLayout( { name: 'xb-reel', type: ReelLayout, ...config } );
	}

	connectedCallback() {
		super.connectedCallback();

		// TODO: should we do this separately and reuse here?
		this.resizeObserver = new ResizeObserver( ( entries ) => {
			this.#toggleOverflowClass( entries[ 0 ].target );
		} );

		this.mutationObserver = new MutationObserver( ( entries ) => {
			this.#toggleOverflowClass( entries[ 0 ].target );
		} );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.resizeObserver.disconnect();
		this.mutationObserver.disconnect();
	}

	firstUpdated() {
		super.firstUpdated();

		this.resizeObserver.observe( this );
		this.mutationObserver.observe( this, { childList: true } );
	}

	#toggleOverflowClass( elem ) {
		elem.classList.toggle( 'is-overflowing', elem.scrollWidth > elem.clientWidth );
	}
}

/**
 * @typedef {import('../base-layout').BaseLayoutAttributes} BaseLayoutAttributes
 */

/**
 * @typedef {BaseLayoutAttributes} ReelAttributes
 */
