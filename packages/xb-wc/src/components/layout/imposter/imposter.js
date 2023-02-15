import { html } from 'lit/static-html.js';
import { customElement } from 'lit/decorators.js';
import withClassy from '@welingtonms/classy';

import { sided } from '../../../common/prop-toolset';
import PolymorphicElementMixin from '../../../mixins/polymorphic';
import BaseLayout from '../base-layout';

import styles from './imposter.styles';

/**
 * @class
 * @mixes PolymorphicElementMixin
 */
@customElement( 'xb-imposter' )
export class ImposterLayout extends BaseLayout {
	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * imposter positioning variant.
			 * @type {ImposterAttributes['variant']}
			 */
			variant: { type: String },

			/**
			 * Should the imposter breakout of the page content overflow.
			 * @type {ImposterAttributes['breakout']}
			 */
			breakout: { type: Boolean },
		};
	}

	constructor() {
		super();

		/** @type {ImposterAttributes['variant']} */
		this.variant = 'absolute';

		/** @type {ImposterAttributes['breakout']} */
		this.breakout = false;
	}

	render() {
		const { when, classy } = withClassy( {
			variant: this.variant,
			breakout: this.breakout,
		} );
		const tag = this.tag;

		return html`
			<${ tag }
				class=${ classy(
					'imposter',
					{
						'-absolute': when( { variant: 'absolute' } ),
						'-fixed': when( { variant: 'fixed' } ),
						'-breakout': when( { breakout: true } ),
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

/**
 * @typedef {import('../../../common/prop-types').BorderlessProp} BorderlessProp
 * @typedef {import('../../../common/prop-types').PaddinglessProp} PaddinglessProp
 * @typedef {import('../../../common/prop-types').HTMLTag} HTMLTag
 */

/**
 * @typedef {('absolute' | 'fixed')} ImposterVariant
 */

/**
 * @typedef {Object} ImposterAttributes
 * @property {BorderlessProp} borderless
 * @property {PaddinglessProp} paddingless
 * @property {HTMLTag} as
 * @property {ImposterVariant} variant
 * @property {boolean} breakout
 */
