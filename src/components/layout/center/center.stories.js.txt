import { html } from 'lit-html';

import { BorderlessArg, PaddinglessArg } from '../../../common/arg-types';
import './center';

/** @type {Meta} */
const meta = {
	title: 'Foundation/Layouts/center',
	component: 'xb-center',
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

/** @type {CenterStory} */
export const Playground = {
	render: ( args ) => html`
		<div style="display: flex; flex-direction: column; width: 100%; gap: var(--xb-spacing-4);">
			<xb-center
				style="--xb-center-background-color: rgb(var(--xb-color-background)); --xb-center-border-style: solid;"
				paddingless=${ args.paddingless }
				borderless=${ args.borderless }
			>
				Content
			</xb-center>
		</div>
	`,

	args: {
		paddingless: 'none',
		borderless: 'none',
	},
};

/**
 * @typedef {import('./center').CenterLayout} Center
 * @typedef {import('@storybook/web-components').StoryObj<Center>} CenterStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
