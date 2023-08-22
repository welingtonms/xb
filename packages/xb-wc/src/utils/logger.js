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

/**
 * Creates a logger object that contains four levels of logging: debug, info, warn, and error.
 * @param {string} [prefix] kebab-case prefix to be added to the start of all log messages
 */
function createLogger( prefix = 'xb' ) {
	const logger = Object.freeze( {
		debug: ( ...args ) => {
			log( console.debug, `[${ prefix }]`, ...args );
		},
		info: ( ...args ) => {
			log( console.log, `[${ prefix }]`, ...args );
		},
		warn: ( ...args ) => {
			log( console.warn, `[${ prefix }]`, ...args );
		},
		error: ( ...args ) => {
			log( console.error, `[${ prefix }]`, ...args );
		},
	} );

	return logger;
}

export default createLogger;
