import { property } from 'lit/decorators.js';
import { html } from 'lit';

import XBElement from '../../common/xb-element';

import styles from './base-button.styles';

/**
 * This class contains the basic setup for a button-like component.
 * @class
 */
export class BaseButton extends XBElement {
	static styles = [ styles() ];

	/**
	 * Determine borders to be supressed.
	 * @type {BaseButtonAttributes['borderless']}
	 */
	@property( { type: String } ) borderless;

	/**
	 * Should the button be disabled.
	 * @type {BaseButtonAttributes['disabled']}
	 */
	@property( { type: Boolean, reflect: true } ) disabled;

	/**
	 * Determine paddings to be supressed.
	 * @type {BaseButtonAttributes['paddingless']}
	 */
	@property( { type: String } ) paddingless;

	/**
	 * Button size.
	 * @type {BaseButtonAttributes['size']}
	 */
	@property( { type: String, reflect: true } ) size;

	constructor() {
		super();

		this.borderless = 'none';
		this.disabled = false;

		this.paddingless = 'none';
		this.size = 'small';
	}

	/**
	 * @param {import('lit').PropertyValues<this>} changedProperties
	 */
	update( changedProperties ) {
		super.update( changedProperties );

		if ( changedProperties.has( 'disabled' ) ) {
			this.setBooleanAttribute( 'aria-disabled', this.disabled );

			/**
			 * FIXME: according to https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled
			 * "there can be instances where elements need to be exposed as disabled, but are still available for users to find when navigating via the Tab key"
			 */
			this.setAttribute( 'tabindex', this.disabled ? '-1' : '0' );
		}
	}

	static renderButton = function () {
		return html`
			<slot name="leading"></slot>
			<slot></slot>
			<slot name="trailing"></slot>
		`;
	};
}

/**
 * @typedef {('text' | 'ghost' | 'flat')} ButtonEmphasis
 * @typedef {import('../../styles/size.styles').ElementSize} ElementSize
 * @typedef {import('../../common/prop-types').BorderlessProp} BorderlessProp
 * @typedef {import('../../common/prop-types').PaddinglessProp} PaddinglessProp
 */

/**
 * @typedef {Object} BaseButtonAttributes
 * @property {BorderlessProp} borderless
 * @property {PaddinglessProp} paddingless
 * @property {boolean} disabled
 * @property {ElementSize} size
 */
