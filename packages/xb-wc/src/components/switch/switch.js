import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from 'lit/decorators.js';

import KeyboardSupportController from '../../controllers/keyboard-support';
import XBElement from '../../common/xb-element';
import styles from './switch.styles';

import '../icon';

@customElement( 'xb-switch' )
export class Switch extends XBElement {
	static styles = [ styles() ];

	/**
	 * Should the button be disabled.
	 * @type {SwitchAttributes['disabled']}
	 */
	@property( { type: Boolean, reflect: true } ) accessor disabled;

	/**
	 * Should the button be checked.
	 * @type {SwitchAttributes['checked']}
	 */
	@property( { type: Boolean, reflect: true } ) accessor checked;

	/**
	 * Value this radio checkbox represents.
	 * @type {SwitchAttributes['size']}
	 */
	@property( { type: String, reflect: true } ) accessor size;

	constructor() {
		super();

		this.checked = false;
		this.disabled = false;
		this.size = 'small';

		this._controllers = {
			keyboard: new KeyboardSupportController( this, {
				shortcut: [
					{
						key: ' ',
					},
					{
						key: 'Enter',
					},
				],
				handler: ( event ) => {
					event.stopPropagation();

					this._toggle();
				},
			} ),
		};

		this.addEventListener( 'click', this._handleClick );
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'role', 'switch' );
		this.setAttribute( 'tabindex', '0' );
	}

	/**
	 * @param {import('lit').PropertyValues<this>} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'checked' ) ) {
			this.setAttribute( 'aria-checked', this.checked );
		}
	}

	render() {
		return html`
			<span class="switch">
				<xb-icon name="circle"></xb-icon>
			</span>
			<slot name="leading"></slot>
			<slot></slot>
			<slot name="trailing"></slot>
		`;
	}

	_toggle() {
		this.checked = ! this.checked;

		this.emit( 'xb:change', { detail: { checked: this.checked } } );
	}

	/**
	 * @param {Event} event
	 */
	_handleClick = ( event ) => {
		if ( this.disabled ) {
			event.stopPropagation();
			event.preventDefault();
			return;
		}

		this._toggle();
	};
}

/**
 * @typedef {import('../../styles/size.styles').ElementSize} SwitchSize
 */

/**
 * @typedef {{
 * disabled: boolean;
 * checked: boolean;
 * size: SwitchSize;
 * 'xb:change': ((event: CustomEvent) => void)
 * }} SwitchAttributes
 */
