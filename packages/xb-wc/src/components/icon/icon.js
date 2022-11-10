import { html } from 'lit';
import Icons from '@welingtonms/xb-icons';

import styles from './icon.styles';
import XBElement from '../../common/xb-element';

export class Icon extends XBElement {
	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * Icon name.
			 * @type {IconAttributes['name']}
			 */
			name: { type: String },

			/**
			 * Size for the rendered icon.
			 * @type {IconAttributes['size']}
			 */
			size: { type: Number },
		};
	}

	constructor() {
		super();

		/** @type {IconAttributes['name']} */
		this.name = 'star';
	}

	/**
	 *
	 * @param {import("lit").PropertyValues} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'size' ) ) {
			this.style.setProperty(
				'--xb-icon-size',
				`${ parseInt( this.size ) || 16 }px`
			);
		}
	}

	render() {
		return html`${ Icons[ this.name ] }`;
	}
}

window.customElements.define( 'xb-icon', Icon );

/**
 * @typedef {keyof Icons} IconName
 */

/**
 * @typedef {Object} IconAttributes
 * @property {IconName} name
 * @property {number} size
 */
