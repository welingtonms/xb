import { html } from 'lit-html';

import './menu';
import './menu-item';

describe( '<xb-menu>', () => {
	it( 'should render correctly', () => {
		const onClickSpy = cy.stub().as( 'onClickSpy' );

		cy.mount(
			html`
				<xb-menu>
					<xb-item data-cy="accept">Accept</xb-item>
					<xb-item data-cy="change" @click=${ ( e ) => onClickSpy( e ) }>Change</xb-item>
					<xb-item data-cy="leave">Leave</xb-item>
				</xb-menu>
			`
		);

		cy.get( 'xb-menu' ).should( 'have.attr', 'role', 'menu' );

		cy.get( 'xb-item[data-cy="accept"]' ).should( 'have.attr', 'role', 'menuitem' );
		cy.get( 'xb-item[data-cy="change"]' ).should( 'have.attr', 'role', 'menuitem' );
		cy.get( 'xb-item[data-cy="leave"]' ).should( 'have.attr', 'role', 'menuitem' );

		cy.get( 'xb-item[data-cy="change"]' ).click();
		cy.get( '@onClickSpy' ).should( 'have.been.called' );
	} );

	it( 'should navigate the keyboard', () => {
		cy.mount( html`
			<xb-menu>
				<xb-item data-cy="accept">Accept</xb-item>
				<xb-item data-cy="change" @click=${ ( e ) => onClickSpy( e ) }>Change</xb-item>
				<xb-item data-cy="leave">Leave</xb-item>
			</xb-menu>
		` );

		cy.get( 'xb-menu' ).as( 'menu' );

		cy.get( '@menu' ).focus();

		// navigates from first option to last option
		cy.get( '@menu' ).find( '.is-focused' ).should( 'have.text', 'Accept' );
		cy.get( '@menu' ).press( 'ArrowDown' );
		cy.get( '@menu' ).find( '.is-focused' ).should( 'have.text', 'Change' );
		cy.get( '@menu' ).press( 'ArrowDown' );
		cy.get( '@menu' ).find( '.is-focused' ).should( 'have.text', 'Leave' );
		cy.get( '@menu' ).press( 'ArrowDown' ); // return to first option

		// // navigates from last option to first option
		cy.get( '@menu' ).press( 'ArrowUp' );
		cy.get( '@menu' ).find( '.is-focused' ).should( 'have.text', 'Leave' );
		cy.get( '@menu' ).press( 'ArrowUp' );
		cy.get( '@menu' ).find( '.is-focused' ).should( 'have.text', 'Change' );
		cy.get( '@menu' ).press( 'ArrowUp' );
		cy.get( '@menu' ).find( '.is-focused' ).should( 'have.text', 'Accept' );
	} );
} );
