import { html } from 'lit';

import { PlacementArg, SizeArg } from '../../common/arg-types';
import './dropdown';

/** @type {import('../../common/arg-types').Meta} */
const meta = {
	title: 'Components/dropdown',
	component: 'xb-dropdown',

	argTypes: {
		placement: PlacementArg,
		size: SizeArg,
		click: {
			action: 'clicked',
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
		<xb-dropdown placement=${ args.placement }>
			<xb-dropdown-trigger>Actions</xb-dropdown-trigger>

			<xb-dropdown-menu>
				<xb-dropdown-item value="change" @xb-click=${ args.click }>
					<!-- <xb-icon name="favorite" slot="leading"></xb-icon> -->
					Change
				</xb-dropdown-item>
				<xb-dropdown-item value="accept" @xb-click=${ args.click }>
					<!-- <xb-icon name="star" slot="leading"></xb-icon> -->
					Accept
				</xb-dropdown-item>
				<xb-dropdown-item value="leave" @xb-click=${ args.click }>
					<!-- <xb-icon name="cloud" slot="leading"></xb-icon> -->
					Leave
				</xb-dropdown-item>
			</xb-dropdown-menu>
		</xb-dropdown>
	`,

	args: {
		placement: 'bottom-start',
	},
};
