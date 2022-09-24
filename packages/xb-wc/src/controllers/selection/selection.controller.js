import createSelectionStrategy from '@welingtonms/xb-toolset/dist/selection';
import toArray from '@welingtonms/xb-toolset/dist/to-array';

/**
 * Managers selection through the SelectionStrategy.
 * It's expected that `host` has a `selection` state.
 */
class SelectionController {
	host = null;

	/**
	 *
	 * @param {import('lit').ReactiveControllerHost & HTMLElement} host
	 * @param {import('@welingtonms/xb-toolset/dist/selection').SelectionType} type - Type of selection to be managed.
	 * @param {string} event - Name of the event that should be listened to.
	 */
	constructor( host, type, event = 'xb-select' ) {
		this.type = type;
		this.event = event;

		/** @type {import('@welingtonms/xb-toolset/dist/selection').SelectionStrategy} */
		this.strategy = createSelectionStrategy( { type } );

		( this.host = host ).addController( this );
	}

	hostConnected() {
		this.host.addEventListener( this.event, this._handleSelectionEvent );
	}

	/**
	 * using arrow function so we keep the lexical context this is necessary
	 * because the event itself will happen in the context of the host element.
	 */

	_handleSelectionEvent = ( e ) => {
		if ( this.disabled ) {
			return;
		}

		if ( this.type == null ) {
			console.warn(
				'[SelectionController] Did you forget to set the selection type?'
			);
			return;
		}

		const {
			detail: { type, value },
		} = e;

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
	};

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
}

export default SelectionController;
