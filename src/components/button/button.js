import { html, LitElement, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property } from 'lit/decorators.js';
import { query } from 'lit/decorators/query.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import createLogger from '../../utils/logger';
import { XBElement } from '../xb-element';
import { FormElement } from '../form-element';
import { WithAriaMixin } from '../../mixins/with-aria';

import '../icon/icon.define';

import styles from './button.styles.js';

const logger = createLogger( 'xb-button' );

/**
 * @class
 * @template WithAriaMixin, FormElement
 */
export class Button extends WithAriaMixin( FormElement ) {
	static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
	static styles = [ styles() ];

	/** @type {HTMLButtonElement} */
	@query( '#control' )
	accessor #control;

	/** @type {ButtonAttributes['type']} */
	@property( { type: String, reflect: true } )
	accessor type;

	/** @type {ButtonAttributes['scale']} */
	@property( { type: String, reflect: true } ) accessor scale;

	/**
	 * Button variant.
	 * @type {ButtonAttributes['variant']}
	 */
	@property( { type: String, reflect: true } ) accessor variant;

	/**
	 * Button form action.
	 * @type {ButtonAttributes['formaction']}
	 */
	@property( { type: String } ) accessor formaction;

	/**
	 * Button form enctype.
	 * @type {ButtonAttributes['formenctype']}
	 */
	@property( { type: String } ) accessor formenctype;

	/**
	 * Button form method.
	 * @type {ButtonAttributes['formmethod']}
	 */
	@property( { type: String } ) accessor formmethod;

	/**
	 * Button form novalidate attribute.
	 * @type {ButtonAttributes['formnovalidate']}
	 */
	@property( { type: Boolean } ) accessor formnovalidate;

	/**
	 * Button form target attribute.
	 * @type {ButtonAttributes['formtarget']}
	 */
	@property( { type: String } ) accessor formtarget;

	/**
	 * Button icon. Renders the icon as the button content.
	 * @type {ButtonAttributes['icon']}
	 */
	@property( { type: String } ) accessor icon;

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-button', ...config, type: Button } );
	}

	constructor() {
		super();

		this.type = 'button';
		this.disabled = false;
		this.scale = 'sm';
		this.variant = 'secondary';

		this.addEventListener( 'click', this.#onClick );
	}

	/**
	 * @param {import("lit").PropertyValues} changedProperties
	 */
	update( changedProperties ) {
		if ( changedProperties.has( 'disabled' ) ) {
			this.#onDisabledChange( this.disabled );
		}

		super.update( changedProperties );
	}

	firstUpdated() {
		this.queuedWorkManager.flush();
	}

	render() {
		return html`
			<button
				id="control"
				part="control"
				class=${ classMap( {
					'has-slotted-content': this.#hasSlottedContent(),
				} ) }
				type=${ this.type }
				formaction=${ ifDefined( this.formaction ) }
				formenctype=${ ifDefined( this.formenctype ) }
				formmethod=${ ifDefined( this.formmethod ) }
				?formnovalidate=${ this.formnovalidate }
				formtarget=${ ifDefined( this.formtarget ) }
			>
				<slot name="leading"></slot>
				<slot>
					${ this.icon
						? html`
								<xb-icon name="${ this.icon }"></xb-icon>
						  `
						: nothing }
				</slot>
				<slot name="trailing"></slot>
			</button>
		`;
	}

	get button() {
		return this.#control;
	}

	getAriaTarget() {
		return this.button;
	}

	#hasSlottedContent = () => {
		const leading = this.renderRoot?.querySelector( '[slot="leading"]' );
		const trailing = this.renderRoot?.querySelector( '[slot="trailing"]' );

		const leadingContent = leading?.assignedNodes() ?? [];
		const trailingContent = trailing?.assignedNodes() ?? [];

		return leadingContent.length > 0 || trailingContent.length > 0;
	};

	#onClick = () => {
		if ( this.disabled ) {
			return;
		}

		if ( this.type === 'submit' ) {
			this.#onSubmit();
		} else if ( this.type === 'reset' ) {
			this.#onReset();
		}
	};

	#onSubmit = () => {
		if ( ! this.form ) {
			return;
		}

		if ( this.form.checkValidity() ) {
			// based on https://github.dev/adobe/spectrum-web-components/blob/main/packages/button/src/Button.ts
			const proxy = document.createElement( 'button' );
			proxy.type = this.type;

			this.appendChild( proxy );

			/**
			 * we CANNOT `proxy.click()` here; that would create very nasty infinite loop
			 * and we do not want that. right?!
			 */
			this.form.requestSubmit( proxy );

			proxy.remove();

			this.focus();
		} else {
			this.form.reportValidity();
		}
	};

	#onReset = () => {
		this.form?.reset();
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
				this.disabled = disabled;
				this.button.disabled = disabled;
			}
		);
	};

	formDisabledCallback( disabled ) {
		super.formDisabledCallback( disabled );

		if ( ! this.isConnected ) {
			return;
		}

		this.#onDisabledChange( disabled );
	}
}

/**
 * @typedef {('primary' | 'secondary-color' | 'secondary-gray' | 'tertiary-color' | 'tertiary-gray' | 'link-color' | 'link-gray' | 'icon')} ButtonVariant
 * @typedef {import('../../utils/prop-types').BorderlessProp} BorderlessProp
 * @typedef {import('../../utils/prop-types').PaddinglessProp} PaddinglessProp
 * @typedef {import('../../utils/prop-types').SizeProp} SizeProp
 */

/**
 * @typedef {("application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain")} FormEncType
 * @typedef {("get" | "post")} FormMethod
 * @typedef {("_self" | "_blank" | "_parent" | "_top")} FormTarget
 */

/**
 * @typedef {import('../../mixins/as-link').AsLinkAttributes} AsLinkAttributes
 */

/**
 * @typedef {import('../icon').IconName} IconName
 */

/**
 * @typedef {Object} DefaultButtonAttributes
 * @property {ButtonVariant} variant
 * @property {SizeProp} scale
 * @property {IconName} icon
 * @property {'button' | 'submit' | 'reset'} type
 * @property {boolean} disabled
 * @property {string}  formaction
 * @property {FormEncType} formenctype
 * @property {FormMethod} formmethod
 * @property {boolean} formnovalidate
 * @property {FormTarget} formtarget
 */

/**
 * @typedef {AsLinkAttributes & DefaultButtonAttributes} ButtonAttributes
 */
