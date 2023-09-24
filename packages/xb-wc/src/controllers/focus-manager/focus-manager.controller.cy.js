import { html, unsafeStatic } from 'lit/static-html.js';
import { ReactiveControllerHost } from '@lit/reactive-element';

import { generateElementName } from '../../utils/test-tools';
import XBElement from '../../common/xb-element';
import FocusManagerController, { SEARCH_BUFFER_TIMEOUT } from './focus-manager.controller';

import '../../components/listbox/listbox-option';

/**
 * @param {(host: FocusManagerControllerHost) => FocusManagerControllerOptions} getControllerConfig
 */
const defineTestElement = ( getControllerConfig ) => {
	class TestComponent extends XBElement {
		/** @type {FocusManagerController} */
		controller;

		constructor() {
			super();

			const config = getControllerConfig( this );
			this.controller = new FocusManagerController( this, {
				...config,
			} );
		}

		render() {
			return html`
				<slot></slot>
			`;
		}
	}

	const elementName = generateElementName();
	customElements.define( elementName, TestComponent );

	return [ unsafeStatic( elementName ), elementName ];
};

describe( 'FocusManagerController', () => {
	it( 'should initialize correctly', () => {
		const [ tag, elementName ] = defineTestElement( () => ( {
			query: '[role="option"]',
		} ) );

		cy.mount(
			html`
				<${ tag } tabindex="0">
					<xb-option data-cy="accept">Accept</xb-option>
					<xb-option data-cy="change">Change</xb-option>
					<xb-option data-cy="leave">Leave</xb-option>
                    <div class="intruder">Intruder</div>
				</${ tag }>
			`
		);

		cy.get( elementName ).as( 'element' );

		cy.get( '@element' ).then( ( $wrapped ) => {
			const element = $wrapped[ 0 ];

			expect( element.controller.queried ).to.have.length( 3 );

			cy.get( 'xb-option[data-cy="accept"]' ).then( ( $option ) => {
				expect( element.controller.queried[ 0 ] ).to.eql( $option[ 0 ] );
			} );

			cy.get( 'xb-option[data-cy="change"]' ).then( ( $option ) => {
				expect( element.controller.queried[ 1 ] ).to.eql( $option[ 0 ] );
			} );

			cy.get( 'xb-option[data-cy="leave"]' ).then( ( $option ) => {
				expect( element.controller.queried[ 2 ] ).to.eql( $option[ 0 ] );
			} );

			expect( element.controller.focused ).to.be.null;
		} );
	} );

	it( 'should visually focus queried elements correctly', () => {
		const [ tag, elementName ] = defineTestElement( () => ( {
			query: '[role="option"]',
		} ) );

		cy.mount(
			html`
				<${ tag } tabindex="0">
					<xb-option data-cy="accept">Accept</xb-option>
					<xb-option data-cy="change">Change</xb-option>
					<xb-option data-cy="leave">Leave</xb-option>
                    <div class="intruder">Intruder</div>
				</${ tag }>
			`
		);

		cy.get( 'xb-option[data-cy="accept"]' ).as( 'option-accept' );
		cy.get( 'xb-option[data-cy="change"]' ).as( 'option-change' );
		cy.get( 'xb-option[data-cy="leave"]' ).as( 'option-leave' );

		// https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Commands-Are-Asynchronous
		// we need to wrap in then blocks because we need to wait for the cypress commands to finish
		cy.get( elementName )
			.then( ( $wrapped ) => {
				const element = $wrapped[ 0 ];

				element.controller.focusFirst();
				expect( element.controller.focused ).to.eql( element.controller.queried[ 0 ] );

				cy.get( '@option-accept' ).should( 'have.class', 'is-focused' );
				cy.get( '@option-change' ).should( 'not.have.class', 'is-focused' );
				cy.get( '@option-leave' ).should( 'not.have.class', 'is-focused' );

				return cy.wrap( $wrapped );
			} )
			.then( ( $wrapped ) => {
				const element = $wrapped[ 0 ];

				element.controller.focusNext();
				expect( element.controller.focused ).to.eql( element.controller.queried[ 1 ] );

				cy.get( '@option-accept' ).should( 'not.have.class', 'is-focused' );
				cy.get( '@option-change' ).should( 'have.class', 'is-focused' );
				cy.get( '@option-leave' ).should( 'not.have.class', 'is-focused' );

				return cy.wrap( $wrapped );
			} )
			.then( ( $wrapped ) => {
				const element = $wrapped[ 0 ];

				element.controller.focusNext();
				expect( element.controller.focused ).to.eql( element.controller.queried[ 2 ] );

				cy.get( '@option-accept' ).should( 'not.have.class', 'is-focused' );
				cy.get( '@option-change' ).should( 'not.have.class', 'is-focused' );
				cy.get( '@option-leave' ).should( 'have.class', 'is-focused' );

				return cy.wrap( $wrapped );
			} )
			.then( ( $wrapped ) => {
				const element = $wrapped[ 0 ];

				// returns to the first option
				element.controller.focusNext();
				expect( element.controller.focused ).to.eql( element.controller.queried[ 0 ] );

				cy.get( '@option-accept' ).should( 'have.class', 'is-focused' );
				cy.get( '@option-change' ).should( 'not.have.class', 'is-focused' );
				cy.get( '@option-leave' ).should( 'not.have.class', 'is-focused' );
			} );

		cy.get( elementName )
			.then( ( $wrapped ) => {
				const element = $wrapped[ 0 ];

				element.controller.focusLast();
				expect( element.controller.focused ).to.eql( element.controller.queried[ 2 ] );

				cy.get( '@option-accept' ).should( 'not.have.class', 'is-focused' );
				cy.get( '@option-change' ).should( 'not.have.class', 'is-focused' );
				cy.get( '@option-leave' ).should( 'have.class', 'is-focused' );

				return cy.wrap( $wrapped );
			} )
			.then( ( $wrapped ) => {
				const element = $wrapped[ 0 ];

				element.controller.focusPrevious();
				expect( element.controller.focused ).to.eql( element.controller.queried[ 1 ] );

				cy.get( '@option-accept' ).should( 'not.have.class', 'is-focused' );
				cy.get( '@option-change' ).should( 'have.class', 'is-focused' );
				cy.get( '@option-leave' ).should( 'not.have.class', 'is-focused' );

				return cy.wrap( $wrapped );
			} )
			.then( ( $wrapped ) => {
				const element = $wrapped[ 0 ];

				element.controller.focusPrevious();
				expect( element.controller.focused ).to.eql( element.controller.queried[ 0 ] );

				cy.get( '@option-accept' ).should( 'have.class', 'is-focused' );
				cy.get( '@option-change' ).should( 'not.have.class', 'is-focused' );
				cy.get( '@option-leave' ).should( 'not.have.class', 'is-focused' );

				return cy.wrap( $wrapped );
			} )
			.then( ( $wrapped ) => {
				const element = $wrapped[ 0 ];

				// returns to the last option
				element.controller.focusPrevious();
				expect( element.controller.focused ).to.eql( element.controller.queried[ 2 ] );

				cy.get( '@option-accept' ).should( 'not.have.class', 'is-focused' );
				cy.get( '@option-change' ).should( 'not.have.class', 'is-focused' );
				cy.get( '@option-leave' ).should( 'have.class', 'is-focused' );
			} );

		cy.get( elementName ).then( ( $wrapped ) => {
			const element = $wrapped[ 0 ];

			expect( element.controller.focused ).not.to.be.null;
			element.controller.clear();
			expect( element.controller.focused ).to.be.null;
		} );

		//.focus(where)
		cy.get( elementName ).then( ( $wrapped ) => {
			const element = $wrapped[ 0 ];

			// focus by element
			element.controller.focus( element.controller.queried[ 1 ] );
			expect( element.controller.focused ).to.eql( element.controller.queried[ 1 ] );

			// focus by direction
			element.controller.focus( 'first' );
			expect( element.controller.focused ).to.eql( element.controller.queried[ 0 ] );

			element.controller.focus( 'next' );
			expect( element.controller.focused ).to.eql( element.controller.queried[ 1 ] );

			element.controller.focus( 'last' );
			expect( element.controller.focused ).to.eql( element.controller.queried[ 2 ] );

			element.controller.focus( 'previous' );
			expect( element.controller.focused ).to.eql( element.controller.queried[ 1 ] );

			// focus by index
			element.controller.focus( 0 );
			expect( element.controller.focused ).to.eql( element.controller.queried[ 0 ] );
		} );
	} );

	it( 'should search & focus correctly when searchable=true', () => {
		const [ tag, elementName ] = defineTestElement( () => ( {
			query: '[role="option"]',
			searchable: true,
		} ) );

		cy.mount(
			html`
				<${ tag } tabindex="0">
					<xb-option data-cy="accept">Accept</xb-option>
					<xb-option data-cy="change">Change</xb-option>
					<xb-option data-cy="leave">Leave</xb-option>
                    <div class="intruder">Intruder</div>
				</${ tag }>
			`
		);

		cy.get( elementName ).type( 'leav' );

		cy.get( elementName ).then( ( $wrapped ) => {
			const element = $wrapped[ 0 ];

			expect( element.controller.focused ).to.eql( element.controller.queried[ 2 ] );
		} );

		// waiting for the search buffer to be cleard
		cy.wait( SEARCH_BUFFER_TIMEOUT );

		cy.get( elementName ).type( 'acc' );

		cy.get( elementName ).then( ( $wrapped ) => {
			const element = $wrapped[ 0 ];

			expect( element.controller.focused ).to.eql( element.controller.queried[ 0 ] );
		} );
	} );

	it( 'should NOT search & focus when searchable=false', () => {
		const [ tag, elementName ] = defineTestElement( () => ( {
			query: '[role="option"]',
			searchable: false,
		} ) );

		cy.mount(
			html`
				<${ tag } tabindex="0">
					<xb-option data-cy="accept">Accept</xb-option>
					<xb-option data-cy="change">Change</xb-option>
					<xb-option data-cy="leave">Leave</xb-option>
                    <div class="intruder">Intruder</div>
				</${ tag }>
			`
		);

		cy.get( elementName ).type( 'leav' );

		cy.get( elementName ).then( ( $wrapped ) => {
			const element = $wrapped[ 0 ];

			expect( element.controller.focused ).to.eql( null );
		} );
	} );
} );

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('./focus-manager.controller').FocusManagerControllerHost} FocusManagerControllerHost
 * @typedef {import('./focus-manager.controller').FocusManagerControllerOptions} FocusManagerControllerOptions
 */
