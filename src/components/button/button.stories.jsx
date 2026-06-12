import React from 'react';

import { userEvent, expect, fn } from 'storybook/test';

import { within, queryShadow } from '../../utils/test-tools.js';
import { SizeArg } from '../../utils/arg-types';

import '../layout';
import './button.define.js';
import '../icon/icon.define.js';

export default {
	title: 'Components/Button',
	parameters: {
		layout: 'padded',
	},
	argTypes: {
		variant: {
			control: 'select',
			options: [
				'primary',
				'secondary-color',
				'secondary-gray',
				'tertiary-color',
				'tertiary-gray',
				'link-color',
				'link-gray',
				'icon',
			],
		},
		size: SizeArg,
		click: {
			action: 'clicked',
			table: {
				disable: true,
			},
		},
		disabled: {
			control: {
				type: 'boolean',
			},
		},
	},
};

export const Playground = {
	render: ( args ) => (
		<xb-stack>
			<xb-button
				type="button"
				disabled={ args.disabled }
				variant={ args.variant }
				size={ args.size }
				onClick={ args.click }
			>
				Submit
			</xb-button>

			<xb-button
				disabled={ args.disabled }
				variant={ args.variant }
				size={ args.size }
				onClick={ args.click }
			>
				<xb-icon slot="leading" name="star"></xb-icon>
				Submit
			</xb-button>

			<xb-button
				disabled={ args.disabled }
				variant={ args.variant }
				size={ args.size }
				onClick={ args.click }
			>
				<xb-icon slot="trailing" name="star"></xb-icon>
				Submit
			</xb-button>

			<xb-button
				disabled={ args.disabled }
				variant="icon"
				size={ args.size }
				onClick={ args.click }
			>
				<xb-icon name="star"></xb-icon>
			</xb-button>
		</xb-stack>
	),

	args: {
		click: fn(),
		variant: 'primary',
		size: 'sm',
		disabled: false,
	},
};

export const TestClickSubmit = {
	name: 'Test: Click submit',
	tags: [ '!autodocs' ],
	args: {
		click: fn(),
		variant: 'primary',
		size: 'sm',
		disabled: false,
	},
	render: ( args ) => (
		<xb-button
			type="button"
			disabled={ args.disabled }
			variant={ args.variant }
			size={ args.size }
			onClick={ args.click }
		>
			Submit
		</xb-button>
	),
	play: async ( { canvasElement, args } ) => {
		const canvas = within( canvasElement );
		const button = canvas.getByRole( 'button', { name: 'Submit' } );

		await expect( button ).not.toBeDisabled();
		await userEvent.click( button );
		await expect( args.click ).toHaveBeenCalled();
	},
};

export const DisabledState = {
	name: 'Test: Disabled state',
	tags: [ '!autodocs' ],
	render: () => <xb-button>Action</xb-button>,
	play: async ( { canvasElement, step } ) => {
		const canvas = within( canvasElement );
		const button = canvasElement.querySelector( 'xb-button' );

		await step( 'renders children with accessible role', async () => {
			await expect( button ).toHaveTextContent( 'Action' );
			await expect( canvas.getByRole( 'button', { name: 'Action' } ) ).toBeInTheDocument();
			await expect( button ).not.toHaveAttribute( 'disabled' );
			await expect( button ).not.toHaveAttribute( 'aria-disabled' );
		} );

		await step( 'reflects disabled state on the host', async () => {
			button.toggleAttribute( 'disabled' );
			/** @type {import('./button').Button} */
			await button.updateComplete;

			await expect( button ).toHaveAttribute( 'disabled' );

			const control = queryShadow( button, '#control' );
			await expect( control ).toBeDisabled();
		} );
	},
};

export const Click = {
	name: 'Test: Click',
	tags: [ '!autodocs' ],
	args: {
		onClick: fn(),
	},
	render: ( args ) => (
		<xb-button onClick={ args.onClick }>Action</xb-button>
	),
	play: async ( { canvasElement, args, step } ) => {
		const canvas = within( canvasElement );

		await step( 'click triggers handler', async () => {
			await userEvent.click( canvas.getByRole( 'button', { name: 'Action' } ) );
			await expect( args.onClick ).toHaveBeenCalled();
		} );
	},
};

export const KeyboardActivation = {
	name: 'Test: Keyboard activation',
	tags: [ '!autodocs' ],
	args: {
		onClick: fn(),
	},
	render: ( args ) => (
		<xb-button onClick={ args.onClick }>Action</xb-button>
	),
	play: async ( { canvasElement, args, step } ) => {
		const canvas = within( canvasElement );
		const button = canvas.getByRole( 'button', { name: 'Action' } );

		await step( 'Enter triggers click', async () => {
			button.focus();
			await userEvent.keyboard( '{Enter}' );
			await expect( args.onClick ).toHaveBeenCalled();
		} );

		args.onClick.mockClear();

		await step( 'Space triggers click', async () => {
			button.focus();
			await userEvent.keyboard( ' ' );
			await expect( args.onClick ).toHaveBeenCalled();
		} );
	},
};
