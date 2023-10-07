import { html } from 'lit';

import './steps';
import './steps-step';

describe( '<xb-steps>', () => {
	it( 'should render correctly', () => {
		cy.mount( html`
			<xb-steps>
				<xb-step completed label="Basic Info">1</xb-step>
				<xb-step active label="Commodities">2</xb-step>
				<xb-step label="Review">3</xb-step>
			</xb-steps>
		` );

		cy.get( 'xb-steps' ).as( 'steps' );
		cy.get( '@steps' ).should( 'be.visible' );

		cy.get( 'xb-step[label="Basic Info"]' ).as( 'step-1' );
		cy.get( 'xb-step[label="Commodities"]' ).as( 'step-2' );
		cy.get( 'xb-step[label="Review"]' ).as( 'step-3' );

		cy.get( '@step-1' ).should( 'not.have.attr', 'tabindex' );
		cy.get( '@step-1' ).should( 'not.have.attr', 'aria-current' );
		cy.get( '@step-1' ).should( 'have.text', '1' );
		cy.get( '@step-1' )
			.find( 'xb-text', { includeShadowDom: true } )
			.should( 'have.text', 'Basic Info' );
		cy.get( '@step-1' )
			.find( 'xb-icon[name="check"]', { includeShadowDom: true } )
			.should( 'be.visible' );

		cy.get( '@step-2' ).should( 'have.attr', 'tabindex', '0' );
		cy.get( '@step-2' ).should( 'have.attr', 'aria-current', 'step' );
		cy.get( '@step-2' ).should( 'have.text', '2' );
		cy.get( '@step-2' )
			.find( 'xb-text', { includeShadowDom: true } )
			.should( 'have.text', 'Commodities' );
		cy.get( '@step-2' )
			.find( 'xb-icon[name="check"]', { includeShadowDom: true } )
			.should( 'not.be.visible' );

		cy.get( '@step-3' ).should( 'not.have.attr', 'tabindex' );
		cy.get( '@step-3' ).should( 'not.have.attr', 'aria-current' );
		cy.get( '@step-3' ).should( 'have.text', '3' );
		cy.get( '@step-3' )
			.find( 'xb-text', { includeShadowDom: true } )
			.should( 'have.text', 'Review' );
		cy.get( '@step-3' )
			.find( 'xb-icon[name="check"]', { includeShadowDom: true } )
			.should( 'not.be.visible' );
	} );
} );
