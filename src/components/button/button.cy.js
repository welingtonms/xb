import { html } from 'lit-html';

import './button';

describe( '<xb-button>', () => {
	it( 'should render children', () => {
		cy.mount(
			html`
				<xb-button>Action</xb-button>
			`
		);

		cy.get( 'xb-button' )
			.should( 'have.text', 'Action' )
			.and( 'have.attr', 'role', 'button' )
			.and( 'have.attr', 'tabindex', '0' );

		cy.get( 'xb-button' ).should( 'not.have.attr', 'disabled' );
		cy.get( 'xb-button' ).should( 'not.have.attr', 'aria-disabled' );

		cy.get( 'xb-button' )
			.then( ( $wrapped ) => {
				const button = $wrapped[ 0 ];
				button.toggleAttribute( 'disabled' );
			} )
			.should( 'have.attr', 'disabled' );

		cy.get( 'xb-button' ).should( 'have.attr', 'tabindex', '-1' );
		cy.get( 'xb-button' ).should( 'have.attr', 'aria-disabled' );
	} );

	it( 'triggers click', () => {
		const onClickSpy = cy.stub().as( 'onClickSpy' );
		cy.mount(
			html`
				<xb-button @click=${ ( event ) => onClickSpy( event ) }>Action</xb-button>
			`
		);

		cy.get( 'xb-button' ).click();

		cy.get( '@onClickSpy' ).should( 'have.been.called' );
	} );

	it( 'triggers click on key <Enter>', () => {
		const onClickSpy = cy.stub().as( 'onClickSpy' );
		cy.mount(
			html`
				<xb-button @click=${ ( event ) => onClickSpy( event ) }>Action</xb-button>
			`
		);

		cy.get( 'xb-button' ).press( 'Enter' );
		cy.get( '@onClickSpy' ).should( 'have.been.called' );
	} );

	it( 'triggers click on key <Space>', () => {
		const onClickSpy = cy.stub().as( 'onClickSpy' );
		cy.mount(
			html`
				<xb-button @click=${ ( event ) => onClickSpy( event ) }>Action</xb-button>
			`
		);

		cy.get( 'xb-button' ).press( 'Space' );
		cy.get( '@onClickSpy' ).should( 'have.been.called' );
	} );
} );
