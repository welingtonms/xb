import { html } from 'lit-html';

import Docs from './frame.api.mdx';
import '../box';
import './frame';

export default {
	title: 'Foundation/Layouts/frame',
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

const style = '--xb-frame-background-color: rgb(var(--xb-color-background));';

export const Playground = ( args ) => html`
	<xb-frame
		style=${ style }
		paddingless=${ args.paddingless }
		borderless=${ args.borderless }
	>
		<img src="https://picsum.photos/200/300" />
	</xb-frame>
`;

Playground.args = {
	paddingless: 'none',
	borderless: 'none',
};
