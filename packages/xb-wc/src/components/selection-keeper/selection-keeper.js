import { ContextProvider, ContextRoot, createContext } from '@lit-labs/context';
import { html, LitElement } from 'lit';
import createSelectionStrategy from '@welingtonms/xb-toolset/dist/selection';
import toArray from '@welingtonms/xb-toolset/dist/to-array';

import styles from './selection-keeper.styles';

const root = new ContextRoot();
const selectionContext = createContext( 'selection' );

/**
 *
 * @param {SelectionState} state
 * @param {*} value
 */
function getChanged( state, value ) {
	/**
	 * TODO: evaluate the need to optimize based on the type (multiple, single, or single-strict),
	 * for example, returning only `value` (since the existing selected options won't change), and
	 * returning both the current state and value for single selections.
	 */
	return Array.from( new Set( [ ...state.keys(), ...toArray( value ) ] ) );
}

export class SelectionKeeper extends LitElement {
	static styles = [ styles() ];

	/** @type {SelectionStrategy} */
	_strategy = null;

	/** @type {ContextProvider<Selection>} */
	_provider;

	static get properties() {
		return {
			/**
			 * Selection strategy.
			 * @type {SelectionKeeperAttributes['emit']}
			 */
			emit: { type: String },

			/**
			 * Selection strategy.
			 * @type {SelectionKeeperAttributes['listen']}
			 */
			listen: { type: String },

			/**
			 * Selection strategy.
			 * @type {SelectionKeeperAttributes['type']}
			 */
			type: { type: String },

			/**
			 * Selection value attribute.
			 * @type {SelectionKeeperAttributes['value']}
			 */
			value: {},

			/**
			 * Selection value state.
			 * @type {SelectionState}
			 */
			_state: {
				state: true,
			},
		};
	}

	constructor() {
		super();

		/** @type {SelectionKeeperAttributes['emit']} */
		this.emit = 'xb-selection-change';

		/** @type {SelectionKeeperAttributes['listen']} */
		this.listen = 'xb-selection-select';

		/** @type {SelectionKeeperAttributes['type']} */
		this.type;

		/** @type {SelectionKeeperAttributes['value']} */
		this.value;

		/** @type {SelectionState} */
		this._state = new Set();

		/** @type {ContextProvider<Selection>} */
		this._provider = new ContextProvider( this, selectionContext, {
			state: this._state,
		} );
	}

	connectedCallback() {
		super.connectedCallback();

		root.detach( document.body );
		root.attach( document.body );

		this.attachEventListeners();
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.detachEventListeners();
	}

	/**
	 * @param {import('lit').PropertyValues<SelectionHost>} changedProperties
	 */
	update( changedProperties ) {
		/**
		 * We create a strategy either if we haven't created one yet, or if the
		 * selection type changed.
		 */
		if (
			this._strategy == null ||
			( this.type != null && changedProperties.has( 'type' ) )
		) {
			this._strategy = createSelectionStrategy( { type: this.type } );
			this._state = this._strategy.init( Array.from( this._state ) );
		}

		/**
		 * If `value` changed, we need to reset the strategy.
		 */
		if ( changedProperties.has( 'value' ) ) {
			const changed = getChanged( this._state, toArray( this.value ) );
			this._state = this._strategy.init( toArray( this.value ) );

			// this._publish( changed );
		}

		super.update( changedProperties );
	}

	getSelectionState() {
		return this._state;
	}

	getSelectionValue() {
		return this._strategy?.value( this._state ) ?? null;
	}

	render() {
		return html`
			<slot></slot>
		`;
	}

	attachEventListeners() {
		this.addEventListener( this.listen, this._handleSelectionRequest );
	}

	detachEventListeners() {
		this.removeEventListener( this.listen, this._handleSelectionRequest );
	}

	_handleSelectionRequest( event ) {
		const {
			detail: { type = 'toggle', value },
		} = event;

		if ( this.type == null ) {
			console.warn( '[SelectionKeeper] you forgot to set the selection type.' );
			return;
		}

		const changed = getChanged( this._state, toArray( this.value ) );

		switch ( type ) {
			case 'select':
				this._state = this._strategy.select( toArray( value ), this._state );
				break;
			case 'unselect':
				this._state = this._strategy.unselect( toArray( value ), this._state );
				break;
			case 'toggle':
			default:
				this._state = this._strategy.toggle( toArray( value ), this._state );
				break;
		}

		this._publish( changed );
	}

	/**
	 *
	 * @param {SelectionState} changed
	 */
	_publish( changed ) {
		this._provider.setValue( { state: this._state } );

		this.dispatchEvent(
			new CustomEvent( this.emit, {
				bubbles: true,
				cancelable: true,
				composed: true,
				detail: {
					state: this._state,
					value: this._strategy.value( this._state ),
					changed,
				},
			} )
		);
	}
}

window.customElements.define( 'xb-selection-keeper', SelectionKeeper );

/**
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionType} SelectionType
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionState} SelectionState
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionStrategy} SelectionStrategy
 * @typedef {'select' | 'unselect' | 'toggle'} SelectionOperation
 */

/**
 * @typedef {Object} SelectionEventDetail
 * @property {SelectionOperation} type - type of selection being performed
 * @property {null | string | string[]} value - currently selected value
 * @property {SelectionState} state - currently selected value
 * @property {string[]} changed - values that changed from the previously selected va\
 */

/**
 * @typedef {Object} SelectionContext
 * @property {SelectionState} state
 */

/**
 * @typedef {Object} GenericSelectionOption
 * @property {string} label
 * @property {string} value
 */

/**
 * @typedef {Object} CustomSelectionOption
 * @property {string} _type
 */

/**
 * @typedef {GenericSelectionOption | CustomSelectionOption} SelectionOption
 */

/**
 * @typedef {Object} SelectionKeeperAttributes
 * @property {SelectionType} type
 * @property {string | string[] | SelectionOption | SelectionOption[]} value
 * @property {string | string[]} [listen] - Event triggered when a selection happens. Default = 'xb-selection-select'
 * @property {string} [emit] - Event dispatched when the selection changes. Default = 'xb-selection-change'
 */
