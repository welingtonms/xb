import debounce from '@welingtonms/xb-toolset/dist/debounce';
import isObject from '@welingtonms/xb-toolset/dist/is-object';
import to from '@welingtonms/xb-toolset/dist/await-to';
import toArray from '@welingtonms/xb-toolset/dist/to-array';

function createOption( { value, label } ) {
	return Object.assign( document.createElement( 'xb-option' ), {
		value,
		innerHTML: label,
	} );
}

async function* getData( datasources, query ) {
	const regex = new RegExp( query, 'i' );

	for ( const datasource of datasources ) {
		const [ error, data ] = await to(
			Promise.resolve( datasource.fetch( { query, regex } ) )
		);

		if ( ! error ) {
			const items = ( data || [] ).map( ( item ) => {
				return {
					...item,
					_type: datasource.name,
				};
			} );

			yield items;
		}
	}
}

/**
 * Controls select's internal logic.
 * @class
 * @implements {import('lit').ReactiveController}
 */
class SelectController {
	/** @type {SelectHost} */
	host = null;

	/** @type {SelectDatasource[]} */
	datasources = [];

	/** @type {import('./select-option').SelectOption} */
	options = [];

	/**
	 *
	 * @param {SelectHost} host
	 */
	constructor( host ) {
		( this.host = host ).addController( this );
	}

	hostConnected() {
		this.host.addEventListener( 'xb-select-search', this._handleSearchEvent );
	}

	hostDisconnected() {
		this.host.removeEventListener(
			'xb-select-search',
			this._handleSearchEvent
		);
	}

	hostUpdated() {
		this._updateOptions();
		this._updateTriggerValue();
		this._updateDatasources();
	}

	async fetch( query = '' ) {
		if ( query === '' ) {
			return;
		}

		this._removeOptions( this.host );

		const datasources = this.datasources;
		for await ( const items of getData( datasources, query ) ) {
			for ( const item of toArray( items ) ) {
				const option = createOption( item );
				this.options.push( option );
				this.host.appendChild( option );
			}

			// setCache( ( cache ) => {
			// 	const newCache = new Map( cache );
			// 	newCache.set( query, [
			// 		...( cache.get( query ) || [] ),
			// 		...( items || [] ),
			// 	] );
			// 	return newCache;
			// } );
		}
	}

	_handleSearchEvent = debounce(
		/**
		 *
		 * @param {CustomEvent<SearchEventDetail>} e
		 */
		async ( e ) => {
			const { query } = e.detail;
			const menu = this.host.menu;

			menu.loading = true;

			await this.fetch( query );

			menu.loading = false;
		},
		250
	);

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
		this.datasources = toArray( this.host.datasources ).map( ( datasource ) => {
			if ( isObject( datasource ) ) {
				return datasource;
			}

			return datasource();
		} );

		console.log( 'datasources', this.datasources );
	}

	_removeOptions() {
		this.options?.forEach( ( option ) => {
			this.host.removeChild( option );
		} );

		this.options = [];
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
 * @typedef {import('./select-menu').SelectMenu} SelectMenu
 * @typedef {import('./select-option').SelectOption} SelectOption
 * @typedef {ReactiveControllerHost & Select} SelectHost
 * @typedef {import('./select-trigger').SearchEventDetail} SearchEventDetail
 */

/**
 * @typedef {Object} SelectDatasourceAdapter
 * @property {(obj: unknown) => string} getID - get unique identifier for the given object
 * @property {(obj: unknown) => string} getLabel - get unique label for the given object
 */

/**
 * @typedef {Object} SelectStaticDatasource
 * @property {string} name - Datasource name, used to differentiate fetched options
 * @property {SelectDatasourceAdapter} adapter - Adapter to get id and label for the fetched options
 * @property {(({ query, regex }: { query: string; regex: RegExp }) => unknown[] | Promise<unknown[]>)} fetch - a function that fetches and/or returns items based on the provided query or regex.
 */

/**
 * @typedef {(...args?: any[]) => SelectStaticDatasource} SelectDynamicDatasource
 */

/**
 * @typedef {SelectStaticDatasource | SelectDynamicDatasource} SelectDatasource
 */
