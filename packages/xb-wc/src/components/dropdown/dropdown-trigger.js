import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import withClassy from '@welingtonms/classy';

import XBElement from '../../common/xb-element';
import styles from './dropdown-trigger.styles';

import '../button';

@customElement( 'xb-dropdown-trigger' )
export class DropdownTrigger extends XBElement {
	static styles = [ styles() ];

	/**
	 * Is the dropdown menu open.
	 * @type {DropdownTriggerAttributes['open']}
	 */
	@property( { type: Boolean, reflect: true } ) open;

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'slot', 'reference' );

		this.addEventListener( 'click', this._handleClick );
	}

	focus() {
		const button = this.shadowRoot.querySelector( 'xb-button' );

		button?.focus();
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
		this.emit( 'xb-dropdown-toggle' );
	}
}

/**
 * @typedef {Object} DropdownTriggerAttributes
 * @property {boolean} [open] - Is the dropdown menu open.
 */
