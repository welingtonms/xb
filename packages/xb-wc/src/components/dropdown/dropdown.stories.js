import { html } from 'lit';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { PlacementArg, SizeArg } from '../../common/arg-types';

import './dropdown';
import './dropdown-item';
import './dropdown-menu';
import './dropdown-trigger';

/** @type {import('../../common/arg-types').Meta} */
const meta = {
	title: 'Components/dropdown',
	component: 'xb-dropdown',

	argTypes: {
		placement: PlacementArg,
		size: SizeArg,
		click: {
			action: true,
			table: {
				disable: true,
			},
		},
	},

	parameters: {},
};

export default meta;

/** @type {import('../../common/arg-types').StoryObj} */
export const Playground = {
	render: ( args ) => html`
		<xb-dropdown>
			<xb-dropdown-trigger>Actions</xb-dropdown-trigger>

			<xb-dropdown-menu>
				<xb-dropdown-item @click=${ args.click }>Accept</xb-dropdown-item>
				<xb-dropdown-item @click=${ args.click }>Change</xb-dropdown-item>
				<xb-dropdown-item @click=${ args.click }>Leave</xb-dropdown-item>
			</xb-dropdown-menu>
		</xb-dropdown>
	`,

	play: async ( { canvasElement } ) => {
		const canvas = within( canvasElement );

		await expect( canvas.getByRole( 'button', { name: /actions/i } ) ).toBeInTheDocument();
		await expect( canvas.queryByRole( 'menu' ) ).not.toBeInTheDocument();

		await userEvent.click( canvas.getByText( 'Actions' ) );

		await expect( canvas.getByRole( 'menu' ) ).toBeInTheDocument();

		await expect( canvas.getByRole( 'menuitem', { name: /accept/i } ) ).toBeInTheDocument();

		await expect( canvas.getByRole( 'menuitem', { name: /change/i } ) ).toBeInTheDocument();

		await expect( canvas.getByRole( 'menuitem', { name: /leave/i } ) ).toBeInTheDocument();

		await userEvent.click( canvas.getByRole( 'menuitem', { name: /change/i } ) );

		await expect( canvas.queryByRole( 'menu' ) ).not.toBeInTheDocument();
	},

	args: {
		placement: 'bottom-start',
	},
};
