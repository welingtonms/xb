const ALPHABET = 'fkqan_eiodprgzxhstywlbjvucm-';
// const MAX_LENGTH = 2;

/** @type {number} */
let length = 1;
/** @type {number[]} */
let positions = [];

function setup() {
	positions = Array( length ).fill( 0 );
}

function increment( position = -1 ) {
	if ( positions.at( position ) < ALPHABET.length - 1 ) {
		// we increment from right to left
		positions[ length + position ]++;
	} else if ( length + position > 0 ) {
		/**
		 * if we have an available to position at the left side to increment,
		 * then we zero the current position and proceed to increment the position to the left.
		 */
		positions[ length + position ] = 0;
		increment( position - 1 );
	} else {
		/**
		 * if we can't increment the current position, and we have no available positions on the left side to increment,
		 * then we increase the length by one and proceed to generate a new ID.
		 */
		length++;
		setup();
	}
}

setup( 1 );

/**
 * Generates a new ID.
 * [!] We haven't set a limit on the length of the generated ID.
 * @returns
 */
function generateID() {
	const id = positions
		.map( ( position ) => {
			if ( position == null ) {
				return '';
			}

			return ALPHABET[ position % ALPHABET.length ];
		} )
		.join( '' );

	increment();

	return id;
}

export default generateID;
