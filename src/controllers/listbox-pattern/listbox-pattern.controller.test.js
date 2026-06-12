import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { html, render } from 'lit';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';

import { generateElementName, pressKey, waitForUpgrade } from '../../utils/test-tools';
import { XBElement } from '../../components/xb-element';
import ListboxPatternController from '../listbox-pattern/listbox-pattern.controller.js';

/**
 * @param {import('../listbox-pattern/listbox-pattern.controller.js').ListboxPatternControllerOptions} [options]
 */
const defineTestElement = ( options ) => {
	class TestComponent extends XBElement {
		/** @type {ListboxPatternController} */
		pattern;

		constructor() {
			super();

			this.pattern = new ListboxPatternController( this, options );
		}

		getRawValue = () => {
			return [];
		};

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

describe( 'ListboxPatternController', () => {
	it( 'selects the focused option on Space keydown', async () => {
		const [ tag, elementName ] = defineTestElement( {
			getSelectionType: () => 'single',
		} );

		render(
			staticHtml`
				<${ tag } tabindex="0">
					<div role="option" id="item-accept" value="accept">Accept</div>
					<div role="option" id="item-change" value="change">Change</div>
				</${ tag }>
			`,
			container
		);

		/** @type {HTMLElement & { pattern: ListboxPatternController }} */
		const host = container.querySelector( elementName );

		await waitForUpgrade( host );

		host.focus();
		pressKey( host, ' ' );

		expect( host.pattern.selection.has( 'accept' ) ).toBe( true );
	} );
} );
