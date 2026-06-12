import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ContextConsumer } from '@lit/context';
import { property } from 'lit/decorators.js';
import { query } from 'lit/decorators/query.js';

import { FormElement } from '../../form-element';
import { FormMemberMixin } from '../../form-element/form-member-element';
import { WithAriaMixin } from '../../../mixins/with-aria';
import { WithIDMixin } from '../../../mixins/with-id';
import { XBElement } from '../../xb-element';
import { toggleGroupContext } from './toggle-group.context';
import { trackSlot } from '../../../decorators/track-slot';

import { toggleStyles } from './toggle-group.styles';

export class Toggle extends WithAriaMixin( WithIDMixin( FormMemberMixin( FormElement ) ) ) {
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
			this.#onDisabledChange();
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
			this.#onDisabledChange();
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
		this.ensureGroupName( 'xb-toggle-group', 'toggle' );
		this.setMemberFormValue( checked, this.value );
		this.setBooleanAttribute( 'aria-checked', checked );
	};

	#onDisabledChange = () => {
		this.queuedWorkManager.push(
			() => {
				return Boolean( this.button );
			},
			() => {
				const isDisabled = Boolean( this.#context.value?.disabled || this.effectiveDisabled );
				this.setBooleanAttribute( 'aria-disabled', isDisabled );

				this.button.disabled = isDisabled;
			}
		);
	};

	onFormStateRestore( state, mode ) {
		if ( state ) {
			this.checked = state;
		}
	}

	onFormDisabled( disabled ) {
		super.onFormDisabled( disabled );

		this.#onDisabledChange();
	}
}

/**
 * @typedef {import('./toggle-group.context').ToggleGroupContext} ToggleGroupContext
 */
