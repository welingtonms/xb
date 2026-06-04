import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { XBElement } from '../xb-element';
import styles from './icon.styles';
import Icons from './icons';

export class Icon extends XBElement {
	static styles = [ styles() ];

	/**
	 * Icon name.
	 * @type {IconAttributes['name']}
	 */
	@property( { type: String, reflect: true } ) accessor name;

	/**
	 * Size for the rendered icon.
	 * @type {IconAttributes['size']}
	 */
	@property( { type: Number } ) accessor size;

	/**
	 * Color for the rendered icon.
	 * @type {IconAttributes['color']}
	 */
	@property( { type: String } ) accessor color;

	/**
	 * Rotate the rendered icon.
	 * @type {IconAttributes['rotate']}
	 */
	@property( { type: Number } ) accessor rotate;

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

		if ( changedProperties.has( 'color' ) ) {
			if ( this.color ) {
				this.style.setProperty( '--xb-icon-color', this.color );
			} else {
				this.style.removeProperty( '--xb-icon-color' );
			}
		}

		if ( changedProperties.has( 'rotate' ) ) {
			if ( this.rotate ) {
				this.style.setProperty( '--xb-icon-rotate', `${ this.rotate }deg` );
			} else {
				this.style.removeProperty( '--xb-icon-rotate' );
			}
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
 * @property {string} color
 * @property {number} rotate
 */
