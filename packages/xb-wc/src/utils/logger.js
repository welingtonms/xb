/**
 * this logger uses console.log to log messages in the development environment.
 * it checks the NODE_ENV environment variable to determine if the logger is in development mode; if not, nothing is logged.
 */

function log( fn, ...args ) {
	if ( process.env.NODE_ENV !== 'development' ) {
		return;
	}

	fn( ...args );
}

// Define a logger object that contains four methods: debug, info, warn, and error
const logger = Object.freeze( {
	debug: ( ...args ) => {
		log( console.debug, ...args );
	},
	info: ( ...args ) => {
		log( console.log, ...args );
	},
	warn: ( ...args ) => {
		log( console.warn, ...args );
	},
	error: ( ...args ) => {
		log( console.error, ...args );
	},
} );

export default logger;
