import { getContainerEl } from '@cypress/mount-utils';
import { render } from 'lit-html';

/**
 * [Source](https://github.com/cypress-io/cypress/tree/develop/npm/mount-utils#readme)
 * @param {import('lit').TemplateResult} webComponent
 * @returns {Cypress.Chainable}
 */
function mount( webComponent ) {
	const $root = getContainerEl();

	// Render HTML containing component.
	// https://lit.dev/docs/libraries/standalone-templates/#rendering-lit-html-templates
	render( webComponent, $root );

	Cypress.log( {
		name: 'mount',
		message: [ `xb-element ... />` ],
	} );

	return cy.wrap( $root, { log: false } );
}

export default mount;
