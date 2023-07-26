/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import './tab.command';

/**
 * Based on https://github.com/wlsf82/cy-press/blob/main/src/index.js and
 * https://github.com/cypress-io/cypress-example-todomvc/blob/master/cypress/support/commands.js
 * */
Cypress.Commands.add( 'keydown', { prevSubject: true }, ( subject, key ) => {
	if ( ! key ) throw new Error( 'You need to provide a key (e.g, .keydown("enter"))' );

	const log = Cypress.log( {
		autoEnd: false,
		name: 'keydown',
		displayName: 'keydown',
		message: `pressing ${ key }`,
		consoleProps: () => {
			return { Key: key };
		},
	} );

	log.set( { $el: subject } ).snapshot( 'before' );

	/** @type {HTMLElement} */
	const element = subject[ 0 ];

	element.dispatchEvent(
		new KeyboardEvent( 'keydown', { key, code: key, bubbles: true } )
	);

	log.set( { $el: subject } ).snapshot().end();

	return cy.wrap( subject, { log: false } );
} );
