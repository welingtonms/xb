import { html } from 'lit';
import withClassy from '@welingtonms/classy';

import XBElement from '../../common/xb-element';
import styles from './badge.styles';

export class Badge extends XBElement {
	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * Badge variant.
			 * @type {BadgeAttributes['variant']}
			 */
			variant: { type: String },
		};
	}

	constructor() {
		super();

		/** @type {BadgeAttributes['variant']} */
		this.variant = 'neutral';
	}

	render() {
		const { when, classy } = withClassy( { variant: this.variant } );

		return html`
			<span
				class=${ classy( 'badge', {
					'-primary': when( { variant: 'primary' } ),
					'-secondary': when( { variant: 'secondary' } ),
					'-tertiary': when( { variant: 'tertiary' } ),
				} ) }
			>
				<slot></slot>
			</span>
		`;
	}
}

window.customElements.define( 'xb-badge', Badge );

/**
 * @typedef {('neutral' | 'primary' | 'secondary' | 'tertiary')} BadgeVariant
 */

/**
 * @typedef {Object} BadgeAttributes
 * @property {BadgeVariant} [variant] - Badge variant.
 */
