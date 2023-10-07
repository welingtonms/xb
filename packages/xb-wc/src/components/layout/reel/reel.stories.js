import { html } from 'lit-html';

import { BorderlessArg, PaddinglessArg } from '../../../common/arg-types';
import '../box';
import './reel';

/** @type {Meta} */
const meta = {
	title: 'Foundation/Layouts/reel',
	component: 'xb-reel',
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

/** @type {ReelStory} */
export const Playground = {
	render: ( args ) => html`
		<xb-reel>
			<div role="listitem">
				<a class="cta" href="/path/to/home">Home</a>
			</div>
			<div role="listitem">
				<a class="cta" href="/path/to/about">About</a>
			</div>
			<div role="listitem">
				<a class="cta" href="/path/to/pricing">Pricing</a>
			</div>
			<div role="listitem">
				<a class="cta" href="/path/to/docs">Documentation</a>
			</div>
			<div role="listitem">
				<a class="cta" href="/path/to/testimonials">Testimonials</a>
			</div>
			<div role="listitem">
				<a class="cta" href="/path/to/careers">Careers</a>
			</div>
			<div role="listitem">
				<a class="cta" href="/path/to/forum">Forum</a>
			</div>
			<div role="listitem">
				<a class="cta" href="/path/to/forum">Accessibility</a>
			</div>
		</xb-reel>
	`,

	args: {
		paddingless: 'none',
		borderless: 'none',
	},
};

/**
 * @typedef {import('./reel').ReelLayout} Reel
 * @typedef {import('@storybook/web-components').StoryObj<Reel>} ReelStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
