import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import Icons from '@welingtonms/xb-icons';

import styles from './icon.styles';
import { XBElement } from '../../common/xb-element';

export class Icon extends XBElement {
	static styles = [ styles() ];

	/**
	 * Icon name.
	 * @type {IconAttributes['name']}
	 */
	@property( { type: String } ) accessor name;

	/**
	 * Size for the rendered icon.
	 * @type {IconAttributes['size']}
	 */
	@property( { type: Number } ) accessor size;

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-icon', ...config, type: Icon } );
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'aria-hidden', 'true' );
	}

	/**
	 *
	 * @param {import("lit").PropertyValues} changedProperties
	 */
	update( changedProperties ) {
		if ( changedProperties.has( 'size' ) ) {
			this.style.setProperty( '--xb-icon-size', `${ parseInt( this.size ) || 16 }px` );
		}

		super.update( changedProperties );
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
