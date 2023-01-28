import isObject from '@welingtonms/xb-toolset/dist/is-object';
import to from '@welingtonms/xb-toolset/dist/await-to';
import toArray from '@welingtonms/xb-toolset/dist/to-array';

/** @type {DatasourceAdapter} */
export const GenericAdapter = {
	getValue( item ) {
		return String( item.value );
	},
	getLabel( item ) {
		return item.label;
	},
};

/**
 * Return the static datasource.
 * @param {Datasource} datasource
 * @returns {StaticDatasource}
 */
function getStaticDatasource( datasource ) {
	return isObject( datasource ) ? datasource : datasource();
}

/**
 * @implements {ReactiveController}
 */
class DataController {
	/** @type {Map<string, Object>} */
	items;

	/**
	 * Here we keep the identifiers from `items`
	 * categorized into:
	 * - **static**: items that as static options
	 * - **queried**: items that are options from the latest search
	 * @type {Map<'static' | 'queried', Set<string>}
	 */
	groups;

	/** @type {Map<string, StaticDatasource>} */
	datasources;

	/** @type {ReactiveControllerHost} */
	host;

	/**
	 * States the mode the select component is operating in.
	 * - **default**: lists the available options
	 * - **search**: lists the options, static or queried from datasources, for the
	 * given search term.
	 * @type {'default' | 'search'}
	 */
	mode;

	/** @type {import('../selection-keeper/selection-keeper').SelectionState} */
	selection;

	_initialized = false;

	/**
	 * @param {ReactiveControllerHost} host
	 * @param {null | Datasource | Datasource[]} [datasources]
	 */
	constructor( host, datasources ) {
		this.items = new Map();
		this.mode = 'default';

		this._initGroups();
		this.setDatasources( datasources );

		( this.host = host ).addController( this );
	}

	hostConnected() {
		toArray( this.host.value ).forEach( ( item ) => {
			const { value } = this.toOption( item );

			this.items.set( value, item );
		} );

		this._handleSelectionChange = this._handleSelectionChange.bind( this );
		this._handleDropdownCollapse = this._handleDropdownCollapse.bind( this );

		this.host.addEventListener(
			'xb-selection-change',
			this._handleSelectionChange
		);

		this.host.addEventListener(
			'xb-dropdown-collapse',
			this._handleDropdownCollapse
		);
	}

	hostDisconnected() {
		this.host.removeEventListener(
			'xb-selection-change',
			this._handleSelectionChange
		);

		this.host.removeEventListener(
			'xb-dropdown-collapse',
			this._handleDropdownCollapse
		);
	}

	hostUpdated() {
		if ( ! this._initialized ) {
			this.getGroup( 'static' ).clear();

			/**
			 * Here we are grabbing the static options (xb-option) rendered inside the select
			 * and wrapping them in datasource so we can search them.
			 */
			const staticOptions = this.host.options.map( ( option ) => {
				this.getGroup( 'static' ).add( option.value );

				return {
					value: option.value,
					label: option.text(),
				};
			} );

			this.datasources.set( 'generic', {
				name: 'generic',
				adapter: GenericAdapter,
				fetch( { query, regex } ) {
					if ( query.length < 3 ) {
						return staticOptions;
					}

					return staticOptions.filter( ( { value } ) => regex.test( value ) );
				},
			} );
		}

		this._initialized = true;
	}

	_handleDropdownCollapse() {
		if ( this.mode == 'search' ) {
			this.host._removeDataOptions();
			this.query( '' );
		}

		this.setMode( 'default' );
	}

	/**
	 *
	 * @param {CustomEvent<SelectionEventDetail>} event
	 */
	_handleSelectionChange( event ) {
		this.selection = event.detail.state;
	}

	_initGroups() {
		this.groups = new Map();
		this.groups.set( 'static', new Set() );
		this.groups.set( 'queried', new Set() );
	}

	/**
	 * Trigger the `fetch` function of all datasources with the provided `searchTerm`.
	 * If `group` is provided, the resulting items will be added to that `group`.
	 * @param {string} searchTerm
	 * @param {'static' | 'queried'} group
	 */
	async query( searchTerm, group ) {
		const regex = new RegExp( searchTerm, 'i' );

		for ( const datasource of this.datasources.values() ) {
			const [ error, data ] = await to(
				Promise.resolve( datasource.fetch( { query: searchTerm, regex } ) )
			);

			if ( error ) {
				console.error( '[data.controller] ', datasource.name, error );
				continue;
			}

			for ( let item of toArray( data ) ) {
				item = { ...item, _type: datasource.name };

				const { value } = this.toOption( item );

				this.items.set( value, {
					...( this.items.get( value ) ?? {} ),
					...item,
				} );

				this.getGroup( group ?? 'queried' ).add( value );
			}
		}

		this.host.requestUpdate();
	}

	/**
	 * Init datasources structure for future query (search) operations.
	 * @param {null | Datasource | Datasource[]} [datasources]
	 */
	setDatasources( datasources ) {
		/** @type {Map<string, StaticDatasource>} */
		const staticDatasources = new Map();

		toArray( datasources ).forEach( ( datasource ) => {
			const staticDatasource = getStaticDatasource( datasource );

			staticDatasources.set(
				staticDatasource.name,
				Object.assign(
					{
						adapter: GenericAdapter,
					},
					staticDatasource
				)
			);
		} );

		this.datasources = staticDatasources;
	}

	/**
	 * Updates the internal structures based on the provided `mode`.
	 * @param {DataController['mode']} mode
	 */
	setMode( mode ) {
		if ( mode == 'default' ) {
			for ( const key of this.getGroup( 'queried' ) ) {
				if ( this.selection.has( key ) ) {
					return;
				}

				this.items.delete( key );
			}
		}

		this.getGroup( 'queried' ).clear();

		this.mode = mode;
	}

	/**
	 * @param {string} value
	 */
	get( value ) {
		return this.items.get( value );
	}

	/**
	 * @param {'static' | 'queried'} type
	 */
	getGroup( type ) {
		return this.groups.get( type );
	}

	/**
	 * Use obj's `_type` property to find its datasource, get the datasource's adapter
	 * and apply to `obj` to get its unique identifier and label.
	 * If datasource is not found, uses the `GenericAdapter` to retrieve `obj`'s id and label.
	 * If `obj` is not an object, returns `{ value: obj }`
	 * @param {string | {_type: string}} obj
	 * @returns {{value: string, label: string}}
	 */
	toOption( obj ) {
		if ( ! isObject( obj ) ) {
			return { value: obj };
		}

		const { adapter, name } = this.datasources.get( obj?._type ) ?? {
			adapter: GenericAdapter,
		};

		return {
			_type: name,
			value: adapter.getValue( obj ),
			label: adapter.getLabel( obj ),
		};
	}

	/**
	 * Given the provided `value` (options or options's values), we return the currently selected value
	 * by resolving each option based on the proper datasource.
	 * @param {sstring | string[] | SelectionOption | SelectionOption[]} obj
	 * @returns {string[]}
	 */
	toValue( value ) {
		return toArray( value ).map( ( option ) => {
			const { value } = this.toOption( option );
			return value;
		} );
	}
}

export default DataController;

/**
 * @typedef {ReturnType<DatasourcesHelpers>} DatasourcesHelper
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('../selection-keeper').SelectionEventDetail} SelectionEventDetail
 * @typedef {import('./select-option').SelectOption} SelectOption
 */

/**
 * @typedef {Object} DatasourceAdapter
 * @property {(obj: unknown) => string} getValue - get unique identifier for the given object
 * @property {(obj: unknown) => string} getLabel - get unique label for the given object
 */

/**
 * @typedef {Object} StaticDatasource
 * @property {string} name - Datasource name, used to differentiate fetched options
 * @property {DatasourceAdapter} adapter - Adapter to get id and label for the fetched options
 * @property {(({ query, regex }: { query: string; regex: RegExp }) => unknown[] | Promise<unknown[]>)} fetch - a function that fetches and/or returns items based on the provided query or regex.
 */

/**
 * @typedef {(...args?: any[]) => StaticDatasource} DynamicDatasource
 */

/**
 * @typedef {StaticDatasource | DynamicDatasource} Datasource
 */
