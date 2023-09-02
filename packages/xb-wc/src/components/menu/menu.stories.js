import { html } from 'lit-html';

import { SizeArg } from '../../common/arg-types';

import '../text';
import './menu';
import './menu-item';

/** @type {import('../../common/arg-types').Meta} */
const meta = {
	title: 'Components/menu',
	component: 'xb-menu',
	argTypes: {
		click: {
			action: 'clicked',
			table: {
				disable: true,
			},
		},
		size: SizeArg,
	},
	parameters: {},
};

export default meta;

/** @type {import('../../common/arg-types').StoryObj} */
export const Playground = {
	render: ( args ) => html`
		<xb-menu aria-label="Life choices" @click=${ args.click }>
			<xb-item>Accept</xb-item>
			<xb-item>Change</xb-item>
			<xb-item>Leave</xb-item>
		</xb-menu>
	`,

	args: {
		size: 'small',
	},
};
