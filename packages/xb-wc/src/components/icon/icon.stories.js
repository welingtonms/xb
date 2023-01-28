import { html } from 'lit-html';
import Icons from '@welingtonms/xb-icons';

import Docs from './icon.api.mdx';
import './icon';

export default {
	title: 'Components/icon',
	component: 'xb-icon',

	argTypes: {
		name: {
			control: {
				type: 'select',
				options: Object.keys( Icons ),
			},
		},
		size: {
			control: {
				type: 'number',
			},
		},
	},
};

export const Playground = {
	render: ( args ) =>
		html`
			<xb-icon
				name="${ args.name }"
				size="${ args.size }"
				style="--xb-icon-color: rgb(var(--xb-color-secondary-500));"
			></xb-icon>
		`,

	args: { name: 'star', size: 32 },
	parameters: {
		docs: {
			page: Docs,
		},
	},
};
