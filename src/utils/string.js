/**
 * Checks if `str` is any non-whitespace character (equivalent to [^\r\n\t\f\v ]).
 * Based on https://www.w3.org/WAI/content-assets/wai-aria-practices/patterns/combobox/examples/js/combobox-autocomplete.js
 * @param {*} str
 * @returns
 */
export function isPrintableCharacter( str ) {
	return str.length === 1 && str.match( /\S/ );
}
