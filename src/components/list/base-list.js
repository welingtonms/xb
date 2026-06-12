import { html } from 'lit';
import { property } from 'lit/decorators.js';

import { XBElement } from '../xb-element';

import styles from './base-list.styles';

/**
 * Base list host markup without pattern controllers.
 */
export class BaseList extends XBElement {
	static styles = [ styles() ];

	/**
	 * Selection strategy for child options.
	 * @type {import('../../utils/selection').SelectionType}
	 */
	@property( { type: String } ) accessor type;

	constructor() {
		super();

		this.type = 'single';
	}

	render() {
		return html`
			<slot></slot>
		`;
	}
}

/**
 * @typedef {Object} BaseListAttributes
 * @property {import('../../utils/selection').SelectionType} type
 */
