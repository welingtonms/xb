import createSelectionStrategy from '@welingtonms/xb-toolset/dist/selection';
import toArray from '@welingtonms/xb-toolset/dist/to-array';

/**
 * Manages selection through the SelectionStrategy.
 * It's expected that `host` has a `selection` state.
 * @class
 * @implements {import('lit').ReactiveController}
 */
class SelectionController {
	/** @type {SelectionHost} */
	host = null;

	/** @type {SelectionStrategy} */
	strategy = null;

	/** @type {SelectionState} */
	selection = new Set();

	/** @type {SelectionType} */
	_type;

	/**
	 * Event that should be emitted upon selection change.
	 * @type {string}
	 * */
	_emit;

	/**
	 * Event that should be listened to to detect selection change.
	 * @type {string}
	 * */
	_listen;

	/**
	 *
	 * @param {SelectionHost} host
	 * @param {SelectionControllerOptions} options - Selection options.
	 */
	constructor( host, options ) {
		this.host = host;

		const { type, emit, listen } = options || {};

		this.type = type;

		this._emit = emit ?? 'xb-change';
		this._listen = listen ?? 'xb-select';

		this.host.addController( this );
	}

	hostConnected() {
		this.subscribe();
	}

	hostDisconnected() {
		this.unsubscribe();
	}

	/**
	 * @param {SelectionTypes} type - New selection type
	 */
	set type( type ) {
		this._type = type;

		this.strategy = createSelectionStrategy( { type } );

		this.init( Array.from( this.selection ) );
	}

	/**
	 * @returns {SelectionType}
	 */
	get type() {
		return this._type;
	}

	init( values ) {
		this.selection = this.strategy.init( values );

		this.host.requestUpdate();
	}

	/**
	 * @returns {string}
	 */
	value() {
		return toArray( this.strategy.value( this.selection ) ).join( ', ' );
	}

	_select( values ) {
		this.selection = this.strategy.select( values, this.selection );
	}

	_unselect( values ) {
		this.selection = this.strategy.unselect( values, this.selection );
	}

	_toggle( values ) {
		console.log( '>>>', values );
		this.selection = this.strategy.toggle( values, this.selection );
	}

	// reset() {
	// 	this.selection = this.strategy.reset();
	// }

	subscribe() {
		this.host.addEventListener( this._listen, this._handleSelectionEvent );
	}

	unsubscribe() {
		this.host.removeEventListener( this._listen, this._handleSelectionEvent );
	}

	/**
	 * using arrow function so we keep the lexical context this is necessary
	 * because the event itself will happen in the context of the host element.
	 * @param {CustomEvent<SelectionEventDetail>} e
	 */
	_handleSelectionEvent = ( e ) => {
		if ( this.disabled ) {
			return;
		}

		const {
			detail: { type = 'toggle', value },
		} = e;

		if ( this.type == null ) {
			console.warn(
				"[SelectionController] ou forget to set the selection type; we'll assume it's a toggle operation."
			);
		}

		switch ( type ) {
			case 'select':
				this._select( toArray( value ) );
				break;
			case 'unselect':
				this._unselect( toArray( value ) );
				break;
			case 'toggle':
			default:
				this._toggle( toArray( value ) );
				break;
		}

		this.host.requestUpdate();
		this._publish( type );
	};

	/**
	 * Emit event.
	 * @param {SelectionOperation} type
	 */
	_publish = ( type ) => {
		const options = {
			detail: {
				type,
				value: this.strategy.value( this.selection ),
			},
			composed: false,
		};

		this.host.emit( this._emit, options );
	};
}

export default SelectionController;

/**
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionType} SelectionType
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionState} SelectionState
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionStrategy} SelectionStrategy
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('../../common/xb-element').default} XBElement
 * @typedef {ReactiveControllerHost & XBElement & { _selection: SelectionState, type: SelectionType }} SelectionHost
 * @typedef {'select' | 'unselect' | 'toggle'} SelectionOperation
 */

/**
 * @typedef {Object} SelectionEventDetail
 * @property {SelectionOperation} type - type of selection being performed
 * @property {SelectionState} value - currently selected value
 */

/**
 * @typedef {Object} SelectionControllerOptions
 * @property {SelectionType} type - Type of selection to be managed.
 * @property {string} listen - Name of the event that should be listened to.
 * @property {string} emit - Name of the event that should be emitted.
 */

/**
 * @typedef {Object} SelectionControllerProps
 * @property {SelectionHost} host
 * @property {SelectionControllerOptions} options
 */
