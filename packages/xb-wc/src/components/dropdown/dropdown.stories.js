import { html } from 'lit';

import { PlacementArg, SizeArg } from '../../common/arg-types';
import Docs from './dropdown.api.mdx';
import './dropdown';

export default {
	title: 'Components/dropdown',

	argTypes: {
		placement: PlacementArg,
		size: SizeArg,
	},
	parameters: {
		docs: {
			page: Docs,
		},
	},
};

export const Playground = () => html`<xb-dropdown>
	<xb-dropdown-trigger>Actions</xb-dropdown-trigger>

	<xb-dropdown-menu>
		<xb-dropdown-item>Change</xb-dropdown-item>
		<xb-dropdown-item>Accept</xb-dropdown-item>
		<xb-dropdown-item>Leave</xb-dropdown-item>
	</xb-dropdown-menu>
</xb-dropdown>`;

Playground.args = {
	// placement: 'bottom-start',
};
