import React from 'react';

import './text.define';

/** @type {Meta} */
export default {
	title: 'Components/Text',
	parameters: {
		layout: 'padded',
	},
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
				'text-sm',
				'text-md',
				'text-lg',
				'text-xl',
			],
		},
	},

};

/** @type {TextStory} */
export const Playground = {
	args: {
		variant: 'text-md',
	},
	render: ( args ) => {
		return (
			<xb-text variant={ args.variant }>
				The quick brown fox jumps over the lazy dog
			</xb-text>
		);
	},
};

/**
 * @typedef {import('./text').Text} Text
 * @typedef {import('@storybook/web-components').StoryObj<Text>} TextStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
