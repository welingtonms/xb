import { html } from 'lit';
import withClassy from '@welingtonms/classy';

import XBElement from '../../common/xb-element';

import styles from './list.styles';

export class List extends XBElement {
	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * Determine borders to be supressed.
			 * @type {ListAttributes['borderless']}
			 */
			borderless: {},

			/**
			 * Determine paddings to be supressed.
			 * @type {ListAttributes['hoverable']} paddingless
			 */
			hoverable: {
				type: Boolean,
			},

			/**
			 * Determine paddings to be supressed.
			 * @type {ListAttributes['striped']} paddingless
			 */
			striped: {
				type: Boolean,
			},
		};
	}

	constructor() {
		super();

		/**
		 * @type {ListAttributes['borderless']}
		 */
		this.borderless = [ 'horizontal', 'top' ];
		this.hoverable = false;
		this.striped = false;
	}

	/**
	 * @param {import('lit').PropertyValues<ToggleGroup>} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'borderless' ) ) {
			this._getItems().forEach( ( item ) => {
				item.borderless = this.borderless;
			} );
		}

		if ( changedProperties.has( 'hoverable' ) ) {
			this._getItems().forEach( ( item ) => {
				item.hoverable = this.hoverable;
			} );
		}

		if ( changedProperties.has( 'striped' ) ) {
			this._getItems().forEach( ( item ) => {
				item.striped = this.striped;
			} );
		}
	}

	render() {
		const { classy } = withClassy( {} );

		return html`
			<xb-stack
				class=${ classy( 'list', {
					'-hoverable': this.hoverable,
					'-striped': this.striped,
				} ) }
				borderless=${ this.borderless }
			>
				<slot></slot>
			</xb-stack>
		`;
	}

	/**
	 * @returns {import('./list-item').ListItem[]}
	 */
	_getItems() {
		this._defaultSlot =
			this._defaultSlot ?? this.shadowRoot.querySelector( 'slot' );

		return [ ...this._defaultSlot.assignedElements() ];
	}
}

window.customElements.define( 'xb-list', List );

/**
 * @typedef {import('../../common/prop-types').BorderlessProp} BorderlessProp
 * @typedef {import('../../common/prop-types').HTMLTag} HTMLTag
 */

/**
 * @typedef {Object} ListAttributes
 * @property {HTMLTag} as - List tag to render, defaults to 'section'.
 * @property {BorderlessProp} borderless - Should list items be borderless
 * @property {boolean} hoverable - Should the list item be hoverable?
 * @property {boolean} striped - Should the list be striped?
 */