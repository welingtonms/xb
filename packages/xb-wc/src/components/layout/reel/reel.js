import { html } from 'lit/static-html.js';
import { customElement } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import withClassy from '@welingtonms/classy';

import { sided } from '../../../common/prop-toolset';
import PolymorphicElementMixin from '../../../mixins/polymorphic';
import BaseLayout from '../base-layout';

import styles from './reel.styles';

/**
 * @class
 * @mixes PolymorphicElementMixin
 */
@customElement( 'xb-reel' )
export class ReelLayout extends BaseLayout {
	element = createRef();

	static styles = [ styles() ];

	connectedCallback() {
		super.connectedCallback();

		console.debug( '[xb-reel]', 'connectedCallback' );
		// TODO: should we do this separately and reuse here?
		this.resizeObserver = new ResizeObserver( ( entries ) => {
			console.debug( '[xb-reel]', 'resizeObserver' );
			this._toggleOverflowClass( entries[ 0 ].target );
		} );

		this.mutationObserver = new MutationObserver( ( entries ) => {
			console.debug( '[xb-reel]', 'mutationObserver' );
			this._toggleOverflowClass( entries[ 0 ].target );
		} );
	}

	firstUpdated() {
		super.firstUpdated();

		console.log( 'connectedCallback', this.element );
		this.resizeObserver.observe( this.element.value );
		this.mutationObserver.observe( this.element.value, { childList: true } );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		console.debug( '[xb-reel]', 'disconnectedCallback' );
		this.resizeObserver.disconnect();
		this.mutationObserver.disconnect();
	}

	_toggleOverflowClass( elem ) {
		console.debug( '[xb-reel]', elem.scrollWidth > elem.clientWidth );
		elem.classList.toggle( 'is-overflowing', elem.scrollWidth > elem.clientWidth );
	}

	render() {
		const { classy } = withClassy( {} );
		const tag = this.tag;

		return html`
			<${ tag }
				${ ref( this.element ) }
				class=${ classy(
					'reel',
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
 * @typedef {Object} ReelAttributes
 * @property {BorderlessProp} borderless
 * @property {PaddinglessProp} paddingless
 * @property {HTMLTag} as
 */
