import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import withID from '../../mixins/with-id';
import XBElement from '../../common/xb-element';
import styles from './toggle.styles';

/**
 * @param {import('./toggle-group').ToggleGroupType} role
 */
function getRole( type ) {
	return [ 'single', 'single-strict' ].includes( type ) ? 'radio' : 'checkbox';
}

@customElement( 'xb-toggle' )
export class Toggle extends withID( XBElement ) {
	static styles = [ styles() ];

	/**
	 * Should the toggle be disabled.
	 * @type {boolean}
	 */
	@property( { type: Boolean, reflect: true } ) disabled;

	/**
	 * Should the toggle be checked.
	 * @type {boolean}
	 */
	@property( { type: Boolean, reflect: true } ) checked;

	/**
	 * Button emphasis variant.
	 * @type {String}
	 */
	@property( { type: String } ) value;

	constructor() {
		super();

		this.checked = false;
		this.disabled = false;

		// Based on https://lit.dev/docs/components/events/#adding-event-listeners-to-the-component-or-its-shadow-root
		this.addEventListener( 'click', this._handleClick );
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'tabindex', '-1' );
	}

	/**
	 * @param {import('lit').PropertyValues<this>} changedProperties
	 */
	firstUpdated( changedProperties ) {
		super.firstUpdated( changedProperties );

		if ( ! this.value ) {
			this.value = this.text();
		}
	}

	/**
	 * @param {import('lit').PropertyValues<this>} changedProperties
	 */
	update( changedProperties ) {
		super.update( changedProperties );

		if ( changedProperties.has( 'disabled' ) ) {
			this.setBooleanAttribute( 'aria-disabled', this.disabled );
		}

		if ( changedProperties.has( 'checked' ) ) {
			this.setAttribute( 'aria-checked', this.checked );
		}
	}

	render() {
		return html`
			<slot name="leading"></slot>
			<slot></slot>
			<slot name="trailing"></slot>
		`;
	}

	_handleClick = ( event ) => {
		if ( this.disabled ) {
			event.stopPropagation();
			event.preventDefault();
			return;
		}
	};
}

/**
 * @typedef {('text' | 'ghost' | 'flat')} ButtonEmphasis
 * @typedef {('small' | 'medium' | 'large')} ButtonSize
 */
