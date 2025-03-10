import { html } from 'lit';

import './switch';

describe( '<xb-switch>', () => {
	it( 'should render correctly', () => {
		const onChangeSpy = cy.stub().as( 'onChangeSpy' );

		cy.mount( html`
			<xb-switch
				@xb:change=${ ( event ) => {
					onChangeSpy( event );
				} }
			>
				Allow analytics cookies
			</xb-switch>
		` );

		cy.get( 'xb-switch' ).as( 'switch' );

		cy.get( '@switch' ).should( 'have.attr', 'role', 'switch' );
		cy.get( '@switch' ).should( 'have.attr', 'tabindex', '0' );
		cy.get( '@switch' ).should( 'have.attr', 'aria-checked', 'false' );

		cy.get( '@switch' ).click();
		cy.get( '@onChangeSpy' ).should(
			'have.been.calledWith',
			Cypress.sinon.match.hasNested( 'detail', {
				checked: true,
			} )
		);

		cy.get( '@switch' ).should( 'have.attr', 'aria-checked', 'true' );

		cy.get( '@switch' ).click();
		cy.get( '@onChangeSpy' ).should(
			'have.been.calledWith',
			Cypress.sinon.match.hasNested( 'detail', {
				checked: false,
			} )
		);

		cy.get( '@switch' ).should( 'have.attr', 'aria-checked', 'false' );
	} );

	it( 'should render correctly with checked=true', () => {
		const onChangeSpy = cy.stub().as( 'onChangeSpy' );

		cy.mount( html`
			<xb-switch
				checked
				@xb:change=${ ( event ) => {
					onChangeSpy( event );
				} }
			>
				Allow analytics cookies
			</xb-switch>
		` );

		cy.get( 'xb-switch' ).as( 'switch' );

		cy.get( '@switch' ).should( 'have.attr', 'aria-checked', 'true' );

		cy.get( '@switch' ).click();
		cy.get( '@onChangeSpy' ).should(
			'have.been.calledWith',
			Cypress.sinon.match.hasNested( 'detail', {
				checked: false,
			} )
		);

		cy.get( '@switch' ).should( 'have.attr', 'aria-checked', 'false' );

		cy.get( '@switch' ).click();
		cy.get( '@onChangeSpy' ).should(
			'have.been.calledWith',
			Cypress.sinon.match.hasNested( 'detail', {
				checked: true,
			} )
		);

		cy.get( '@switch' ).should( 'have.attr', 'aria-checked', 'true' );
	} );

	it( 'should navigate & toggle using the keyboard', () => {
		cy.mount( html`
			<xb-switch>Allow analytics cookies</xb-switch>
		` );

		cy.get( 'xb-switch' ).as( 'switch' );
		cy.get( '@switch' ).should( 'have.attr', 'aria-checked', 'false' );
		cy.get( '@switch' ).focus();

		cy.get( '@switch' ).press( 'Space' );
		cy.get( '@switch' ).should( 'have.attr', 'aria-checked', 'true' );

		cy.get( '@switch' ).press( 'Enter' );
		cy.get( '@switch' ).should( 'have.attr', 'aria-checked', 'false' );
	} );
} );
