import { html } from 'lit/static-html.js';
import { customElement, property } from 'lit/decorators.js';
import withClassy from '@welingtonms/classy';

import withPolymorphicTag from '../../mixins/polymorphic';
import XBElement from '../../common/xb-element';
import styles from './text.styles';

/**
 * @class
 * @mixes withPolymorphicTag
 */
@customElement( 'xb-text' )
export class Text extends withPolymorphicTag( XBElement ) {
	static styles = [ styles() ];

	/**
	 * Typography variant.
	 * @type {TextAttributes['variant']}
	 */
	@property( { type: String, reflect: true } ) variant;
	constructor() {
		super();

		this.variant = 'body-1';

		/** @type {TextAttributes['as']} */
		this.as = 'span';
	}

	render() {
		const { when, classy } = withClassy( { variant: this.variant } );

		return html`
			<${ this.tag }
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
			</${ this.tag }>
		`;
	}
}

/**
 * @typedef {import('../../common/prop-types').HTMLTag} HTMLTag
 * @typedef {('h-1' | 'h-2' | 'h-3' | 'h-4' | 'h-5' | 'h-6' | 'subtitle-1' | 'subtitle-2' | 'body-1' | 'body-2' | 'button' | 'caption' | 'overline')} TextVariant
 */

/**
 * @typedef {Object} TextAttributes
 * @property {TextVariant} variant
 * @property {HTMLTag} as
 */
