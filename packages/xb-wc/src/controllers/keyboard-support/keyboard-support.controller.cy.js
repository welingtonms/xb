import { html, unsafeStatic } from 'lit/static-html.js';
import { ReactiveControllerHost } from '@lit/reactive-element';

import { generateElementName } from '../../utils/test-tools';
import XBElement from '../../common/xb-element';
import KeyboardSupportController from './keyboard-support.controller';

/**
 * @param {(host: KeyboardSupportControllerHost) => KeyboardSupportControllerOptions} getControllerConfig
 */
const defineTestElement = ( getControllerConfig ) => {
	class TestComponent extends XBElement {
		/** @type {KeyboardSupportController} */
		controller;

		constructor() {
			super();

			const config = getControllerConfig( this );
			this.controller = new KeyboardSupportController( this, config );
		}

		render() {
			return html`
				<output></output>
			`;
		}
	}

	const elementName = generateElementName();
	customElements.define( elementName, TestComponent );

	return [ unsafeStatic( elementName ), elementName ];
};

describe( 'KeyboardSupportController', () => {
	it( 'should support a single shortcut', () => {
		const [ tag, elementName ] = defineTestElement( ( host ) => ( {
			shortcut: {
				key: 'ArrowDown',
			},
			handler: () => {
				const output = host.renderRoot.querySelector( 'output' );
				output.innerHTML = 'Pressed ArrowDown';
			},
		} ) );

		cy.mount(
			html`
				<${ tag } tabindex="0" style="background: lightgray; display: block; width: 100px; height: 100px;"></${ tag }>
			`
		);

		cy.get( elementName ).as( 'element' );
		cy.get( '@element' ).find( 'output', { includeShadowDom: true } ).as( 'output' );

		cy.get( '@element' ).type( '{upArrow}' );
		cy.get( '@output' ).should( 'have.text', '' );
		cy.get( '@element' ).type( '{downArrow}' );
		cy.get( '@output' ).should( 'have.text', 'Pressed ArrowDown' );
	} );

	it( 'should support multiple shortcuts', () => {
		const [ tag, elementName ] = defineTestElement( ( host ) => [
			{
				shortcut: {
					key: 'ArrowUp',
				},
				handler: () => {
					const output = host.renderRoot.querySelector( 'output' );
					output.innerHTML = 'Pressed ArrowUp';
				},
			},
			{
				shortcut: {
					key: 'B',
					alt: true,
					shift: true,
				},
				handler: () => {
					const output = host.renderRoot.querySelector( 'output' );
					output.innerHTML = 'Pressed something weird';
				},
			},
		] );

		cy.mount(
			html`
				<${ tag } tabindex="0" style="background: lightgray; display: block; width: 100px; height: 100px;"></${ tag }>
			`
		);

		cy.get( elementName ).as( 'element' );
		cy.get( '@element' ).find( 'output', { includeShadowDom: true } ).as( 'output' );

		cy.get( '@element' ).type( '{downArrow}' );
		cy.get( '@output' ).should( 'have.text', '' );
		cy.get( '@element' ).type( '{upArrow}' );
		cy.get( '@output' ).should( 'have.text', 'Pressed ArrowUp' );
		cy.get( '@element' ).type( '{shift+alt+b}' );
		cy.get( '@output' ).should( 'have.text', 'Pressed something weird' );
	} );

	it( 'should support multiple shortcuts for the same handler', () => {
		const [ tag, elementName ] = defineTestElement( ( host ) => [
			{
				shortcut: [
					{
						key: 'ArrowUp',
					},
					{ key: 'ArrowRight' },
				],
				handler: () => {
					const output = host.renderRoot.querySelector( 'output' );
					output.innerHTML = 'Moving forward';
				},
			},
			{
				shortcut: {
					key: 'ArrowDown',
				},
				handler: () => {
					const output = host.renderRoot.querySelector( 'output' );
					output.innerHTML = '';
				},
			},
		] );

		cy.mount(
			html`
				<${ tag } tabindex="0" style="background: lightgray; display: block; width: 100px; height: 100px;"></${ tag }>
			`
		);

		cy.get( elementName ).as( 'element' );
		cy.get( '@element' ).find( 'output', { includeShadowDom: true } ).as( 'output' );

		cy.get( '@element' ).type( '{upArrow}' );
		cy.get( '@output' ).should( 'have.text', 'Moving forward' );
		cy.get( '@element' ).type( '{downArrow}' );
		cy.get( '@output' ).should( 'have.text', '' );
		cy.get( '@element' ).type( '{rightArrow}' );
		cy.get( '@output' ).should( 'have.text', 'Moving forward' );
	} );
} );

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('./keyboard-support.controller').KeyboardSupportControllerHost} KeyboardSupportControllerHost
 * @typedef {import('./keyboard-support.controller').KeyboardSupportControllerOptions} KeyboardSupportControllerOptions
 */
