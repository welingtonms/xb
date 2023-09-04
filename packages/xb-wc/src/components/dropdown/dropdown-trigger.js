import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { BaseButton } from '../button';
import withID from '../../mixins/with-id';

import styles from './dropdown-trigger.styles';

@customElement( 'xb-dropdown-trigger' )
export class DropdownTrigger extends withID( BaseButton ) {
	static styles = [ ...BaseButton.styles, styles() ];

	constructor() {
		super();

		this.addEventListener( 'click', this._handleClick );
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'aria-haspopup', 'true' );
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
