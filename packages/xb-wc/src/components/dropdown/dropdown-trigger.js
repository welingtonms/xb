import { html } from 'lit';
import { ContextConsumer } from '@lit-labs/context';
import { customElement } from 'lit/decorators.js';
import withClassy from '@welingtonms/classy';

import { dropdownContext } from './dropdown-context';
import styles from './dropdown-trigger.styles';
import XBElement from '../../common/xb-element';

import '../button';

@customElement( 'xb-dropdown-trigger' )
export class DropdownTrigger extends XBElement {
	static styles = [ styles() ];

	_consumer;

	constructor() {
		super();

		this._consumer = new ContextConsumer( this, {
			context: dropdownContext,
			subscribe: true,
		} );
	}

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
		const { classy, when } = withClassy( {
			open: Boolean( this._consumer.value?.open ),
		} );

		return html`
			<xb-button
				class="${ classy( 'dropdown-trigger', {
					'is-open': when( { open: true } ),
				} ) }"
				emphasis="flat"
			>
				<slot></slot>
				<xb-icon
					slot="trailing"
					class=${ classy( 'indicator', {
						'is-open': when( { open: true } ),
					} ) }
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
