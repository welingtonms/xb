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

import 'cypress-plugin-tab';

/**
 * Based on https://github.com/wlsf82/cy-press/blob/main/src/index.js and
 * https://github.com/cypress-io/cypress-example-todomvc/blob/master/cypress/support/commands.js
 * */
const CODE_TO_KEY = {
	ArrowUp: 'ArrowUp',
	Enter: 'Enter',
	Escape: 'Escape',
	Space: ' ',
	ArrowDown: 'ArrowDown',
	ArrowLeft: 'ArrowLeft',
	ArrowRight: 'ArrowRight',
};

Cypress.Commands.add(
	'press',
	{ prevSubject: true },

	/**
	 *
	 * @param {unknown} subject
	 * @param {keyof CODE_TO_KEY} code
	 * @returns
	 */
	( subject, code ) => {
		if ( ! code )
			throw new Error( 'You need to provide a key code (e.g, .press("Enter"))' );

		const log = Cypress.log( {
			autoEnd: false,
			name: 'press',
			displayName: 'press',
			message: `pressing ${ code }`,
			consoleProps: () => {
				return { Key: code };
			},
		} );

		log.set( { $el: subject } ).snapshot( 'before' );

		/** @type {HTMLElement} */
		const element = subject[ 0 ];

		/**
		 * based on https://docs.cypress.io/api/commands/type#Events-that-fire
		 * not dispatching `keypress`, as it is deprecated (https://developer.mozilla.org/en-US/docs/Web/API/Element/keypress_event#browser_compatibility).
		 **/

		element.dispatchEvent(
			new KeyboardEvent( 'keydown', { key: CODE_TO_KEY[ code ], code, bubbles: true } )
		);

		element.dispatchEvent(
			new KeyboardEvent( 'keyup', { key: CODE_TO_KEY[ code ], code, bubbles: true } )
		);

		log.set( { $el: subject } ).snapshot().end();

		return cy.wrap( subject, { log: false } );
	}
);
