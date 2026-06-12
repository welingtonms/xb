import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { html, render } from 'lit';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';

import { generateElementName, pressKey, waitForUpgrade } from '../../utils/test-tools';
import { XBElement } from '../../components/xb-element';
import { RovingFocusController } from './roving-focus.controller';

/**
 * @param {(host: RovingFocusControllerHost) => RovingFocusControllerOptions} getControllerConfig
 */
const defineTestElement = ( getControllerConfig ) => {
	class TestComponent extends XBElement {
		/** @type {RovingFocusController} */
		controller;

		constructor() {
			super();

			this.controller = new RovingFocusController( this, getControllerConfig( this ) );
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

describe( 'RovingFocusController', () => {
	it( 'should query focusable elements and exclude disabled items', async () => {
		const [ tag, elementName ] = defineTestElement( () => ( {
			query: '[data-item]',
		} ) );

		await mount(
			staticHtml`
				<${ tag } tabindex="0">
					<button data-item="accept">Accept</button>
					<button data-item="change" disabled>Change</button>
					<button data-item="leave">Leave</button>
					<div class="intruder">Intruder</div>
				</${ tag }>
			`
		);

		const element = container.querySelector( elementName );
		const accept = container.querySelector( '[data-item="accept"]' );
		const leave = container.querySelector( '[data-item="leave"]' );

		expect( element.controller.queried ).toHaveLength( 2 );
		expect( element.controller.queried[ 0 ] ).toEqual( accept );
		expect( element.controller.queried[ 1 ] ).toEqual( leave );
		expect( element.controller.focused ).toBeNull();
	} );

	it( 'should initialize roving tabindex on the first item', async () => {
		const [ tag, elementName ] = defineTestElement( () => ( {
			query: '[data-item]',
		} ) );

		await mount(
			staticHtml`
				<${ tag } tabindex="0">
					<button data-item="accept">Accept</button>
					<button data-item="change">Change</button>
					<button data-item="leave">Leave</button>
				</${ tag }>
			`
		);

		const element = container.querySelector( elementName );
		const accept = container.querySelector( '[data-item="accept"]' );
		const change = container.querySelector( '[data-item="change"]' );
		const leave = container.querySelector( '[data-item="leave"]' );

		element.controller.initialize();

		expect( accept.tabIndex ).toBe( 0 );
		expect( change.tabIndex ).toBe( -1 );
		expect( leave.tabIndex ).toBe( -1 );
		expect( accept.classList.contains( 'is-focused' ) ).toBe( false );
	} );

	it( 'should move actual focus and roving tabindex', async () => {
		const [ tag, elementName ] = defineTestElement( () => ( {
			query: '[data-item]',
		} ) );

		await mount(
			staticHtml`
				<${ tag } tabindex="0">
					<button data-item="accept">Accept</button>
					<button data-item="change">Change</button>
					<button data-item="leave">Leave</button>
				</${ tag }>
			`
		);

		const element = container.querySelector( elementName );
		const accept = container.querySelector( '[data-item="accept"]' );
		const change = container.querySelector( '[data-item="change"]' );
		const leave = container.querySelector( '[data-item="leave"]' );

		element.controller.initialize();
		element.controller.focusFirst();

		expect( element.controller.focused ).toEqual( accept );
		expect( document.activeElement ).toEqual( accept );
		expect( accept.tabIndex ).toBe( 0 );
		expect( change.tabIndex ).toBe( -1 );
		expect( leave.tabIndex ).toBe( -1 );

		element.controller.focusNext();
		expect( element.controller.focused ).toEqual( change );
		expect( document.activeElement ).toEqual( change );
		expect( accept.tabIndex ).toBe( -1 );
		expect( change.tabIndex ).toBe( 0 );
		expect( change.classList.contains( 'is-focused' ) ).toBe( true );
		expect( accept.classList.contains( 'is-focused' ) ).toBe( false );

		element.controller.focusNext();
		expect( element.controller.focused ).toEqual( leave );

		element.controller.focusNext();
		expect( element.controller.focused ).toEqual( accept );

		element.controller.focusLast();
		expect( element.controller.focused ).toEqual( leave );

		element.controller.focusPrevious();
		expect( element.controller.focused ).toEqual( change );

		element.controller.focus( 0 );
		expect( element.controller.focused ).toEqual( accept );

		element.controller.focus( 'last' );
		expect( element.controller.focused ).toEqual( leave );
	} );

	it( 'should clear focus and re-initialize tabindex', async () => {
		const [ tag, elementName ] = defineTestElement( () => ( {
			query: '[data-item]',
		} ) );

		await mount(
			staticHtml`
				<${ tag } tabindex="0">
					<button data-item="accept">Accept</button>
					<button data-item="change">Change</button>
					<button data-item="leave">Leave</button>
				</${ tag }>
			`
		);

		const element = container.querySelector( elementName );
		const accept = container.querySelector( '[data-item="accept"]' );

		element.controller.initialize();
		element.controller.focus( 'next' );

		expect( element.controller.focused ).not.toBeNull();

		element.controller.clear();

		expect( element.controller.focused ).toBeNull();
		expect( accept.tabIndex ).toBe( 0 );
		expect( accept.classList.contains( 'is-focused' ) ).toBe( false );
	} );

	it( 'should return focus to the host when requested', async () => {
		const [ tag, elementName ] = defineTestElement( () => ( {
			query: '[data-item]',
		} ) );

		await mount(
			staticHtml`
				<${ tag } tabindex="0">
					<button data-item="accept">Accept</button>
					<button data-item="change">Change</button>
				</${ tag }>
			`
		);

		const element = container.querySelector( elementName );

		element.controller.initialize();
		element.controller.focusFirst();
		element.controller.clear( { returnFocusToHost: true } );

		expect( element.controller.focused ).toBeNull();
		expect( document.activeElement ).toEqual( element );
	} );

	it( 'should navigate with arrow and home/end keys when searchable=true', async () => {
		const [ tag, elementName ] = defineTestElement( () => ( {
			query: '[data-item]',
			searchable: true,
		} ) );

		await mount(
			staticHtml`
				<${ tag } tabindex="0">
					<button data-item="accept">Accept</button>
					<button data-item="change">Change</button>
					<button data-item="leave">Leave</button>
				</${ tag }>
			`
		);

		const element = container.querySelector( elementName );
		const accept = container.querySelector( '[data-item="accept"]' );
		const change = container.querySelector( '[data-item="change"]' );
		const leave = container.querySelector( '[data-item="leave"]' );

		element.controller.initialize();
		element.focus();
		element.controller.focusFirst();

		pressKey( element, 'ArrowDown' );
		expect( element.controller.focused ).toEqual( change );

		pressKey( element, 'ArrowDown' );
		expect( element.controller.focused ).toEqual( leave );

		pressKey( element, 'ArrowUp' );
		expect( element.controller.focused ).toEqual( change );

		pressKey( element, 'Home' );
		expect( element.controller.focused ).toEqual( accept );

		pressKey( element, 'End' );
		expect( element.controller.focused ).toEqual( leave );
	} );

	it( 'should not attach arrow key navigation when searchable=false', async () => {
		const [ tag, elementName ] = defineTestElement( () => ( {
			query: '[data-item]',
			searchable: false,
		} ) );

		await mount(
			staticHtml`
				<${ tag } tabindex="0">
					<button data-item="accept">Accept</button>
					<button data-item="change">Change</button>
					<button data-item="leave">Leave</button>
				</${ tag }>
			`
		);

		const element = container.querySelector( elementName );
		const accept = container.querySelector( '[data-item="accept"]' );

		element.controller.initialize();
		element.focus();
		element.controller.focusFirst();

		pressKey( element, 'ArrowDown' );

		expect( element.controller.focused ).toEqual( accept );
	} );
} );

/**
 * @typedef {import('./roving-focus.controller').RovingFocusControllerHost} RovingFocusControllerHost
 * @typedef {import('./roving-focus.controller').RovingFocusControllerOptions} RovingFocusControllerOptions
 */
