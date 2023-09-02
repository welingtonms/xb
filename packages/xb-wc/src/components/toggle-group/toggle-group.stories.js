import { html } from 'lit-html';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { SELECTION_TYPES } from '@welingtonms/xb-toolset/dist/selection';

import { SizeArg } from '../../common/arg-types';

import './toggle-group';
import './toggle';

/** @type {import('../../common/arg-types').Meta} */
const meta = {
	title: 'Components/toggle-group',
	component: 'toggle-group',
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
		selection: {
			control: 'inline-radio',
			options: SELECTION_TYPES,
		},
	},
};

export default meta;

/** @type {import('../../common/arg-types').StoryObj} */
export const Playground = {
	render: ( args ) => html`
		<xb-toggle-group
			selection="${ args.selection }"
			size="${ args.size }"
			?disabled=${ args.disabled }
			@xb:change=${ args.change }
		>
			<xb-toggle value="accept">
				<span slot="leading">&diams;</span>
				Accept
			</xb-toggle>

			<xb-toggle value="change">
				<span slot="leading">&hearts;</span>
				Change
			</xb-toggle>

			<xb-toggle value="leave">
				<span slot="leading">&clubs;</span>
				Leave
			</xb-toggle>
		</xb-toggle-group>
	`,
	play: async ( { canvasElement, step } ) => {
		const canvas = within( canvasElement );

		await expect( canvas.getByRole( 'radiogroup' ) ).toBeInTheDocument();

		await step( 'No toggle is selected', async () => {
			await expect( canvas.getByRole( 'radio', { name: /accept/i } ) ).not.toBeChecked();
			await expect( canvas.getByRole( 'radio', { name: /change/i } ) ).not.toBeChecked();
			await expect( canvas.getByRole( 'radio', { name: /leave/i } ) ).not.toBeChecked();
		} );

		await step( "Select 'change' toggle", async () => {
			await userEvent.click( canvas.getByRole( 'radio', { name: /change/i } ) );

			await expect( canvas.getByRole( 'radio', { name: /accept/i } ) ).not.toBeChecked();
			await expect( canvas.getByRole( 'radio', { name: /change/i } ) ).toBeChecked();
			await expect( canvas.getByRole( 'radio', { name: /leave/i } ) ).not.toBeChecked();
		} );

		await step( "Select 'accept' toggle", async () => {
			await userEvent.click( canvas.getByRole( 'radio', { name: /accept/i } ) );

			await expect( canvas.getByRole( 'radio', { name: /accept/i } ) ).toBeChecked();
			await expect( canvas.getByRole( 'radio', { name: /change/i } ) ).not.toBeChecked();
			await expect( canvas.getByRole( 'radio', { name: /leave/i } ) ).not.toBeChecked();
		} );

		await step( "Select 'leave' toggle", async () => {
			await userEvent.click( canvas.getByRole( 'radio', { name: /leave/i } ) );

			await expect( canvas.getByRole( 'radio', { name: /accept/i } ) ).not.toBeChecked();
			await expect( canvas.getByRole( 'radio', { name: /change/i } ) ).not.toBeChecked();
			await expect( canvas.getByRole( 'radio', { name: /leave/i } ) ).toBeChecked();
		} );

		await step( "Unselect 'leave' toggle", async () => {
			await userEvent.click( canvas.getByRole( 'radio', { name: /leave/i } ) );

			await expect( canvas.getByRole( 'radio', { name: /accept/i } ) ).not.toBeChecked();
			await expect( canvas.getByRole( 'radio', { name: /change/i } ) ).not.toBeChecked();
			await expect( canvas.getByRole( 'radio', { name: /leave/i } ) ).not.toBeChecked();
		} );
	},

	args: {
		selection: 'single',
		size: 'extra-small',
		disabled: false,
	},
};
