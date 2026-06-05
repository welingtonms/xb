import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ContextConsumer } from '@lit/context';
import { property } from 'lit/decorators.js';
import { query } from 'lit/decorators/query.js';

import { FormElement } from '../../form-element';
import { WithAriaMixin } from '../../../mixins/with-aria';
import { WithIDMixin } from '../../../mixins/with-id';
import { XBElement } from '../../xb-element';
import { toggleGroupContext } from './toggle-group.context';
import { trackSlot } from '../../../decorators/track-slot';
import createLogger from '../../../utils/logger';

import { toggleStyles } from './toggle-group.styles';

const logger = createLogger( 'toggle' );

export class Toggle extends WithAriaMixin( WithIDMixin( FormElement ) ) {
	static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
	static styles = [ toggleStyles() ];

	/** @type {HTMLButtonElement} */
	@query( '#control' )
	accessor #control;

	/**
	 * Should the toggle be checked.
	 * @type {boolean}
	 */
	@property( { type: Boolean, reflect: true } ) accessor checked;

	/**
	 * Button emphasis variant.
	 * @type {String}
	 */
	@property( { type: String, reflect: true } ) accessor value;

	/** @type {boolean} */
	@trackSlot( 'leading' )
	accessor hasSlottedLeading;

	/** @type {boolean} */
	@trackSlot( 'trailing' )
	accessor hasSlottedTrailing;

	/** @type {ContextConsumer<ToggleGroupContext>} */
	#context = new ContextConsumer( this, {
		context: toggleGroupContext,
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
		XBElement.define( { name: 'xb-toggle', ...config, type: Toggle } );
	}

	constructor() {
		super();

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
			<button
				id="control"
				part="control"
				class=${ classMap( {
					'has-slotted-content': this.hasSlottedLeading || this.hasSlottedTrailing,
				} ) }
				type="button"
			>
				<slot name="leading"></slot>
				<slot></slot>
				<slot name="trailing"></slot>
			</button>
		`;
	}

	get button() {
		return this.#control;
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
			const group = this.closest( 'xb-toggle-group' );
			this.name = group?.name ?? '';

			logger.warn(
				`no name attribute set on the toggle. Is it intentionally? setting name to ${ group?.name }`
			);
		}

		this.internals.setFormValue( checked ? this.value : null );
		this.setBooleanAttribute( 'aria-checked', checked );
	};

	/**
	 * @param {boolean} disabled
	 */
	#onDisabledChange = ( disabled ) => {
		this.queuedWorkManager.push(
			() => {
				return Boolean( this.button );
			},
			() => {
				const isDisabled = Boolean( this.#context.value?.disabled || disabled );
				this.setAttribute( 'aria-disabled', String( isDisabled ) );

				this.button.disabled = isDisabled;
			}
		);
	};

	formResetCallback() {
		// toggle-group will take care of this
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

		this.#onDisabledChange( disabled );
	}
}

/**
 * @typedef {import('./toggle-group.context').ToggleGroupContext} ToggleGroupContext
 */
