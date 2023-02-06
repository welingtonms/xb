import { html } from 'lit';
import { ContextConsumer } from '@lit-labs/context';
import withClassy from '@welingtonms/classy';

import { selectContext } from './select-context';

import XBElement from '../../common/xb-element';
import styles from './select-trigger.styles';

import '../form/text-input';

export class SelectTrigger extends XBElement {
	/** @type {import('../form/text-input/text-input').TextInput} */
	_input;

	/** @type {number} */
	_timeout;

	// /** @type {ContextConsumer<Selection, SelectTrigger>} */
	// _selection;

	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * Is the dropdown menu open.
			 * This is updated by the dropdown.
			 * @type {SelectTriggerAttributes['open']}
			 */
			open: {
				type: Boolean,
				attribute: false,
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

		/** @type {ContextConsumer<Selection, SelectTrigger>} */
		this._select = new ContextConsumer(
			this,
			selectContext,
			undefined,
			true // subscribe to updates when selection changes
		);
	}

	get input() {
		this._input = this._input ?? this.shadowRoot.querySelector( 'xb-text-input' );

		return this._input;
	}

	render() {
		const { classy, when } = withClassy( { open: this.open } );

		return html`
			<xb-text-input
				role="combobox"
				aria-autocomplete="list"
				aria-expanded=${ this.open ? 'true' : 'false' }
				aria-controls="menu"
				clearable
				class="${ classy( 'select-trigger', {
					'is-open': when( { open: true } ),
				} ) }"
				placeholder="${ this._getPlaceholderText() }"
				?disabled=${ this._isDisabled() }
				@click=${ this._handleTriggerClick }
				@xb-change=${ this._handleTriggerChange }
				@xb-input=${ this._handleTriggerInput }
			>
				<xb-button
					tabindex="-1"
					aria-label="Options"
					aria-expanded=${ this.open ? 'true' : 'false' }
					aria-controls="menu"
					slot="trailing"
					paddingless
					emphasis="text"
					size="extra-small"
					@click=${ this._handleTrailingClick }
				>
					<xb-icon
						aria-hidden="true"
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

	focus() {
		this.input?.focus();
	}

	clear() {
		this.input?.clear();
	}

	_getPlaceholderText() {
		const { multiple, selection, placeholder, controller } = this._select.value;

		if ( selection.size === 0 ) {
			return placeholder;
		}

		if ( multiple ) {
			return `${ selection.size } selected`;
		}

		const [ value ] = Array.from( selection.keys() );
		const item = controller.getRaw( value );
		const { label } = controller.toOption( item );

		return label;
	}

	_isDisabled() {
		const { disabled } = this._select.value;

		return Boolean( this.disabled || disabled );
	}

	_handleTriggerClick() {
		const options = {
			composed: true,
			detail: { action: 'open' },
		};

		this.emit( 'xb-dropdown', options );
	}

	_handleTriggerChange( e ) {
		e.stopPropagation();
	}

	_handleTriggerInput( e ) {
		e.stopPropagation();

		const query = String( e.target.value ).trim();
		clearTimeout( this._timeout );

		this._timeout = setTimeout( () => {
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
 * @typedef {import('@lit-labs/context').ContextConsumer} ContextConsumer
 * @typedef {import('../../contexts/selection').Selection} Selection
 */

/**
 * @typedef {Object} SearchEventDetail
 * @property {String} query - Search term
 */

/**
 * @typedef {Object} SelectTriggerAttributes
 * @property {boolean} [open] - Is the dropdown menu open.
 * @property {string} placeholder
 */
