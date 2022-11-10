import { html } from 'lit-html';
import Icons from '@welingtonms/xb-icons';

import Docs from './icon.api.mdx';
import './icon';

export default {
	title: 'Components/icon',

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
	parameters: {
		docs: {
			page: Docs,
		},
	},
};

export const Playground = ( args ) =>
	html`<xb-icon
		name="${ args.name }"
		size="${ args.size }"
		style="--xb-icon-color: rgb(var(--xb-color-secondary-500));"
	></xb-icon>`;

Playground.args = { name: 'star', size: 32 };
