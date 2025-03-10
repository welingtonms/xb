import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { query } from 'lit/decorators/query.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { XBElement } from '../../../common/xb-element';
import { FormElement } from '../../../common/form-element';
import { WithAriaMixin } from '../../../mixins/with-aria';

/**
 * @class
 * @template WithAriaMixin, FormElement
 */
export class TextInput extends WithAriaMixin( FormElement ) {
	static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

	/** @type {HTMLInputElement} */
	@query( '#control' )
	accessor #control;

	/**
	 * Should the button be disabled.
	 * @type {TextInputAttributes['disabled']}
	 */
	@property( { type: Boolean } ) accessor disabled;

	/**
	 * Should the button be clearable.
	 * @type {TextInputAttributes['clearable']}
	 */
	@property( { type: Boolean } ) accessor clearable;

	/**
	 * Input initial value.
	 * use the `value` getter to get the current value.
	 * @type {TextInputAttributes['value']}
	 */
	@property( { type: String, reflect: true } ) accessor value;

	/**
	 * Input initial value.
	 * use the `value` getter to get the current value.
	 * * `reflect` added for React.
	 * @type {TextInputAttributes['value']}
	 */
	@property( { type: String, attribute: 'default-value', reflect: true } ) accessor defaultValue;

	/**
	 * Input placeholder attribute.
	 * @type {TextInputAttributes['placeholder']}
	 */
	@property( { type: String } ) accessor placeholder;

	/**
	 * Input accept attribute.
	 * @type {TextInputAttributes['accept']}
	 */
	@property( { type: String } ) accessor accept;

	/**
	 * Input alt attribute.
	 * @type {TextInputAttributes['alt']}
	 */
	@property( { type: String } ) accessor alt;

	/**
	 * Input autocomplete attribute.
	 * @type {TextInputAttributes['autocomplete']}
	 */
	@property( { type: String } ) accessor autocomplete;

	/**
	 * Input capture attribute.
	 * @type {TextInputAttributes['capture']}
	 */
	@property( { type: String } ) accessor capture;

	/**
	 * Input dirname attribute.
	 * @type {TextInputAttributes['dirname']}
	 */
	@property( { type: String } ) accessor dirname;

	/**
	 * Input max attribute.
	 * @type {TextInputAttributes['max']}
	 */
	@property( { type: String } ) accessor max;

	/**
	 * Input maxlength attribute.
	 * @type {TextInputAttributes['maxlength']}
	 */
	@property( { type: Number } ) accessor maxlength;

	/**
	 * Input min attribute.
	 * @type {TextInputAttributes['min']}
	 */
	@property( { type: String } ) accessor min;

	/**
	 * Input minlength attribute.
	 * @type {TextInputAttributes['minlength']}
	 */
	@property( { type: Number } ) accessor minlength;

	/**
	 * Input multiple attribute.
	 * @type {TextInputAttributes['multiple']}
	 */
	@property( { type: Boolean } ) accessor multiple;

	/**
	 * Input pattern attribute.
	 * @type {TextInputAttributes['pattern']}
	 */
	@property( { type: String } ) accessor pattern;

	/**
	 * Input required attribute.
	 * @type {TextInputAttributes['required']}
	 */
	@property( { type: Boolean } ) accessor required;

	/**
	 * Input src attribute.
	 * @type {TextInputAttributes['src']}
	 */
	@property( { type: String } ) accessor src;

	/**
	 * Input spellcheck attribute.
	 * @type {TextInputAttributes['spellcheck']}
	 */
	@property( { type: String } ) accessor spellcheck;

	/**
	 * Input step attribute.
	 * @type {TextInputAttributes['step']}
	 */
	@property( { type: Number } ) accessor step;

	/**
	 * Input type attribute.
	 * @type {TextInputAttributes['type']}
	 */
	@property( { type: String } ) accessor type;

	/**
	 * Input readonly attribute.
	 * @type {TextInputAttributes['readonly']}
	 */
	@property( { type: Boolean } ) accessor readonly;

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-text-input', ...config, type: TextInput } );
	}

	constructor() {
		super();

		this.addEventListener( 'input', this.#onInput );
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

		if ( ! this.type ) {
			this.type = 'text';
		}

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
	}

	render() {
		return html`
			<input
				id="control"
				?disabled="${ this.disabled }"
				?multiple=${ this.multiple }
				?readonly=${ this.readonly }
				?required=${ this.required }
				accept="${ ifDefined( this.accept ) }"
				alt="${ ifDefined( this.alt ) }"
				autocomplete="${ ifDefined( this.autocomplete ) }"
				capture="${ ifDefined( this.capture ) }"
				dirname="${ ifDefined( this.dirname ) }"
				max="${ ifDefined( this.max ) }"
				maxlength=${ ifDefined( this.maxlength ) }
				min="${ ifDefined( this.min ) }"
				minlength=${ ifDefined( this.minlength ) }
				pattern="${ ifDefined( this.pattern ) }"
				placeholder="${ ifDefined( this.placeholder ) }"
				spellcheck="${ ifDefined( this.spellcheck ) }"
				src="${ ifDefined( this.src ) }"
				step=${ ifDefined( this.step ) }
				type="${ this.type }"
			/>
		`;
	}

	get input() {
		return this.#control;
	}

	// get value() {
	// 	return this.input?.value;
	// }

	#initialize() {
		// TODO: Use this article as reference thttps://jakearchibald.com/2024/attributes-vs-properties/

		// if (!this.value) {
		this.#onValueChange( this.getAttribute( 'default-value' ) ?? '' );
		// } else {
		// 	this.#updateValidity();
		// }
	}

	getAriaTarget() {
		return this.input;
	}

	#onInput = () => {
		this.#onValueChange( this.input.value );
	};

	#onChange = ( event ) => {
		this.reemit( event );
	};

	#onValueChange = ( value ) => {
		this.input.value = value;
		this.internals.setFormValue( value );

		this.#updateValidity();
	};

	/**
	 * @param {boolean} disabled
	 */
	#onDisabledChange = ( disabled ) => {
		if ( this.input ) {
			this.input.disabled = disabled;
		}
	};

	#updateValidity() {
		this.internals.setValidity( this.input.validity, this.input.validationMessage, this.input );
	}

	formResetCallback() {
		this.#initialize();
		// this.value = this.getAttribute('value');
	}

	formStateRestoreCallback( state, mode ) {
		if ( state ) {
			this.value = state;
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
 * @typedef {('text' | 'password' | 'number' )} TextInputType
 * @typedef {import('../../../styles/size.styles').ElementSize} TextInputSize
 */

/**
 * @typedef {Object} TextInputAttributes
 * @property {boolean} clearable
 * @property {TextInputSize} size
 * @property {TextInputType} type
 * @property {boolean} disabled
 * @property {string} accept
 * @property {string} alt
 * @property {HTMLInputElement['autocomplete']} autocomplete
 * @property {string} capture
 * @property {string} dirname
 * @property {string} max
 * @property {number} maxlength
 * @property {string} min
 * @property {number} minlength
 * @property {boolean} multiple
 * @property {string} pattern
 * @property {string} placeholder
 * @property {boolean} required
 * @property {string} src
 * @property {boolean} spellcheck
 * @property {number} step
 * @property {string} type
 * @property {string} width
 * @property {boolean} readonly
 * @property {string} value
 * @property {string} name
 */
