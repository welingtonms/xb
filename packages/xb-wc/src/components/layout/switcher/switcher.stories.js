import { html } from 'lit-html';

import Docs from './switcher.api.mdx';
import '../box';
import './switcher';

export default {
	title: 'Foundation/Layouts/switcher',
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
		limit: {
			control: {
				type: 'select',
				options: [ 3, 4, 5, 6 ],
			},
		},
	},
	parameters: {
		docs: {
			page: Docs,
		},
	},
};

const style =
	'--xb-switcher-background-color: rgb(var(--xb-color-background));';

export const Playground = ( args ) => html`
	<xb-switcher
		style=${ style }
		paddingless=${ args.paddingless }
		borderless=${ args.borderless }
		limit=${ args.limit }
	>
		<xb-box paddingless="none" borderless="none"
			>Here is the content from Box 1</xb-box
		>
		<xb-box paddingless="none" borderless="none"
			>Here is the content from Box 2</xb-box
		>
		<xb-box paddingless="none" borderless="none"
			>Here is the content from Box 3</xb-box
		>
		<xb-box paddingless="none" borderless="none"
			>Here is the content from Box 4</xb-box
		>
		<xb-box paddingless="none" borderless="none"
			>Here is the content from Box 5</xb-box
		>
	</xb-switcher>
`;

Playground.args = {
	limit: 4,
	paddingless: 'none',
	borderless: 'none',
};
