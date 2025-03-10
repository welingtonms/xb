import { html } from 'lit-html';

import { BorderlessArg, PaddinglessArg, SpacingArg } from '../../../common/arg-types';
import '../box';
import './stack';

/** @type {Meta} */
const meta = {
	title: 'Foundation/Layouts/stack',
	component: 'xb-stack',
	argTypes: {
		gap: SpacingArg,
		borderless: BorderlessArg,
		paddingless: PaddinglessArg,
		children: {
			table: {
				disable: true,
			},
		},
	},
	parameters: {},
};

export default meta;

/** @type {StackStory} */
export const Playground = {
	render: ( args ) => html`
		<xb-stack
			style=${ `--xb-stack-background-color: rgb(var(--xb-color-background)); --xb-stack-gap: ${ args.gap }` }
			paddingless=${ args.paddingless }
			borderless=${ args.borderless }
		>
			<xb-box paddingless="none" borderless="none">Box 1</xb-box>
			<xb-box paddingless="none" borderless="none">Box 2</xb-box>
			<xb-box paddingless="none" borderless="none">Box 3</xb-box>
		</xb-stack>
	`,

	args: {
		gap: '8px',
		paddingless: 'none',
		borderless: 'none',
	},
};

/**
 * @typedef {import('./stack').StackLayout} Stack
 * @typedef {import('@storybook/web-components').StoryObj<Stack>} StackStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
