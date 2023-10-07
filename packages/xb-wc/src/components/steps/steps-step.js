import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from 'lit/decorators.js';

import XBElement from '../../common/xb-element';
import { stepStyles } from './steps.styles';

import '../text';
import '../icon';

@customElement( 'xb-step' )
export class Step extends XBElement {
	static styles = [ stepStyles() ];

	/**
	 * @type {StepAttributes['label']}
	 */
	@property( { type: String } ) label;

	/**
	 * @type {StepAttributes['active']}
	 */
	@property( { type: Boolean } ) active;

	/**
	 * @type {StepAttributes['completed']}
	 */
	@property( { type: Boolean } ) completed;

	/**
	 * @param {import('lit').PropertyValues<this>} changedProperties
	 */
	updated( changedProperties ) {
		if ( changedProperties.has( 'active' ) ) {
			if ( this.active ) {
				// tabindex based on https://mui.com/material-ui/react-stepper/
				this.setAttribute( 'tabindex', '0' );
				this.setAttribute( 'aria-current', 'step' );
			} else {
				this.removeAttribute( 'aria-current' );
			}
		}
	}

	render() {
		return html`
			<span class="circle">
				<slot></slot>
				<xb-icon name="check"></xb-icon>
			</span>
			<xb-text variant=${ this.active ? 'subtitle-2' : 'caption' }>${ this.label }</xb-text>
		`;
	}
}

/**
 * @typedef {Object} StepAttributes
 * @property {boolean} active
 * @property {boolean} completed
 * @property {string} label
 */
