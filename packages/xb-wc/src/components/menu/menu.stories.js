import { html } from 'lit-html';

import Docs from './menu.api.mdx';
import '../text';
import './menu';

export default {
	title: 'Components/menu',
	argTypes: {
		select: {
			action: 'selected',
			table: {
				disable: true,
			},
		},
		bordered: {
			control: {
				type: 'boolean',
			},
		},
		striped: {
			control: {
				type: 'boolean',
			},
		},
	},
	parameters: {
		docs: {
			page: Docs,
		},
	},
};

export const Playground = ( args ) => html`
	<xb-menu
		?bordered=${ args.bordered }
		?striped=${ args.striped }
		@xb-select=${ args.select }
	>
		<xb-menu-item value="change">Change</xb-menu-item>
		<xb-menu-item value="accept" checked>Accept</xb-menu-item>
		<xb-menu-item value="leave">Leave</xb-menu-item>
	</xb-menu>
`;

Playground.args = {
	striped: false,
	bordered: false,
};
