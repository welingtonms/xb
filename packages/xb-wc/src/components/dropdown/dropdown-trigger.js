import { html } from 'lit';
import { ContextConsumer } from '@lit-labs/context';
import { customElement } from 'lit/decorators.js';

import { Button } from '../button';
import { dropdownContext } from './dropdown-context';
import KeyboardSupportController from '../../controllers/keyboard-support';
import withID from '../../mixins/with-id';

import styles from './dropdown-trigger.styles';

@customElement( 'xb-dropdown-trigger' )
export class DropdownTrigger extends withID( Button ) {
	static styles = [ ...Button.styles, styles() ];

	/** @type {{ keyboard: KeyboardSupportController }} */
	_controllers;

	_consumer;

	constructor() {
		super();

		this.emphasis = 'flat';

		this._consumer = new ContextConsumer( this, {
			context: dropdownContext,
			subscribe: true,
		} );

		this.controllers = {
			keyboard: new KeyboardSupportController( this, [
				{
					shortcut: {
						key: 'ArrowUp',
					},
					callback: () => {
						this.emit( 'xb:dropdown-expand', { detail: 'up' } );
					},
				},
				{
					shortcut: {
						key: 'ArrowDown',
					},
					callback: () => {
						this.emit( 'xb:dropdown-expand', { detail: 'down' } );
					},
				},
			] ),
		};
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'aria-haspopup', 'true' );

		this.addEventListener( 'click', this._handleClick );
	}

	updated( changedProperties ) {
		super.updated( changedProperties );

		const open = Boolean( this._consumer.value?.open );

		this.setBooleanAttribute( 'aria-expanded', open );
	}

	render() {
		return html`
			<slot name="leading"></slot>
			<slot></slot>
			<xb-icon name="expand-more" size="16" class="indicator"></xb-icon>
		`;
	}

	_handleClick() {
		this.emit( 'xb:dropdown-toggle' );
	}
}

/**
 * @typedef {Object} DropdownTriggerAttributes
 * @property {boolean} [open] - Is the dropdown menu open.
 */
