import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { WithIDMixin } from '../../mixins/with-id';
import { XBElement } from '../xb-element';
import { getTextContent } from '../../utils/slot';

import { listItemStyles } from './base-list.styles';

import '../icon/icon.define';

export class ListItem extends WithIDMixin( XBElement, 'xb-list-item' ) {
	static styles = [ listItemStyles() ];

	/**
	 * @type {ListItemAttributes['disabled']}
	 */
	@property( { type: Boolean, reflect: true } ) accessor disabled;

	/**
	 * @type {ListItemAttributes['selected']}
	 */
	@property( { type: Boolean, reflect: true } ) accessor selected;

	/**
	 * @type {ListItemAttributes['value']}
	 */
	@property( { type: String } ) accessor value;

	/**
	 * @type {ListItemAttributes['icon']}
	 */
	@property( { type: String, reflect: true } ) accessor icon;

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-list-item', ...config, type: ListItem } );
	}

	constructor() {
		super();

		this.disabled = false;
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'role', 'option' );
		this.setAttribute( 'tabindex', '-1' );

		if ( ! this.value ) {
			this.value = this.#resolveValue();
		}
	}

	/**
	 * @param {import('lit').PropertyValues} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'disabled' ) ) {
			this.setAttribute( 'aria-disabled', String( Boolean( this.disabled ) ) );
		}

		if ( changedProperties.has( 'selected' ) ) {
			this.setAttribute( 'aria-selected', this.selected ? 'true' : 'false' );
		}
	}

	text() {
		/** @type {HTMLSlotElement | null} */
		const slot = this.renderRoot.querySelector( 'slot:not([name])' );

		return getTextContent( slot ) || String( this.textContent ?? '' ).trim();
	}

	render() {
		return html`
			<slot name="leading">
				${ this.icon
					? html`
							<xb-icon name="${ this.icon }"></xb-icon>
					  `
					: nothing }
			</slot>
			<slot></slot>
			<slot name="trailing"></slot>
		`;
	}

	#resolveValue() {
		const label = this.text();

		return label.toLowerCase().replace( /\s+/g, '-' ) || this.id;
	}
}

/**
 * @typedef {import('../icon').IconName} IconName
 */

/**
 * @typedef {Object} ListItemAttributes
 * @property {boolean} disabled
 * @property {boolean} selected
 * @property {string} value
 * @property {IconName} [icon]
 */
