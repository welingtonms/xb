import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import withClassy from '@welingtonms/classy';

import XBElement from '../../common/xb-element';
import styles from './badge.styles';

@customElement( 'xb-badge' )
export class Badge extends XBElement {
	static styles = [ styles() ];

	/**
	 * Badge variant.
	 * @type {BadgeAttributes['variant']}
	 */
	@property( { type: String } ) variant;

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

/**
 * @typedef {('neutral' | 'primary' | 'secondary' | 'tertiary')} BadgeVariant
 */

/**
 * @typedef {Object} BadgeAttributes
 * @property {BadgeVariant} [variant] - Badge variant.
 */
