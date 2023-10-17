import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import Icons from '@welingtonms/xb-icons';

import styles from './icon.styles';
import XBElement from '../../common/xb-element';

@customElement( 'xb-icon' )
export class Icon extends XBElement {
	static styles = [ styles() ];

	/**
	 * Icon name.
	 * @type {IconAttributes['name']}
	 */
	@property( { type: String } ) name;

	/**
	 * Size for the rendered icon.
	 * @type {IconAttributes['size']}
	 */
	@property( { type: Number } ) size;

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'aria-hidden', 'true' );
	}

	/**
	 *
	 * @param {import("lit").PropertyValues} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'size' ) ) {
			this.style.setProperty( '--xb-icon-size', `${ parseInt( this.size ) || 16 }px` );
		}
	}

	render() {
		return html`
			${ this.name in Icons ? Icons[ this.name ] : nothing }
		`;
	}
}

/**
 * @typedef {keyof Icons} IconName
 */

/**
 * @typedef {Object} IconAttributes
 * @property {IconName} name
 * @property {number} size
 */
