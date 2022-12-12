import { html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import withClassy from '@welingtonms/classy';

import XBElement from '../../common/xb-element';
import styles from './dropdown-trigger.styles';

import '../button';

export class DropdownTrigger extends XBElement {
	button = createRef();

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

	focus() {
		this._getButton()?.focus();
	}

	render() {
		const { classy, when } = withClassy( { open: this.open } );

		return html`
			<xb-button
				${ ref( this.button ) }
				class="${ classy( 'dropdown-trigger', {
					'is-open': when( { open: true } ),
				} ) }"
				emphasis="flat"
				@click=${ this._handleClick }
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

	/**
	 * @returns {HTMLButtonElement}
	 */
	_getButton() {
		return this.button.value;
	}

	_handleClick() {
		const options = {
			composed: true,
			detail: { action: 'toggle' },
		};

		this.emit( 'xb-dropdown', options );
	}
}

window.customElements.define( 'xb-dropdown-trigger', DropdownTrigger );

/**
 * @typedef {Object} DropdownTriggerAttributes
 * @property {boolean} [open] - Is the dropdown menu open.
 */
