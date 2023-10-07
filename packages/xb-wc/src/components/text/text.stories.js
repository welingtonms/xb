import { html } from 'lit-html';

import './text';

/** @type {Meta} */
const meta = {
	title: 'Components/text',
	component: 'xb-text',
	argTypes: {
		variant: {
			control: 'select',
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
	parameters: {},
};

export default meta;

/** @type {TextStory} */
export const Playground = {
	render: ( args ) => html`
		<xb-text variant=${ args.variant }>The quick brown fox jumps over the lazy dog</xb-text>
	`,

	args: {
		variant: 'body-1',
	},
};

/**
 * @typedef {import('./text').Text} Text
 * @typedef {import('@storybook/web-components').StoryObj<Text>} TextStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
