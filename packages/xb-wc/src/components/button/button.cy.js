import { html } from 'lit-html';

import './button';

describe( '<xb-button>', () => {
	it( 'mounts', () => {
		cy.mount(
			html`
				<xb-button>Action</xb-button>
			`
		);
		cy.injectAxe();

		cy.get( 'xb-button' )
			.find( '.button', { includeShadowDom: true } )
			.then( ( $wrapped ) => {
				const button = $wrapped[ 0 ];

				cy.checkA11y( button );
			} );
	} );

	it( 'should render children', () => {
		cy.mount(
			html`
				<xb-button>Action</xb-button>
			`
		);

		cy.get( 'xb-button' ).should( 'have.text', 'Action' );
	} );

	it( 'triggers click', () => {
		const onClickSpy = cy.stub().as( 'onClickSpy' );
		cy.mount(
			html`
				<xb-button @click=${ ( event ) => onClickSpy( event ) }>Action</xb-button>
			`
		);

		cy.get( 'xb-button' ).shadow().find( 'button' ).should( 'not.be.disabled' ).click();

		cy.get( '@onClickSpy' ).should( 'have.been.called' );
	} );

	it( 'disables the wrapped button', () => {
		cy.mount(
			html`
				<xb-button ?disabled=${ true }>Action</xb-button>
			`
		);

		cy.get( 'xb-button' ).shadow().find( 'button' ).should( 'be.disabled' );
	} );
} );
