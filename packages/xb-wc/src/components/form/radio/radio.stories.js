import { html } from 'lit-html';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import './radio-group';
import './radio';

/** @type {Meta} */
const meta = {
	title: 'Components/form/radio',
	component: 'xb-radio',

	argTypes: {
		type: {
			control: 'select',
			options: [ 'text', 'password', 'number' ],
		},
		disabled: {
			control: {
				type: 'boolean',
			},
		},
		change: {
			action: 'changed',
			table: {
				disable: true,
			},
		},
	},
	parameters: {},
};

export default meta;

/** @type {RadioGroupStory} */
export const Playground = {
	render: ( args ) => html`
		<xb-radio-group ?disabled=${ args.disabled } @xb:change=${ args.change }>
			<xb-radio value="accept">Accept</xb-radio>
			<xb-radio value="change">Change</xb-radio>
			<xb-radio value="leave">Leave</xb-radio>
		</xb-radio-group>
	`,
	play: async ( { canvasElement } ) => {
		const canvas = within( canvasElement );

		await expect( canvas.getByRole( 'radio', { name: /accept/i } ) ).not.toBeChecked();
		await expect( canvas.getByRole( 'radio', { name: /change/i } ) ).not.toBeChecked();
		await expect( canvas.getByRole( 'radio', { name: /leave/i } ) ).not.toBeChecked();

		await userEvent.click( canvas.getByRole( 'radio', { name: /change/i } ) );

		await expect( canvas.getByRole( 'radio', { name: /accept/i } ) ).not.toBeChecked();
		await expect( canvas.getByRole( 'radio', { name: /change/i } ) ).toBeChecked();
		await expect( canvas.getByRole( 'radio', { name: /leave/i } ) ).not.toBeChecked();
	},

	args: {
		disabled: false,
	},
};

/**
 * @typedef {import('./radio-group').RadioGroup} RadioGroup
 * @typedef {import('@storybook/web-components').StoryObj<RadioGroup>} RadioGroupStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
