/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable {
		/**
		 * **Simulates pressing a keyboard key.**
		 *
		 * @param code - The key code you want to press.
		 */
		press(
			code: 'Space' | 'Enter' | 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight'
		): Cypress.Chainable;
	}
}
