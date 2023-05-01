import { html } from 'lit';

import './tooltip';
import '../layout/box';

describe( '<xb-tooltip>', () => {
	it( 'should render on click', () => {
		const args = { placement: 'bottom-start', trigger: 'click' };

		cy.mount( html`
			<xb-tooltip placement=${ args.placement } trigger=${ args.trigger }>
				<button type="button" slot="reference">reference</button>
				<div slot="floating">Lorem ipsum dolor sit amet.</div>
			</xb-tooltip>
		` );

		cy.get( 'xb-tooltip' ).find( '[slot="floating"]' ).should( 'not.be.visible' );

		cy.get( 'xb-tooltip' ).find( '[slot="reference"]' ).click();

		cy.get( 'xb-tooltip' ).find( '[slot="floating"]' ).should( 'be.visible' );

		cy.get( 'xb-tooltip' ).find( '[slot="reference"]' ).click();

		cy.get( 'xb-tooltip' ).find( '[slot="floating"]' ).should( 'not.be.visible' );
	} );

	it( 'should render on hover', () => {
		const args = { placement: 'bottom-start', trigger: 'hover' };

		cy.mount( html`
			<xb-tooltip placement=${ args.placement } trigger=${ args.trigger }>
				<button type="button" slot="reference">reference</button>
				<div slot="floating">Lorem ipsum dolor sit amet.</div>
			</xb-tooltip>
		` );

		cy.get( 'xb-tooltip' ).find( '[slot="floating"]' ).should( 'not.be.visible' );

		cy.get( 'xb-tooltip' ).find( '[slot="reference"]' ).trigger( 'mouseover' );

		cy.get( 'xb-tooltip' ).find( '[slot="floating"]' ).should( 'be.visible' );

		cy.get( 'xb-tooltip' ).find( '[slot="reference"]' ).trigger( 'mouseout' );

		cy.get( 'xb-tooltip' ).find( '[slot="floating"]' ).should( 'not.be.visible' );
	} );

	it( 'should render on focus', () => {
		const args = { placement: 'bottom-start', trigger: 'focus' };

		cy.mount( html`
			<xb-tooltip placement=${ args.placement } trigger=${ args.trigger }>
				<button type="button" slot="reference">reference</button>
				<div slot="floating">Lorem ipsum dolor sit amet.</div>
			</xb-tooltip>
		` );

		cy.get( 'xb-tooltip' ).find( '[slot="floating"]' ).should( 'not.be.visible' );

		/**
		 * no, this won't work (for headlesss, firefox, and electron):
		 * cy.get( 'xb-tooltip' ).find( '[slot="reference"]' ).focus();
		 * I tried it.
		 * Tabbing to focus on first focusable element instead.
		 */
		cy.get( 'body' ).tab();

		cy.get( 'xb-tooltip' ).find( '[slot="floating"]' ).should( 'be.visible' );

		cy.get( 'xb-tooltip' ).find( '[slot="reference"]' ).blur();

		cy.get( 'xb-tooltip' ).find( '[slot="floating"]' ).should( 'not.be.visible' );
	} );
} );
