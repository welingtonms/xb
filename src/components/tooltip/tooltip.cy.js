import { html } from 'lit';

import './tooltip';
import '../layout/box';

describe( '<xb-tooltip>', () => {
	it( 'should render on click', () => {
		/** @type {TooltipAttributes} */
		const args = { trigger: [ 'click' ] };

		cy.mount( html`
			<button id="my-anchor" type="button">reference</button>

			<xb-tooltip anchor="my-anchor" .trigger=${ args.trigger }>
				Lorem ipsum dolor sit amet.
			</xb-tooltip>
		` );

		cy.get( 'xb-tooltip' ).should( 'not.be.visible' );

		cy.get( '#my-anchor' ).click();

		cy.get( 'xb-tooltip' ).should( 'be.visible' );

		cy.get( '#my-anchor' ).click();

		cy.get( 'xb-tooltip' ).should( 'not.be.visible' );
	} );

	it( 'should render on hover', () => {
		/** @type {TooltipAttributes} */
		const args = { trigger: [ 'hover' ] };

		cy.mount( html`
			<button id="my-anchor" type="button">reference</button>

			<xb-tooltip anchor="my-anchor" .trigger=${ args.trigger }>
				Lorem ipsum dolor sit amet.
			</xb-tooltip>
		` );

		cy.get( 'xb-tooltip' ).should( 'not.be.visible' );

		cy.get( '#my-anchor' ).trigger( 'mouseover' );

		cy.get( 'xb-tooltip' ).should( 'be.visible' );

		cy.get( '#my-anchor' ).trigger( 'mouseout' );

		cy.get( 'xb-tooltip' ).should( 'not.be.visible' );
	} );

	it( 'should render on focus', () => {
		/** @type {TooltipAttributes} */
		const args = { trigger: [ 'focus' ] };

		cy.mount( html`
			<button id="my-anchor" type="button">reference</button>

			<xb-tooltip anchor="my-anchor" .trigger=${ args.trigger }>
				Lorem ipsum dolor sit amet.
			</xb-tooltip>
		` );

		cy.get( 'xb-tooltip' ).should( 'not.be.visible' );

		cy.get( '#my-anchor' ).focus();

		cy.get( 'xb-tooltip' ).should( 'be.visible' );

		cy.get( '#my-anchor' ).blur();

		cy.get( 'xb-tooltip' ).should( 'not.be.visible' );
	} );
} );

/**
 * @typedef {import('./tooltip').TooltipAttributes} TooltipAttributes
 */
