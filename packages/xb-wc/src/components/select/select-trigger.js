import { html } from 'lit';
import withClassy from '@welingtonms/classy';

import XBElement from '../../common/xb-element';
import styles from './select-trigger.styles';

import '../form/text-input';

export class SelectTrigger extends XBElement {
	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * Is the dropdown menu open.
			 * @type {SelectTriggerAttributes['open']}
			 */
			open: {
				type: Boolean,
				reflect: true,
			},
		};
	}

	constructor() {
		super();
	}

	connectedCallback() {
		super.connectedCallback();

		// this.setAttribute( 'slot', 'trigger' );
	}

	render() {
		const { classy, when } = withClassy( { open: this.open } );

		return html`
			<xb-text-input
				class="${ classy( 'select-trigger', {
					'is-open': when( { open: true } ),
				} ) }"
			>
				<slot></slot>
				<xb-button
					slot="trailing"
					emphasis="text"
					size="extra-small"
					paddingless
				>
					<xb-icon
						class=${ classy( 'indicator', {
							'is-open': when( { open: true } ),
						} ) }
						name="expand-more"
						size="16"
					></xb-icon>
				</xb-button>
			</xb-text-input>
		`;
	}
}

window.customElements.define( 'xb-select-trigger', SelectTrigger );

/**
 * @typedef {Object} SelectTriggerAttributes
 * @property {boolean} [open] - Is the dropdown menu open.
 */
