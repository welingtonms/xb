import { html } from 'lit/static-html.js';
import withClassy from '@welingtonms/classy';

import { sided } from '../../../common/prop-toolset';
import PolymorphicElementMixin from '../../../mixins/polymorphic';
import BaseLayout from '../base-layout';

import styles from './switcher.styles';

/**
 * @class
 * @mixes PolymorphicElementMixin
 */
export class SwitcherLayout extends BaseLayout {
	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * Determine borders to be supressed.
			 * @type {SwitcherAttributes['limit']}
			 */
			limit: {
				type: Number,
			},
		};
	}

	constructor() {
		super();

		/**
		 * @type {SwitcherAttributes['limit']}
		 */
		this.limit = 4;
	}

	render() {
		const { classy } = withClassy( {} );
		const tag = this.tag;

		return html`
			<style>
				::slotted( *:nth-last-child( n + ${ this.limit } ) ) {
					flex-basis: 100%;
				}

				::slotted( *:nth-last-child( n + ${ this.limit } ) ~ * ) {
					flex-basis: 100%;
				}
			</style>
			<${ tag }
				class=${ classy(
					'switcher',
					sided( 'border', this.borderless ),
					sided( 'padding', this.paddingless )
				) }
			>
				<slot></slot>
			</${ tag }>
		`;
	}
}

window.customElements.define( 'xb-switcher', SwitcherLayout );

/**
 * @typedef {import('../../../common/prop-types').BorderlessProp} BorderlessProp
 * @typedef {import('../../../common/prop-types').PaddinglessProp} PaddinglessProp
 * @typedef {import('../../../common/prop-types').HTMLTag} HTMLTag
 */

/**
 * @typedef {Object} SwitcherAttributes
 * @property {BorderlessProp} borderless
 * @property {PaddinglessProp} paddingless
 * @property {HTMLTag} as
 * @property {number} limit
 */
