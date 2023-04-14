import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import createSelectionStrategy from '@welingtonms/xb-toolset/dist/selection';
import toArray from '@welingtonms/xb-toolset/dist/to-array';

import XBElement from '../../common/xb-element';
import styles from './selection-keeper.styles';

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

@customElement( 'xb-selection-keeper' )
export class SelectionKeeper extends XBElement {
	static styles = [ styles() ];

	/**
	 * Event triggered when a selection happens. Default = 'xb-selection-select'
	 * @type {SelectionKeeperAttributes['listen']}
	 */
	@property( { type: String } ) listen;

	/**
	 * Selection strategy.
	 * @type {SelectionKeeperAttributes['type']}
	 */
	@property( { type: String } ) type;

	/**
	 * Selection value.
	 * @type {SelectionKeeperAttributes['value']}
	 */
	@property( {} ) value;

	/**
	 * `Set` that represents the current selection value.
	 * @type {SelectionState}
	 */
	@property( { state: true } ) _state;

	/** @type {SelectionStrategy} */
	_strategy = null;

	constructor() {
		super();

		this.listen = 'xb-selection-select';

		this.type;

		this.value;

		/** @type {SelectionState} */
		this._state = new Set();
	}

	connectedCallback() {
		super.connectedCallback();

		this.addEventListener( this.listen, this._handleSelectionRequest );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.removeEventListener( this.listen, this._handleSelectionRequest );
	}

	/**
	 * @param {import('lit').PropertyValues<SelectionKeeper>} changedProperties
	 */
	update( changedProperties ) {
		if (
			this._strategy == null ||
			( this.type != null && changedProperties.has( 'type' ) )
		) {
			this._strategy = createSelectionStrategy( { type: this.type } );
			this._state = this._strategy.init( Array.from( this._state ) );
		}

		if ( changedProperties.has( 'value' ) ) {
			const changed = getChanged( this._state, toArray( this.value ) );
			this._state = this._strategy.init( toArray( this.value ) );

			/**
			 * Although lit's doc states that events "_should generally not be dispatched
			 * in response to state changes made by the owner of the component via its property
			 * or attribute APIs", in this case, we need to report the selection state (consolidated
			 * by the strategy) back to whoever is using this component, in case they need it. Since
			 * this is done via dispatching the `'xb-change'` event, that's why, although
			 * atypical, this is being done here.
			 *
			 * Reference: https://lit.dev/docs/components/events/#when-to-dispatch-an-event
			 */
			this._publish( changed );
		}

		super.update( changedProperties );
	}

	render() {
		return html`
			<slot></slot>
		`;
	}

	_handleSelectionRequest( event ) {
		const {
			detail: { type = 'toggle', value },
		} = event;

		if ( this.type == null ) {
			console.warn( '[selection-keeper] you forgot to set the selection type.' );
			return;
		}

		const changed = getChanged( this._state, toArray( value ) );

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
	 * Emit the `xb-change` event.
	 * @param {SelectionState} changed
	 */
	_publish( changed ) {
		this.emit( 'xb-change', {
			detail: {
				state: this._state,
				value: this._strategy.value( this._state ),
				changed,
			},
		} );
	}
}

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
 * @property {SelectionType} type - Selection strategy.
 * @property {string | string[] | SelectionOption | SelectionOption[]} value - Selection value.
 * @property {string | string[]} [listen] - Event triggered when a selection happens. Default = 'xb-selection-select'
 */
