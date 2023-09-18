import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { MenuItem } from '../menu';

import styles from './listbox-option.styles';

import '../icon';

@customElement( 'xb-option' )
export class Option extends MenuItem {
	static styles = [ styles() ];

	/**
	 * Is this a selected option.
	 * @type {OptionAttributes['selected']}
	 */
	@property( { type: Boolean, reflect: true } ) selected;

	/**
	 * Value that this option represents.
	 * @type {OptionAttributes['value']}
	 */
	@property( { type: String, reflect: true } ) value;

	constructor() {
		super();

		this.selected = false;
		this.value = '';
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'role', 'option' );
	}

	firstUpdated( changedProperties ) {
		super.firstUpdated( changedProperties );

		if ( ! this.value ) {
			this.value = this.text();
		}

		if ( ! this.hasAttribute( 'id' ) ) {
			this.id = `xb-option-${ this.value }`;
		}
	}

	updated( changedProperties ) {
		super.updated( changedProperties );

		// TODO: emit event when the selected attribute changes outside.
		if ( changedProperties.has( 'selected' ) ) {
			this.setAttribute( 'aria-selected', this.selected );
		}
	}

	render() {
		return html`
			<slot name="leading"></slot>
			<slot></slot>
			<xb-icon name="check" class="check"></xb-icon>
		`;
	}
}

/**
 * @typedef {import('../../styles/size.styles').ElementSize} SelectionOptionSize
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionType} SelectionType
 */

/**
 * @typedef {Object} OptionAttributes
 * @property {boolean} [open] - Is the dropdown menu open.
 * @property {boolean} disabled Should the button be disabled.
 * @property {SelectionOptionSize} size
 * @property {SelectionType} type
 * @property {boolean} [selected] - Is this a selected option
 * @property {string} value Value that this option represents.
 */
