import { html, unsafeStatic } from 'lit/static-html.js';
import { ReactiveControllerHost } from '@lit/reactive-element';

import { generateElementName } from '../../utils/test-tools';
import XBElement from '../../common/xb-element';
import KeyboardSupportController from './keyboard-support.controller';

/**
 * @param {(host: KeyboardSupportControllerHost) => [Keymap | Keymap[], KeyboardSupportControllerOptions | null]} getControllerConfig
 */
const defineTestElement = ( getControllerConfig ) => {
	class TestComponent extends XBElement {
		/** @type {KeyboardSupportController} */
		controller;

		constructor() {
			super();

			const config = getControllerConfig( this );
			this.controller = new KeyboardSupportController( this, ...config );
		}

		render() {
			return html`
				<output></output>
				<slot></slot>
			`;
		}
	}

	const elementName = generateElementName();
	customElements.define( elementName, TestComponent );

	return [ unsafeStatic( elementName ), elementName ];
};

describe( 'KeyboardSupportController', () => {
	it( 'should support a single shortcut', () => {
		const [ tag, elementName ] = defineTestElement( ( host ) => [
			{
				shortcut: {
					key: 'ArrowDown',
				},
				handler: () => {
					const output = host.renderRoot.querySelector( 'output' );
					output.innerHTML = 'Pressed ArrowDown';
				},
			},
			null,
		] );

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
			[
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
			],
			null,
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
			[
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
			],
			null,
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

	it( "should support specifing the listener's event target", () => {
		const [ tag, elementName ] = defineTestElement( ( host ) => [
			{
				shortcut: {
					key: 'ArrowDown',
				},
				handler: () => {
					const output = host.renderRoot.querySelector( 'output' );
					output.innerHTML = 'Pressed ArrowDown';
				},
			},
			{
				getEventTarget: ( host ) => {
					console.log( host.querySelector( 'div' ) );
					return host.querySelector( 'div' );
				},
			},
		] );

		cy.mount(
			html`
				<${ tag } tabindex="0" style="background: lightgray; display: block;">
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at lacinia sem. Donec porta tortor ut tellus faucibus, ut dapibus leo eleifend. Pellentesque non eros eu quam venenatis posuere. Aliquam erat arcu, posuere ut odio nec, viverra scelerisque nisi. In fermentum, dui ac fermentum tempor, mauris mi laoreet sem, a blandit risus risus at tellus.
					</p>

					<div tabindex="0" style="background: green; display: block; width: 100px; height: 100px;">
						Let's move the action to this element.
					</div>
				</${ tag }>
			`
		);

		cy.get( elementName ).as( 'element' );
		cy.get( '@element' ).find( 'output', { includeShadowDom: true } ).as( 'output' );
		cy.get( '@element' ).find( 'div' ).as( 'event-target' );

		cy.get( '@element' ).type( '{downArrow}' );
		cy.get( '@output' ).should( 'have.text', '' );
		cy.get( '@event-target' ).type( '{downArrow}' );
		cy.get( '@output' ).should( 'have.text', 'Pressed ArrowDown' );
	} );
} );

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('./keyboard-support.controller').KeyboardSupportControllerHost} KeyboardSupportControllerHost
 * @typedef {import('./keyboard-support.controller').KeyboardSupportControllerOptions} KeyboardSupportControllerOptions
 */
