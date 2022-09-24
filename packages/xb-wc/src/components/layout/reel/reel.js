import { LitElement, html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import withClassy from '@welingtonms/classy';

import { sided } from '../../../common/prop-toolset';
import { converterDirectionFromAttribute } from '../layout.helpers';
import styles from './reel.styles';

export class ReelLayout extends LitElement {
	element = createRef();

	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * Determine borders to be supressed.
			 * @type {import('../../../common/prop-types').BorderlessProp} borderless
			 */
			borderless: {
				// type: String | Boolean,
				converter: {
					fromAttribute: converterDirectionFromAttribute,
				},
			},

			/**
			 * Determine paddings to be supressed.
			 * @type {import('../../../common/prop-types').PaddinglessProp} paddingless
			 */
			paddingless: {
				// type: String | Boolean,
				converter: {
					fromAttribute: converterDirectionFromAttribute,
				},
			},
		};
	}

	constructor() {
		super();

		this.borderless = 'none';
		this.paddingless = 'none';
	}

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
		elem.classList.toggle(
			'is-overflowing',
			elem.scrollWidth > elem.clientWidth
		);
	}

	render() {
		const { classy } = withClassy( {} );

		// console.log(
		// 	'border:',
		// 	this.borderless,
		// 	'padding:',
		// 	this.paddingless,
		// 	'|',
		// 	classy(
		// 		'xb-reel',
		// 		sided( 'border', this.borderless ),
		// 		sided( 'padding', this.paddingless )
		// 	)
		// );

		return html`
			<div
				${ ref( this.element ) }
				class=${ classy(
					'reel',
					sided( 'border', this.borderless ),
					sided( 'padding', this.paddingless )
				) }
			>
				<slot></slot>
			</div>
		`;
	}
}

window.customElements.define( 'xb-reel', ReelLayout );

// @ts-ignore
// declare global {
//   interface HTMLElementTagNameMap {
//     "xb-reel": ReelLayout;
//   }
// }
