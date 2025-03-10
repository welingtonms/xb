import { html } from 'lit';
import { ContextConsumer } from '@lit/context';
import { property } from 'lit/decorators.js';

import { FormElement } from '../../form-element';
import { trackSlot } from '../../../decorators/track-slot';
import { WithAriaMixin } from '../../../mixins/with-aria';
import { WithIDMixin } from '../../../mixins/with-id';
import { XBElement } from '../../xb-element';
import createLogger from '../../../utils/logger';

import { radioStyles } from './radio.styles';
import { radioGroupContext } from './radio-group.context';
import '../../layout/stack/stack.define';
import '../../layout/cluster/cluster.define';
import '../../icon/icon.define';

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
	@property( { type: Boolean, reflect: true } ) accessor checked = false;

	/**
	 * Value this radio checkbox represents.
	 * @type {string}
	 */
	@property( { type: String } ) accessor value;

	@trackSlot()
	accessor hasDefaultContent;

	@trackSlot( 'description' )
	accessor hasDescriptionContent;

	#context = new ContextConsumer( this, {
		context: radioGroupContext,
		subscribe: true,
		callback: () => {
			this.#onDisabledChange( Boolean( this.disabled ) );
		},
	} );

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
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'role', 'radio' );

		this.addEventListener( 'click', this.#onClick );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.removeEventListener( 'click', this.#onClick );
	}

	/**
	 * @param {import("lit").PropertyValues<this>} changedProperties
	 */
	update( changedProperties ) {
		if ( changedProperties.has( 'disabled' ) ) {
			this.#onDisabledChange( Boolean( this.disabled ) );
		}

		if ( changedProperties.has( 'checked' ) ) {
			this.#onCheckedChange( Boolean( this.checked ) );
		}

		super.update( changedProperties );
	}

	render() {
		return html`
			<button
				id="control"
				type="button"
				?disabled=${ Boolean( this.#context.value?.disabled || this.disabled ) }
			></button>
			<span id="button" aria-hidden="true">
				<xb-icon id="check" name="circle-fill"></xb-icon>
			</span>
			<xb-stack
				paddingless="all"
				style="--xb-stack-gap: 2px; ${ ! this.hasDefaultContent && ! this.hasDescriptionContent
					? 'display: none;'
					: 'margin-inline-start: var(--xb-spacing-2);' }"
			>
				<label id="label" for="control">
					<slot></slot>
				</label>

				<slot name="description"></slot>
			</xb-stack>
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

		this.emit( 'select' );
	};

	/**
	 * @param {boolean} checked
	 */
	#onCheckedChange = ( checked ) => {
		if ( ! this.name ) {
			const group = this.closest( 'm-radio-group' );

			this.name = group?.name ?? group?.getAttribute( 'name' ) ?? '';
		}

		this.internals.setFormValue( checked ? this.value : null );
		this.setBooleanAttribute( 'aria-checked', checked );
	};

	/**
	 * @param {boolean} disabled
	 */
	#onDisabledChange = ( disabled ) => {
		const isDisabled = Boolean( this.#context.value?.disabled || disabled );
		this.setAttribute( 'aria-disabled', String( isDisabled ) );

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
			this.checked = Boolean( state );
		}
	}

	formDisabledCallback( disabled ) {
		super.formDisabledCallback( disabled );

		if ( ! this.isConnected ) {
			return;
		}

		this.#onDisabledChange( disabled );
	}
}
