import { html } from 'lit-html';

import './menu';
import './menu-item';

describe( '<xb-menu>', () => {
	it( 'should render correctly', () => {
		const onClickSpy = cy.stub().as( 'onClickSpy' );

		cy.mount(
			html`
				<xb-menu>
					<xb-item id="item-accept">Accept</xb-item>
					<xb-item id="item-change" @click=${ ( e ) => onClickSpy( e ) }>Change</xb-item>
					<xb-item id="item-leave">Leave</xb-item>
				</xb-menu>
			`
		);

		cy.get( 'xb-menu' ).as( 'menu' );

		cy.get( '@menu' ).should( 'have.attr', 'role', 'menu' );
		cy.get( '@menu' ).should( 'have.attr', 'tabindex', '0' );
		cy.get( '@menu' ).should( 'not.have.attr', 'aria-activedescendant' );

		cy.get( 'xb-item#item-accept' )
			.should( 'have.attr', 'role', 'menuitem' )
			.and( 'have.attr', 'tabindex', '-1' );
		cy.get( 'xb-item#item-change' )
			.should( 'have.attr', 'role', 'menuitem' )
			.and( 'have.attr', 'tabindex', '-1' );
		cy.get( 'xb-item#item-leave' )
			.should( 'have.attr', 'role', 'menuitem' )
			.and( 'have.attr', 'tabindex', '-1' );

		cy.get( 'xb-item#item-change' ).click();
		cy.get( '@onClickSpy' ).should( 'have.been.called' );
	} );

	it( 'should navigate the keyboard', () => {
		const onClickSpy = cy.stub().as( 'onClickSpy' );

		cy.mount( html`
			<xb-menu>
				<xb-item id="item-accept">Accept</xb-item>
				<xb-item id="item-change" @click=${ ( e ) => onClickSpy( e ) }>Change</xb-item>
				<xb-item id="item-leave">Leave</xb-item>
			</xb-menu>
		` );

		cy.get( 'xb-menu' ).as( 'menu' );

		cy.get( '@menu' ).focus();

		// navigates from first option to last option
		cy.get( '@menu' ).should( 'have.attr', 'aria-activedescendant', 'item-accept' );
		cy.get( '@menu' ).find( '.is-focused' ).should( 'have.text', 'Accept' );

		cy.get( '@menu' ).press( 'ArrowDown' );
		cy.get( '@menu' ).should( 'have.attr', 'aria-activedescendant', 'item-change' );
		cy.get( '@menu' ).find( '.is-focused' ).should( 'have.text', 'Change' );

		cy.get( '@menu' ).press( 'ArrowDown' );
		cy.get( '@menu' ).should( 'have.attr', 'aria-activedescendant', 'item-leave' );
		cy.get( '@menu' ).find( '.is-focused' ).should( 'have.text', 'Leave' );

		cy.get( '@menu' ).press( 'ArrowDown' ); // return to first option
		cy.get( '@menu' ).should( 'have.attr', 'aria-activedescendant', 'item-accept' );

		// // navigates from last option to first option
		cy.get( '@menu' ).press( 'ArrowUp' );
		cy.get( '@menu' ).should( 'have.attr', 'aria-activedescendant', 'item-leave' );
		cy.get( '@menu' ).find( '.is-focused' ).should( 'have.text', 'Leave' );

		cy.get( '@menu' ).press( 'ArrowUp' );
		cy.get( '@menu' ).should( 'have.attr', 'aria-activedescendant', 'item-change' );
		cy.get( '@menu' ).find( '.is-focused' ).should( 'have.text', 'Change' );

		cy.get( '@menu' ).press( 'ArrowUp' );
		cy.get( '@menu' ).should( 'have.attr', 'aria-activedescendant', 'item-accept' );
		cy.get( '@menu' ).find( '.is-focused' ).should( 'have.text', 'Accept' );
	} );

	it( 'should focus via keyboard-typed search', () => {
		// this is powed by the focus-manager

		cy.mount( html`
			<xb-menu>
				<xb-item id="item-accept">Accept</xb-item>
				<xb-item id="item-change">Change</xb-item>
				<xb-item id="item-leave">Leave</xb-item>
			</xb-menu>
		` );

		cy.get( 'xb-menu' ).as( 'menu' );

		cy.get( '@menu' ).focus();

		cy.get( '@menu' ).should( 'have.attr', 'aria-activedescendant', 'item-accept' );
		cy.get( '@menu' ).find( '.is-focused' ).should( 'have.text', 'Accept' );

		cy.get( '@menu' ).type( 'leav' );

		cy.get( '@menu' ).should( 'have.attr', 'aria-activedescendant', 'item-leave' );
		cy.get( '@menu' ).find( '.is-focused' ).should( 'have.text', 'Leave' );
	} );
} );
