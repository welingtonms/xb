import { html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';

// import CheckboxController from './checkbox.controller';
// import CheckboxGroupController from './checkbox-group.controller';
import { WithIDMixin } from '../../../mixins/with-id';
import { XBElement } from '../../../common/xb-element';
import { FormElement } from '../../../common/form-element';
import { WithAriaMixin } from '../../../mixins/with-aria';

// import '../../icon';

// import styles from './checkbox.styles';

/**
 * @class
 * @template WithAriaMixin, WithIDMixin, FormElement
 */
export class Checkbox extends WithAriaMixin( WithIDMixin( FormElement ) ) {
	// static styles = [ styles() ];

	static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

	/** @type {HTMLInputElement} */
	@query( '#control' )
	accessor #control;

	/**
	 * Should the button be checked.
	 * @type {CheckboxAttributes['checked']}
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
	 * Should the button be checked.
	 * @type {CheckboxAttributes['indeterminate']}
	 */
	@property( { type: Boolean } ) accessor indeterminate;

	/**
	 * Value this radio checkbox represents.
	 * @type {CheckboxAttributes['value']}
	 */
	@property( { type: String } ) accessor value;

	/**
	 * Checkbox readonly attribute.
	 * @type {CheckboxAttributes['readonly']}
	 */
	@property( { type: Boolean } ) accessor readonly;

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-checkbox', ...config, type: Checkbox } );
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

		if ( changedProperties.has( 'value' ) ) {
			this.#onValueChange( this.value );
		}

		if ( changedProperties.has( 'checked' ) ) {
			this.#onCheckedChange( this.checked );
		}

		if ( changedProperties.has( 'indeterminate' ) ) {
			this.#onIndeterminateChange( this.indeterminate );
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

	set indeterminate( indeterminate ) {
		// if ( this.input ) {
		this.#onIndeterminateChange( indeterminate );
		// }
	}

	get indeterminate() {
		return Boolean( this.input?.indeterminate );
	}

	#initialize() {
		this.#onCheckedChange( this.hasAttribute( 'default-checked' ) );

		/**
		 * The indeterminate state is only set via JavaScript
		 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes
		 */
		this.#onIndeterminateChange( this.hasAttribute( 'indeterminate' ) );
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
		this.internals.ariaChecked = checked ? 'true' : 'false';

		this.#onValueChange( this.value );
	};

	/**
	 * @param {boolean} indeterminate
	 */
	#onIndeterminateChange = ( indeterminate ) => {
		this.input.indeterminate = indeterminate;
	};

	/**
	 * @param {string} value
	 */
	#onValueChange = ( value ) => {
		/**
		 * "If a checkbox is unchecked when its form is submitted, neither the name
		 *  nor the value is submitted to the server.
		 *  There is no HTML-only method of representing a checkbox's unchecked state
		 *  (e.g. value=unchecked). If you wanted to submit a default value for the
		 * checkbox when it is unchecked, you could include JavaScript to create a
		 * <input type="hidden"> within the form with a value indicating an unchecked state."
		 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#value|Checkbox value}
		 */
		this.internals.setFormValue( this.input.checked ? value ?? 'on' : null );
	};

	#onClick = ( event ) => {
		if ( this.readonly ) {
			event.preventDefault();
			return;
		}

		this.#onValueChange( this.value );
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
			this.checked = state != null;
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
 * @typedef {import('../../../styles/size.styles').ElementSize} CheckboxSize
 */

/**
 * @typedef {Object} CheckboxAttributes
 * @property {boolean} [disabled]
 * @property {boolean} [checked]
 * @property {boolean} [indeterminate]
 * @property {string} value
 * @property {string} name
 * @property {boolean} readonly
 */
