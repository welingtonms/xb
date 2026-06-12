import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { html, render } from 'lit';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';

import { generateElementName, pressKey, waitForUpgrade } from '../../utils/test-tools';
import { XBElement } from '../../components/xb-element';
import { FocusManagerController } from './focus-manager.controller';
import { TypeAheadPlugin, SEARCH_BUFFER_TIMEOUT } from './type-ahead.plugin';

import '../../components/form/select/select.define';

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

			if ( config.searchable !== false ) {
				this.controller.use( new TypeAheadPlugin() );
			}
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

	await customElements.whenDefined( 'xb-option' );

	for ( const option of container.querySelectorAll( 'xb-option' ) ) {
		await waitForUpgrade( option );
	}
}

describe( 'FocusManagerController', () => {
	it( 'should initialize correctly', async () => {
		const [ tag, elementName ] = defineTestElement( () => ( {
			query: '[role="option"]',
		} ) );

		await mount(
			staticHtml`
				<${ tag } tabindex="0">
					<xb-option data-cy="accept">Accept</xb-option>
					<xb-option data-cy="change">Change</xb-option>
					<xb-option data-cy="leave">Leave</xb-option>
					<div class="intruder">Intruder</div>
				</${ tag }>
			`
		);

		const element = container.querySelector( elementName );

		const optionAccept = container.querySelector( 'xb-option[data-cy="accept"]' );
		const optionChange = container.querySelector( 'xb-option[data-cy="change"]' );
		const optionLeave = container.querySelector( 'xb-option[data-cy="leave"]' );

		expect( element.controller.queried ).toHaveLength( 3 );
		expect( element.controller.queried[ 0 ] ).toEqual( optionAccept );
		expect( element.controller.queried[ 1 ] ).toEqual( optionChange );
		expect( element.controller.queried[ 2 ] ).toEqual( optionLeave );
		expect( element.controller.focused ).toBeNull();
	} );

	it( 'should visually focus queried elements correctly', async () => {
		const [ tag, elementName ] = defineTestElement( () => ( {
			query: '[role="option"]',
		} ) );

		await mount(
			staticHtml`
				<${ tag } tabindex="0">
					<xb-option data-cy="accept">Accept</xb-option>
					<xb-option data-cy="change">Change</xb-option>
					<xb-option data-cy="leave">Leave</xb-option>
					<div class="intruder">Intruder</div>
				</${ tag }>
			`
		);

		const element = container.querySelector( elementName );

		const optionAccept = container.querySelector( 'xb-option[data-cy="accept"]' );
		const optionChange = container.querySelector( 'xb-option[data-cy="change"]' );
		const optionLeave = container.querySelector( 'xb-option[data-cy="leave"]' );

		element.controller.focusFirst();
		expect( element.controller.focused ).toEqual( element.controller.queried[ 0 ] );
		expect( optionAccept.classList.contains( 'is-focused' ) ).toBe( true );
		expect( optionChange.classList.contains( 'is-focused' ) ).toBe( false );
		expect( optionLeave.classList.contains( 'is-focused' ) ).toBe( false );

		element.controller.focusNext();
		expect( element.controller.focused ).toEqual( element.controller.queried[ 1 ] );
		expect( optionAccept.classList.contains( 'is-focused' ) ).toBe( false );
		expect( optionChange.classList.contains( 'is-focused' ) ).toBe( true );
		expect( optionLeave.classList.contains( 'is-focused' ) ).toBe( false );

		element.controller.focusNext();
		expect( element.controller.focused ).toEqual( element.controller.queried[ 2 ] );
		expect( optionAccept.classList.contains( 'is-focused' ) ).toBe( false );
		expect( optionChange.classList.contains( 'is-focused' ) ).toBe( false );
		expect( optionLeave.classList.contains( 'is-focused' ) ).toBe( true );

		element.controller.focusNext();
		expect( element.controller.focused ).toEqual( element.controller.queried[ 0 ] );
		expect( optionAccept.classList.contains( 'is-focused' ) ).toBe( true );
		expect( optionChange.classList.contains( 'is-focused' ) ).toBe( false );
		expect( optionLeave.classList.contains( 'is-focused' ) ).toBe( false );

		element.controller.focusLast();
		expect( element.controller.focused ).toEqual( element.controller.queried[ 2 ] );
		expect( optionAccept.classList.contains( 'is-focused' ) ).toBe( false );
		expect( optionChange.classList.contains( 'is-focused' ) ).toBe( false );
		expect( optionLeave.classList.contains( 'is-focused' ) ).toBe( true );

		element.controller.focusPrevious();
		expect( element.controller.focused ).toEqual( element.controller.queried[ 1 ] );
		expect( optionAccept.classList.contains( 'is-focused' ) ).toBe( false );
		expect( optionChange.classList.contains( 'is-focused' ) ).toBe( true );
		expect( optionLeave.classList.contains( 'is-focused' ) ).toBe( false );

		element.controller.focusPrevious();
		expect( element.controller.focused ).toEqual( element.controller.queried[ 0 ] );
		expect( optionAccept.classList.contains( 'is-focused' ) ).toBe( true );
		expect( optionChange.classList.contains( 'is-focused' ) ).toBe( false );
		expect( optionLeave.classList.contains( 'is-focused' ) ).toBe( false );

		element.controller.focusPrevious();
		expect( element.controller.focused ).toEqual( element.controller.queried[ 2 ] );
		expect( optionAccept.classList.contains( 'is-focused' ) ).toBe( false );
		expect( optionChange.classList.contains( 'is-focused' ) ).toBe( false );
		expect( optionLeave.classList.contains( 'is-focused' ) ).toBe( true );

		expect( element.controller.focused ).not.toBeNull();
		element.controller.clear();
		expect( element.controller.focused ).toBeNull();

		element.controller.focus( element.controller.queried[ 1 ] );
		expect( element.controller.focused ).toEqual( element.controller.queried[ 1 ] );

		element.controller.focus( 'first' );
		expect( element.controller.focused ).toEqual( element.controller.queried[ 0 ] );

		element.controller.focus( 'next' );
		expect( element.controller.focused ).toEqual( element.controller.queried[ 1 ] );

		element.controller.focus( 'last' );
		expect( element.controller.focused ).toEqual( element.controller.queried[ 2 ] );

		element.controller.focus( 'previous' );
		expect( element.controller.focused ).toEqual( element.controller.queried[ 1 ] );

		element.controller.focus( 0 );
		expect( element.controller.focused ).toEqual( element.controller.queried[ 0 ] );
	} );

	it( 'should search & focus correctly when searchable=true', async () => {
		const [ tag, elementName ] = defineTestElement( () => ( {
			query: '[role="option"]',
			searchable: true,
		} ) );

		await mount(
			staticHtml`
				<${ tag } tabindex="0">
					<xb-option data-cy="accept">Accept</xb-option>
					<xb-option data-cy="change">Change</xb-option>
					<xb-option data-cy="leave">Leave</xb-option>
					<div class="intruder">Intruder</div>
				</${ tag }>
			`
		);

		const element = container.querySelector( elementName );

		element.focus();
		element.controller.focusFirst();
		for ( const char of 'leav' ) {
			pressKey( element, char );
		}

		expect( element.controller.focused ).toEqual( element.controller.queried[ 2 ] );

		await new Promise( ( resolve ) => {
			setTimeout( resolve, SEARCH_BUFFER_TIMEOUT + 50 );
		} );

		for ( const char of 'acc' ) {
			pressKey( element, char );
		}

		expect( element.controller.focused ).toEqual( element.controller.queried[ 0 ] );
	} );

	it( 'should NOT search & focus when searchable=false', async () => {
		const [ tag, elementName ] = defineTestElement( () => ( {
			query: '[role="option"]',
			searchable: false,
		} ) );

		await mount(
			staticHtml`
				<${ tag } tabindex="0">
					<xb-option data-cy="accept">Accept</xb-option>
					<xb-option data-cy="change">Change</xb-option>
					<xb-option data-cy="leave">Leave</xb-option>
					<div class="intruder">Intruder</div>
				</${ tag }>
			`
		);

		const element = container.querySelector( elementName );

		element.focus();
		for ( const char of 'leav' ) {
			pressKey( element, char );
		}

		expect( element.controller.focused ).toBeNull();
	} );
} );

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('./focus-manager.controller').FocusManagerControllerHost} FocusManagerControllerHost
 * @typedef {import('./focus-manager.controller').FocusManagerControllerOptions & { searchable?: boolean }} FocusManagerControllerOptions
 */
