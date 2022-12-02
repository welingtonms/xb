import { html } from 'lit';

import { PlacementArg, SizeArg } from '../../common/arg-types';
import Docs from './dropdown.api.mdx';
import './dropdown';

export default {
	title: 'Components/dropdown',

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

	parameters: {
		docs: {
			page: Docs,
		},
	},
};

export const Playground = ( args ) => html`<xb-dropdown
	@xb-click=${ args.click }
>
	<xb-dropdown-trigger>Actions</xb-dropdown-trigger>

	<xb-dropdown-menu>
		<xb-dropdown-item value="change">
			<!-- <xb-icon name="favorite" slot="leading"></xb-icon> -->
			Change</xb-dropdown-item
		>
		<xb-dropdown-item value="accept">
			<!-- <xb-icon name="star" slot="leading"></xb-icon> -->
			Accept</xb-dropdown-item
		>
		<xb-dropdown-item value="leave">
			<!-- <xb-icon name="cloud" slot="leading"></xb-icon> -->
			Leave</xb-dropdown-item
		>
	</xb-dropdown-menu>
</xb-dropdown>`;

Playground.args = {
	// placement: 'bottom-start',
};
