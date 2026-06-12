import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { html, render } from 'lit';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';
import { userEvent } from 'storybook/test';

import { generateElementName, queryShadow, waitForUpgrade } from '../../utils/test-tools';
import { XBElement } from '../../components/xb-element';
import { BoundaryController } from './boundary.controller';

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
	}
}

describe( 'BoundaryController', () => {
	it( 'initializes inactive correctly', async () => {
		const [ tag, elementName ] = defineTestElement( () => false );

		const onInteractIn = vi.fn();
		const onInteractOut = vi.fn();

		await mount(
			staticHtml`
				<${ tag }
					tabindex="0"
					style="background: lightgray; display: block; width: 100px; height: 100px;"
					@interact-in=${ ( event ) => onInteractIn( event ) }
					@interact-out=${ ( event ) => onInteractOut( event ) }
				></${ tag }>
				<button type="button">Click Outside</button>
			`
		);

		const element = container.querySelector( elementName );
		const btnInside = queryShadow( element, 'button' );
		const btnOutside = container.querySelector( 'button' );

		await userEvent.click( btnInside );
		expect( onInteractIn ).not.toHaveBeenCalled();

		await userEvent.click( btnOutside );
		expect( onInteractOut ).not.toHaveBeenCalled();
	} );

	it( 'reacts to click when active', async () => {
		const [ tag, elementName ] = defineTestElement( () => true );

		const onInteractIn = vi.fn();
		const onInteractOut = vi.fn();

		await mount(
			staticHtml`
				<${ tag }
					tabindex="0"
					style="background: lightgray; display: block; width: 100px; height: 100px;"
					@interact-in=${ ( event ) => onInteractIn( event ) }
					@interact-out=${ ( event ) => onInteractOut( event ) }
				></${ tag }>
				<button type="button">Click Outside</button>
			`
		);

		const element = container.querySelector( elementName );
		const btnInside = queryShadow( element, 'button' );
		const btnOutside = container.querySelector( 'button' );

		await userEvent.click( btnInside );
		expect( onInteractIn ).not.toHaveBeenCalled();

		await userEvent.click( btnOutside );
		expect( onInteractOut ).toHaveBeenCalled();
		expect( onInteractIn ).not.toHaveBeenCalled();
	} );

	it( 'reacts to key press when active', async () => {
		const [ tag, elementName ] = defineTestElement( () => true );

		const onInteractIn = vi.fn();
		const onInteractOut = vi.fn();

		await mount(
			staticHtml`
				<${ tag }
					tabindex="0"
					style="background: lightgray; display: block; width: 100px; height: 100px;"
					@interact-in=${ ( event ) => onInteractIn( event ) }
					@interact-out=${ ( event ) => onInteractOut( event ) }
				></${ tag }>
				<button type="button">Click Outside</button>
			`
		);

		const element = container.querySelector( elementName );
		const btnInside = queryShadow( element, 'button' );
		const btnOutside = container.querySelector( 'button' );

		await userEvent.click( btnInside );
		await userEvent.keyboard( '{Enter}' );
		expect( onInteractIn ).not.toHaveBeenCalled();

		await userEvent.click( btnOutside );
		await userEvent.keyboard( '{Enter}' );
		expect( onInteractOut ).toHaveBeenCalled();
	} );

	it( 'reacts to blur when active', async () => {
		const [ tag, elementName ] = defineTestElement( () => true );

		const onInteractIn = vi.fn();
		const onInteractOut = vi.fn();

		await mount(
			staticHtml`
				<${ tag }
					tabindex="0"
					style="background: lightgray; display: block; width: 100px; height: 100px;"
					@interact-in=${ ( event ) => onInteractIn( event ) }
					@interact-out=${ ( event ) => onInteractOut( event ) }
				></${ tag }>
				<button type="button">Click Outside</button>
			`
		);

		const element = container.querySelector( elementName );
		const btnInside = queryShadow( element, 'button' );
		const btnOutside = container.querySelector( 'button' );

		await userEvent.click( btnInside );
		expect( onInteractIn ).not.toHaveBeenCalled();

		btnOutside.focus();
		expect( onInteractOut ).toHaveBeenCalled();
	} );
} );

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('./boundary.controller').BoundaryControllerHost} BoundaryControllerHost
 */
