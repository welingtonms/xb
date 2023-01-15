import { html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import withClassy from '@welingtonms/classy';

import XBElement from '../../common/xb-element';
import styles from './select-trigger.styles';

import '../form/text-input';

export class SelectTrigger extends XBElement {
	search = createRef();

	/** @type {number} */
	timeout;

	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * Is the dropdown menu open.
			 * @type {SelectTriggerAttributes['open']}
			 */
			open: {
				type: Boolean,
				reflect: true,
			},

			/**
			 * Is the dropdown menu open.
			 * @type {SelectTriggerAttributes['value']}
			 */
			value: {
				type: String,
				reflect: true,
			},

			/**
			 * Placeholder value.
			 * @type {TextInputAttributes['placeholder']}
			 */
			placeholder: {
				type: String,
				reflect: true,
			},
		};
	}

	constructor() {
		super();

		/** @type {SelectTriggerAttributes['open']} */
		this.open = false;

		/** @type {SelectTriggerAttributes['value']} */
		this.value;

		/** @type {SelectTriggerAttributes['placeholder']} */
		this.placeholder = 'Search & Select';
	}

	focus() {
		this._getSearch()?.focus();
	}

	clear() {
		this._getSearch()?.clear();
	}

	render() {
		const { classy, when } = withClassy( { open: this.open } );

		return html`
			<xb-text-input
				${ ref( this.search ) }
				clearable
				class="${ classy( 'select-trigger', {
					'is-open': when( { open: true } ),
				} ) }"
				placeholder="${ this.placeholder }"
				@click=${ this._handleTriggerClick }
				@xb-input=${ this._handleTriggerInput }
			>
				<xb-button
					slot="trailing"
					paddingless
					emphasis="text"
					size="extra-small"
					@click=${ this._handleTrailingClick }
				>
					<xb-icon
						class=${ classy( 'indicator', {
							'is-open': when( { open: true } ),
						} ) }
						name="expand-more"
						size="16"
					></xb-icon>
				</xb-button>
			</xb-text-input>
		`;
	}

	/**
	 * @returns {HTMLInputElement}
	 */
	_getSearch() {
		return this.search.value;
	}

	_handleTriggerClick() {
		const options = {
			composed: true,
			detail: { action: 'open' },
		};

		this.emit( 'xb-dropdown', options );
	}

	_handleTriggerInput( e ) {
		e.stopPropagation();

		const query = String( e.target.value ).trim();
		clearTimeout( this.timeout );

		this.timeout = setTimeout( () => {
			this.emit( 'xb-select-search', {
				detail: { query },
			} );
		}, 450 );
	}

	_handleTrailingClick( e ) {
		e.stopPropagation();

		const options = {
			composed: true,
			detail: { action: 'toggle' },
		};

		this.emit( 'xb-dropdown', options );
	}
}

window.customElements.define( 'xb-select-trigger', SelectTrigger );

/**
 * @typedef {Object} SearchEventDetail
 * @property {String} query - Search term
 */

/**
 * @typedef {Object} SelectTriggerAttributes
 * @property {boolean} [open] - Is the dropdown menu open.
 * @property {string} value - Representation of the currently selected value.
 * @property {string} placeholder
 */
