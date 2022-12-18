/**
 * Controls select's internal logic.
 * @class
 * @implements {import('lit').ReactiveController}
 */
class SelectController {
	/** @type {SelectHost} */
	host = null;

	/**
	 *
	 * @param {SelectHost} host
	 */
	constructor( host ) {
		( this.host = host ).addController( this );
	}

	hostConnected() {}

	hostDisconnected() {}

	hostUpdated() {
		this._updateOptions();
		this._updateTriggerValue();
		// TODO: handle datasources
	}

	/**
	 * @param {SelectOption} option
	 */
	_updateOptionRole( option ) {
		option.setAttribute(
			'role',
			[ 'single' ].includes( this.host.type ) ? 'radio' : 'checkbox'
		);
	}

	/**
	 * @param {SelectOption} option
	 */
	_updateOptionDisabled( option ) {
		option.disabled = this.host.disabled || option.disabled;
	}

	/**
	 * @param {SelectOption} option
	 */
	_updateOptionSelected( option ) {
		option.checked = this.host.selection.has( option.value );
	}

	_updateOptions() {
		this.host.options?.forEach( ( option ) => {
			this._updateOptionRole( option );
			this._updateOptionDisabled( option );
			this._updateOptionSelected( option );
		} );
	}

	_updateTriggerValue() {
		// const selection = this.host.selection;
		// const trigger = this.host.trigger;
		// const options = this.host.options;
		// trigger.value = '';
		// if ( ! this.host.multiple ) {
		// 	const selectedOption = options.find( ( option ) =>
		// 		selection.has( option.value )
		// 	);
		// 	trigger.placeholder =
		// 		selectedOption?.getTextLabel() ?? this.host.placeholder;
		// } else {
		// 	trigger.placeholder =
		// 		selection.size > 0
		// 			? `${ selection.size } selected`
		// 			: this.host.placeholder;
		// }
	}
}

class SingleSelectController extends SelectController {
	_updateTriggerValue() {
		const selection = this.host.selection;
		const trigger = this.host.trigger;
		const options = this.host.options;

		const selectedOption = options.find( ( option ) =>
			selection.has( option.value )
		);

		trigger.placeholder =
			selectedOption?.getTextLabel() ?? this.host.placeholder;
	}
}

class MultipleSelectController extends SelectController {
	_updateTriggerValue() {
		const selection = this.host.selection;
		const trigger = this.host.trigger;

		trigger.placeholder =
			selection.size > 0
				? `${ selection.size } selected`
				: this.host.placeholder;
	}
}

/**
 * Factory function for the select controller according to the
 * selection type.
 * @param {SelectHost} host
 */
export function createSelectController( host ) {
	if ( host.type == 'multiple' ) {
		return new MultipleSelectController( host );
	}

	return new SingleSelectController( host );
}

export default SelectController;

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('./select').Select} Select
 * @typedef {import('../dropdown/dropdown').Dropdown} Dropdown
 * @typedef {import('./select-trigger').SelectTrigger} SelectTrigger
 * @typedef {import('./select-option').SelectOption} SelectOption
 * @typedef {import('./select.controller').default} SelectController
 * @typedef {ReactiveControllerHost & Select} SelectHost
 */
