import React from 'react';

import { userEvent, expect, fn, waitFor } from 'storybook/test';

import { PlacementArg, SizeArg } from '../../utils/arg-types';
import { within, pressKey } from '../../utils/test-tools.js';

import '../layout/layout.define';
import '../button/button.define';
import '../separator/separator.define';
import '../icon/icon.define';
import './dropdown.define';

/** @type {import('../../utils/arg-types').Meta} */
export default {
	title: 'Components/Dropdown',
	parameters: {
		layout: 'padded',
	},
	argTypes: {
		placement: PlacementArg,
		click: {
			action: true,
			table: {
				disable: true,
			},
		},
		disabled: {
			control: 'boolean',
		},
		responsive: {
			control: 'boolean',
		},
		size: SizeArg,
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

/**
 * @param {Element | null} trigger
 */
async function expectDropdownOpen( trigger ) {
	await waitFor( () => expect( trigger ).toHaveAttribute( 'aria-expanded', 'true' ) );
}

/**
 * @param {Element | null} trigger
 */
async function expectDropdownClosed( trigger ) {
	await waitFor( () => expect( trigger ).not.toHaveAttribute( 'aria-expanded' ) );
}

/** @type {import('../../utils/arg-types').StoryObj} */
export const Playground = {
	render: ( args ) => (
		<xb-cluster>
			<xb-dropdown placement={ args.placement } responsive={ args.responsive }>
				<xb-dropdown-trigger disabled={ args.disabled } size={ args.size }>
					Actions
				</xb-dropdown-trigger>

				<xb-dropdown-menu>
					<xb-dropdown-item onclick={ args.click }>View profile</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click }>Settings</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click }>Keyboard shortcuts</xb-dropdown-item>
					<xb-separator />
					<xb-dropdown-item onclick={ args.click }>Company profile</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click }>Teams</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click }>Invite colleagues</xb-dropdown-item>
					<xb-separator />
					<xb-dropdown-item onclick={ args.click }>Changelog</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click }>Slack community</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click }>Support</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click }>API</xb-dropdown-item>
					<xb-separator />
					<xb-dropdown-item onclick={ args.click }>Logout</xb-dropdown-item>
				</xb-dropdown-menu>
			</xb-dropdown>

			<xb-dropdown placement={ args.placement } responsive={ args.responsive }>
				<xb-dropdown-trigger disabled={ args.disabled } size={ args.size }>
					Actions
				</xb-dropdown-trigger>

				<xb-dropdown-menu>
					<xb-dropdown-item onclick={ args.click } icon="user">
						View profile
					</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click } icon="gear">
						Settings
					</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click } icon="keyboard">
						Keyboard shortcuts
					</xb-dropdown-item>
					<xb-separator />
					<xb-dropdown-item onclick={ args.click } icon="building">
						Company profile
					</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click } icon="users">
						Teams
					</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click } icon="user-plus">
						Invite colleagues
					</xb-dropdown-item>
					<xb-separator />
					<xb-dropdown-item onclick={ args.click } icon="stack-simple">
						Changelog
					</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click } icon="slack-logo">
						Slack community
					</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click } icon="question">
						Support
					</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click } icon="code">
						API
					</xb-dropdown-item>
					<xb-separator />
					<xb-dropdown-item onclick={ args.click } icon="sign-out">
						Logout
					</xb-dropdown-item>
				</xb-dropdown-menu>
			</xb-dropdown>

			<xb-dropdown placement={ args.placement } responsive={ args.responsive }>
				<xb-button
					variant="icon"
					aria-haspopup="true"
					aria-label="Life Actions"
					disabled={ args.disabled }
					size={ args.size }
				>
					<xb-icon name="dots-three-vertical" size={ 16 }></xb-icon>
				</xb-button>

				<xb-dropdown-menu>
					<xb-dropdown-item onclick={ args.click }>Accept</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click }>Change</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click }>Leave</xb-dropdown-item>
				</xb-dropdown-menu>
			</xb-dropdown>
		</xb-cluster>
	),

	args: {
		placement: 'bottom-start',
		responsive: true,
	},
};

export const TestOpenMenu = {
	name: 'Test: Open menu',
	tags: [ '!autodocs' ],
	args: {
		placement: 'bottom-start',
		responsive: true,
	},
	render: ( args ) => (
		<xb-dropdown placement={ args.placement } responsive={ args.responsive }>
			<xb-dropdown-trigger>Actions</xb-dropdown-trigger>
			<xb-dropdown-menu>
				<xb-dropdown-item>Accept</xb-dropdown-item>
				<xb-dropdown-item>Change</xb-dropdown-item>
				<xb-dropdown-item>Leave</xb-dropdown-item>
			</xb-dropdown-menu>
		</xb-dropdown>
	),
	play: async ( { canvasElement } ) => {
		const canvas = within( canvasElement );
		const trigger = canvas.getByRole( 'button', { name: /actions/i } );

		await expect( trigger ).toBeInTheDocument();
		await userEvent.click( trigger );
		await expectDropdownOpen( trigger );
		await expect( canvas.getByRole( 'menu' ) ).toBeInTheDocument();
	},
};

export const ExpandCollapse = {
	name: 'Test: Expand collapse',
	tags: [ '!autodocs' ],
	render: () => (
		<xb-dropdown placement="bottom-start">
			<xb-dropdown-trigger id="trigger-actions">Actions</xb-dropdown-trigger>

			<xb-dropdown-menu id="actions-menu">
				<xb-dropdown-item id="item-accept">Accept</xb-dropdown-item>
				<xb-dropdown-item id="item-change">Change</xb-dropdown-item>
				<xb-dropdown-item id="item-leave">Leave</xb-dropdown-item>
			</xb-dropdown-menu>
		</xb-dropdown>
	),
	play: async ( { canvasElement, step } ) => {
		const trigger = canvasElement.querySelector( 'xb-dropdown-trigger' );
		const menu = canvasElement.querySelector( 'xb-dropdown-menu' );

		await step( 'renders with correct ARIA attributes', async () => {
			await expect( trigger ).toHaveAttribute( 'tabindex', '0' );
			await expect( trigger ).toHaveAttribute( 'aria-haspopup', 'true' );
			await expect( trigger ).toHaveAttribute( 'aria-controls', 'actions-menu' );
			await expect( trigger ).not.toHaveAttribute( 'aria-expanded' );

			await expectDropdownClosed( trigger );
			await expect( menu ).toHaveAttribute( 'role', 'menu' );
			await expect( menu ).toHaveAttribute( 'aria-labelledby', 'trigger-actions' );
			await expect( menu ).toHaveAttribute( 'tabindex', '-1' );
			await expect( menu ).not.toHaveAttribute( 'aria-activedescendant' );
		} );

		await step( 'expands on trigger click', async () => {
			await userEvent.click( trigger );
			await expectDropdownOpen( trigger );
			await expect( menu ).toHaveAttribute( 'aria-activedescendant', 'item-accept' );
		} );

		await step( 'collapses on second trigger click', async () => {
			await userEvent.click( trigger );
			await expectDropdownClosed( trigger );
			await expect( menu ).not.toHaveAttribute( 'aria-activedescendant' );
		} );
	},
};

export const OptionClickCollapses = {
	name: 'Test: Option click collapses',
	tags: [ '!autodocs' ],
	args: {
		onItemClick: fn(),
	},
	render: ( args ) => (
		<xb-dropdown placement="bottom-start">
			<xb-dropdown-trigger>Actions</xb-dropdown-trigger>

			<xb-dropdown-menu>
				<xb-dropdown-item>Accept</xb-dropdown-item>
				<xb-dropdown-item>Change</xb-dropdown-item>
				<xb-dropdown-item onclick={ args.onItemClick }>Leave</xb-dropdown-item>
			</xb-dropdown-menu>
		</xb-dropdown>
	),
	play: async ( { canvasElement, args, step } ) => {
		const trigger = canvasElement.querySelector( 'xb-dropdown-trigger' );
		const menu = canvasElement.querySelector( 'xb-dropdown-menu' );

		await step( 'opens the menu', async () => {
			await userEvent.click( trigger );
			await expectDropdownOpen( trigger );
		} );

		await step( 'selecting an item fires click and collapses', async () => {
			const leaveItem = canvasElement.querySelector( 'xb-dropdown-item:last-of-type' );
			await userEvent.click( leaveItem );
			await expect( args.onItemClick ).toHaveBeenCalled();
			await expectDropdownClosed( trigger );
		} );
	},
};

export const ExpandCollapseEvents = {
	name: 'Test: Expand collapse events',
	tags: [ '!autodocs' ],
	args: {
		onExpand: fn(),
		onCollapse: fn(),
	},
	render: ( args ) => (
		<xb-dropdown placement="bottom-start" onexpand={ args.onExpand } oncollapse={ args.onCollapse }>
			<xb-dropdown-trigger>Actions</xb-dropdown-trigger>

			<xb-dropdown-menu>
				<xb-dropdown-item>Accept</xb-dropdown-item>
				<xb-dropdown-item>Change</xb-dropdown-item>
				<xb-dropdown-item>Leave</xb-dropdown-item>
			</xb-dropdown-menu>
		</xb-dropdown>
	),
	play: async ( { canvasElement, args, step } ) => {
		/** @type {import('./dropdown').Dropdown} */
		const dropdown = canvasElement.querySelector( 'xb-dropdown' );

		await step( 'expand emits expand event', async () => {
			await dropdown.expand();
			await expect( args.onExpand ).toHaveBeenCalled();
		} );

		await step( 'collapse emits collapse event', async () => {
			await dropdown.collapse();
			await expect( args.onCollapse ).toHaveBeenCalled();
		} );
	},
};

export const KeyboardNavigation = {
	name: 'Test: Keyboard navigation',
	tags: [ '!autodocs' ],
	render: () => (
		<xb-dropdown>
			<xb-dropdown-trigger id="trigger-actions">Actions</xb-dropdown-trigger>

			<xb-dropdown-menu id="actions-menu">
				<xb-dropdown-item id="item-accept">Accept</xb-dropdown-item>
				<xb-dropdown-item id="item-change">Change</xb-dropdown-item>
				<xb-dropdown-item id="item-leave">Leave</xb-dropdown-item>
			</xb-dropdown-menu>
		</xb-dropdown>
	),
	play: async ( { canvasElement, step } ) => {
		const trigger = canvasElement.querySelector( 'xb-dropdown-trigger' );
		const menu = canvasElement.querySelector( 'xb-dropdown-menu' );

		await step( 'ArrowDown from trigger opens and focuses menu', async () => {
			await expectDropdownClosed( trigger );
			await expect( trigger ).toHaveAttribute( 'tabindex', '0' );
			trigger.focus();

			pressKey( trigger, 'ArrowDown' );

			await expectDropdownOpen( trigger );
			await waitFor( () => expect( menu ).toHaveFocus() );
			await expect( menu ).toHaveAttribute( 'aria-activedescendant', 'item-accept' );
			await expect( getFocusedItemText( menu ) ).toBe( 'Accept' );
		} );

		await step( 'ArrowDown cycles through items', async () => {
			pressKey( menu, 'ArrowDown' );
			await expect( getFocusedItemText( menu ) ).toBe( 'Change' );
			await expect( menu ).toHaveAttribute( 'aria-activedescendant', 'item-change' );

			pressKey( menu, 'ArrowDown' );
			await expect( getFocusedItemText( menu ) ).toBe( 'Leave' );
			await expect( menu ).toHaveAttribute( 'aria-activedescendant', 'item-leave' );

			pressKey( menu, 'ArrowDown' );
			await expect( menu ).toHaveAttribute( 'aria-activedescendant', 'item-accept' );
			await expect( getFocusedItemText( menu ) ).toBe( 'Accept' );
		} );

		await step( 'ArrowUp cycles backward', async () => {
			pressKey( menu, 'ArrowUp' );
			await expect( getFocusedItemText( menu ) ).toBe( 'Leave' );
			await expect( menu ).toHaveAttribute( 'aria-activedescendant', 'item-leave' );

			pressKey( menu, 'ArrowUp' );
			await expect( getFocusedItemText( menu ) ).toBe( 'Change' );
			await expect( menu ).toHaveAttribute( 'aria-activedescendant', 'item-change' );

			pressKey( menu, 'ArrowUp' );
			await expect( getFocusedItemText( menu ) ).toBe( 'Accept' );
			await expect( menu ).toHaveAttribute( 'aria-activedescendant', 'item-accept' );
		} );

		await step( 'Escape closes the menu', async () => {
			pressKey( menu, 'Escape' );
			await expectDropdownClosed( trigger );
			await expect( menu ).not.toHaveAttribute( 'aria-activedescendant' );
		} );
	},
};

export const TypeaheadFocus = {
	name: 'Test: Typeahead focus',
	tags: [ '!autodocs' ],
	render: () => (
		<xb-dropdown>
			<xb-dropdown-trigger id="trigger-actions">Actions</xb-dropdown-trigger>

			<xb-dropdown-menu id="actions-menu">
				<xb-dropdown-item id="item-accept">Accept</xb-dropdown-item>
				<xb-dropdown-item id="item-change">Change</xb-dropdown-item>
				<xb-dropdown-item id="item-leave">Leave</xb-dropdown-item>
			</xb-dropdown-menu>
		</xb-dropdown>
	),
	play: async ( { canvasElement, step } ) => {
		const trigger = canvasElement.querySelector( 'xb-dropdown-trigger' );
		const menu = canvasElement.querySelector( 'xb-dropdown-menu' );

		await step( 'opens with first item focused', async () => {
			await userEvent.click( trigger );
			await expectDropdownOpen( trigger );
			await expect( menu ).toHaveAttribute( 'aria-activedescendant', 'item-accept' );
			await expect( getFocusedItemText( menu ) ).toBe( 'Accept' );
		} );

		await step( 'typed search focuses matching item', async () => {
			typeKeys( menu, 'chan' );
			await expect( menu ).toHaveAttribute( 'aria-activedescendant', 'item-change' );
			await expect( getFocusedItemText( menu ) ).toBe( 'Change' );
		} );
	},
};

export const KeyboardSelect = {
	name: 'Test: Keyboard select',
	tags: [ '!autodocs' ],
	args: {
		onItemClick: fn(),
	},
	render: ( args ) => (
		<xb-dropdown>
			<xb-dropdown-trigger>Actions</xb-dropdown-trigger>
			<xb-dropdown-menu>
				<xb-dropdown-item onclick={ args.onItemClick }>Accept</xb-dropdown-item>
				<xb-dropdown-item>Change</xb-dropdown-item>
				<xb-dropdown-item>Leave</xb-dropdown-item>
			</xb-dropdown-menu>
		</xb-dropdown>
	),
	play: async ( { canvasElement, args, step } ) => {
		const trigger = canvasElement.querySelector( 'xb-dropdown-trigger' );
		const menu = canvasElement.querySelector( 'xb-dropdown-menu' );

		await step( 'Space selects the focused item', async () => {
			await expect( trigger ).toHaveAttribute( 'tabindex', '0' );
			trigger.focus();
			pressKey( trigger, 'ArrowDown' );
			await expectDropdownOpen( trigger );
			await waitFor( () => expect( menu.querySelector( '.is-focused' ) ).toBeTruthy() );

			pressKey( menu, ' ' );
			await expect( args.onItemClick ).toHaveBeenCalledOnce();
		} );

		await step( 'Space selects again after reopening', async () => {
			pressKey( trigger, 'ArrowDown' );
			await expectDropdownOpen( trigger );
			await waitFor( () => expect( menu.querySelector( '.is-focused' ) ).toBeTruthy() );

			pressKey( menu, ' ' );
			await expect( args.onItemClick ).toHaveBeenCalledTimes( 2 );
		} );
	},
};
