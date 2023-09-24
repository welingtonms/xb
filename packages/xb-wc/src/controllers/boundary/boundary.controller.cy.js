import { html, unsafeStatic } from 'lit/static-html.js';
import { ReactiveControllerHost } from '@lit/reactive-element';

import { generateElementName } from '../../utils/test-tools';
import XBElement from '../../common/xb-element';
import BoundaryController from './boundary.controller';

/**
 * @param {(host: BoundaryControllerHost) => BoundaryControllerOptions} getControllerConfig
 */
const defineTestElement = ( getControllerConfig ) => {
	class TestComponent extends XBElement {
		/** @type {BoundaryController} */
		controller;

		constructor() {
			super();

			const config = getControllerConfig( this );
			this.controller = new BoundaryController( this, config );
		}

		render() {
			return html`
				<div>
					<button type="button">Click Inside</button>
				</div>
			`;
		}
	}

	const elementName = generateElementName();
	customElements.define( elementName, TestComponent );

	return [ unsafeStatic( elementName ), elementName ];
};

describe( 'BoundaryController', () => {
	it( 'initializes inactive correctly', () => {
		const [ tag, elementName ] = defineTestElement( () => false );

		const onInteractIn = cy.stub().as( 'onInteractIn' );
		const onInteractOut = cy.stub().as( 'onInteractOut' );

		cy.mount(
			html`
				<${ tag }
					tabindex="0"
					style="background: lightgray; display: block; width: 100px; height: 100px;"
					@xb:interact-in=${ ( event ) => onInteractIn( event ) }
					@xb:interact-out=${ ( event ) => onInteractOut( event ) }
				></${ tag }>
                <button type="button">Click Outside</button>
			`
		);

		cy.get( elementName ).as( 'element' );
		cy.get( '@element' ).find( 'button', { includeShadowDom: true } ).as( 'btn-inside' );
		cy.get( 'button' ).as( 'btn-outside' );

		cy.get( '@btn-inside' ).click();
		cy.get( '@onInteractIn' ).should( 'not.have.been.called' );

		cy.get( '@btn-outside' ).click();
		cy.get( '@onInteractOut' ).should( 'not.have.been.called' );
	} );

	it( 'reacts to click when active', () => {
		const [ tag, elementName ] = defineTestElement( () => true );

		const onInteractIn = cy.stub().as( 'onInteractIn' );
		const onInteractOut = cy.stub().as( 'onInteractOut' );

		cy.mount(
			html`
				<${ tag }
					tabindex="0"
					style="background: lightgray; display: block; width: 100px; height: 100px;"
					@xb:interact-in=${ ( event ) => onInteractIn( event ) }
					@xb:interact-out=${ ( event ) => onInteractOut( event ) }
				></${ tag }>
                <button type="button">Click Outside</button>
			`
		);

		cy.get( elementName ).as( 'element' );
		cy.get( '@element' ).find( 'button', { includeShadowDom: true } ).as( 'btn-inside' );
		cy.get( 'button' ).as( 'btn-outside' );

		cy.get( '@btn-inside' ).click();
		cy.get( '@onInteractIn' ).should( 'have.been.called' );

		cy.get( '@btn-outside' ).click();
		cy.get( '@onInteractOut' ).should( 'have.been.called' );
	} );

	it( 'reacts to key press when active', () => {
		const [ tag, elementName ] = defineTestElement( () => true );

		const onInteractIn = cy.stub().as( 'onInteractIn' );
		const onInteractOut = cy.stub().as( 'onInteractOut' );

		cy.mount(
			html`
				<${ tag }
					tabindex="0"
					style="background: lightgray; display: block; width: 100px; height: 100px;"
					@xb:interact-in=${ ( event ) => onInteractIn( event ) }
					@xb:interact-out=${ ( event ) => onInteractOut( event ) }
				></${ tag }>
                <button type="button">Click Outside</button>
			`
		);

		cy.get( elementName ).as( 'element' );
		cy.get( '@element' ).find( 'button', { includeShadowDom: true } ).as( 'btn-inside' );
		cy.get( 'button' ).as( 'btn-outside' );

		cy.get( '@btn-inside' ).type( '{Enter}' );
		cy.get( '@onInteractIn' ).should( 'have.been.called' );

		cy.get( '@btn-outside' ).type( '{Enter}' );
		cy.get( '@onInteractOut' ).should( 'have.been.called' );
	} );

	it.only( 'reacts to blur when active', () => {
		const [ tag, elementName ] = defineTestElement( () => true );

		const onInteractIn = cy.stub().as( 'onInteractIn' );
		const onInteractOut = cy.stub().as( 'onInteractOut' );

		cy.mount(
			html`
				<${ tag }
				tabindex="0"
				style="background: lightgray; display: block; width: 100px; height: 100px;"
				@xb:interact-in=${ ( event ) => onInteractIn( event ) }
				@xb:interact-out=${ ( event ) => onInteractOut( event ) }
				></${ tag }>
				<button type="button">Click Outside</button>
			`
		);

		cy.get( elementName ).as( 'element' );
		cy.get( '@element' ).find( 'button', { includeShadowDom: true } ).as( 'btn-inside' );
		cy.get( 'button' ).as( 'btn-outside' );

		cy.get( '@btn-inside' ).click();
		cy.get( '@onInteractIn' ).should( 'have.been.called' );

		cy.get( 'body' ).tab().tab();
		// cy.get( '@btn-outside' ).click;
		cy.get( '@onInteractOut' ).should( 'have.been.called' );
	} );
} );

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('./boundary.controller').BoundaryControllerHost} BoundaryControllerHost
 */
