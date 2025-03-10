import CheckboxController from './checkbox.controller';

function getState( checked, indeterminate ) {
	if ( indeterminate ) {
		return 'mixed';
	}

	return String( checked );
}

/**
 * Does this checkbox represent a group?
 * @param {XBElement} checkbox
 * @returns {boolean}
 */
function hasGroup( checkbox ) {
	return checkbox.getAttribute( 'aria-controls' );
}

/**
 * A checkbox that controls a group CANNOT be checked/unchecked imperatively.
 * Based on // https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/examples/checkbox-mixed/
 */
class CheckboxGroupController extends CheckboxController {
	/**
	 * @type {Map<string, CheckboxControllerHost>}
	 */
	group;

	/**
	 * @param {CheckboxGroupControllerHost} host
	 */
	constructor( host ) {
		super( host );
	}

	async hostConnected() {
		let promises = [];
		this.group = new Map();

		const checkboxes = ( this.host.getAttribute( 'aria-controls' ) || '' )
			.split( /\s+/ )
			.map( ( id ) => Boolean( id ) && document.querySelector( `xb-checkbox#${ id }` ) )
			.filter( Boolean );

		for ( let i = 0; i < checkboxes.length; i += 1 ) {
			const checkbox = checkboxes[ i ];

			promises.push( checkbox.updateCompleted );
			this.group.set( checkbox.id, checkbox );

			checkbox.addEventListener( 'xb:change', this._handleChange );
		}

		/**
		 * we just wait for lit to finish updating all the checkboxes in the group.
		 * TODO: wrap in try/catch block
		 */
		await Promise.allSettled( promises );

		this._updateMixedState();

		this.host.addEventListener( 'click', this._handleClick );
	}

	hostDisconnected() {
		super.hostDisconnected();

		for ( const [ , checkbox ] of this.group ) {
			checkbox.removeEventListener( 'xb:change', this._handleChange );
		}
	}

	hostUpdate() {
		const previousState = this.host.getAttribute( 'aria-checked' );
		const newState = getState( this.host.checked, this.host.indeterminate );

		/**
		 * this block handles propagation of changes to nested checkbox group.
		 * we ignore the 'mixed' state, because it's a calculated state.
		 */
		if ( previousState && previousState !== newState && newState !== 'mixed' ) {
			this._setCheckboxGroup( newState );
		}
	}

	toggle = () => {
		const state = getState( this.host.checked, this.host.indeterminate );

		if ( state === 'true' ) {
			this._setCheckboxGroup( 'false' );
		} else if ( state === 'false' && this._groupHasPreviouslyChecked() ) {
			this._setCheckboxGroup( 'previous' );
		} else {
			// is mixed or false and does not have previously checked
			this._setCheckboxGroup( 'true' );
		}

		this._updateMixedState();
	};

	_groupHasPreviouslyChecked = () => {
		return Array.from( this.group.values() ).some( ( checkbox ) => {
			if ( hasGroup( checkbox ) ) {
				return checkbox._controller._groupHasPreviouslyChecked();
			}

			return checkbox.getAttribute( 'data-previously-checked' ) === 'true';
		} );
	};

	_setCheckboxGroup = ( value ) => {
		for ( const [ , checkbox ] of this.group ) {
			if ( hasGroup( checkbox ) ) {
				checkbox._controller._setCheckboxGroup( value );
			} else {
				switch ( value ) {
					case 'previous':
						checkbox.checked = checkbox.getAttribute( 'data-previously-checked' ) === 'true';
						break;

					case 'true':
						checkbox.checked = true;
						checkbox.indeterminate = false;

						break;

					default:
						checkbox.checked = false;
						checkbox.indeterminate = false;

						break;
				}
			}
		}
	};

	/**
	 * Handle `xb-change` event from the checkboxes from the `aria-controls` attribute.
	 * @param {CustomEvent<CheckboxEventDetail>} event
	 * @returns
	 */
	_handleChange = ( event ) => {
		const { target } = event;

		if ( target.matches( 'xb-checkbox' ) ) {
			this._updateMixedState();
		}
	};

	_updateMixedState = () => {
		/**
		 * @type {[number, number, number]} [true, false, mixed]
		 */
		let [ newState ] = this._consolidateGroupState();

		/**
		 * What ensures the the `aria-checked` attribute
		 * won't be unsynced with the `checked` attribute is the
		 * `setCheckboxGroup` in the `toggle` method.
		 */
		if ( newState === 'true' ) {
			this.host.checked = true;
			this.host.indeterminate = false;
		} else if ( newState === 'mixed' ) {
			this.host.checked = false;
			this.host.indeterminate = true;
		} else {
			this.host.checked = false;
			this.host.indeterminate = false;
		}

		this.host.setAttribute( 'aria-checked', newState );
		this.host.setAttribute( 'data-previously-checked', newState );
	};

	_consolidateGroupState = () => {
		let counters = {
			true: 0,
			false: 0,
		};

		for ( const [ , checkbox ] of this.group ) {
			if ( hasGroup( checkbox ) ) {
				const [ , groupCounters ] = checkbox._controller._consolidateGroupState();

				counters[ 'true' ] += groupCounters[ 'true' ];
				counters[ 'false' ] += groupCounters[ 'false' ];
			} else {
				const state = getState( checkbox.checked, checkbox.indeterminate );

				counters[ state ]++;
			}
		}

		let newState;

		// considering that no group will be empty
		if ( counters[ 'true' ] === 0 ) {
			newState = 'false';
		} else if ( counters[ 'false' ] === 0 ) {
			newState = 'true';
		} else {
			newState = 'mixed';
		}

		return [ newState, counters ];
	};
}

export default CheckboxGroupController;

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('../../../common/xb-element').default} XBElement
 */

/**
 * @typedef {import('./checkbox.controller').CheckboxControllerHost} CheckboxControllerHost
 */
