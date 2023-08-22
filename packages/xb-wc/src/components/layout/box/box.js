import { html } from 'lit/static-html.js';
import { customElement } from 'lit/decorators.js';
import withClassy from '@welingtonms/classy';

import { sided } from '../../../common/prop-toolset';
import BaseLayout from '../base-layout';

import styles from './box.styles';

/**
 * @class
 * @mixes withPolymorphicTag
 */
@customElement( 'xb-box' )
export class BoxLayout extends BaseLayout {
	static styles = [ styles() ];

	render() {
		const { classy } = withClassy( {} );
		const tag = this.tag;

		return html`
			<${ tag }
				class=${ classy(
					'box',
					sided( 'border', this.borderless ),
					sided( 'padding', this.paddingless )
				) }
			>
				<slot name="leading"></slot>
				<slot></slot>
				<slot name="trailing"></slot>
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
 * @typedef {Object} BoxAttributes
 * @property {BorderlessProp} borderless
 * @property {PaddinglessProp} paddingless
 * @property {HTMLTag} as
 */
