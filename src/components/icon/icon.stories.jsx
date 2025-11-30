import React from 'react';

import Icons from './icons';
import './icon.define';

export default {
	title: 'Components/Icon',
	parameters: {
		layout: 'padded',
	},
	argTypes: {
		name: {
			control: 'select',
			options: Object.keys( Icons ).sort(),
		},
		size: {
			control: {
				type: 'number',
			},
		},
	},
};

/** @type {IconStory} */
export const Playground = {
	args: { name: 'star', size: 32 },
	render: ( args ) => {
		return (
			<xb-icon
				name={ args.name }
				size={ args.size }
				style={ { '--xb-icon-color': 'rgb(var(--xb-color-secondary-500))' } }
			></xb-icon>
		);
	},
};

/**
 * @typedef {import('./icon').Icon} Icon
 * @typedef {import('@storybook/web-components').StoryObj<Icon>} IconStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
