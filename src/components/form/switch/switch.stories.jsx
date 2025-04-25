import React from 'react';

import { userEvent, within } from '@storybook/test';
import { expect } from '@storybook/test';

import './switch.define';

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
		</xb-stack>
	),

	// play: async ({ canvasElement }) => {
	// 	const canvas = within(canvasElement);
	// 	await expect(canvas.getByRole('switch', { name: /Accept life options/i })).not.toBeChecked();
	// 	await userEvent.click(canvas.getByRole('switch', { name: /Accept life options/i }));
	// 	await expect(canvas.getByRole('switch', { name: /Accept life options/i })).toBeChecked();
	// 	await userEvent.click(canvas.getByRole('switch', { name: /Accept life options/i }));
	// 	await expect(canvas.getByRole('switch', { name: /Accept life options/i })).not.toBeChecked();
	// },
};
