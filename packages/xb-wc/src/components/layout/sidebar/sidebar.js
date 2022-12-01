import { html } from 'lit/static-html.js';
import withClassy from '@welingtonms/classy';

import { sided } from '../../../common/prop-toolset';
import PolymorphicElementMixin from '../../../mixins/polymorphic';
import BaseLayout from '../base-layout';

import styles from './sidebar.styles';

/**
 * @class
 * @mixes PolymorphicElementMixin
 */
export class SidebarLayout extends BaseLayout {
	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * Where the side content should be positioned.
			 * @type {SidebarAttributes['sidePosition']}
			 */
			sidePosition: {
				attribute: 'side-position',
			},
		};
	}

	constructor() {
		super();

		/** @type {SidebarAttributes['sidePosition']} */
		this.sidePosition = 'left';
	}

	render() {
		const { when, classy } = withClassy( { sidePosition: this.sidePosition } );
		const tag = this.tag;

		return html`
			<${ tag }
				class=${ classy(
					'sidebar',
					{
						'-side-on-the-left': when( { sidePosition: 'left' } ),
						'-side-on-the-right': when( { sidePosition: 'right' } ),
					},
					sided( 'border', this.borderless ),
					sided( 'padding', this.paddingless )
				) }
			>
				<slot></slot>
			</${ tag }>
		`;
	}
}

window.customElements.define( 'xb-sidebar', SidebarLayout );

/**
 * @typedef {'left' | 'right'} SidePosition
 */

/**
 * @typedef {import('../../../common/prop-types').BorderlessProp} BorderlessProp
 * @typedef {import('../../../common/prop-types').PaddinglessProp} PaddinglessProp
 * @typedef {import('../../../common/prop-types').HTMLTag} HTMLTag
 */

/**
 * @typedef {Object} SidebarAttributes
 * @property {BorderlessProp} borderless
 * @property {PaddinglessProp} paddingless
 * @property {HTMLTag} as
 * @property {SidePosition} sidePosition
 */
