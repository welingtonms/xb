import { html } from 'lit-html';

import { BorderlessArg, PaddinglessArg } from '../../../common/arg-types';
import '../../text';
import '../box';

import './cover';

/** @type {Meta} */
const meta = {
	title: 'Foundation/Layouts/cover',
	component: 'xb-cover',
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

const style = '--xb-cover-background-color: rgb(var(--xb-color-background));';

export default meta;

/** @type {CoverStory} */
export const Playground = {
	render: ( args ) => html`
		<xb-cover style=${ style } paddingless=${ args.paddingless } borderless=${ args.borderless }>
			<xb-text>Box 1</xb-text>
			<xb-box class="-cover-centered" paddingless="none" borderless="none">
				Box 2. I'm vertically centered
			</xb-box>
			<xb-text>Box 3</xb-text>
		</xb-cover>
	`,

	args: {
		paddingless: 'none',
		borderless: 'none',
	},
};

/**
 * @typedef {import('./cover').CoverLayout} Cover
 * @typedef {import('@storybook/web-components').StoryObj<Cover>} CoverStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
