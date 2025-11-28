import React from 'react';

import { userEvent, within } from 'storybook/test';
import { expect } from 'storybook/test';

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

	// play: async ({ canvasElement }) => {
	// 	const canvas = within(canvasElement);
	// 	await expect(canvas.getByRole('switch', { name: /Accept life options/i })).not.toBeChecked();
	// 	await userEvent.click(canvas.getByRole('switch', { name: /Accept life options/i }));
	// 	await expect(canvas.getByRole('switch', { name: /Accept life options/i })).toBeChecked();
	// 	await userEvent.click(canvas.getByRole('switch', { name: /Accept life options/i }));
	// 	await expect(canvas.getByRole('switch', { name: /Accept life options/i })).not.toBeChecked();
	// },
};
