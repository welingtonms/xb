import { html } from 'lit-html';

import Docs from './stack.api.mdx';
import '../box';
import './stack';

export default {
	title: 'Foundation/Layouts/stack',
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

const style =
	'--xb-stack-background-color: rgb(var(--xb-color-background)); width: 100%;';

export const Playground = ( args ) => html`
	<xb-stack
		style=${ style }
		paddingless=${ args.paddingless }
		borderless=${ args.borderless }
	>
		<xb-box paddingless="none" borderless="none">Box 1</xb-box>
		<xb-box paddingless="none" borderless="none">Box 2</xb-box>
		<xb-box paddingless="none" borderless="none">Box 3</xb-box>
	</xb-stack>
`;

Playground.args = {
	paddingless: 'none',
	borderless: 'none',
};
