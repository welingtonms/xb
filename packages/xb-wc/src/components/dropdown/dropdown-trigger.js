import { html } from 'lit';
import withClassy from '@welingtonms/classy';

import XBElement from '../../common/xb-element';
import styles from './dropdown-trigger.styles';

import '../button';

export class DropdownTrigger extends XBElement {
	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * Is the dropdown menu open.
			 * @type {DropdownTriggerAttributes['open']}
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

		this.setAttribute( 'slot', 'trigger' );
	}

	render() {
		const { classy, when } = withClassy( { open: this.open } );

		return html`
			<xb-button
				class="${ classy( 'dropdown-trigger', {
					'is-open': when( { open: true } ),
				} ) }"
				emphasis="flat"
			>
				<slot></slot>
				<xb-icon
					class=${ classy( 'indicator', {
						'is-open': when( { open: true } ),
					} ) }
					slot="trailing"
					name="expand-more"
					size="16"
				></xb-icon>
			</xb-button>
		`;
	}

	_handleClick() {
		const options = {
			composed: true,
			detail: { action: 'toggle' },
		};

		this.emit( 'xb-dropdown-trigger', options );
	}
}

window.customElements.define( 'xb-dropdown-trigger', DropdownTrigger );

/**
 * @typedef {Object} DropdownTriggerAttributes
 * @property {boolean} [open] - Is the dropdown menu open.
 */
