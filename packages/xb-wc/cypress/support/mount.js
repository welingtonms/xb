import { getContainerEl } from '@cypress/mount-utils';
import { render } from 'lit-html';

const M_ROOT = '__cy_m_root';

const cleanup = () => {
	Cypress.$( `#${ M_ROOT }` ).remove();
};

/**
 * [Source](https://github.com/cypress-io/cypress/tree/develop/npm/mount-utils#readme)
 * @param {import('lit').TemplateResult} webComponent
 * @returns {Cypress.Chainable}
 */
function mount( webComponent ) {
	cleanup();

	const $root = getContainerEl();

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

export default mount;
