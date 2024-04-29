import { html } from 'lit-html';

import { BorderlessArg, PaddinglessArg } from '../../../common/arg-types';

import './box';

/** @type {Meta} */
const meta = {
	title: 'Foundation/Layouts/box',
	component: 'xb-box',
	argTypes: {
		paddingless: PaddinglessArg,
		borderless: BorderlessArg,
		children: {
			table: {
				disable: true,
			},
		},
	},
	parameters: {},
};

export default meta;

/** @type {BoxStory} */
export const Playground = {
	render: ( args ) => html`
		<xb-box
			style="--xb-box-background-color: rgb(var(--xb-color-background));"
			paddingless=${ args.paddingless }
			borderless=${ args.borderless }
		>
			<span slot="leading">&diams;</span>
			Content
			<span slot="trailing">&clubs;</span>
		</xb-box>
	`,

	args: {
		paddingless: 'none',
		borderless: 'none',
	},
};

/**
 * @typedef {import('./box').BoxLayout} Box
 * @typedef {import('@storybook/web-components').StoryObj<Box>} BoxStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
