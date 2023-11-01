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
		<style>
			label {
				display: flex;
				align-items: center;
				gap: var( --xb-spacing-2 );

				cursor: pointer;
			}
		</style>

		<xb-radio-group @change=${ args.change }>
			<label>
				<input is="xb-radio" name="life-choice" value="accept" ?disabled=${ args.disabled } />
				Accept
			</label>
			<label>
				<input is="xb-radio" name="life-choice" value="change" ?disabled=${ args.disabled } />
				Change
			</label>
			<label>
				<input is="xb-radio" name="life-choice" value="leave" ?disabled=${ args.disabled } />
				Leave
			</label>
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
