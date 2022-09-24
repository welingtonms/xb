import {
	injectStylesBeforeElement,
	getContainerEl,
} from '@cypress/mount-utils';
import { render } from 'lit-html';

function mount( Component, options = {} ) {
	console.log( Component );
	const componentName = 'xb-button';

	const message = `<${ componentName } ... />`;
	let logInstance;

	return cy.then( () => {
		if ( options.log !== false ) {
			logInstance = Cypress.log( {
				name: 'mount',
				message: [ message ],
			} );
		}

		const document = cy.state( 'document' );
		const el = getContainerEl();
		injectStylesBeforeElement( options, document, el );

		render( Component, el );

		return cy
			.wrap( Component, { log: false } )
			.wait( 1, { log: false } )
			.then( () => {
				if ( logInstance ) {
					logInstance.snapshot( 'mounted' );
					logInstance.end();
				}

				// by returning undefined we keep the previous subject
				// which is the mounted component
				return undefined;
			} );
	} );
}

export default mount;
