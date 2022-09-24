import { html } from 'lit-html';

import Docs from './text.api.mdx';
import './text';

export default {
	title: 'Components/text',
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {
		// backgroundColor: { control: 'color' },
		variant: {
			control: {
				type: 'select',
				options: [
					'h-1',
					'h-2',
					'h-3',
					'h-4',
					'h-5',
					'h-6',
					'subtitle-1',
					'subtitle-2',
					'body-1',
					'body-2',
					'button',
					'caption',
					'overline',
				],
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
	<xb-text variant=${ args.variant }>
		The quick brown fox jumps over the lazy dog
	</xb-text>
`;

Playground.args = {
	variant: 'body-1',
};
