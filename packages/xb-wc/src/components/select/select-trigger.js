import { html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import withClassy from '@welingtonms/classy';

import XBElement from '../../common/xb-element';
import styles from './select-trigger.styles';

import '../form/text-input';

export class SelectTrigger extends XBElement {
	search = createRef();

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
		this.value = '';

		/** @type {SelectTriggerAttributes['placeholder']} */
		this.placeholder = 'Search & Select';
	}

	focus() {
		this._getSearch()?.focus();
	}

	render() {
		const { classy, when } = withClassy( { open: this.open } );

		return html`
			<xb-text-input
				${ ref( this.search ) }
				class="${ classy( 'select-trigger', {
					'is-open': when( { open: true } ),
				} ) }"
				value="${ this.value }"
				placeholder="${ this.placeholder }"
				@click=${ this._handleTriggerClick }
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
 * @typedef {Object} SelectTriggerAttributes
 * @property {boolean} [open] - Is the dropdown menu open.
 * @property {string} value - Representation of the currently selected value.
 * @property {string} placeholder
 */
