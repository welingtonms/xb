import { html } from 'lit';
import { property } from 'lit/decorators.js';

import { XBElement } from '../xb-element';

export class BaseLayout extends XBElement {
	/**
	 * Determine borders to be supressed.
	 * @type {BaseLayoutAttributes['borderless']}
	 */
	@property( { type: String, reflect: true } ) accessor borderless;

	/**
	 * Determine paddings to be supressed.
	 * @type {BaseLayoutAttributes['paddingless']}
	 */
	@property( { type: String, reflect: true } ) accessor paddingless;

	constructor() {
		super();

		this.borderless = 'none';
		this.paddingless = 'none';
	}

	/**
	 * Register a layout **Tag** with the custom element registry.
	 * @param {{
	 *  name: string,
	 *  type: typeof BaseLayout,
	 *  registry?: CustomElementRegistry,
	 * }} config
	 */
	static defineLayout( config ) {
		const { name, type, registry, ...rest } = config;

		XBElement.define( { name, type, registry, ...rest } );
	}

	render() {
		return html`
			<slot></slot>
		`;
	}
}

/**
 * @typedef {import('../../utils/prop-types').BorderlessProp} BorderlessProp
 * @typedef {import('../../utils/prop-types').PaddinglessProp} PaddinglessProp
 */

/**
 * @typedef {Object} BaseLayoutAttributes
 * @property {BorderlessProp} [borderless] - sides where the border should be suppressed.
 * @property {PaddinglessProp} [paddingless] - sides where the padding should be suppressed.
 */
