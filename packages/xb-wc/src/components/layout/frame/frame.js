import { html } from 'lit/static-html.js';
import { customElement } from 'lit/decorators.js';
import withClassy from '@welingtonms/classy';

import { sided } from '../../../common/prop-toolset';
import PolymorphicElementMixin from '../../../mixins/polymorphic';
import BaseLayout from '../base-layout';

import styles from './frame.styles';

/**
 * @class
 * @mixes PolymorphicElementMixin
 */
@customElement( 'xb-frame' )
export class FrameLayout extends BaseLayout {
	static styles = [ styles() ];

	render() {
		const { classy } = withClassy( {} );
		const tag = this.tag;

		return html`
			<${ tag }
				class=${ classy(
					'frame',
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
 * @typedef {Object} FrameAttributes
 * @property {BorderlessProp} borderless
 * @property {PaddinglessProp} paddingless
 * @property {HTMLTag} as
 */
