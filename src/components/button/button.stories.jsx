import React from 'react';

import { userEvent, expect, fn } from '@storybook/test';

import { within } from '../../utils/test-tools.js';

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
			options: [ 'primary', 'secondary-color', 'secondary-gray', 'tertiary-color', 'tertiary-gray', 'link-color', 'link-gray', 'icon' ],
		},
		scale: {
			control: 'select',
			options: [ 'sm', 'md', 'lg', 'xl', '2xl' ],
		},
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
				scale={ args.scale }
				onClick={ args.click }
			>
				Submit
			</xb-button>

			<xb-button
				disabled={ args.disabled }
				variant="icon"
				scale={ args.scale }
				onClick={ args.click }
			>
				<xb-icon name="favorite"></xb-icon>
			</xb-button>
		</xb-stack>
	),
	play: async ( { canvasElement, args } ) => {
		const canvas = within( canvasElement );

		const button = await canvas.getAllByText( 'Submit' )[ 0 ];
		await expect( button ).not.toBeDisabled();
		await userEvent.click( button );
		await expect( args.click ).toHaveBeenCalled();
	},

	args: {
		click: fn(),
		variant: 'primary',
		scale: 'sm',
		disabled: false,
	},
};
