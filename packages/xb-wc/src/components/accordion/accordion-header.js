import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import XBElement from '../../common/xb-element';
import WithID from '../../mixins/with-id';
import ButtonPatternController from '../../controllers/button-pattern';

import styles from './accordion-header.styles';

import '../icon';

/**
 * @class
 * @template WithID, XBElement
 */
@customElement( 'xb-accordion-header' )
export class AccordionHeader extends WithID( XBElement ) {
	static styles = [ styles() ];

	constructor() {
		super();

		new ButtonPatternController( this );
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'role', 'button' );
		this.setAttribute( 'tabindex', '0' );
	}

	render() {
		return html`
			<slot name="leading"></slot>
			<slot></slot>
			<xb-icon name="expand-more" size="16" class="indicator"></xb-icon>
		`;
	}
}
