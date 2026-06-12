import { html, LitElement, nothing } from 'lit';
import { ContextConsumer } from '@lit/context';
import { property } from 'lit/decorators.js';
import { query } from 'lit/decorators/query.js';

import { FormElement } from '../../form-element';
import { FormMemberMixin } from '../../form-element/form-member-element';
import { trackSlot } from '../../../decorators/track-slot';
import { WithAriaMixin } from '../../../mixins/with-aria';
import { WithIDMixin } from '../../../mixins/with-id';
import { XBElement } from '../../xb-element';

import { radioStyles } from './radio.styles';
import { radioGroupContext } from './radio-group.context';

import '../../layout/stack/stack.define';
import '../../icon/icon.define';

/**
 * @class
 * @template WithAriaMixin, WithIDMixin, FormMemberMixin, FormElement
 */
export class Radio extends WithAriaMixin( WithIDMixin( FormMemberMixin( FormElement ) ) ) {
	// static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
	static styles = [ radioStyles() ];

	/** @type {HTMLButtonElement} */
	@query( '#control' )
	accessor #control;

	/**
	 * Should the button be checked.
	 * @type {boolean}
	 */
	@property( { type: Boolean, reflect: true } ) accessor checked = false;

	/**
	 * Size of the radio.
	 * @type {RadioSize}
	 */
	@property( { type: String } ) accessor size;

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
		super.update( changedProperties );

		if ( changedProperties.has( 'disabled' ) ) {
			this.#onDisabledChange();
		}

		if ( changedProperties.has( 'checked' ) ) {
			this.#onCheckedChange( Boolean( this.checked ) );
		}
	}

	render() {
		return html`
			<button id="control" part="control" type="button" tabindex="-1"></button>
			<span id="button" aria-hidden="true">
				<xb-icon id="check" name="circle-fill"></xb-icon>
			</span>
			<label
				id="label"
				for="control"
				style="display: ${ ! this.hasDefaultContent ? 'none' : nothing }"
			>
				<slot></slot>
			</label>

			<span style="display: ${ ! this.hasDescriptionContent ? 'none' : nothing }"></span>
			<slot name="description"></slot>
		`;
	}

	get button() {
		return this.#control;
	}

	/**
	 * @param {Event} event
	 */
	#onClick = ( event ) => {
		if ( this.effectiveDisabled ) {
			event.stopPropagation();
			return;
		}

		this.emit( 'select' );
	};

	/**
	 * @param {boolean} checked
	 */
	#onCheckedChange = ( checked ) => {
		this.queuedWorkManager.push(
			() => {
				return Boolean( this.button );
			},
			() => {
				this.ensureGroupName( 'xb-radio-group', 'radio' );
				this.setMemberFormValue( checked, this.value );
				this.setBooleanAttribute( 'aria-checked', checked );
			}
		);
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

				if ( isDisabled ) {
					this.removeAttribute( 'tabindex' );
				} else {
					this.setAttribute( 'tabindex', '-1' );
				}
			}
		);
	};

	onFormStateRestore( state, mode ) {
		if ( state ) {
			this.checked = Boolean( state );
		}
	}

	onFormDisabled( disabled ) {
		super.onFormDisabled( disabled );
		this.#onDisabledChange();
	}
}

/**
 * @typedef {import('../../../styles/size.styles').ElementSize} RadioSize
 */
