import { html } from 'lit-html';

import { SizeArg } from '../../common/arg-types';

import './menu';
import './menu-item';

/** @type {Meta} */
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

/** @type {MenuStory} */
export const Playground = {
	render: ( args ) => html`
		<xb-menu aria-label="Life choices" size=${ args.size } @click=${ args.click }>
			<xb-item>Accept</xb-item>
			<xb-item>Change</xb-item>
			<xb-item>Leave</xb-item>
		</xb-menu>
	`,

	args: {
		size: 'small',
	},
};

/**
 * @typedef {import('./menu').Menu} Menu
 * @typedef {import('@storybook/web-components').StoryObj<Menu>} MenuStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
