import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { BaseButton } from '../button';
import WithID from '../../mixins/with-id';

import { triggerStyles } from './dropdown.styles';

/**
 * @class
 * @template WithID, BaseButton
 */
@customElement( 'xb-dropdown-trigger' )
export class DropdownTrigger extends WithID( BaseButton ) {
	static styles = [ ...BaseButton.styles, triggerStyles() ];

	constructor() {
		super();

		this.addEventListener( 'click', this._handleClick );
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'role', 'button' );
		this.setAttribute( 'aria-haspopup', 'true' );
	}

	render() {
		return html`
			<slot name="leading"></slot>
			<slot></slot>
			<xb-icon name="expand-more" size="16" class="indicator"></xb-icon>
		`;
	}
}

/**
 * @typedef {Object} DropdownTriggerAttributes
 * @property {boolean} [open] - Is the dropdown menu open.
 */
