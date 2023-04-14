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
					<xb-dropdown-item value="change" @xb-click=${ args.click }>
						Change
					</xb-dropdown-item>
					<xb-dropdown-item value="accept" @xb-click=${ args.click }>
						Accept
					</xb-dropdown-item>
					<xb-dropdown-item value="leave" @xb-click=${ args.click }>
						Leave
					</xb-dropdown-item>
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
					<xb-dropdown-item data-cy="change" value="change">Change</xb-dropdown-item>
					<xb-dropdown-item data-cy="accept" value="accept">Accept</xb-dropdown-item>
					<xb-dropdown-item data-cy="leave" value="leave" @xb-click=${ args.click }>
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
		const args = {
			placement: 'bottom-start',
		};

		cy.mount( html`
			<xb-dropdown placement=${ args.placement }>
				<xb-dropdown-trigger>Actions</xb-dropdown-trigger>

				<xb-dropdown-menu>
					<xb-dropdown-item value="change">Change</xb-dropdown-item>
					<xb-dropdown-item value="accept">Accept</xb-dropdown-item>
					<xb-dropdown-item value="leave">Leave</xb-dropdown-item>
				</xb-dropdown-menu>

				<button
					type="button"
					data-cy="expand"
					@click=${ ( event ) => {
						event.target.dispatchEvent(
							new CustomEvent( 'xb-dropdown-expand', {
								bubbles: true,
							} )
						);
					} }
				>
					Expand
				</button>

				<button
					type="button"
					data-cy="collapse"
					@click=${ ( event ) => {
						event.target.dispatchEvent(
							new CustomEvent( 'xb-dropdown-collapse', {
								bubbles: true,
							} )
						);
					} }
				>
					Collapse
				</button>

				<button
					type="button"
					data-cy="toggle"
					@click=${ ( event ) => {
						event.target.dispatchEvent(
							new CustomEvent( 'xb-dropdown-toggle', {
								bubbles: true,
							} )
						);
					} }
				>
					Toggle
				</button>
			</xb-dropdown>
		` );

		cy.get( 'xb-dropdown' )
			.find( '[data-cy="expand"]', { includeShadowDom: true } )
			.click( { force: true } );

		cy.get( 'xb-dropdown' ).find( 'xb-dropdown-menu' ).should( 'be.visible' );

		cy.get( 'xb-dropdown' )
			.find( '[data-cy="collapse"]', { includeShadowDom: true } )
			.click( { force: true } );

		cy.get( 'xb-dropdown' ).find( 'xb-dropdown-menu' ).should( 'not.be.visible' );

		cy.get( 'xb-dropdown' )
			.find( '[data-cy="toggle"]', { includeShadowDom: true } )
			.click( { force: true } );

		cy.get( 'xb-dropdown' ).find( 'xb-dropdown-menu' ).should( 'be.visible' );

		cy.get( 'xb-dropdown' )
			.find( '[data-cy="toggle"]', { includeShadowDom: true } )
			.click( { force: true } );

		cy.get( 'xb-dropdown' ).find( 'xb-dropdown-menu' ).should( 'not.be.visible' );
	} );
} );
