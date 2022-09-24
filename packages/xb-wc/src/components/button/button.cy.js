import { html } from 'lit-html';

import './button';

describe( '<xb-button>', () => {
	it( 'mounts', () => {
		cy.mount( html`<xb-button></xb-button>` );
	} );

	it( 'should render children', () => {
		cy.mount( html`<xb-button>Action</xb-button>` );

		cy.get( 'xb-button' ).should( 'have.text', 'Action' );
	} );

	it( 'triggers click', () => {
		const onClickSpy = cy.spy().as( 'onClickSpy' );

		cy.mount( html`<xb-button @click=${ onClickSpy }>Action</xb-button>` );

		cy.get( 'xb-button' )
			.shadow()
			.get( 'button' )
			.should( 'not.be.disabled' )
			.click();

		cy.get( '@onClickSpy' ).should( 'have.been.called' );
	} );

	it( 'disables the wrapped button', () => {
		cy.mount( html`<xb-button ?disabled=${ true }>Action</xb-button>` );

		cy.get( 'xb-button' ).shadow().get( 'button' ).should( 'be.disabled' );
	} );
} );
