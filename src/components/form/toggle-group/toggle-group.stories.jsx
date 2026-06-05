import React from 'react';
import { within } from 'storybook/test';

import { SelectionArg } from '../../../utils/arg-types.js';

import '../../layout/layout.define';
import '../../icon/icon.define';
import './toggle-group.define';
import '../../tooltip/tooltip.define';

export default {
	title: 'Components/Form/Toggle Group',
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
		type: SelectionArg,
	},
};

/** @type {ToggleGroupStory} */
export const Playground = {
	render: ( args ) => (
		<xb-stack style={ { '--xb-stack-gap': '16px', '--xb-stack-align': 'center' } }>
			<xb-toggle-group name="life-choice" type={ args.type } disabled={ args.disabled }>
				<xb-toggle value="accept">Accept</xb-toggle>

				<xb-toggle value="change">Change</xb-toggle>

				<xb-toggle value="leave">Leave</xb-toggle>
			</xb-toggle-group>

			<xb-toggle-group type="single-strict" name="text-alignment" disabled={ args.disabled }>
				<xb-toggle id="left-toggle" value="left">
					<xb-icon name="text-align-left" />
				</xb-toggle>
				<xb-tooltip anchor="left-toggle">Align text to the left</xb-tooltip>

				<xb-toggle id="center-toggle" value="center">
					<xb-icon name="text-align-center" />
				</xb-toggle>
				<xb-tooltip anchor="center-toggle" placement="bottom">
					Align text to the center
				</xb-tooltip>

				<xb-toggle id="right-toggle" value="right">
					<xb-icon name="text-align-right" />
				</xb-toggle>
				<xb-tooltip anchor="right-toggle">Align text to the right</xb-tooltip>

				<xb-toggle id="justify-toggle" value="justify">
					<xb-icon name="text-align-justify" />
				</xb-toggle>
				<xb-tooltip anchor="justify-toggle" placement="bottom">
					Align text to the justify
				</xb-tooltip>
			</xb-toggle-group>
		</xb-stack>
	),
	play: async ( { canvasElement, step } ) => {
		const canvas = within( canvasElement );

		// await expect( canvas.getByRole( 'radiogroup' ) ).toBeInTheDocument();

		// await step( 'No toggle is selected', async () => {
		// 	await expect( canvas.getByRole( 'radio', { name: /accept/i } ) ).not.toBeChecked();
		// 	await expect( canvas.getByRole( 'radio', { name: /change/i } ) ).not.toBeChecked();
		// 	await expect( canvas.getByRole( 'radio', { name: /leave/i } ) ).not.toBeChecked();
		// } );

		// await step( "Select 'change' toggle", async () => {
		// 	await userEvent.click( canvas.getByRole( 'radio', { name: /change/i } ) );

		// 	await expect( canvas.getByRole( 'radio', { name: /accept/i } ) ).not.toBeChecked();
		// 	await expect( canvas.getByRole( 'radio', { name: /change/i } ) ).toBeChecked();
		// 	await expect( canvas.getByRole( 'radio', { name: /leave/i } ) ).not.toBeChecked();
		// } );

		// await step( "Select 'accept' toggle", async () => {
		// 	await userEvent.click( canvas.getByRole( 'radio', { name: /accept/i } ) );

		// 	await expect( canvas.getByRole( 'radio', { name: /accept/i } ) ).toBeChecked();
		// 	await expect( canvas.getByRole( 'radio', { name: /change/i } ) ).not.toBeChecked();
		// 	await expect( canvas.getByRole( 'radio', { name: /leave/i } ) ).not.toBeChecked();
		// } );

		// await step( "Select 'leave' toggle", async () => {
		// 	await userEvent.click( canvas.getByRole( 'radio', { name: /leave/i } ) );

		// 	await expect( canvas.getByRole( 'radio', { name: /accept/i } ) ).not.toBeChecked();
		// 	await expect( canvas.getByRole( 'radio', { name: /change/i } ) ).not.toBeChecked();
		// 	await expect( canvas.getByRole( 'radio', { name: /leave/i } ) ).toBeChecked();
		// } );

		// await step( "Unselect 'leave' toggle", async () => {
		// 	await userEvent.click( canvas.getByRole( 'radio', { name: /leave/i } ) );

		// 	await expect( canvas.getByRole( 'radio', { name: /accept/i } ) ).not.toBeChecked();
		// 	await expect( canvas.getByRole( 'radio', { name: /change/i } ) ).not.toBeChecked();
		// 	await expect( canvas.getByRole( 'radio', { name: /leave/i } ) ).not.toBeChecked();
		// } );
	},

	args: {
		type: 'single',
		disabled: false,
	},
};

/**
 * @typedef {import('./toggle-group').ToggleGroup} ToggleGroup
 * @typedef {import('@storybook/web-components').StoryObj<ToggleGroup>} ToggleGroupStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
