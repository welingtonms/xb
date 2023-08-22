// radix accepts min of 2 and max of 36
const ALPHABET = 'fkqan_eiodprgzxhstywlbjvucm-';

/** @type {number} */
let counter = -1;

/**
 *
 * @param {number} number
 * @returns {string}
 */
function numberToRadix( number ) {
	return number.toString( ALPHABET.length );
}

function generateID() {
	counter++;
	const positions = numberToRadix( counter ).split( '' );

	return positions.map( ( position ) => ALPHABET[ Number( position ) ] ).join( '' );
}

export default generateID;
