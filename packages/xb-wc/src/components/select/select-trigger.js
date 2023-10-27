import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
// import { ContextConsumer } from '@lit-labs/context';
import withClassy from '@welingtonms/classy';

// import selectionContext from '../../contexts/selection';

import XBElement from '../../common/xb-element';
import styles from './select-trigger.styles';

import '../form/text-input';

@customElement( 'xb-select-trigger' )
export class SelectTrigger extends XBElement {
	// /** @type {ContextConsumer<Selection, SelectTrigger>} */
	// _selection;

	static styles = [ styles() ];

	/**
	 * Is the dropdown menu open.
	 * This is updated by the dropdown.
	 * @type {SelectTriggerAttributes['open']}
	 */
	@property( { type: Boolean, attribute: false } ) accessor open;

	/**
	 * Placeholder value.
	 * @type {TextInputAttributes['placeholder']}
	 */
	@property( { type: String, reflect: true } ) accessor placeholder;

	/** @type {import('../form/text-input/text-input').TextInput} */
	_input;

	/** @type {number} */
	_timeout;

	constructor() {
		super();

		this.open = false;

		this.value;

		/** @type {SelectTriggerAttributes['placeholder']} */
		this.placeholder = 'Search & Select';

		/** @type {ContextConsumer<Selection, SelectTrigger>} */
		// this._selection = new ContextConsumer(
		// 	this,
		// 	selectionContext,
		// 	undefined,
		// 	true // subscribe to updates when selection changes
		// );
	}

	get input() {
		this._input = this._input ?? this.shadowRoot.querySelector( 'xb-text-input' );

		return this._input;
	}

	// 	_updateTrigger() {
	// 	const options = this.options;
	// 	const selection = this.selection;
	// 	const trigger = this.trigger;

	// 	if ( this.type == 'multiple' ) {
	// 		trigger.placeholder =
	// 			selection.size > 0 ? `${ selection.size } selected` : this.placeholder;
	// 	} else {
	// 		/**
	// 		 * TODO: create a datasource with the static options so we can use the
	// 		 * _datasourceHelpers `resolve` function here.
	// 		 */
	// 		const selectedOption = options.find( ( option ) =>
	// 			selection.has( option.value )
	// 		);

	// 		trigger.placeholder = selectedOption?.text() ?? this.placeholder;
	// 	}
	// }

	render() {
		const { classy, when } = withClassy( { open: this.open } );

		// console.log( 'select-trigger context', this._selection.value );

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
				placeholder="${ this.placeholder }"
				@click=${ this._handleTriggerClick }
				@xb:change=${ this._handleTriggerChange }
				@xb:input=${ this._handleTriggerInput }
			>
				<xb-button
					class="handle"
					tabindex="-1"
					aria-label="Options"
					aria-expanded=${ this.open ? 'true' : 'false' }
					aria-controls="menu"
					slot="trailing"
					paddingless="all"
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

	_handleTriggerClick() {
		this.emit( 'xb:dropdown-expand' );
	}

	_handleTriggerChange( e ) {
		e.stopPropagation();
	}

	_handleTriggerInput( e ) {
		e.stopPropagation();

		const query = String( e.target.value ).trim();
		clearTimeout( this._timeout );

		this._timeout = setTimeout( () => {
			this.emit( 'xb:select-search', {
				detail: { query },
			} );
		}, 450 );
	}

	_handleTrailingClick( e ) {
		e.stopPropagation();

		this.emit( 'xb:dropdown-toggle' );
	}
}

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
