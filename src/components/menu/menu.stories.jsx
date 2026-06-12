import React from 'react';

import { userEvent, expect, fn } from 'storybook/test';

import toCSSValue from '../../utils/to-css-value';
import { within, pressKey } from '../../utils/test-tools.js';

import '../layout/layout.define';
import '../icon/icon.define';
import './menu.define';

export default {
	title: 'Components/Menu',
	parameters: {
		layout: 'padded',
	},
	argTypes: {
		loading: {
			control: 'boolean',
		},
		click: {
			action: 'clicked',
			table: {
				disable: true,
			},
		},
	},
};

/**
 * @param {Element | null} menu
 * @returns {string | undefined}
 */
function getFocusedItemText( menu ) {
	return menu?.querySelector( '.is-focused' )?.textContent?.trim();
}

/**
 * @param {EventTarget} target
 * @param {string} text
 */
function typeKeys( target, text ) {
	for ( const char of text ) {
		pressKey( target, char );
	}
}

export const Playground = {
	args: {
		size: 'small',
		click: fn(),
	},
	render: ( args ) => {
		return (
			<xb-stack>
				<xb-menu aria-label="Life choices" loading={ args.loading } size={ args.size } onclick={ args.click }>
					<xb-item>Accept</xb-item>
					<xb-item selected>Change</xb-item>
					<xb-item>Leave</xb-item>
				</xb-menu>
				<xb-menu aria-label="Life choices" loading={ args.loading } size={ args.size } onclick={ args.click }>
					<xb-item icon="check">Accept</xb-item>
					<xb-item icon="arrows-clockwise">Change</xb-item>
					<xb-item icon="sign-out">Leave</xb-item>
				</xb-menu>
				<xb-menu aria-label="Life choices" loading={ args.loading } size={ args.size } onclick={ args.click }>
					<xb-item>
						<xb-icon name="circle-fill" size={ 8 } color={ toCSSValue( 'color-success-500' ) }></xb-icon>
						Accept
					</xb-item>
					<xb-item>
						<xb-icon name="circle-fill" size={ 8 } color={ toCSSValue( 'color-warning-500' ) }></xb-icon>
						Change
					</xb-item>
					<xb-item>
						<xb-icon name="circle-fill" size={ 8 } color={ toCSSValue( 'color-error-500' ) }></xb-icon>
						Leave
					</xb-item>
				</xb-menu>
			</xb-stack>
		);
	},
};

export const TestRendersMenus = {
	name: 'Test: Renders menus',
	tags: [ '!autodocs' ],
	args: {
		size: 'small',
	},
	render: ( args ) => (
		<xb-menu aria-label="Life choices" size={ args.size }>
			<xb-item>Accept</xb-item>
			<xb-item>Change</xb-item>
			<xb-item>Leave</xb-item>
		</xb-menu>
	),
	play: async ( { canvasElement } ) => {
		const canvas = within( canvasElement );
		await expect( canvas.getByRole( 'menu' ) ).toBeInTheDocument();
	},
};

export const RendersCorrectly = {
	name: 'Test: Renders correctly',
	tags: [ '!autodocs' ],
	args: {
		onItemClick: fn(),
	},
	render: ( args ) => (
		<xb-menu>
			<xb-item id="item-accept">Accept</xb-item>
			<xb-item id="item-change" onclick={ args.onItemClick }>Change</xb-item>
			<xb-item id="item-leave">Leave</xb-item>
		</xb-menu>
	),
	play: async ( { canvasElement, args, step } ) => {
		const menu = canvasElement.querySelector( 'xb-menu' );

		await step( 'menu has correct role and tabindex', async () => {
			await expect( menu ).toHaveAttribute( 'role', 'menu' );
			await expect( menu ).toHaveAttribute( 'tabindex', '0' );
			await expect( menu ).not.toHaveAttribute( 'aria-activedescendant' );
		} );

		await step( 'items have menuitem role', async () => {
			const accept = canvasElement.querySelector( 'xb-item#item-accept' );
			const change = canvasElement.querySelector( 'xb-item#item-change' );
			const leave = canvasElement.querySelector( 'xb-item#item-leave' );

			await expect( accept ).toHaveAttribute( 'role', 'menuitem' );
			await expect( accept ).toHaveAttribute( 'tabindex', '-1' );
			await expect( change ).toHaveAttribute( 'role', 'menuitem' );
			await expect( change ).toHaveAttribute( 'tabindex', '-1' );
			await expect( leave ).toHaveAttribute( 'role', 'menuitem' );
			await expect( leave ).toHaveAttribute( 'tabindex', '-1' );
		} );

		await step( 'clicking an item triggers handler', async () => {
			await userEvent.click( canvasElement.querySelector( 'xb-item#item-change' ) );
			await expect( args.onItemClick ).toHaveBeenCalled();
		} );
	},
};

export const KeyboardNavigation = {
	name: 'Test: Keyboard navigation',
	tags: [ '!autodocs' ],
	render: () => (
		<xb-menu>
			<xb-item id="item-accept">Accept</xb-item>
			<xb-item id="item-change">Change</xb-item>
			<xb-item id="item-leave">Leave</xb-item>
		</xb-menu>
	),
	play: async ( { canvasElement, step } ) => {
		const menu = canvasElement.querySelector( 'xb-menu' );

		await step( 'focus activates first item', async () => {
			menu.focus();
			await expect( menu ).toHaveAttribute( 'aria-activedescendant', 'item-accept' );
			await expect( getFocusedItemText( menu ) ).toBe( 'Accept' );
		} );

		await step( 'ArrowDown cycles through items', async () => {
			pressKey( menu, 'ArrowDown' );
			await expect( menu ).toHaveAttribute( 'aria-activedescendant', 'item-change' );
			await expect( getFocusedItemText( menu ) ).toBe( 'Change' );

			pressKey( menu, 'ArrowDown' );
			await expect( menu ).toHaveAttribute( 'aria-activedescendant', 'item-leave' );
			await expect( getFocusedItemText( menu ) ).toBe( 'Leave' );

			pressKey( menu, 'ArrowDown' );
			await expect( menu ).toHaveAttribute( 'aria-activedescendant', 'item-accept' );
		} );

		await step( 'ArrowUp cycles backward', async () => {
			pressKey( menu, 'ArrowUp' );
			await expect( menu ).toHaveAttribute( 'aria-activedescendant', 'item-leave' );
			await expect( getFocusedItemText( menu ) ).toBe( 'Leave' );

			pressKey( menu, 'ArrowUp' );
			await expect( menu ).toHaveAttribute( 'aria-activedescendant', 'item-change' );
			await expect( getFocusedItemText( menu ) ).toBe( 'Change' );

			pressKey( menu, 'ArrowUp' );
			await expect( menu ).toHaveAttribute( 'aria-activedescendant', 'item-accept' );
			await expect( getFocusedItemText( menu ) ).toBe( 'Accept' );
		} );
	},
};

export const TypeaheadFocus = {
	name: 'Test: Typeahead focus',
	tags: [ '!autodocs' ],
	render: () => (
		<xb-menu>
			<xb-item id="item-accept">Accept</xb-item>
			<xb-item id="item-change">Change</xb-item>
			<xb-item id="item-leave">Leave</xb-item>
		</xb-menu>
	),
	play: async ( { canvasElement, step } ) => {
		const menu = canvasElement.querySelector( 'xb-menu' );

		await step( 'focus activates first item', async () => {
			menu.focus();
			await expect( menu ).toHaveAttribute( 'aria-activedescendant', 'item-accept' );
			await expect( getFocusedItemText( menu ) ).toBe( 'Accept' );
		} );

		await step( 'typed search focuses matching item', async () => {
			typeKeys( menu, 'leav' );
			await expect( menu ).toHaveAttribute( 'aria-activedescendant', 'item-leave' );
			await expect( getFocusedItemText( menu ) ).toBe( 'Leave' );
		} );
	},
};

/**
 * @typedef {import('./menu').Menu} Menu
 * @typedef {import('@storybook/web-components').StoryObj<Menu>} MenuStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
