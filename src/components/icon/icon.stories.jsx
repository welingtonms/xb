import React from 'react';

import Icons from './icons';

import './icon.define';
import '../layout/layout.define';
import '../text/text.define';

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

export const Catalog = {
	args: { size: 32 },
	render: ( args ) => {
		return (
			<xb-cluster style={ { '--xb-cluster-gap': '16px' } }>
				{ Object.keys( Icons ).map( ( name ) => (
					<xb-stack
						key={ name }
						style={ {
							'--xb-stack-justify': 'center',
							'--xb-stack-align': 'center',
							'--xb-stack-gap': '16px',
							width: '100px',
						} }
					>
						<xb-icon name={ name } size={ args.size }></xb-icon>
						<xb-text variant="text-xs" style={ { textAlign: 'center' } }>
							{ name }
						</xb-text>
					</xb-stack>
				) ) }
			</xb-cluster>
		);
	},
};

/**
 * @typedef {import('./icon').Icon} Icon
 * @typedef {import('@storybook/web-components').StoryObj<Icon>} IconStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
