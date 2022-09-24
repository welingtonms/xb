import { LitElement, html } from 'lit';
import withClassy from '@welingtonms/classy';

import styles from './text.styles';

export class Text extends LitElement {
	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * Typography variant.
			 * @type {TextVariant}
			 */
			variant: { type: String, reflect: true },
		};
	}

	constructor() {
		super();

		this.variant = 'body-1';
	}

	render() {
		const { when, classy } = withClassy( { variant: this.variant } );

		return html`
			<span
				class=${ classy( 'text', {
					'-body-1': when( { variant: 'body-1' } ),
					'-body-2': when( { variant: 'body-2' } ),
					'-button': when( { variant: 'button' } ),
					'-caption': when( { variant: 'caption' } ),
					'-h-1': when( { variant: 'h-1' } ),
					'-h-2': when( { variant: 'h-2' } ),
					'-h-3': when( { variant: 'h-3' } ),
					'-h-4': when( { variant: 'h-4' } ),
					'-h-5': when( { variant: 'h-5' } ),
					'-h-6': when( { variant: 'h-6' } ),
					'-overline': when( { variant: 'overline' } ),
					'-subtitle-1': when( { variant: 'subtitle-1' } ),
					'-subtitle-2': when( { variant: 'subtitle-2' } ),
				} ) }
			>
				<slot></slot>
			</span>
		`;
	}
}

window.customElements.define( 'xb-text', Text );

/**
 * @typedef {('h-1' | 'h-2' | 'h-3' | 'h-4' | 'h-5' | 'h-6' | 'subtitle-1' | 'subtitle-2' | 'body-1' | 'body-2' | 'button' | 'caption' | 'overline')} TextVariant
 */
