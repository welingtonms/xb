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

	/** @type {import('@welingtonms/xb-toolset/dist/selection').SelectionStrategy} */
	strategy = null;

	/**
	 *
	 * @param {SelectionHost} host
	 * @param {import('@welingtonms/xb-toolset/dist/selection').SelectionType} type - Type of selection to be managed.
	 * @param {string} event - Name of the event that should be listened to.
	 */
	constructor( host, type, event = 'xb-select' ) {
		this.type = type;
		this.event = event;
		this.host = host;

		this.strategy = createSelectionStrategy( { type } );

		this.host.addController( this );
	}

	hostConnected() {
		this.subscribe();
	}

	hostDisconnected() {
		this.unsubscribe();
	}

	init = ( values ) => {
		this.host._selection = this.strategy.init( values );
	};

	select = ( values ) => {
		this.host._selection = this.strategy.select( values, this.host._selection );
	};

	unselect = ( values ) => {
		this.host._selection = this.strategy.unselect(
			values,
			this.host._selection
		);
	};

	toggle = ( values ) => {
		this.host._selection = this.strategy.toggle( values, this.host._selection );
	};

	reset = () => {
		this.host._selection = this.strategy.reset();
	};

	subscribe = () => {
		this.host.addEventListener( this.event, this._handleSelectionEvent );
	};

	unsubscribe = () => {
		this.host.removeEventListener( this.event, this._handleSelectionEvent );
	};

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
			detail: { type, value },
		} = e;

		if (
			this.type == null ||
			! [ 'select', 'unselect', 'toggle' ].includes( type )
		) {
			console.warn(
				'[SelectionController] Did you forget to set the selection type?'
			);
			return;
		}

		switch ( type ) {
			case 'select':
				this.select( toArray( value ) );
				break;
			case 'unselect':
				this.unselect( toArray( value ) );
				break;
			case 'toggle':
				this.toggle( toArray( value ) );
				break;
		}

		this._publish();
	};

	_publish = () => {
		const options = {
			detail: {
				type: this.type,
				value: this.strategy.value( this.host._selection ),
			},
			composed: false,
		};

		this.host.emit( 'xb-change', options );
	};
}

export default SelectionController;

/**
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionType} SelectionType
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionState} SelectionState
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('../../common/xb-element').default} XBElement
 * @typedef {ReactiveControllerHost & XBElement & { _selection: SelectionState, type: SelectionType }} SelectionHost
 */

/**
 * @typedef {Object} SelectionEventDetail
 * @property {SelectionType} type - type of selection being performed
 * @property {SelectionState} value - currently selected value
 */
