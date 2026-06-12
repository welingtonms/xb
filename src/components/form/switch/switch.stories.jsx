import React from 'react';

import { userEvent, expect, fn, waitFor } from 'storybook/test';
import { waitForUpgrade, within, queryShadow } from '../../../utils/test-tools.js';

import './switch.define';
import '../../text/text.define';

/** @type {Meta} */
export default {
	title: 'Components/Form/Switch',
	parameters: {
		layout: 'padded',
	},

	argTypes: {
		change: {
			action: 'changed',
			table: {
				disable: true,
			},
		},
		checked: { control: 'boolean' },
		disabled: { control: 'boolean' },
	},
};

/** @type {SwitchStory} */
export const Playground = {
	args: {
		checked: false,
		disabled: false,
		size: 'extra-small',
	},
	render: ( args ) => (
		<xb-stack>
			<xb-switch onChange={ args.change } checked={ args.checked } disabled={ args.disabled }>
				Accept life options
			</xb-switch>
			<xb-switch onchange={ args.change } disabled={ args.disabled } value="accept">
				Accept life options
				<xb-text variant="text-sm" slot="description">
					Save my login details for next time.
				</xb-text>
			</xb-switch>
			<xb-switch onchange={ args.change } disabled={ args.disabled }></xb-switch>
		</xb-stack>
	),
};

/** @type {SwitchStory} */
export const TogglesOnClick = {
	name: 'Test: Toggles on click',
	tags: [ '!autodocs' ],
	args: {
		change: fn(),
	},
	render: ( args ) => (
		<xb-switch onchange={ args.change }>Allow analytics cookies</xb-switch>
	),
	play: async ( { canvasElement, args, step } ) => {
		const switchEl = canvasElement.querySelector( 'xb-switch' );
		await waitForUpgrade( switchEl );
		switchEl.addEventListener( 'change', args.change );
		const canvas = within( canvasElement );

		await step( 'renders unchecked with switch role', async () => {
			await waitFor( async () => {
				const accessibleSwitch = canvas.getByRole( 'switch', { name: /Allow analytics cookies/i } );
				await expect( accessibleSwitch ).not.toHaveAttribute( 'checked' );
			} );
		} );

		await step( 'turns on when clicked', async () => {
			await userEvent.click( switchEl );

			await waitFor( async () => {
				await expect( args.change ).toHaveBeenCalled();
				await expect( switchEl.checked ).toBe( true );
			} );
		} );

		await step( 'turns off when clicked again', async () => {
			await userEvent.click( switchEl );

			await expect( args.change ).toHaveBeenCalledTimes( 2 );
			await expect( switchEl.checked ).toBe( false );
		} );
	},
};

/** @type {SwitchStory} */
export const TogglesWhenInitiallyChecked = {
	name: 'Test: Toggles when initially checked',
	tags: [ '!autodocs' ],
	args: {
		change: fn(),
	},
	render: ( args ) => (
		<xb-switch initial-checked onchange={ args.change }>
			Allow analytics cookies
		</xb-switch>
	),
	play: async ( { canvasElement, args, step } ) => {
		const switchEl = canvasElement.querySelector( 'xb-switch' );
		await waitForUpgrade( switchEl );
		switchEl.addEventListener( 'change', args.change );
		within( canvasElement );

		await step( 'renders checked', async () => {
			await waitFor( async () => {
				await expect( switchEl ).toHaveAttribute( 'checked' );
				await expect( switchEl.checked ).toBe( true );
			} );
		} );

		await step( 'turns off when clicked', async () => {
			await userEvent.click( switchEl );

			await expect( args.change ).toHaveBeenCalled();
			await expect( switchEl ).not.toHaveAttribute( 'checked' );
			await expect( switchEl.checked ).toBe( false );
		} );

		await step( 'turns on when clicked again', async () => {
			await userEvent.click( switchEl );

			await expect( args.change ).toHaveBeenCalledTimes( 2 );
			await expect( switchEl ).toHaveAttribute( 'checked' );
			await expect( switchEl.checked ).toBe( true );
		} );
	},
};

/** @type {SwitchStory} */
export const KeyboardNavigation = {
	name: 'Test: Keyboard navigation',
	tags: [ '!autodocs' ],
	render: () => <xb-switch>Allow analytics cookies</xb-switch>,
	play: async ( { canvasElement, step } ) => {
		const switchEl = canvasElement.querySelector( 'xb-switch' );
		await waitForUpgrade( switchEl );
		within( canvasElement );

		await step( 'toggles with Space and Enter keys', async () => {
			await waitFor( async () => {
				await expect( switchEl.checked ).toBe( false );
			} );

			switchEl.focus();
			await userEvent.keyboard( ' ' );
			await waitFor( async () => {
				await expect( switchEl.checked ).toBe( true );
			} );

			const control = queryShadow( switchEl, '#control' );
			await userEvent.click( control ?? switchEl );
			await waitFor( async () => {
				await expect( switchEl.checked ).toBe( false );
			} );
		} );
	},
};

/**
 * @typedef {import('./switch').Switch} Switch
 * @typedef {import('@storybook/web-components').StoryObj<Switch>} SwitchStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
