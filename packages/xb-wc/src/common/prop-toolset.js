import { classy } from '@welingtonms/classy';
import toArray from '@welingtonms/xb-toolset/dist/to-array';
import isObject from '@welingtonms/xb-toolset/dist/is-object';

/**
 * Returns an object containing either prop, if it is an object,
 * or { [key]: prop } if prop is of any other type.
 *
 * @param {*} prop - Prop to be resolved
 * @param {string} key - Name to which `prop` should be resolved, in .
 * @example
 *  // returns { author: 'John Doe ' }
 *  propify('John Doe', 'author')
 *  // returns { name: 'John Doe ' }
 *  propify({ name: 'John Doe ' }, 'author')
 * @return {Object} Prop itself or prop mapped to given key
 */
export function propify( prop, key ) {
	/**
	 * We don't want to propify props that are valid
	 * renderable node, example:
	 * @example
	 * ```jsx
	 * propify(<p>Hello world</p>, 'children')
	 * ```
	 * But we want to propify other types of `prop` objects
	 * @example
	 * ```jsx
	 * propify({ name: 'address-field' })
	 * ```
	 */
	// if ( isObject( prop ) && ! React.isValidElement( prop ) ) {
	if ( isObject( prop ) ) {
		return prop;
	}

	if ( key == null ) {
		return {};
	}

	return { [ key ]: prop };
}

/**
 * Gets a property name and its value and generate the proper utility classname for
 * its 4 sides (top, right, bottom, and left).
 *
 * @param {string} prop Property name
 * @param {boolean | DirectionPropType | DirectionPropType[]} value Property value. It can be either a boolean, which means
 * the property should/should not be applied to all side, or an array with the strings that represent
 * to which sides the property should be applied.
 * @return {string} Classes generated based on the given param
 */
export function sided( prop, value ) {
	const suppressAllSides = typeof value == 'boolean' && value;

	const valueAsArray = suppressAllSides
		? [ 'horizontal', 'vertical' ]
		: toArray( value );

	return classy( {
		[ `-no-t-${ prop }` ]: valueAsArray.some( ( v ) =>
			[ 'top', 'vertical' ].includes( v )
		),
		[ `-no-r-${ prop }` ]: valueAsArray.some( ( v ) =>
			[ 'right', 'horizontal' ].includes( v )
		),
		[ `-no-b-${ prop }` ]: valueAsArray.some( ( v ) =>
			[ 'bottom', 'vertical' ].includes( v )
		),
		[ `-no-l-${ prop }` ]: valueAsArray.some( ( v ) =>
			[ 'left', 'horizontal' ].includes( v )
		),
	} );
}

/**
 * @typedef {import('./prop-types').DirectionPropType} DirectionPropType
 */
