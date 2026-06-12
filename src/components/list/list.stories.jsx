import React from 'react';

import { userEvent, expect, fn } from 'storybook/test';

import { within, pressKey } from '../../utils/test-tools.js';
import { isFocusable, isNotHidden } from '../../controllers/query';

import '../layout/layout.define';
import './list.define';

export default {
	title: 'Components/List',
	parameters: {
		layout: 'padded',
	},
	argTypes: {
		type: {
			control: 'select',
			options: [ 'single', 'multiple' ],
		},
	},
};

/**
 * @param {Element | null} list
 * @returns {string | undefined}
 */
function getFocusedItemText( list ) {
	return list?.querySelector( '.is-focused' )?.textContent?.trim();
}

export const Playground = {
	args: {
		type: 'single',
	},
	render: ( args ) => {
		return (
			<xb-list type={ args.type } aria-label="Life choices">
				<xb-list-item value="accept">Accept</xb-list-item>
				<xb-list-item value="change" selected>
					Change
				</xb-list-item>
				<xb-list-item value="leave">Leave</xb-list-item>
			</xb-list>
		);
	},
};

export const TestRendersList = {
	name: 'Test: Renders list',
	tags: [ '!autodocs' ],
	render: () => (
		<xb-list aria-label="Life choices">
			<xb-list-item value="accept">Accept</xb-list-item>
			<xb-list-item value="change">Change</xb-list-item>
			<xb-list-item value="leave">Leave</xb-list-item>
		</xb-list>
	),
	play: async ( { canvasElement } ) => {
		const canvas = within( canvasElement );
		await expect( canvas.getByRole( 'listbox' ) ).toBeInTheDocument();
	},
};

export const RendersCorrectly = {
	name: 'Test: Renders correctly',
	tags: [ '!autodocs' ],
	render: () => (
		<xb-list aria-label="Life choices">
			<xb-list-item id="item-accept" value="accept">
				Accept
			</xb-list-item>
			<xb-list-item id="item-change" value="change">
				Change
			</xb-list-item>
			<xb-list-item id="item-leave" value="leave">
				Leave
			</xb-list-item>
		</xb-list>
	),
	play: async ( { canvasElement, step } ) => {
		const list = canvasElement.querySelector( 'xb-list' );

		await step( 'list has correct role and tabindex', async () => {
			await expect( list ).toHaveAttribute( 'role', 'listbox' );
			await expect( list ).toHaveAttribute( 'tabindex', '0' );
			await expect( list ).not.toHaveAttribute( 'aria-activedescendant' );
		} );

		await step( 'items have option role', async () => {
			const accept = canvasElement.querySelector( 'xb-list-item#item-accept' );
			const change = canvasElement.querySelector( 'xb-list-item#item-change' );
			const leave = canvasElement.querySelector( 'xb-list-item#item-leave' );

			await expect( accept ).toHaveAttribute( 'role', 'option' );
			await expect( accept ).toHaveAttribute( 'tabindex', '-1' );
			await expect( change ).toHaveAttribute( 'role', 'option' );
			await expect( leave ).toHaveAttribute( 'role', 'option' );
		} );

		await step( 'clicking an item selects it', async () => {
			await userEvent.click( canvasElement.querySelector( 'xb-list-item#item-change' ) );
			await expect( list ).toHaveAttribute( 'value', 'change' );
			await expect( canvasElement.querySelector( 'xb-list-item#item-change' ) ).toHaveAttribute(
				'selected'
			);
		} );
	},
};

export const KeyboardNavigation = {
	name: 'Test: Keyboard navigation',
	tags: [ '!autodocs' ],
	render: () => (
		<xb-list aria-label="Life choices">
			<xb-list-item id="item-accept" value="accept">
				Accept
			</xb-list-item>
			<xb-list-item id="item-change" value="change">
				Change
			</xb-list-item>
			<xb-list-item id="item-leave" value="leave">
				Leave
			</xb-list-item>
		</xb-list>
	),
	play: async ( { canvasElement, step } ) => {
		const list = canvasElement.querySelector( 'xb-list' );

		await step( 'focus activates first item', async () => {
			list.focus();
			await expect( list ).toHaveAttribute( 'aria-activedescendant', 'item-accept' );
			await expect( getFocusedItemText( list ) ).toBe( 'Accept' );
		} );

		await step( 'ArrowDown cycles through items', async () => {
			pressKey( list, 'ArrowDown' );
			await expect( list ).toHaveAttribute( 'aria-activedescendant', 'item-change' );
			await expect( getFocusedItemText( list ) ).toBe( 'Change' );

			pressKey( list, 'ArrowDown' );
			await expect( list ).toHaveAttribute( 'aria-activedescendant', 'item-leave' );
			await expect( getFocusedItemText( list ) ).toBe( 'Leave' );

			pressKey( list, 'ArrowDown' );
			await expect( list ).toHaveAttribute( 'aria-activedescendant', 'item-accept' );
		} );
	},
};

export const QueryMembership = {
	name: 'Test: Query membership vs focusable',
	tags: [ '!autodocs' ],
	render: () => (
		<xb-list aria-label="Filtered list">
			<xb-list-item id="item-visible" value="visible">
				Visible
			</xb-list-item>
			<xb-list-item id="item-disabled" value="disabled" disabled>
				Disabled
			</xb-list-item>
			<xb-list-item id="item-hidden" value="hidden" hidden>
				Hidden
			</xb-list-item>
		</xb-list>
	),
	play: async ( { canvasElement, step } ) => {
		const list = canvasElement.querySelector( 'xb-list' );

		await step( 'members include hidden and disabled options', async () => {
			await customElements.whenDefined( 'xb-list' );
			await expect( list.query.members ).toHaveLength( 3 );
		} );

		await step( 'focusable excludes hidden and disabled options', async () => {
			const focusable = list.query.filter( isFocusable, isNotHidden );

			await expect( focusable ).toHaveLength( 1 );
			await expect( focusable[ 0 ].id ).toBe( 'item-visible' );
		} );
	},
};

/**
 * @typedef {import('./list').List} List
 * @typedef {import('@storybook/web-components').StoryObj<List>} ListStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
