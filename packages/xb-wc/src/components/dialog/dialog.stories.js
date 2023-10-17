import { html } from 'lit-html';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import '../dropdown';
import '../button';
import '../icon';
import '../tooltip';
import '../layout/box';
import '../layout/cluster';
import '../layout/stack';
import '../text';
import './dialog';

/** @type {Meta} */
const meta = {
	title: 'Components/dialog',
	component: 'xb-dialog',
	argTypes: {},
	parameters: {},
};

export default meta;

/** @type {DialogStory} */
export const Playground = {
	args: {},
	render: ( args ) => {
		const handleClickOpen = () => {
			document.querySelector( 'xb-dialog' )?.show();
		};

		const handleClose = () => {
			document.querySelector( 'xb-dialog' )?.hide();
		};

		return html`
			<xb-button type="button" variant="primary" @click=${ handleClickOpen }>
				Open Confirmation Dialog
			</xb-button>

			<xb-dialog>
				<xb-stack style="width: initial;">
					<xb-text variant="body-2">This action cannot be undone. Do you want to continue?</xb-text>

					<xb-box borderless="bottom,horizontal">
						<xb-cluster>
							<xb-dropdown>
								<xb-dropdown-trigger>Actions</xb-dropdown-trigger>

								<xb-dropdown-menu>
									<xb-dropdown-item>Accept</xb-dropdown-item>
									<xb-dropdown-item>Change</xb-dropdown-item>
									<xb-dropdown-item>Leave</xb-dropdown-item>
								</xb-dropdown-menu>
							</xb-dropdown>

							<xb-button @click=${ handleClose }>Close</xb-button>

							<xb-button id="my-anchor" emphasis="ghost" aria-label="Favorite">
								<xb-icon name="favorite"></xb-icon>
							</xb-button>

							<xb-tooltip anchor="my-anchor" trigger="click">Here goes the helpful tip.</xb-tooltip>
						</xb-cluster>
					</xb-box>
				</xb-stack>
			</xb-dialog>
		`;
	},

	play: async ( { canvasElement } ) => {
		const canvas = within( canvasElement );

		await userEvent.click( canvas.getByRole( 'button', { name: /Open Confirmation Dialog/i } ) );

		await expect( canvas.queryByRole( 'menu' ) ).not.toBeInTheDocument();

		await userEvent.click( canvas.getByRole( 'button', { name: /actions/i } ) );

		await expect( canvas.getByRole( 'menu' ) ).toBeInTheDocument();

		await userEvent.click( canvas.getByRole( 'menuitem', { name: /change/i } ) );

		await expect( canvas.queryByRole( 'menu' ) ).not.toBeInTheDocument();

		await expect( canvas.getByText( 'Here goes the helpful tip.' ) ).not.toBeVisible();

		await userEvent.click( canvas.getByLabelText( 'Favorite' ) );

		await expect( canvas.getByText( 'Here goes the helpful tip.' ) ).toBeVisible();

		await userEvent.click( canvas.getByLabelText( 'Favorite' ) );

		await expect( canvas.getByText( 'Here goes the helpful tip.' ) ).not.toBeVisible();

		await userEvent.click( canvas.getByRole( 'button', { name: /close/i } ) );
	},
};

/**
 * @typedef {import('./dialog').Dialog} Dialog
 * @typedef {import('@storybook/web-components').StoryObj<Dialog>} DialogStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
