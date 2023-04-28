import Keyboard from '../../common/keyboard';

/** @type {Record<KeyboardEvent['key'], ( e: KeyboardEvent ) => number>} */
const keyHandler = {
	/**
	 *
	 * @param {KeyboardEvent} e
	 * @return {number} increment for new focused element index
	 */
	Tab( e ) {
		return e.shiftKey ? -1 : 1;
	},
	ArrowUp() {
		return -1;
	},
	ArrowLeft() {
		return -1;
	},
	ArrowDown() {
		return 1;
	},
	ArrowRight() {
		return 1;
	},
};

function unknownKey() {
	return 0;
}

/**
 * @param {KeyboardEvent} event
 */
export function getIncrementByKey( event ) {
	// TODO: receive keyHandler as parameter to allow different types of increments
	const key = Keyboard.getEventKey( event );

	const increment = ( keyHandler[ key ] || unknownKey )( event );

	return increment;
}
