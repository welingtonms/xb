import { html } from 'lit';

import './dropdown';

describe( '<xb-dropdown>', () => {
	it( 'should render correctly', () => {
		const onClickSpy = cy.stub().as( 'onClickSpy' );

		const args = { placement: 'bottom-start', click: ( event ) => onClickSpy( event ) };

		cy.mount( html`
			<xb-dropdown placement=${ args.placement }>
				<xb-dropdown-trigger>Actions</xb-dropdown-trigger>

				<xb-dropdown-menu>
					<xb-dropdown-item value="accept" @click=${ args.click }>
						Accept
					</xb-dropdown-item>
					<xb-dropdown-item value="change" @click=${ args.click }>
						Change
					</xb-dropdown-item>
					<xb-dropdown-item value="leave" @click=${ args.click }>Leave</xb-dropdown-item>
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
					<xb-dropdown-item data-cy="accept" value="accept">Accept</xb-dropdown-item>
					<xb-dropdown-item data-cy="change" value="change">Change</xb-dropdown-item>
					<xb-dropdown-item data-cy="leave" value="leave" @click=${ args.click }>
						Leave
					</xb-dropdown-item>
				</xb-dropdown-menu>
			</xb-dropdown>
		` );

		cy.get( 'xb-dropdown' ).find( 'xb-dropdown-trigger' ).click();

		cy.get( 'xb-dropdown' ).find( 'xb-dropdown-menu' ).should( 'be.visible' );

		cy.get( 'xb-dropdown' )
			.find( '[data-cy="leave"]', { includeShadowDom: true } )
			.click();

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
				@xb-dropdown-expand=${ ( event ) => {
					onExpandSpy( event );
				} }
				@xb-dropdown-collapse=${ ( event ) => {
					onCollapseSpy( event );
				} }
				@xb-dropdown-toggle=${ ( event ) => {
					onToggleSpy( event );
				} }
			>
				<xb-dropdown-trigger>Actions</xb-dropdown-trigger>

				<xb-dropdown-menu>
					<xb-dropdown-item value="accept">Accept</xb-dropdown-item>
					<xb-dropdown-item value="change">Change</xb-dropdown-item>
					<xb-dropdown-item value="leave">Leave</xb-dropdown-item>
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
					<xb-dropdown-item value="accept">Accept</xb-dropdown-item>
					<xb-dropdown-item value="change">Change</xb-dropdown-item>
					<xb-dropdown-item value="leave">Leave</xb-dropdown-item>
				</xb-dropdown-menu>
			</xb-dropdown>
		` );

		cy.get( 'xb-dropdown' ).find( 'xb-dropdown-trigger' ).click();
		cy.get( 'xb-dropdown' ).find( 'xb-dropdown-menu' ).as( 'menu' );

		cy.get( '@menu' ).keydown( 'ArrowDown' );
		cy.focused().should( 'have.attr', 'value', 'accept' );
		cy.get( '@menu' ).keydown( 'ArrowDown' );
		cy.focused().should( 'have.attr', 'value', 'change' );
		cy.get( '@menu' ).keydown( 'ArrowDown' );
		cy.focused().should( 'have.attr', 'value', 'leave' );

		cy.get( '@menu' ).keydown( 'ArrowDown' ); // return to first option
		cy.focused().should( 'have.attr', 'value', 'accept' );

		cy.get( '@menu' ).keydown( 'ArrowUp' ); // return to last option
		cy.focused().should( 'have.attr', 'value', 'leave' );
	} );

	it( 'should navigate & select using the keyboard', () => {
		const onClickSpy = cy.stub().as( 'onClickSpy' );
		cy.mount( html`
			<xb-dropdown>
				<xb-dropdown-trigger>Actions</xb-dropdown-trigger>
				<xb-dropdown-menu>
					<xb-dropdown-item value="accept">Accept</xb-dropdown-item>
					<xb-dropdown-item value="change">Change</xb-dropdown-item>
					<xb-dropdown-item
						value="leave"
						@click=${ ( e ) => {
							onClickSpy( e );
						} }
					>
						Leave
					</xb-dropdown-item>
				</xb-dropdown-menu>
			</xb-dropdown>
		` );
		cy.get( 'xb-dropdown' ).find( 'xb-dropdown-trigger' ).click();
		cy.get( 'xb-dropdown' ).find( 'xb-dropdown-menu' ).as( 'menu' );
		cy.get( '@menu' ).keydown( 'ArrowUp' );

		cy.focused().should( 'have.attr', 'value', 'leave' );
		cy.focused().click();

		cy.get( '@onClickSpy' ).should( 'have.been.called' );
	} );
} );
