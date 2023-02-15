import { html } from 'lit-html';

import '../text';
import './menu';

/** @type {import('../../common/arg-types').Meta} */
const meta = {
	title: 'Components/menu',
	component: 'xb-menu',
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
	parameters: {},
};

export default meta;

/** @type {import('../../common/arg-types').StoryObj} */
export const Playground = {
	render: ( args ) => html`
		<xb-menu
			?bordered=${ args.bordered }
			?striped=${ args.striped }
			@xb-select=${ args.select }
		>
			<xb-menu-item value="change">Change</xb-menu-item>
			<xb-menu-item value="accept" selected>Accept</xb-menu-item>
			<xb-menu-item value="leave">Leave</xb-menu-item>
		</xb-menu>
	`,

	args: {
		striped: false,
		bordered: false,
	},
};
