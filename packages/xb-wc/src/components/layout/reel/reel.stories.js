import { html } from 'lit-html';

import Docs from './reel.api.mdx';
import '../box';
import './reel';

export default {
	title: 'Foundation/Layouts/reel',
	argTypes: {
		paddingless: {
			control: {
				type: 'select',
				options: [
					'none',
					'horizontal',
					'vertical',
					'top',
					'right',
					'bottom',
					'left',
				],
			},
		},
		borderless: {
			control: {
				type: 'select',
				options: [
					'none',
					'horizontal',
					'vertical',
					'top',
					'right',
					'bottom',
					'left',
				],
			},
		},
		children: {
			table: {
				disable: true,
			},
		},
	},
	parameters: {
		docs: {
			page: Docs,
		},
	},
};

const style = '--xb-reel-background-color: rgb(var(--xb-color-background));';

export const Playground = ( args ) => html`
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
`;

Playground.args = {
	paddingless: 'none',
	borderless: 'none',
};
