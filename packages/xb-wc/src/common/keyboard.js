import toArray from '@welingtonms/xb-toolset/dist/to-array';

// dev friendly names for key codes
const SUPPORTED_KEYS = {
	ALT: 'Alt',
	ARROW_DOWN: 'ArrowDown',
	ARROW_LEFT: 'ArrowLeft',
	ARROW_RIGHT: 'ArrowRight',
	ARROW_UP: 'ArrowUp',
	CONTROL: 'Control',
	ENTER: 'Enter',
	ESCAPE: 'Escape',
	SHIFT: 'Shift',
	SPACE: ' ',
	TAB: 'Tab',
};

// More convenient names to refer to ta given key
const ALIASED_SUPPORTED_KEYS = {
	alt: SUPPORTED_KEYS.ALT,
	Alt: SUPPORTED_KEYS.ALT,
	ALT: SUPPORTED_KEYS.ALT,

	ArrowDown: SUPPORTED_KEYS.ARROW_DOWN,
	arrowdown: SUPPORTED_KEYS.ARROW_DOWN,
	ARROW_DOWN: SUPPORTED_KEYS.ARROW_DOWN,

	ArrowLeft: SUPPORTED_KEYS.ARROW_LEFT,
	arrowleft: SUPPORTED_KEYS.ARROW_LEFT,
	ARROW_LEFT: SUPPORTED_KEYS.ARROW_LEFT,

	ArrowRight: SUPPORTED_KEYS.ARROW_RIGHT,
	arrowright: SUPPORTED_KEYS.ARROW_RIGHT,
	ARROW_RIGHT: SUPPORTED_KEYS.ARROW_RIGHT,

	ArrowUp: SUPPORTED_KEYS.ARROW_UP,
	arrowup: SUPPORTED_KEYS.ARROW_UP,
	ARROW_UP: SUPPORTED_KEYS.ARROW_UP,

	Control: SUPPORTED_KEYS.CONTROL,
	Control: SUPPORTED_KEYS.CONTROL,
	Ctrl: SUPPORTED_KEYS.CONTROL,
	ctrl: SUPPORTED_KEYS.CONTROL,
	CONTROL: SUPPORTED_KEYS.CONTROL,

	Enter: SUPPORTED_KEYS.ENTER,
	enter: SUPPORTED_KEYS.ENTER,
	ENTER: SUPPORTED_KEYS.ENTER,

	Escape: SUPPORTED_KEYS.ESCAPE,
	escape: SUPPORTED_KEYS.ESCAPE,
	esc: SUPPORTED_KEYS.ESCAPE,
	ESCAPE: SUPPORTED_KEYS.ESCAPE,
	ESC: SUPPORTED_KEYS.ESCAPE,

	Shift: SUPPORTED_KEYS.SHIFT,
	shift: SUPPORTED_KEYS.SHIFT,
	SHIFT: SUPPORTED_KEYS.SHIFT,

	' ': SUPPORTED_KEYS.SPACE,
	space: SUPPORTED_KEYS.SPACE,
	SPACE: SUPPORTED_KEYS.SPACE,

	Tab: SUPPORTED_KEYS.TAB,
	tab: SUPPORTED_KEYS.TAB,
	TAB: SUPPORTED_KEYS.TAB,
};

/**
 * Resolve an aliased key name to a standardized key name.
 * @param {SupportedKey} alias
 * @returns {string}
 */
function aliased( alias ) {
	return ALIASED_SUPPORTED_KEYS[ alias ] || alias;
}

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
			const expectedKeys = toArray( otherKeys ).map( ( otherKey ) =>
				aliased( otherKey )
			);

			return toArray( expectedKeys ).includes( key );
		},
	};
}

KeyboardKey.getEventKey = getEventKey;
KeyboardKey.getKey = aliased;

export default KeyboardKey;

/**
 * @typedef {keyof typeof ALIASED_SUPPORTED_KEYS} SupportedKey
 */
