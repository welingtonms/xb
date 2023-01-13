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

function DatasourcesHelpers() {
	/** @type {Record<string, StaticDatasource>} */
	let datasources = {};

	/**
	 *
	 * @param {null | Datasource | Datasource[]} [rawDatasources]
	 */
	function init( rawDatasources ) {
		datasources = {};

		toArray( rawDatasources ).forEach( ( datasource ) => {
			/** @type {StaticDatasource} */
			const temp = isObject( datasource ) ? datasource : datasource();

			datasources[ temp.name ] = Object.assign(
				{
					adapter: GenericAdapter,
				},
				temp
			);
		} );
	}

	return {
		init: init,
		reset: init,

		/**
		 *
		 * @param {string} searchTerm
		 */
		async *query( searchTerm ) {
			const regex = new RegExp( searchTerm, 'i' );

			for ( const datasource of Object.values( datasources ) ) {
				const [ error, data ] = await to(
					Promise.resolve( datasource.fetch( { query: searchTerm, regex } ) )
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
		},

		/**
		 * Use obj's `_item` property to find its datasource, get the datasource's adapter
		 * and apply to `obj` to get its unique identifier and label.
		 * If datasource is not found, uses the `GenericAdapter` to retrieve `obj`'s id and label.
		 * If `obj` is not an object, return `{ value: obj }`
		 * @param {string | {_type: string}} obj
		 * @returns {{value: string, label: string}}
		 */
		resolve( obj ) {
			if ( ! isObject( obj ) ) {
				return { value: obj };
			}

			const { adapter } = datasources[ obj?._type ] ?? {
				adapter: GenericAdapter,
			};

			return {
				value: adapter.getID( obj ),
				label: adapter.getLabel( obj ),
			};
		},
	};
}

export default DatasourcesHelpers;

/**
 * @typedef {ReturnType<DatasourcesHelpers>} DatasourcesHelper
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
