import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { query } from 'lit/decorators/query.js';

import { FormElement } from '../../../common/form-element';
import { WithAriaMixin } from '../../../mixins/with-aria';
import { WithIDMixin } from '../../../mixins/with-id';
import { XBElement } from '../../../common/xb-element';
import createLogger from '../../../utils/logger';

import '../../icon';

import { radioStyles } from './radio.styles';

const logger = createLogger( 'radio' );

/**
 * @class
 * @template WithAriaMixin, WithIDMixin, FormElement
 */
export class Radio extends WithAriaMixin( WithIDMixin( FormElement ) ) {
	static styles = [ radioStyles() ];

	/**
	 * Should the button be checked.
	 * @type {boolean}
	 */
	@property( { type: Boolean, reflect: true } ) accessor checked;

	/**
	 * Value this radio checkbox represents.
	 * @type {string}
	 */
	@property( { type: String } ) accessor value;

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-radio', ...config, type: Radio } );
	}

	constructor() {
		super();

		this.internals.role = 'radio';

		this.addEventListener( 'click', this.#onClick );
	}

	/**
	 * @param {import("lit").PropertyValues} changedProperties
	 */
	update( changedProperties ) {
		if ( changedProperties.has( 'disabled' ) ) {
			this.#onDisabledChange( this.disabled );
		}

		if ( changedProperties.has( 'checked' ) ) {
			this.#onCheckedChange( this.checked );
		}

		super.update( changedProperties );
	}

	render() {
		return html`
			<!-- <span class="check">
				<xb-icon name="circle"></xb-icon>
			</span> -->
			<slot name="leading"></slot>
			<slot></slot>
			<slot name="trailing"></slot>
		`;
	}

	/**
	 * @param {Event} event
	 */
	#onClick = ( event ) => {
		if ( this.disabled ) {
			event.stopPropagation();
			return;
		}
	};

	/**
	 * @param {boolean} checked
	 */
	#onCheckedChange = ( checked ) => {
		if ( ! this.name ) {
			logger.warn( 'no name attribute set on the radio. Is it intentionally?' );
		}

		this.internals.setFormValue( checked ? this.value : null );
		this.setBooleanAttribute( 'aria-checked', checked );
	};

	/**
	 * @param {boolean} disabled
	 */
	#onDisabledChange = ( disabled ) => {
		this.setAttribute( 'aria-disabled', disabled );

		if ( this.disabled ) {
			this.removeAttribute( 'tabindex' );
		} else {
			this.setAttribute( 'tabindex', '-1' );
		}
	};

	formResetCallback() {
		// radio-group will take care of this
	}

	formStateRestoreCallback( state ) {
		if ( state ) {
			this.checked = state;
		}
	}

	formDisabledCallback( disabled ) {
		super.formDisabledCallback( disabled );

		if ( ! this.isConnected ) {
			return;
		}

		this.disabled = disabled;
		this.#onDisabledChange( disabled );
	}
}
