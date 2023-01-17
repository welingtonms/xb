import isObject from '@welingtonms/xb-toolset/dist/is-object';
import to from '@welingtonms/xb-toolset/dist/await-to';
import toArray from '@welingtonms/xb-toolset/dist/to-array';

/** @type {DatasourceAdapter} */
const GenericAdapter = {
	getID( item ) {
		return String( item.value );
	},
	getLabel( item ) {
		return item.label;
	},
};

/**
 * Init internal datasources structure for future query (search) operations.
 * @param {null | Datasource | Datasource[]} [datasources]
 */
function initDatasources( datasources ) {
	/** @type {Map<string, StaticDatasource>} */
	const staticDatasources = new Map();

	toArray( datasources ).forEach( ( datasource ) => {
		/** @type {StaticDatasource} */
		const staticDatasource = isObject( datasource ) ? datasource : datasource();

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

	return staticDatasources;
}

/**
 * @implements {ReactiveController}
 */
class DataController {
	/** @type {ReactiveControllerHost} */
	_host;

	/** @type {Map<string, StaticDatasource>} */
	_datasources;

	/** @type {Map<string, Object>} */
	_data;

	/**
	 * @param {ReactiveControllerHost} host
	 */
	constructor( host ) {
		this._data = new Map();
		this._datasources = new Map();

		( this._host = host ).addController( this );
	}

	hostConnected() {
		toArray( this._host.value ).forEach( ( option ) => {
			const { value } = this.resolve( option );

			this._data.set( value, option );
		} );
	}

	hostDisconnected() {}

	get data() {
		return Array.from( this._data.values() );
	}

	get datasources() {
		return Array.from( this._datasources.values() );
	}

	/**
	 * Init internal data and datasources structure for future query (search) operations.
	 * @param {null | Datasource | Datasource[]} [datasources]
	 */
	init( datasources ) {
		this._data = new Map();
		this._datasources = initDatasources( datasources );
	}

	/**
	 * Init internal datasources structure for future query (search) operations.
	 * @param {null | Datasource | Datasource[]} [datasources]
	 */
	reset( datasources ) {
		this._datasources = initDatasources( datasources );
	}

	/**
	 *
	 * @param {string} searchTerm
	 */
	async query( searchTerm ) {
		const regex = new RegExp( searchTerm, 'i' );

		for ( const datasource of this.datasources ) {
			const [ error, data ] = await to(
				Promise.resolve( datasource.fetch( { query: searchTerm, regex } ) )
			);

			if ( error ) {
				console.error( '[data.controller] ', datasource.name, error );
				continue;
			}

			for ( const item of toArray( data ) ) {
				/**
				 * we need to provide `datasource.name` here because, at this point,
				 * we haven't set the item's `_type` yet (which happens in line below).
				 */
				const { value } = this.resolve( item, datasource.name );

				this._data.set( value, {
					...item,
					_type: datasource.name,
				} );
			}

			this._host.requestUpdate();
		}
	}

	/**
	 * Use obj's `_item` property to find its datasource, get the datasource's adapter
	 * and apply to `obj` to get its unique identifier and label.
	 * If datasource is not found, uses the `GenericAdapter` to retrieve `obj`'s id and label.
	 * If `obj` is not an object, return `{ value: obj }`
	 * @param {string | {_type: string}} obj
	 * @param {string} [type] - optional
	 * @returns {{value: string, label: string}}
	 */
	resolve( obj, type ) {
		if ( ! isObject( obj ) ) {
			return { value: obj };
		}

		const { adapter } = this._datasources.get( type ?? obj?._type ) ?? {
			adapter: GenericAdapter,
		};

		return {
			value: adapter.getID( obj ),
			label: adapter.getLabel( obj ),
		};
	}

	/**
	 * @param {string} value
	 */
	delete( value ) {
		return this._data.delete( value );
	}

	/**
	 * @param {string} value
	 */
	has( value ) {
		return this._data.has( value );
	}

	/**
	 * @param {string} value
	 */
	get( value ) {
		return this._data.get( value );
	}
}

export default DataController;

/**
 * @typedef {ReturnType<DatasourcesHelpers>} DatasourcesHelper
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 */

/**
 * @typedef {Object} DatasourceAdapter
 * @property {(obj: unknown) => string} getID - get unique identifier for the given object
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
