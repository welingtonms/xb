import { expect, waitFor } from 'storybook/test';

import { queryShadow, waitForUpgrade } from '../../../utils/test-tools.js';

/**
 * @param {HTMLElement} canvasElement
 * @param {{ optionCount?: number, selector?: string }} [options]
 */
export async function getSelectParts( canvasElement, options = {} ) {
	const { optionCount = 3, selector = 'xb-select' } = options;
	const select = canvasElement.querySelector( selector );
	await waitForUpgrade( select );

	await waitFor( async () => {
		await expect( queryShadow( select, 'input#trigger' ) ).toBeTruthy();
		await expect( queryShadow( select, '#menu' ) ).toBeTruthy();
		await expect( select.querySelectorAll( 'xb-option' ).length ).toBe( optionCount );
	} );

	for ( const option of select.querySelectorAll( 'xb-option' ) ) {
		await waitForUpgrade( option );
	}

	return {
		select,
		searchInput: queryShadow( select, 'input#trigger' ),
		handleButton: queryShadow( select, '#handle' ),
		menu: queryShadow( select, '#menu' ),
	};
}

/**
 * @param {HTMLElement} canvasElement
 * @param {string} value
 * @param {string} [selector='xb-select']
 */
export function getOption( canvasElement, value, selector = 'xb-select' ) {
	const select = canvasElement.querySelector( selector );

	return (
		Array.from( select?.querySelectorAll( 'xb-option' ) ?? [] ).find(
			( option ) => option.value === value
		) ?? null
	);
}

/**
 * @param {import('./select').Select} select
 * @param {boolean} open
 */
export async function expectSelectOpen( select, open ) {
	await waitFor( async () => {
		await expect( select.open ).toBe( open );
	} );
}
