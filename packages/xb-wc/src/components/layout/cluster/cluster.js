import { html } from 'lit/static-html.js';
import withClassy from '@welingtonms/classy';

import { sided } from '../../../common/prop-toolset';
import PolymorphicElementMixin from '../../../mixins/polymorphic';
import BaseLayout from '../base-layout';

import styles from './cluster.styles';

/**
 * @class
 * @mixes PolymorphicElementMixin
 */
export class ClusterLayout extends BaseLayout {
	static styles = [ styles() ];

	static get properties() {
		return {};
	}

	constructor() {
		super();
	}

	render() {
		const { classy } = withClassy( {} );
		const tag = this.tag;

		return html`
			<${ tag }
				class=${ classy(
					'cluster',
					sided( 'border', this.borderless ),
					sided( 'padding', this.paddingless )
				) }
			>
				<slot></slot>
			</${ tag }>
		`;
	}
}

window.customElements.define( 'xb-cluster', ClusterLayout );

/**
 * @typedef {import('../../../common/prop-types').BorderlessProp} BorderlessProp
 * @typedef {import('../../../common/prop-types').PaddinglessProp} PaddinglessProp
 * @typedef {import('../../../common/prop-types').HTMLTag} HTMLTag
 */

/**
 * @typedef {Object} ClusterAttributes
 * @property {BorderlessProp} borderless
 * @property {PaddinglessProp} paddingless
 * @property {HTMLTag} as
 */
