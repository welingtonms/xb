import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { html, render } from 'lit';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';

import { generateElementName, waitForUpgrade } from '../../utils/test-tools';
import { XBElement } from '../../components/xb-element';
import { QueryController } from './query.controller.js';
import { isFocusable, isHidden, isNotHidden } from './predicates.js';

/**
 * @param {import('./query.controller.js').QueryControllerOptions} options
 */
const defineTestElement = ( options ) => {
	class TestComponent extends XBElement {
		/** @type {QueryController} */
		query;

		constructor() {
			super();

			this.query = new QueryController( this, options );
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

describe( 'predicates', () => {
	it( 'isFocusable excludes disabled elements', () => {
		const enabled = document.createElement( 'div' );
		const disabled = document.createElement( 'div' );
		disabled.setAttribute( 'disabled', '' );

		expect( isFocusable( enabled ) ).toBe( true );
		expect( isFocusable( disabled ) ).toBe( false );
	} );

	it( 'isHidden and isNotHidden reflect the hidden attribute', () => {
		const visible = document.createElement( 'div' );
		const hidden = document.createElement( 'div' );
		hidden.setAttribute( 'hidden', '' );

		expect( isHidden( visible ) ).toBe( false );
		expect( isHidden( hidden ) ).toBe( true );
		expect( isNotHidden( visible ) ).toBe( true );
		expect( isNotHidden( hidden ) ).toBe( false );
	} );
} );

describe( 'QueryController', () => {
	it( 'returns all members regardless of disabled or hidden state', async () => {
		const [ tag, elementName ] = defineTestElement( { query: '[role="option"]' } );

		await mount(
			staticHtml`
				<${ tag }>
					<div role="option" id="a">A</div>
					<div role="option" id="b" disabled>B</div>
					<div role="option" id="c" hidden>C</div>
				</${ tag }>
			`
		);

		/** @type {HTMLElement & { query: QueryController }} */
		const host = container.querySelector( elementName );

		expect( host.query.members ).toHaveLength( 3 );
	} );

	it( 'filter with isFocusable and isNotHidden excludes disabled and hidden members', async () => {
		const [ tag, elementName ] = defineTestElement( { query: '[role="option"]' } );

		await mount(
			staticHtml`
				<${ tag }>
					<div role="option" id="a">A</div>
					<div role="option" id="b" disabled>B</div>
					<div role="option" id="c" hidden>C</div>
				</${ tag }>
			`
		);

		/** @type {HTMLElement & { query: QueryController }} */
		const host = container.querySelector( elementName );

		const focusable = host.query.filter( isFocusable, isNotHidden );

		expect( focusable ).toHaveLength( 1 );
		expect( focusable[ 0 ].id ).toBe( 'a' );
	} );

	it( 'filter accepts multiple predicates', async () => {
		const members = [
			document.createElement( 'div' ),
			document.createElement( 'div' ),
		];

		const [ tag, elementName ] = defineTestElement( {
			getMembers: () => members,
		} );

		await mount( staticHtml`<${ tag }></${ tag }>` );

		/** @type {HTMLElement & { query: QueryController }} */
		const host = container.querySelector( elementName );

		members[ 0 ].id = 'visible';
		members[ 1 ].setAttribute( 'hidden', '' );

		expect( host.query.filter( isNotHidden ) ).toHaveLength( 1 );
		expect( host.query.filter( isFocusable, isNotHidden ) ).toHaveLength( 1 );
	} );
} );
