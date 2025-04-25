import { html, LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

// import CheckboxController from './checkbox.controller';
// import CheckboxGroupController from './checkbox-group.controller';
import { FormElement } from '../../form-element';
import { hasSlottedContent } from '../../../utils/slot';
import { trackSlot } from '../../../decorators/track-slot';
import { WithAriaMixin } from '../../../mixins/with-aria';
import { WithIDMixin } from '../../../mixins/with-id';
import { XBElement } from '../../xb-element';

import { checkboxStyles } from './checkbox.styles';

import '../../layout/stack/stack.define';
import '../../layout/cluster/cluster.define';
import '../../icon/icon.define';
// import '../../icon';

// import styles from './checkbox.styles';

/**
 * @class
 * @template WithAriaMixin, WithIDMixin, FormElement
 */
export class Checkbox extends WithAriaMixin( WithIDMixin( FormElement ) ) {
	static styles = [ checkboxStyles() ];

	static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

	/** @type {HTMLInputElement} */
	@query( '#control' )
	accessor #control;

	@trackSlot()
	accessor hasDefaultContent;

	@trackSlot( 'description' )
	accessor hasDescriptionContent;

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
	@property( { type: Boolean, attribute: 'initial-checked', reflect: true } )
	accessor initialChecked;

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

		this.addEventListener( 'click', this.#onHostClick );

		await this.updateComplete;

		this.#initialize( this.hasAttribute( 'checked' ) || this.hasAttribute( 'initial-checked' ) );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.removeEventListener( 'click', this.#onHostClick );
	}

	/**
	 * @param {import("lit").PropertyValues<this>} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'disabled' ) ) {
			this.#onDisabledChange( this.disabled );
		}

		if ( changedProperties.has( 'checked' ) ) {
			this.#onCheckedChange( this.checked );
		}

		if ( changedProperties.has( 'value' ) ) {
			this.#onValueChange( this.value );
		}

		if ( changedProperties.has( 'readonly' ) ) {
			this.#onReadOnlyChange( this.readonly );
		}
	}

	firstUpdated() {
		this.queuedWorkManager.flush();
	}

	render() {
		return html`
			<input
				id="control"
				type="checkbox"
				name="${ ifDefined( this.name ) }"
				@click=${ this.#onInternalClick }
			/>
			<span id="button" aria-hidden="true">
				<xb-icon id="check" name="check"></xb-icon>
				<xb-icon id="indeterminate" name="minus"></xb-icon>
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

	get input() {
		return this.#control;
	}

	set checked( checked ) {
		this.#onCheckedChange( checked );
	}

	get checked() {
		return Boolean( this.input?.checked );
	}

	set indeterminate( indeterminate ) {
		this.#onIndeterminateChange( indeterminate );
	}

	get indeterminate() {
		return Boolean( this.input?.indeterminate );
	}

	#initialize( checked ) {
		this.#onCheckedChange( checked ?? this.hasAttribute( 'initial-checked' ) );

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
		this.disabled = disabled;

		this.queuedWorkManager.push(
			() => {
				return Boolean( this.input );
			},
			() => {
				this.input.disabled = disabled;
			}
		);
	};

	/**
	 * @param {boolean} readOnly
	 */
	#onReadOnlyChange = ( readOnly ) => {
		this.readonly = readOnly;

		this.queuedWorkManager.push(
			() => {
				return Boolean( this.input );
			},
			() => {
				this.input.readOnly = readOnly;
				this.internals.ariaReadOnly = readOnly ? 'true' : 'false';
			}
		);
	};

	/**
	 * @param {boolean} checked
	 */
	#onCheckedChange = ( checked ) => {
		this.toggleAttribute( 'checked', checked );

		this.queuedWorkManager.push(
			() => {
				return Boolean( this.input );
			},
			() => {
				this.input.checked = checked;
				this.internals.ariaChecked = checked ? 'true' : 'false';

				this.#onValueChange( this.value );
			}
		);
	};

	/**
	 * @param {boolean} indeterminate
	 */
	#onIndeterminateChange = ( indeterminate ) => {
		this.toggleAttribute( 'indeterminate', indeterminate );

		this.queuedWorkManager.push(
			() => {
				return Boolean( this.input );
			},
			() => {
				this.input.indeterminate = indeterminate;
			}
		);
	};

	/**
	 * This handler will kick in when the user clicks the checkbox.
	 * @param {Event} event
	 */
	#onInternalClick = ( event ) => {
		if ( this.disabled ) {
			event.preventDefault();
			return;
		}

		/**
		 * Do **NOT** remove this event.stopPropagation() because it will cause
		 * the `#handleHostClick` to` enter an infinite loop, if called.
		 */
		event.stopPropagation();

		this.#onValueChange( this.value );
	};

	#onHostClick = () => {
		this.input?.click();
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

	#onChange = ( event ) => {
		if ( this.disabled || this.readonly ) {
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
