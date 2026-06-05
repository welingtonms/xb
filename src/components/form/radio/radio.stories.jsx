import React from 'react';

// import { within } from '../../../utils/test-tools';

import '../../layout/stack';
import './radio.define';

export default {
	title: 'Components/Form/Radio',
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
	},
};

/** @type {RadioGroupStory} */
export const Playground = {
	render: ( args ) => (
		<xb-stack>
			<xb-radio-group name="life-choice" disabled={ args.disabled } onChange={ args.change }>
				<xb-radio value="accept">Accept</xb-radio>
				<xb-radio value="change">
					Change
					<xb-text variant="text-sm" slot="description">
						Save my login details for next time.
					</xb-text>
				</xb-radio>
				<xb-radio value="leave">
					Leave
					<xb-text variant="text-sm" slot="description">
						Save my login details for next time.
					</xb-text>
				</xb-radio>
				<xb-radio value="na"></xb-radio>
			</xb-radio-group>
		</xb-stack>
	),
	// play: async ( { canvasElement } ) => {
	// 	const canvas = within( canvasElement );

	// 	await expect( canvas.getByRole( 'radio', { name: /accept/i } ) ).not.toBeChecked();
	// 	await expect( canvas.getByRole( 'radio', { name: /change/i } ) ).not.toBeChecked();
	// 	await expect( canvas.getByRole( 'radio', { name: /leave/i } ) ).not.toBeChecked();

	// 	await userEvent.click( canvas.getByRole( 'radio', { name: /change/i } ) );

	// 	await expect( canvas.getByRole( 'radio', { name: /accept/i } ) ).not.toBeChecked();
	// 	await expect( canvas.getByRole( 'radio', { name: /change/i } ) ).toBeChecked();
	// 	await expect( canvas.getByRole( 'radio', { name: /leave/i } ) ).not.toBeChecked();
	// },

	args: {
		disabled: false,
	},
};

/**
 * @typedef {import('./radio-group').RadioGroup} RadioGroup
 * @typedef {import('@storybook/web-components').StoryObj<RadioGroup>} RadioGroupStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
