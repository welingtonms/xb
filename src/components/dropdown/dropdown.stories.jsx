import React from 'react';

import { PlacementArg } from '../../utils/arg-types';

import '../layout/layout.define';
import '../button/button.define';
import '../separator/separator.define';
import '../icon/icon.define';
import './dropdown.define';

/** @type {import('../../utils/arg-types').Meta} */
export default {
	title: 'Components/Dropdown',
	parameters: {
		layout: 'padded',
	},
	argTypes: {
		placement: PlacementArg,
		click: {
			action: true,
			table: {
				disable: true,
			},
		},
		disabled: {
			control: 'boolean',
		},
	},
};

/** @type {import('../../utils/arg-types').StoryObj} */
export const Playground = {
	render: ( args ) => (
		<xb-cluster>
			<xb-dropdown placement={ args.placement }>
				<xb-dropdown-trigger disabled={ args.disabled }>Actions</xb-dropdown-trigger>

				<xb-dropdown-menu>
					<xb-dropdown-item onclick={ args.click }>View profile</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click }>Settings</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click }>Keyboard shortcuts</xb-dropdown-item>
					<xb-separator />
					<xb-dropdown-item onclick={ args.click }>Company profile</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click }>Teams</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click }>Invite colleagues</xb-dropdown-item>
					<xb-separator />
					<xb-dropdown-item onclick={ args.click }>Changelog</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click }>Slack community</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click }>Support</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click }>API</xb-dropdown-item>
					<xb-separator />
					<xb-dropdown-item onclick={ args.click }>Logout</xb-dropdown-item>
				</xb-dropdown-menu>
			</xb-dropdown>

			<xb-dropdown placement={ args.placement }>
				<xb-dropdown-trigger disabled={ args.disabled }>Actions</xb-dropdown-trigger>

				<xb-dropdown-menu>
					<xb-dropdown-item onclick={ args.click } icon="user">
						View profile
					</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click } icon="gear">Settings</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click } icon="keyboard">Keyboard shortcuts</xb-dropdown-item>
					<xb-separator />
					<xb-dropdown-item onclick={ args.click } icon="building">Company profile</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click } icon="users">Teams</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click } icon="user-plus">Invite colleagues</xb-dropdown-item>
					<xb-separator />
					<xb-dropdown-item onclick={ args.click } icon="stack-simple">Changelog</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click } icon="slack-logo">Slack community</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click } icon="question">Support</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click } icon="code">API</xb-dropdown-item>
					<xb-separator />
					<xb-dropdown-item onclick={ args.click } icon="sign-out">Logout</xb-dropdown-item>
				</xb-dropdown-menu>
			</xb-dropdown>

			<xb-dropdown placement={ args.placement }>
				<xb-button variant="icon" aria-haspopup="true" aria-label="Life Actions" disabled={ args.disabled }>
					<xb-icon name="dots-three-vertical" size={ 16 }></xb-icon>
				</xb-button>

				<xb-dropdown-menu>
					<xb-dropdown-item onclick={ args.click }>Accept</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click }>Change</xb-dropdown-item>
					<xb-dropdown-item onclick={ args.click }>Leave</xb-dropdown-item>
				</xb-dropdown-menu>
			</xb-dropdown>
		</xb-cluster>
	),

	play: async ( { canvasElement } ) => {
		// const canvas = within( canvasElement );
		// await expect( canvas.getByRole( 'button', { name: /actions/i } ) ).toBeInTheDocument();
		// await expect( canvas.queryByRole( 'menu' ) ).not.toBeInTheDocument();
		// await userEvent.click( canvas.getByRole( 'button', { name: /actions/i } ) );
		// await expect( canvas.getByRole( 'menu' ) ).toBeInTheDocument();
		// await expect( canvas.getByRole( 'menuitem', { name: /accept/i } ) ).toBeInTheDocument();
		// await expect( canvas.getByRole( 'menuitem', { name: /change/i } ) ).toBeInTheDocument();
		// await expect( canvas.getByRole( 'menuitem', { name: /leave/i } ) ).toBeInTheDocument();
		// await userEvent.click( canvas.getByRole( 'menuitem', { name: /change/i } ) );
		// await expect( canvas.queryByRole( 'menu' ) ).not.toBeInTheDocument();
	},

	args: {
		placement: 'bottom-start',
	},
};
