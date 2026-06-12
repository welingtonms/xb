import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { html, render } from 'lit';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';

import { generateElementName, pressKey, queryShadow, waitForUpgrade } from '../../utils/test-tools';
import { XBElement } from '../../components/xb-element';
import { KeyboardSupportController } from './keyboard-support.controller';

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

let container;

beforeEach( () => {
	container = document.createElement( 'div' );
	document.body.appendChild( container );
} );

afterEach( () => {
	container?.remove();
} );

/**
 * @param {import('lit').TemplateResult} template
 */
async function mount( template ) {
	render( template, container );

	const host = container.firstElementChild;

	if ( host ) {
		await waitForUpgrade( host );
		host.controller.activate();
	}
}

describe( 'KeyboardSupportController', () => {
	it( 'should support a single shortcut', async () => {
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

		await mount(
			staticHtml`
				<${ tag } tabindex="0" style="background: lightgray; display: block; width: 100px; height: 100px;"></${ tag }>
			`
		);

		const element = container.querySelector( elementName );
		const output = queryShadow( element, 'output' );

		element.focus();
		pressKey( element, 'ArrowUp' );
		expect( output.textContent ).toBe( '' );

		pressKey( element, 'ArrowDown' );
		expect( output.textContent ).toBe( 'Pressed ArrowDown' );
	} );

	it( 'should support multiple shortcuts', async () => {
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

		await mount(
			staticHtml`
				<${ tag } tabindex="0" style="background: lightgray; display: block; width: 100px; height: 100px;"></${ tag }>
			`
		);

		const element = container.querySelector( elementName );
		const output = queryShadow( element, 'output' );

		element.focus();
		pressKey( element, 'ArrowDown' );
		expect( output.textContent ).toBe( '' );

		pressKey( element, 'ArrowUp' );
		expect( output.textContent ).toBe( 'Pressed ArrowUp' );

		pressKey( element, 'b', { altKey: true, shiftKey: true } );
		expect( output.textContent ).toBe( 'Pressed something weird' );
	} );

	it( 'should support multiple shortcuts for the same handler', async () => {
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

		await mount(
			staticHtml`
				<${ tag } tabindex="0" style="background: lightgray; display: block; width: 100px; height: 100px;"></${ tag }>
			`
		);

		const element = container.querySelector( elementName );
		const output = queryShadow( element, 'output' );

		element.focus();
		pressKey( element, 'ArrowUp' );
		expect( output.textContent ).toBe( 'Moving forward' );

		pressKey( element, 'ArrowDown' );
		expect( output.textContent ).toBe( '' );

		pressKey( element, 'ArrowRight' );
		expect( output.textContent ).toBe( 'Moving forward' );
	} );

	it( "should support specifing the listener's event target", async () => {
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
				getControllerTarget: ( host ) => {
					return host.querySelector( 'div' );
				},
			},
		] );

		await mount(
			staticHtml`
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

		const element = container.querySelector( elementName );
		const output = queryShadow( element, 'output' );
		const eventTarget = element.querySelector( 'div' );

		element.focus();
		pressKey( element, 'ArrowDown' );
		expect( output.textContent ).toBe( '' );

		eventTarget.focus();
		pressKey( eventTarget, 'ArrowDown' );
		expect( output.textContent ).toBe( 'Pressed ArrowDown' );
	} );
} );

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('./keyboard-support.controller').KeyboardSupportControllerHost} KeyboardSupportControllerHost
 * @typedef {import('./keyboard-support.controller').KeyboardSupportControllerOptions} KeyboardSupportControllerOptions
 */
