import { within as genericWithin } from 'storybook/test';

const A11Y_ROLE_EQUIVALENCE = {
	'xb-radio': 'radio',
	'xb-checkbox': 'checkbox',
	'xb-button': 'button',
	'xb-input': 'input',
	'xb-tooltip': 'tooltip',
	'xb-switch': 'switch',
	'xb-toggle-group': 'radiogroup',
};

/**
 * Wait until a custom element is defined and has finished its initial render.
 * @param {Element | null} element
 * @returns {Promise<Element>}
 */
export async function waitForUpgrade( element, { timeout = 5000 } = {} ) {
	if ( ! element ) {
		throw new Error( 'waitForUpgrade: element is required' );
	}

	await customElements.whenDefined( element.localName );

	const deadline = Date.now() + timeout;

	while ( Date.now() < deadline ) {
		if ( 'updateComplete' in element ) {
			await element.updateComplete;
		}

		if ( ! element.localName.includes( '-' ) || element.shadowRoot ) {
			return element;
		}

		await new Promise( ( resolve ) => {
			setTimeout( resolve, 50 );
		} );
	}

	throw new Error( `Timed out waiting for ${ element.localName } to upgrade` );
}

/**
 * Query elements inside an open or closed shadow root.
 * @param {Element | Document | ShadowRoot} root
 * @param {string} selector
 * @returns {Element | null}
 */
export function queryShadow( root, selector ) {
	if ( ! root ) {
		return null;
	}

	const direct = root.querySelector?.( selector );
	if ( direct ) {
		return direct;
	}

	if ( root.shadowRoot ) {
		const match = queryShadow( root.shadowRoot, selector );
		if ( match ) {
			return match;
		}
	}

	const hosts = root.querySelectorAll?.( '*' ) ?? [];

	for ( const host of hosts ) {
		if ( host.shadowRoot ) {
			const match = queryShadow( host.shadowRoot, selector );
			if ( match ) {
				return match;
			}
		}
	}

	return null;
}

/**
 * Query all elements matching a selector across shadow boundaries.
 * @param {Element | Document | ShadowRoot} root
 * @param {string} selector
 * @returns {Element[]}
 */
export function queryShadowAll( root, selector ) {
	/** @type {Element[]} */
	const results = [];

	if ( ! root ) {
		return results;
	}

	root.querySelectorAll?.( selector ).forEach( ( element ) => {
		results.push( element );
	} );

	const hosts = root.querySelectorAll?.( '*' ) ?? [];

	for ( const host of hosts ) {
		if ( host.shadowRoot ) {
			results.push( ...queryShadowAll( host.shadowRoot, selector ) );
		}
	}

	return results;
}

/**
 * Dispatch keyboard events on a specific element (virtual focus menus).
 * @param {EventTarget} target
 * @param {string} key
 * @param {KeyboardEventInit} [options]
 */
export function pressKey( target, key, options = {} ) {
	const eventInit = {
		key,
		code: key,
		bubbles: true,
		cancelable: true,
		...options,
	};

	target.dispatchEvent( new KeyboardEvent( 'keydown', eventInit ) );
	target.dispatchEvent( new KeyboardEvent( 'keyup', eventInit ) );
}

/**
 * Workaround for Testing Library shadow DOM / form-associated element gaps.
 * @param {HTMLElement} root
 */
export function within( root ) {
	for ( const key in A11Y_ROLE_EQUIVALENCE ) {
		const role = A11Y_ROLE_EQUIVALENCE[ key ];
		root.querySelectorAll( key ).forEach( ( element ) => {
			if ( key === 'xb-toggle-group' ) {
				const type = element.getAttribute( 'type' ) ?? element.type ?? 'single';
				element.setAttribute(
					'role',
					type === 'multiple' ? 'group' : 'radiogroup'
				);
				return;
			}

			element.setAttribute( 'role', role );
		} );
	}

	root.querySelectorAll( 'xb-toggle' ).forEach( ( element ) => {
		const group = element.closest( 'xb-toggle-group' );
		const type = group?.getAttribute( 'type' ) ?? group?.type ?? 'single';
		const role = type === 'multiple' ? 'checkbox' : 'radio';
		element.setAttribute( 'role', role );
	} );

	return genericWithin( root );
}

let count = 0;

export function generateElementName() {
	return `x-element-${ count++ }`;
}

/**
 * Mount a Lit template into the document body for controller browser tests.
 * @param {import('lit').TemplateResult} template
 * @returns {HTMLElement}
 */
export function mountLitTemplate( template ) {
	const container = document.createElement( 'div' );
	document.body.appendChild( container );

	import( 'lit' ).then( ( { render } ) => {
		render( template, container );
	} );

	return container;
}

/**
 * Render a Lit template synchronously using lit-html render.
 * Prefer this in async test setup after importing render from lit.
 * @param {import('lit').TemplateResult} template
 * @param {HTMLElement} [container]
 * @returns {HTMLElement}
 */
export function createMountContainer( template, container = document.createElement( 'div' ) ) {
	document.body.appendChild( container );
	return container;
}
