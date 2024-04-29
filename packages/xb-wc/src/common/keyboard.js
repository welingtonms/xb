import toArray from '../utils/to-array';

export const Keys = Object.freeze( {
	Alt: 'Alt',
	ArrowDown: 'ArrowDown',
	ArrowLeft: 'ArrowLeft',
	ArrowRight: 'ArrowRight',
	ArrowUp: 'ArrowUp',
	Control: 'Control',
	Enter: 'Enter',
	Escape: 'Escape',
	Shift: 'Shift',
	Space: ' ',
	Tab: 'Tab',
} );

/**
 * Get normalize key, considering IE support.
 * Based on https://github.com/downshift-js/downshift/blob/26c93a539dad09e41adba69ddc3a7d7ecccfc8bb/src/utils.js#L285
 *
 * @param {KeyboardEvent} e - keyboard event
 * @return {KeyboardEvent['key']} Normalized key code
 */
function getEventKey( e ) {
	// IE
	if ( e.keyCode >= 37 && e.keyCode <= 40 && e.key.indexOf( 'Arrow' ) !== 0 ) {
		return `Arrow${ e.key }`;
	}

	return e.key;
}

/**
 *
 * @param {KeyboardEvent} e
 * @return {{ is( otherKeys: SupportedKey | SupportedKey[] ): boolean }} helper functions to be used on the provided keyboard event.
 */
function KeyboardKey( e ) {
	const key = getEventKey( e );

	return {
		/**
		 *
		 * @param {SupportedKey | SupportedKey[]} otherKeys - key or keys that the keyboard event should be considered against.
		 * @return {boolean} `true` if the keyboard event happened in any of the provided keys.
		 */
		is( otherKeys ) {
			return toArray( otherKeys ).includes( key );
		},
	};
}

KeyboardKey.getEventKey = getEventKey;

export default KeyboardKey;

/**
 * @typedef {keyof typeof Keys} SupportedKey
 */
