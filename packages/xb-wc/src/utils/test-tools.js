function parser( input, template ) {
	template = template.replace( /[()]/g, '' );
	input = input.replace( /[()"]/g, '' );

	const regex = new RegExp( template.replace( /\{(.+?)\}/g, '(.+)' ) );
	const match = input.match( regex );

	if ( ! match ) {
		return null;
	}

	const variables = template.match( /\{(.+?)\}/g )?.map( ( v ) => {
		return v.slice( 1, -1 ); // return removing the { and }
	} );

	const values = match.slice( 1 );
	return (
		variables?.reduce(
			( obj, variable, index ) => ( {
				...obj,
				[ variable ]: values[ index ],
			} ),
			{}
		) ?? {}
	);
}

function logger( template, params ) {
	const message = Object.entries( params ).reduce( ( acc, [ key, value ] ) => {
		return acc.replace( `{${ key }}`, `"${ value }"` );
	}, template );

	cy.log( message );
}

function getMappedMatch( event, map ) {
	// here we need to parse the action and compare with the existing actions
	let i = 0;
	let foundAt = -1;
	let parsed;
	const keys = Object.keys( map );

	while ( i < keys.length && foundAt < 0 ) {
		event;
		keys[ i ];
		parsed = parser( event, keys[ i ] );

		if ( parsed ) {
			foundAt = i;
		}
		i++;
	}

	return [ map[ keys[ foundAt ] ], parsed, keys[ foundAt ] ];
}

/**
 *
 * @param {(args: TestingFactoryArgs) => void} fn
 */
export function TestingFactory( factory ) {
	// Based on https://cucumber.io/docs/gherkin/reference/

	/** @type {Record<string, Function>} */
	let scenarios = {};
	let actions = {};
	let outcomes = {};

	/**
	 * Given steps are used to describe the initial context of the tested scenario.
	 * Use this to configure the rendered content to a well-defined known state,
	 * before the interactions can occur.
	 * @param {string} scenario
	 * @param {(...args: unknown[]) => void} fn
	 */
	function Given( scenario, fn ) {
		scenarios[ scenario ] = fn;
	}

	/**
	 * When steps are used to describe an event, or an action.
	 * This can be a person interacting with the rendered content, or it can be an event triggered by another component.
	 * @param {string} action
	 * @param {(...args: unknown[]) => void} fn
	 */
	function When( action, fn ) {
		actions[ action ] = fn;
	}

	/**
	 * Then steps are used to describe an expected outcome, or result.
	 * Here will run the assertion to compare the actual outcome (what the system actually does)
	 * to the expected outcome (what the step says the system is supposed to do).
	 * An outcome should be on an observable output.
	 * @param {string} outcome
	 * @param {(...args: unknown[]) => void} fn
	 */
	function Then( outcome, fn ) {
		outcomes[ outcome ] = fn;
	}

	factory( { Given, When, Then } );

	function then( expected ) {
		const [ outcome, parsed, template ] = getMappedMatch( expected, outcomes );

		if ( outcome == null ) {
			throw new Error( `[then] Invalid outcome: "${ expected }"` );
		}

		logger( template, parsed );
		outcome( parsed );

		return {
			and: then,
			but: then,
		};
	}

	function when( event ) {
		const [ action, parsed, template ] = getMappedMatch( event, actions );

		if ( action == null ) {
			throw new Error( `[then] Invalid action: "${ action }"` );
		}

		logger( template, parsed );
		action( parsed );

		return {
			and: when,
			then,
		};
	}

	function given( scenario, args ) {
		const [ context, parsed, template ] = getMappedMatch( scenario, scenarios );

		if ( context == null ) {
			throw new Error( `[then] Invalid scenario: "${ context }"` );
		}

		logger( template, parsed );
		context( args );

		return {
			and: given,
			when,
		};
	}

	return {
		given,
		when,
	};
}

/**
 * @typedef {Object} TestingFactoryArgs
 * @property {(scenario: string, fn: (...args: unknown[]) => void) => void} Given Used to describe the initial context of the tested scenario.
 * @property {(action: string, fn: (...args: unknown[]) => void) => void} When Used to describe an event, or an action.
 * @property {(outcome: string, fn: (...args: unknown[]) => void) => void} Then Used to describe an expected outcome, or result.
 */
