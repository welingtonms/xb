import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property } from 'lit/decorators.js';

import { hasSlottedContent } from '../../utils/slot';
import { XBElement } from '../xb-element';
import { badgeStyles } from './badge.styles';

import '../icon/icon.define';

export class Badge extends XBElement {
	static styles = [ badgeStyles() ];

	/**
	 * Badge color.
	 * @type {BadgeAttributes['color']}
	 */
	@property( { type: String, reflect: true } ) accessor color;

	/** @type {BadgeAttributes['size']} */
	@property( { type: String, reflect: true } ) accessor size;

	/**
	 * Badge icon.
	 * @type {BadgeAttributes['icon']}
	 */
	@property( { type: String, reflect: true } ) accessor icon;

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-badge', ...config, type: Badge } );
	}

	constructor() {
		super();

		/** @type {BadgeAttributes['color']} */
		this.color = 'blue';

		/** @type {BadgeAttributes['size']} */
		this.size = 'sm';
	}

	render() {
		return html`
			<span
				class=${ classMap( {
					badge: true,
					'has-slotted-content': this.#hasSlottedContent(),
				} ) }
			>
				<slot name="leading">${ this.icon ? html`<xb-icon name="${ this.icon }"></xb-icon>` : nothing }</slot>
				<slot></slot>
				<slot name="trailing"></slot>
			</span>
		`;
	}

	#hasSlottedContent = () => {
		return hasSlottedContent( this.renderRoot, '[slot="leading"]', '[slot="trailing"]' );
	};
}


/**
 * @typedef {import('../icon').IconName} IconName
 */

/**
 * @typedef {('text' | 'icon')} BadgeVariant
 * @typedef {('gray' | 'primary' | 'error' | 'warning' | 'success' | 'blue-gray' | 'blue-light' | 'blue' | 'indigo' | 'purple' | 'pink' | 'rose' | 'orange')} BadgeColor
 * @typedef {('sm' | 'md' | 'lg')} BadgeSize
 */

/**
 * @typedef {Object} BadgeAttributes
 * @property {BadgeColor} [color] - Badge color.
 * @property {BadgeSize} [size] - Badge size.
 * @property {IconName} [icon] - Icon to display in the badge leading slot.
 */
