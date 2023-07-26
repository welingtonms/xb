import { html } from 'lit';

import Keyboard from '../../common/keyboard';

import '../layout/box';
import '../button';
import './focus-trap';

/**
 * @param {import('./focus-trap').FocusTrapAttributes} args
 */
function setup( args ) {
	return html`
		<div style="border: 2px solid;">
			<xb-focus-trap ?active=${ args.active } .keys=${ args.keys }>
				<button id="first" type="button">&hearts;</button>
				<button id="second" type="button">&diams;</button>
				<button id="third" type="button">&clubs;</button>
			</xb-focus-trap>
		</div>
		<button id="outside" type="button">outside</button>
	`;
}

describe( '<xb-focus-trap>', () => {
	it( 'tabs normally when disabled', () => {
		cy.mount(
			setup( {
				active: false,
				keys: [ Keyboard.getKey( 'ArrowUp' ), Keyboard.getKey( 'ArrowDown' ) ],
			} )
		);

		cy.get( 'body' ).keydown( 'ArrowDown' );
		cy.get( '#first' ).should( 'not.be.focused' );

		cy.get( 'body' ).tab();

		cy.get( '#first' ).should( 'be.focused' );
		cy.focused().tab();
		cy.get( '#second' ).should( 'be.focused' );
		cy.focused().tab();
		cy.get( '#third' ).should( 'be.focused' );
		cy.focused().tab();

		cy.get( '#outside' ).should( 'be.focused' );
	} );

	it( 'navigates forward when enabled, using ArrowDown', () => {
		cy.mount(
			setup( {
				active: true,
				keys: [ Keyboard.getKey( 'ArrowUp' ), Keyboard.getKey( 'ArrowDown' ) ],
			} )
		);

		cy.get( 'body' ).keydown( 'ArrowDown' );
		cy.get( '#first' ).should( 'be.focused' );
		cy.get( 'body' ).keydown( 'ArrowDown' );
		cy.get( '#second' ).should( 'be.focused' );
		cy.get( 'body' ).keydown( 'ArrowDown' );
		cy.get( '#third' ).should( 'be.focused' );
		cy.get( 'body' ).keydown( 'ArrowDown' );

		cy.get( '#outside' ).should( 'not.be.focused' );
		cy.get( '#first' ).should( 'be.focused' );
	} );

	it( 'navigates backward when enabled, using ArrowUp', () => {
		cy.mount(
			setup( {
				active: true,
				keys: [ Keyboard.getKey( 'ArrowUp' ), Keyboard.getKey( 'ArrowDown' ) ],
			} )
		);

		cy.get( 'body' ).keydown( 'ArrowUp' );
		cy.get( '#third' ).should( 'be.focused' );
		cy.get( 'body' ).keydown( 'ArrowUp' );
		cy.get( '#second' ).should( 'be.focused' );
		cy.get( 'body' ).keydown( 'ArrowUp' );
		cy.get( '#first' ).should( 'be.focused' );
		cy.get( 'body' ).keydown( 'ArrowUp' );

		cy.get( '#outside' ).should( 'not.be.focused' );
		cy.get( '#third' ).should( 'be.focused' );
	} );

	it( 'navigates forward when enabled, using ArrowRight', () => {
		cy.mount(
			setup( {
				active: true,
				keys: [
					Keyboard.getKey( 'ArrowUp' ),
					Keyboard.getKey( 'ArrowDown' ),
					Keyboard.getKey( 'ArrowRight' ),
					Keyboard.getKey( 'ArrowLeft' ),
				],
			} )
		);

		cy.get( 'body' ).keydown( 'ArrowRight' );
		cy.get( '#first' ).should( 'be.focused' );
		cy.get( 'body' ).keydown( 'ArrowRight' );
		cy.get( '#second' ).should( 'be.focused' );
		cy.get( 'body' ).keydown( 'ArrowRight' );
		cy.get( '#third' ).should( 'be.focused' );
		cy.get( 'body' ).keydown( 'ArrowRight' );

		cy.get( '#outside' ).should( 'not.be.focused' );
		cy.get( '#first' ).should( 'be.focused' );
	} );

	it( 'navigates backward when enabled, using ArrowLeft', () => {
		cy.mount(
			setup( {
				active: true,
				keys: [
					Keyboard.getKey( 'ArrowUp' ),
					Keyboard.getKey( 'ArrowDown' ),
					Keyboard.getKey( 'ArrowRight' ),
					Keyboard.getKey( 'ArrowLeft' ),
				],
			} )
		);

		cy.get( 'body' ).keydown( 'ArrowLeft' );
		cy.get( '#third' ).should( 'be.focused' );
		cy.get( 'body' ).keydown( 'ArrowLeft' );
		cy.get( '#second' ).should( 'be.focused' );
		cy.get( 'body' ).keydown( 'ArrowLeft' );
		cy.get( '#first' ).should( 'be.focused' );
		cy.get( 'body' ).keydown( 'ArrowLeft' );

		cy.get( '#outside' ).should( 'not.be.focused' );
		cy.get( '#third' ).should( 'be.focused' );
	} );
} );
