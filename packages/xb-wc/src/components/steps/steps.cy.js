import { html } from 'lit';

import './steps';
import './accordion-header';
import './accordion-panel';

describe( '<xb-accordion>', () => {
	it( 'should render correctly', () => {
		cy.mount( html`
			<xb-accordion>
				<xb-accordion-header id="the-header">Personal Information</xb-accordion-header>
				<xb-accordion-panel id="the-panel">
					<xb-box borderless>Here goes the Personal Information form.</xb-box>
				</xb-accordion-panel>
			</xb-accordion>
		` );

		cy.get( 'xb-accordion' ).as( 'accordion' );
		cy.get( 'xb-accordion-header' ).as( 'header' );
		cy.get( 'xb-accordion-panel' ).as( 'panel' );

		cy.get( '@header' ).should( 'have.attr', 'role', 'button' );
		cy.get( '@header' ).should( 'have.attr', 'tabindex', '0' );
		cy.get( '@header' ).should( 'have.attr', 'aria-expanded', 'false' );
		cy.get( '@header' ).should( 'have.attr', 'aria-controls', 'the-panel' );

		cy.get( '@panel' ).should( 'not.be.visible' );
		cy.get( '@panel' ).should( 'have.attr', 'role', 'region' );
		cy.get( '@panel' ).should( 'have.attr', 'aria-labelledby', 'the-header' );

		cy.get( '@header' ).click();

		cy.get( '@panel' ).should( 'be.visible' );
		cy.get( '@header' ).should( 'have.attr', 'aria-expanded', 'true' );

		cy.get( '@header' ).click();

		cy.get( '@header' ).should( 'have.attr', 'aria-expanded', 'false' );
		cy.get( '@panel' ).should( 'not.be.visible' );
	} );

	it( 'emit expand and collapse events', () => {
		const onExpandSpy = cy.stub().as( 'onExpandSpy' );
		const onCollapseSpy = cy.stub().as( 'onCollapseSpy' );

		cy.mount( html`
			<xb-accordion
				@xb:accordion-expand=${ ( event ) => {
					onExpandSpy( event );
				} }
				@xb:accordion-collapse=${ ( event ) => {
					onCollapseSpy( event );
				} }
			>
				<xb-accordion-header id="the-header">Personal Information</xb-accordion-header>
				<xb-accordion-panel id="the-panel">
					<xb-box borderless>Here goes the Personal Information form.</xb-box>
				</xb-accordion-panel>
			</xb-accordion>
		` );

		cy.get( 'xb-accordion' ).as( 'accordion' );
		cy.get( 'xb-accordion-header' ).as( 'header' );

		cy.get( '@accordion' ).then( ( accordions ) => {
			/** @type {import('./steps').Accordion} */
			const accordion = accordions[ 0 ];

			accordion.expand();
			cy.get( '@onExpandSpy' ).should( 'have.been.called' );

			accordion.collapse();
			cy.get( '@onCollapseSpy' ).should( 'have.been.called' );
		} );
	} );

	it( 'should navigate & toggle using the keyboard', () => {
		cy.mount( html`
			<xb-accordion>
				<xb-accordion-header id="the-header">Personal Information</xb-accordion-header>
				<xb-accordion-panel id="the-panel">
					<xb-box borderless>Here goes the Personal Information form.</xb-box>
				</xb-accordion-panel>
			</xb-accordion>
		` );

		cy.get( 'xb-accordion' ).as( 'accordion' );
		cy.get( 'xb-accordion-header' ).as( 'header' );
		cy.get( 'xb-accordion-panel' ).as( 'panel' );

		cy.get( '@panel' ).should( 'not.be.visible' );

		cy.get( '@header' ).focus();

		cy.get( '@header' ).press( 'Space' );
		cy.get( '@panel' ).should( 'be.visible' );

		cy.get( '@header' ).press( 'Enter' );
		cy.get( '@panel' ).should( 'not.be.visible' );
	} );
} );
