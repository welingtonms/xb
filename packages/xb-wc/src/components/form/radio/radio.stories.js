import { html } from 'lit-html';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import './radio-group';
import './radio';

/** @type {import('../../../common/arg-types').Meta} */
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
		input: {
			action: 'input',
			table: {
				disable: true,
			},
		},
		size: {
			control: 'select',
			options: [ 'small', 'medium', 'large' ],
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

/** @type {import('../../../common/arg-types').StoryObj} */
export const Playground = {
	render: ( args ) => html`
		<xb-radio-group
			size=${ args.size }
			?disabled=${ args.disabled }
			@xb:change=${ args.change }
		>
			<xb-radio value="accept" size=${ args.size }>Accept</xb-radio>
			<xb-radio value="change" size=${ args.size }>Change</xb-radio>
			<xb-radio value="leave" size=${ args.size }>Leave</xb-radio>
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
		size: 'extra-small',
	},
};
