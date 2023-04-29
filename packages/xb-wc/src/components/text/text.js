import { html } from 'lit/static-html.js';
import { customElement, property } from 'lit/decorators.js';
import withClassy from '@welingtonms/classy';

import PolymorphicElementMixin from '../../mixins/polymorphic';
import XBElement from '../../common/xb-element';
import styles from './text.styles';

/**
 * @class
 * @mixes PolymorphicElementMixin
 */
@customElement( 'xb-text' )
export class Text extends PolymorphicElementMixin( XBElement ) {
	static styles = [ styles() ];

	/**
	 * Typography variant.
	 * @type {TextAttributes['variant']}
	 */
	@property( { type: String, reflect: true } ) variant;

	/**
	 * Alignment
	 */
	@property( { type: String } ) align;

	constructor() {
		super();

		this.variant = 'body-1';

		this.align = 'left';

		/** @type {TextAttributes['as']} */
		this.as = 'span';
	}

	render() {
		const { when, classy } = withClassy( { variant: this.variant, align: this.align } );

		return html`
			<${ this.tag }
				class=${ classy(
					'text',
					{
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
					},
					{
						'-align-left': when( { align: 'left' } ),
						'-align-center': when( { align: 'center' } ),
						'-align-right': when( { align: 'right' } ),
					}
				) }
			>
				<slot></slot>
			</${ this.tag }>
		`;
	}
}

/**
 * @typedef {import('../../common/prop-types').HTMLTag} HTMLTag
 * @typedef {('h-1' | 'h-2' | 'h-3' | 'h-4' | 'h-5' | 'h-6' | 'subtitle-1' | 'subtitle-2' | 'body-1' | 'body-2' | 'button' | 'caption' | 'overline')} TextVariant
 * @typedef {('left' | 'center' | 'right')} TextAlign
 */

/**
 * @typedef {Object} TextAttributes
 * @property {TextVariant} variant
 * @property {TextAlign} align
 * @property {HTMLTag} as
 */
