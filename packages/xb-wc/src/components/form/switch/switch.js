import { html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';

import { WithIDMixin } from '../../../mixins/with-id';
import { XBElement } from '../../../common/xb-element';
import { FormElement } from '../../../common/form-element';
import { WithAriaMixin } from '../../../mixins/with-aria';
import styles from './switch.styles';

import '../../icon';

/**
 * @class
 * @template WithAriaMixin, WithIDMixin, FormElement
 */
export class Switch extends WithAriaMixin( WithIDMixin( FormElement ) ) {
	static styles = [ styles() ];

	static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

	/** @type {HTMLInputElement} */
	@query( '#control' )
	accessor #control;

	/**
	 * Should the button be checked.
	 * @type {SwitchAttributes['checked']}
	 */
	@property( { type: Boolean, reflect: true } ) accessor checked;

	/**
	 * Should the checked be checked.
	 * `reflect` added for React.
	 * @type {boolean}
	 */
	@property( { type: Boolean, attribute: 'default-checked', reflect: true } )
	accessor defaultChecked;

	/**
	 * Checkbox readonly attribute.
	 * @type {SwitchAttributes['readonly']}
	 */
	@property( { type: Boolean } ) accessor readonly;

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-switch', ...config, type: Switch } );
	}

	constructor() {
		super();

		this.addEventListener( 'click', this.#onClick );
	}

	createRenderRoot() {
		const root = super.createRenderRoot();

		/**
		 * We add the event listener to the shadow root because `change` event is not
		 * composed, so it will not bubble to the host.
		 */
		root.addEventListener( 'change', this.#onChange );

		return root;
	}

	async connectedCallback() {
		super.connectedCallback();

		await this.updateComplete;

		this.#initialize();
	}

	/**
	 * @param {import("lit").PropertyValues} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'disabled' ) ) {
			this.#onDisabledChange( this.disabled );
		}

		if ( changedProperties.has( 'checked' ) ) {
			this.#onCheckedChange( this.checked );
		}

		if ( changedProperties.has( 'readonly' ) ) {
			this.#onReadOnlyChange( this.readonly );
		}
	}

	render() {
		return html`
			<label>
				<input id="control" type="checkbox" name="${ this.name }" />
				<slot name="leading"></slot>
				<slot></slot>
				<slot name="trailing"></slot>
			</label>
		`;
	}

	get input() {
		return this.#control;
	}

	get checked() {
		return Boolean( this.input?.checked );
	}

	#initialize() {
		this.#onCheckedChange( this.hasAttribute( 'default-checked' ) );
	}

	/**
	 * @param {boolean} disabled
	 */
	#onDisabledChange = ( disabled ) => {
		this.input.disabled = disabled;
	};

	/**
	 * @param {boolean} readOnly
	 */
	#onReadOnlyChange = ( readOnly ) => {
		this.input.readOnly = readOnly;
		this.internals.ariaReadOnly = readOnly ? 'true' : 'false';
	};

	/**
	 * @param {boolean} checked
	 */
	#onCheckedChange = ( checked ) => {
		this.input.checked = checked;

		/**
		 * "If a checkbox is unchecked when its form is submitted, neither the name
		 *  nor the value is submitted to the server.
		 *  There is no HTML-only method of representing a checkbox's unchecked state
		 *  (e.g. value=unchecked). If you wanted to submit a default value for the
		 * checkbox when it is unchecked, you could include JavaScript to create a
		 * <input type="hidden"> within the form with a value indicating an unchecked state."
		 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#value|Checkbox value}
		 */
		this.internals.setFormValue( checked ? 'on' : 'off' );

		this.internals.ariaChecked = checked ? 'true' : 'false';
	};

	#onClick = ( event ) => {
		if ( this.readonly ) {
			event.preventDefault();
			return;
		}

		this.#onCheckedChange( this.checked );
	};

	#onChange = ( event ) => {
		if ( this.readonly ) {
			event.preventDefault();
			return;
		}

		this.reemit( event );
	};

	formResetCallback() {
		this.#initialize();
	}

	formStateRestoreCallback( state, mode ) {
		if ( state ) {
			this.checked = state === 'on';
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
 * @typedef {{
 * disabled: boolean;
 * checked: boolean;
 * name: string;
 * readonly: boolean;
 * }} SwitchAttributes
 */
