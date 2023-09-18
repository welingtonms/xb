import { html } from 'lit-html';
import { userEvent, within } from '@storybook/testing-library';

import { expect } from '../../utils/extended-expect';
import { SelectionArg, SizeArg } from '../../common/arg-types';

import '../text';
import './listbox';
import './listbox-option';

/** @type {import('../../common/arg-types').Meta} */
const meta = {
	title: 'Components/listbox',
	component: 'xb-listbox',
	argTypes: {
		change: {
			action: 'changed',
			table: {
				disable: true,
			},
		},
		bordered: {
			control: 'boolean',
		},
		loading: {
			control: 'boolean',
		},
		selection: SelectionArg,
		size: SizeArg,
	},
	parameters: {},
};

export default meta;

/** @type {import('../../common/arg-types').StoryObj} */
export const Playground = {
	args: {
		selection: 'single',
		size: 'small',
		bordered: false,
		loading: false,
	},
	render: ( args ) => html`
		<xb-listbox
			aria-label="Life choices"
			tabindex="0"
			selection=${ args.selection }
			?bordered=${ args.bordered }
			?loading=${ args.loading }
			@xb:change=${ args.change }
		>
			<xb-option value="accept">Accept</xb-option>
			<xb-option value="change">Change</xb-option>
			<xb-option value="leave">Leave</xb-option>
		</xb-listbox>
	`,

	play: async ( { args, canvasElement, step } ) => {
		const canvas = within( canvasElement );

		await expect( canvas.getByRole( 'listbox' ) ).toBeInTheDocument();

		await step( 'No option is selected', async () => {
			await expect( canvas.getByRole( 'option', { name: /accept/i } ) ).not.toBeSelected();
			await expect( canvas.getByRole( 'option', { name: /change/i } ) ).not.toBeSelected();
			await expect( canvas.getByRole( 'option', { name: /leave/i } ) ).not.toBeSelected();
		} );

		await step( "Select 'change' option", async () => {
			await userEvent.click( canvas.getByRole( 'option', { name: /change/i } ) );

			await expect( canvas.getByRole( 'option', { name: /accept/i } ) ).not.toBeSelected();
			await expect( canvas.getByRole( 'option', { name: /change/i } ) ).toBeSelected();
			await expect( canvas.getByRole( 'option', { name: /leave/i } ) ).not.toBeSelected();

			await expect( args.change ).toHaveBeenCalledWith(
				expect.objectContaining( {
					detail: { value: 'change' },
				} )
			);
		} );

		await step( "Select 'accept' option", async () => {
			await userEvent.click( canvas.getByRole( 'option', { name: /accept/i } ) );

			await expect( canvas.getByRole( 'option', { name: /accept/i } ) ).toBeSelected();
			await expect( canvas.getByRole( 'option', { name: /change/i } ) ).not.toBeSelected();
			await expect( canvas.getByRole( 'option', { name: /leave/i } ) ).not.toBeSelected();
		} );

		await step( "Select 'leave' option", async () => {
			await userEvent.click( canvas.getByRole( 'option', { name: /leave/i } ) );

			await expect( canvas.getByRole( 'option', { name: /accept/i } ) ).not.toBeSelected();
			await expect( canvas.getByRole( 'option', { name: /change/i } ) ).not.toBeSelected();
			await expect( canvas.getByRole( 'option', { name: /leave/i } ) ).toBeSelected();
		} );

		await step( "Unselect 'leave' option", async () => {
			await userEvent.click( canvas.getByRole( 'option', { name: /leave/i } ) );

			await expect( canvas.getByRole( 'option', { name: /accept/i } ) ).not.toBeSelected();
			await expect( canvas.getByRole( 'option', { name: /change/i } ) ).not.toBeSelected();
			await expect( canvas.getByRole( 'option', { name: /leave/i } ) ).not.toBeSelected();
		} );
	},
};
