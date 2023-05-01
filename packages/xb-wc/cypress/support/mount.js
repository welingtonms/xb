import { render } from 'lit-html';
import { ROOT_SELECTOR, setupHooks, getContainerEl } from '@cypress/mount-utils';

const M_ROOT = '__cy_m_root';

Cypress.on( 'run:start', () => {
	// Consider doing a check to ensure your adapter only runs in Component Testing mode.
	if ( Cypress.testingType !== 'component' ) {
		return;
	}

	Cypress.on( 'test:before:run', () => {
		// Do some cleanup from previous test - for example, clear the DOM.
		getContainerEl().innerHTML = '';
	} );
} );

/**
 * [Source](https://github.com/cypress-io/cypress/tree/develop/npm/mount-utils#readme)
 * @param {import('lit').TemplateResult} webComponent
 * @returns {Cypress.Chainable}
 */
function mount( webComponent ) {
	const $root = document.querySelector( ROOT_SELECTOR );

	const componentNode = document.createElement( 'div' );
	componentNode.id = M_ROOT;

	$root.append( componentNode );

	// Render HTML containing component.
	// https://lit.dev/docs/libraries/standalone-templates/#rendering-lit-html-templates
	render( webComponent, componentNode );

	Cypress.log( {
		name: 'mount',
		message: [ `xb-element ... />` ],
	} );

	return cy.wrap( componentNode, { log: false } );
}

// Setup Cypress lifecycle hooks.
setupHooks();

export default mount;
