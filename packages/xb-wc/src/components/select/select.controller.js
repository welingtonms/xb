import toArray from '@welingtonms/xb-toolset/dist/to-array';

import DatasourcesHelpers from './datasources.helpers';

function createOption( { value, label, type } ) {
	const option = Object.assign( document.createElement( 'xb-option' ), {
		value,
		innerHTML: label,
	} );

	option.dataset.type = type;

	return option;
}

/**
 * Controls select's internal logic.
 * @class
 * @implements {import('lit').ReactiveController}
 */
class SelectController {
	/** @type {SelectHost} */
	host = null;

	/** @type {DatasourcesHelper} */
	datasources = DatasourcesHelpers();

	options = new Map();

	/**
	 *
	 * @param {SelectHost} host
	 */
	constructor( host ) {
		( this.host = host ).addController( this );
	}

	hostConnected() {
		this._handleChangeEvent = this._handleChangeEvent.bind( this );
		this._handleDropdownCollapse = this._handleDropdownCollapse.bind( this );
		this._handleSearchEvent = this._handleSearchEvent.bind( this );
		this._handleSelectEvent = this._handleSelectEvent.bind( this );

		this.host.addEventListener( 'xb-change', this._handleChangeEvent );
		this.host.addEventListener( 'xb-select-search', this._handleSearchEvent );
		this.host.addEventListener( 'xb-select', this._handleSelectEvent );
		this.host.addEventListener(
			'xb-dropdown-collapse',
			this._handleDropdownCollapse
		);
	}

	hostDisconnected() {
		this.host.removeEventListener( 'xb-change', this._handleChangeEvent );
		this.host.removeEventListener(
			'xb-select-search',
			this._handleSearchEvent
		);
		this.host.removeEventListener( 'xb-select', this._handleSelectEvent );
		this.host.removeEventListener(
			'xb-dropdown-collapse',
			this._handleDropdownCollapse
		);
	}

	hostUpdated() {
		this._updateDatasources();
		this._updateOptions();
		this._updateTriggerValue();
	}

	async fetch( searchTerm = '' ) {
		for await ( const items of this.datasources.query( searchTerm ) ) {
			for ( const item of toArray( items ) ) {
				const { value } = this.datasources.resolve( item );

				this.options.set( value, item );
			}
		}
	}

	/**
	 *
	 * @param {CustomEvent<SearchEventDetail>} e
	 */
	async _handleSearchEvent( e ) {
		const { query } = e.detail;

		if ( query === '' ) {
			return;
		}

		this._removeOptions();

		const menu = this.host.menu;
		const dropdown = this.host.dropdown;

		dropdown.expand();

		menu.loading = true;

		await this.fetch( query );

		this._renderOptions();

		menu.loading = false;
	}

	/**
	 *
	 * @param {CustomEvent<SelectionEventDetail>} event
	 */
	_handleChangeEvent( event ) {
		const {
			detail: { type, value },
		} = event;

		const batata = Array.from( this.host.selection ).map( ( key ) => {
			if ( this.options.has( key ) ) {
				return this.options.get( key );
			}

			return key;
		} );
	}

	_handleSelectEvent() {
		if ( ! this.host.multiple ) {
			this.host.dropdown.collapse();
		}
	}

	_handleDropdownCollapse() {
		this.host.trigger.clear();
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

	_updateTriggerValue() {}

	_updateDatasources() {
		this.datasources.reset( this.host.datasources );
	}

	_renderOptions() {
		// TODO: render the options that have been selected.
		Array.from( this.options.values() ).forEach( ( option ) => {
			const { value, label } = this.datasources.resolve( option );

			if ( this.host.selection.has( value ) ) {
				// if the option is selected, we have already rendered it
				return;
			}

			this.host.appendChild(
				createOption( {
					type: option._type,
					value,
					label,
				} )
			);
		} );
	}

	_removeOptions() {
		Array.from( this.options.values() ).forEach( ( option ) => {
			const { value, label } = this.datasources.resolve( option );

			if ( this.host.selection.has( value ) ) {
				// we dont want to remove the option if it is currently selected.
				return;
			}

			this.host.removeChild(
				this.host.querySelector( `xb-option[value="${ value }"]` )
			);

			this.options.delete( value );
		} );
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

		trigger.placeholder = selectedOption?.text() ?? this.host.placeholder;
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
 * @typedef {import('./select-menu').SelectMenu} SelectMenu
 * @typedef {import('./select-option').SelectOption} SelectOption
 * @typedef {ReactiveControllerHost & Select} SelectHost
 * @typedef {import('./select-trigger').SearchEventDetail} SearchEventDetail
 * @typedef {import('../../controllers/selection/selection.controller').SelectionEventDetail} SelectionEventDetail
 * @typedef {import('./datasources.helpers').DatasourceAdapter} SelectDatasourceAdapter
 * @typedef {import('./datasources.helpers').StaticDatasource} SelectStaticDatasource
 * @typedef {import('./datasources.helpers').DynamicDatasource} SelectDynamicDatasource
 * @typedef {import('./datasources.helpers').Datasource} SelectDatasource
 * @typedef {import('./datasources.helpers').DatasourcesHelper} DatasourcesHelper
 */
