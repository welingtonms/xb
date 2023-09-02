import { html } from 'lit';

import './dropdown';
import './dropdown-item';
import './dropdown-menu';
import './dropdown-trigger';

describe( '<xb-dropdown>', () => {
	it( 'should render correctly', () => {
		const onClickSpy = cy.stub().as( 'onClickSpy' );

		const args = { placement: 'bottom-start', click: ( event ) => onClickSpy( event ) };

		cy.mount( html`
			<xb-dropdown placement=${ args.placement }>
				<xb-dropdown-trigger>Actions</xb-dropdown-trigger>

				<xb-dropdown-menu>
					<xb-dropdown-item @click=${ args.click }>Accept</xb-dropdown-item>
					<xb-dropdown-item @click=${ args.click }>Change</xb-dropdown-item>
					<xb-dropdown-item @click=${ args.click }>Leave</xb-dropdown-item>
				</xb-dropdown-menu>
			</xb-dropdown>
		` );

		cy.get( 'xb-dropdown' ).find( 'xb-dropdown-menu' ).should( 'not.be.visible' );
		cy.get( 'xb-dropdown' ).find( 'xb-dropdown-trigger' ).click();
		cy.get( 'xb-dropdown' ).find( 'xb-dropdown-menu' ).should( 'be.visible' );
		cy.get( 'xb-dropdown' ).find( 'xb-dropdown-trigger' ).click();
		cy.get( 'xb-dropdown' ).find( 'xb-dropdown-menu' ).should( 'not.be.visible' );
	} );

	it( 'should collapse when an option is clicked', () => {
		const onClickSpy = cy.stub().as( 'onClickSpy' );

		const args = { placement: 'bottom-start', click: ( event ) => onClickSpy( event ) };

		cy.mount( html`
			<xb-dropdown placement=${ args.placement }>
				<xb-dropdown-trigger>Actions</xb-dropdown-trigger>

				<xb-dropdown-menu>
					<xb-dropdown-item data-cy="accept">Accept</xb-dropdown-item>
					<xb-dropdown-item data-cy="change">Change</xb-dropdown-item>
					<xb-dropdown-item data-cy="leave" @click=${ args.click }>Leave</xb-dropdown-item>
				</xb-dropdown-menu>
			</xb-dropdown>
		` );

		cy.get( 'xb-dropdown' ).find( 'xb-dropdown-trigger' ).click();

		cy.get( 'xb-dropdown' ).find( 'xb-dropdown-menu' ).should( 'be.visible' );

		cy.get( 'xb-dropdown-item[data-cy="leave"]' ).click();

		cy.get( '@onClickSpy' ).should( 'have.been.called' );
		cy.get( 'xb-dropdown' ).find( 'xb-dropdown-menu' ).should( 'not.be.visible' );
	} );

	it( 'emit expand, collapse, and toggle events', () => {
		const onExpandSpy = cy.stub().as( 'onExpandSpy' );
		const onCollapseSpy = cy.stub().as( 'onCollapseSpy' );
		const onToggleSpy = cy.stub().as( 'onToggleSpy' );

		const args = {
			placement: 'bottom-start',
		};

		cy.mount( html`
			<xb-dropdown
				placement=${ args.placement }
				@xb:dropdown-expand=${ ( event ) => {
					onExpandSpy( event );
				} }
				@xb:dropdown-collapse=${ ( event ) => {
					onCollapseSpy( event );
				} }
				@xb:dropdown-toggle=${ ( event ) => {
					onToggleSpy( event );
				} }
			>
				<xb-dropdown-trigger>Actions</xb-dropdown-trigger>

				<xb-dropdown-menu>
					<xb-dropdown-item>Accept</xb-dropdown-item>
					<xb-dropdown-item>Change</xb-dropdown-item>
					<xb-dropdown-item>Leave</xb-dropdown-item>
				</xb-dropdown-menu>
			</xb-dropdown>
		` );

		cy.get( 'xb-dropdown' ).as( 'dropdown' );
		cy.get( 'xb-dropdown' ).find( 'xb-dropdown-trigger' ).as( 'dropdown-trigger' );

		cy.get( '@dropdown' ).then( ( dropdowns ) => {
			/** @type {import('./dropdown').Dropdown} */
			const dropdown = dropdowns[ 0 ];

			dropdown.expand();
			cy.get( '@onExpandSpy' ).should( 'have.been.called' );

			dropdown.collapse();
			cy.get( '@onCollapseSpy' ).should( 'have.been.called' );

			cy.get( '@dropdown-trigger' ).click();
			cy.get( '@onToggleSpy' ).should( 'have.been.called' );
		} );
	} );

	it( 'should navigate the keyboard', () => {
		cy.mount( html`
			<xb-dropdown>
				<xb-dropdown-trigger>Actions</xb-dropdown-trigger>

				<xb-dropdown-menu>
					<xb-dropdown-item>Accept</xb-dropdown-item>
					<xb-dropdown-item>Change</xb-dropdown-item>
					<xb-dropdown-item>Leave</xb-dropdown-item>
				</xb-dropdown-menu>
			</xb-dropdown>
		` );

		cy.get( 'xb-dropdown' ).find( 'xb-dropdown-trigger' ).as( 'trigger' );
		cy.get( 'xb-dropdown' ).find( 'xb-dropdown-menu' ).as( 'menu' );

		cy.get( '@menu' ).should( 'not.be.visible' );

		// this is just a check to ensure the necessary internal updates were made
		cy.get( '@trigger' ).should( 'have.attr', 'tabindex', '0' );
		cy.get( '@trigger' ).focus();

		cy.get( '@trigger' ).press( 'ArrowDown' );

		cy.get( '@menu' ).should( 'be.visible' );
		cy.get( '@menu' ).should( 'be.focused' ); // as per spec

		// navigates from first option to last option
		cy.get( '@menu' ).find( '.is-focused' ).should( 'have.text', 'Accept' );
		cy.get( '@menu' ).press( 'ArrowDown' );
		cy.get( '@menu' ).find( '.is-focused' ).should( 'have.text', 'Change' );
		cy.get( '@menu' ).press( 'ArrowDown' );
		cy.get( '@menu' ).find( '.is-focused' ).should( 'have.text', 'Leave' );
		cy.get( '@menu' ).press( 'ArrowDown' ); // return to first option

		// navigates from last option to first option
		cy.get( '@menu' ).press( 'ArrowUp' );
		cy.get( '@menu' ).find( '.is-focused' ).should( 'have.text', 'Leave' );
		cy.get( '@menu' ).press( 'ArrowUp' );
		cy.get( '@menu' ).find( '.is-focused' ).should( 'have.text', 'Change' );
		cy.get( '@menu' ).press( 'ArrowUp' );
		cy.get( '@menu' ).find( '.is-focused' ).should( 'have.text', 'Accept' );

		cy.get( '@menu' ).press( 'Escape' );

		cy.get( '@menu' ).should( 'not.be.visible' );
	} );

	it( 'should navigate & select using the keyboard', () => {
		const onClickSpy = cy.stub().as( 'onClickSpy' );
		cy.mount( html`
			<xb-dropdown>
				<xb-dropdown-trigger>Actions</xb-dropdown-trigger>
				<xb-dropdown-menu>
					<xb-dropdown-item
						@click=${ ( e ) => {
							onClickSpy( e );
						} }
					>
						Accept
					</xb-dropdown-item>
					<xb-dropdown-item>Change</xb-dropdown-item>
					<xb-dropdown-item>Leave</xb-dropdown-item>
				</xb-dropdown-menu>
			</xb-dropdown>
		` );

		cy.get( 'xb-dropdown' ).find( 'xb-dropdown-trigger' ).as( 'trigger' );
		cy.get( 'xb-dropdown' ).find( 'xb-dropdown-menu' ).as( 'menu' );

		// this is just a check to ensure the necessary internal updates were made
		cy.get( '@trigger' ).should( 'have.attr', 'tabindex', '0' );
		cy.get( '@trigger' ).focus();

		cy.get( '@trigger' ).press( 'ArrowDown' );

		// selecting with the space key ----------------------------------------------------------------
		// this is just a check to ensure the necessary internal updates were made
		cy.get( '@menu' ).find( '.is-focused' ).should( 'exist' );

		cy.get( '@menu' ).press( 'Space' );

		cy.get( '@onClickSpy' ).should( 'have.been.calledOnce' );

		cy.get( '@trigger' ).press( 'ArrowDown' );
		cy.get( '@menu' ).find( '.is-focused' ).should( 'exist' );

		cy.get( '@menu' ).press( 'Space' );

		cy.get( '@onClickSpy' ).should( 'have.been.calledTwice' );
	} );
} );
