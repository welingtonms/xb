import React from 'react';

import { userEvent, expect, fn, waitFor } from 'storybook/test';
import { SizeArg } from '../../../utils/arg-types';
import { within, waitForUpgrade } from '../../../utils/test-tools.js';

import '../../layout';
import '../../text/text.define';
import './checkbox.define';

export default {
	title: 'Components/Form/Checkbox',
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
		disabled: {
			control: {
				type: 'boolean',
			},
		},
		size: SizeArg,
	},
};

/** @type {CheckboxStory} */
export const Playground = {
	args: {
		disabled: false,
	},
	render: ( args ) => (
		<xb-stack>
			<xb-checkbox
				onchange={ args.change }
				disabled={ args.disabled }
				size={ args.size }
				value="accept"
			>
				Remember me
			</xb-checkbox>
			<xb-checkbox
				onchange={ args.change }
				disabled={ args.disabled }
				size={ args.size }
				value="accept"
			>
				Remember me
				<xb-text variant="text-sm" slot="description">
					Save my login details for next time.
				</xb-text>
			</xb-checkbox>
			<xb-checkbox
				onchange={ args.change }
				disabled={ args.disabled }
				size={ args.size }
			></xb-checkbox>
		</xb-stack>
	),
};

/** @type {CheckboxStory} */
export const RendersChildren = {
	name: 'Test: Renders children',
	tags: [ '!autodocs' ],
	args: {
		change: fn(),
	},
	render: ( args ) => (
		<xb-checkbox value="enable" onchange={ args.change }>
			Enable newsletters
		</xb-checkbox>
	),
	play: async ( { canvasElement, args, step } ) => {
		const checkbox = canvasElement.querySelector( 'xb-checkbox' );
		await waitForUpgrade( checkbox );
		checkbox.addEventListener( 'change', args.change );
		const canvas = within( canvasElement );

		await step( 'renders with expected attributes', async () => {
			await waitFor( async () => {
				await expect( checkbox ).toHaveTextContent( 'Enable newsletters' );
				await expect( checkbox ).not.toHaveAttribute( 'disabled' );
				await expect( checkbox ).not.toHaveAttribute( 'indeterminate' );
				await expect( checkbox.checked ).toBe( false );
			} );

			await expect(
				canvas.getByRole( 'checkbox', { name: /Enable newsletters/i } )
			).toBeInTheDocument();
		} );

		await step( 'toggles on click and fires change', async () => {
			await userEvent.click( canvas.getByRole( 'checkbox', { name: /Enable newsletters/i } ) );

			await waitFor( async () => {
				await expect( args.change ).toHaveBeenCalled();
				await expect( checkbox.checked ).toBe( true );
			} );
		} );
	},
};

/** @type {CheckboxStory} */
export const SpaceKeyChange = {
	name: 'Test: Space key change',
	tags: [ '!autodocs' ],
	args: {
		change: fn(),
	},
	render: ( args ) => (
		<xb-checkbox value="enable" onchange={ args.change }>
			Enable newsletters
		</xb-checkbox>
	),
	play: async ( { canvasElement, args, step } ) => {
		const checkbox = canvasElement.querySelector( 'xb-checkbox' );
		await waitForUpgrade( checkbox );
		checkbox.addEventListener( 'change', args.change );

		await step( 'toggles on Space key', async () => {
			checkbox.focus();
			await userEvent.keyboard( ' ' );

			await waitFor( async () => {
				await expect( args.change ).toHaveBeenCalled();
			} );
		} );
	},
};

/**
 * @typedef {import('./checkbox').Checkbox} Checkbox
 * @typedef {import('@storybook/web-components').StoryObj<Checkbox>} CheckboxStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
