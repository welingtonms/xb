import { html } from 'lit-html';
import Icons from '@welingtonms/xb-icons';

import Docs from './icon.api.mdx';
import './icon';

/** @type {import('../../common/arg-types').Meta} */
const meta = {
	title: 'Components/icon',
	component: 'xb-icon',

	argTypes: {
		name: {
			control: 'select',
			options: Object.keys( Icons ),
		},
		size: {
			control: {
				type: 'number',
			},
		},
	},

	parameters: {
		docs: {
			page: Docs,
		},
	},
};

export default meta;

/** @type {IconStory} */
export const Playground = {
	args: { name: 'star', size: 32 },
	render: ( args ) => html`
		<xb-icon
			name="${ args.name }"
			size="${ args.size }"
			style="--xb-icon-color: rgb(var(--xb-color-secondary-500));"
		></xb-icon>
	`,
};

/**
 * @typedef {import('./icon').Icon} Icon
 * @typedef {import('@storybook/web-components').StoryObj<Icon>} IconStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
