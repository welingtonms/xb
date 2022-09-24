import { html } from 'lit-html';

import Docs from './grid.api.mdx';
import '../box';
import './grid';

export default {
	title: 'Foundation/Layouts/grid',
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

const style = '--xb-grid-background-color: rgb(var(--xb-color-background));';

export const Playground = ( args ) => html`
	<xb-grid
		style=${ style }
		paddingless=${ args.paddingless }
		borderless=${ args.borderless }
	>
		<xb-box paddingless="none" borderless="none">Box 1</xb-box>
		<xb-box paddingless="none" borderless="none">Box 2</xb-box>
		<xb-box paddingless="none" borderless="none">Box 3</xb-box>
		<xb-box paddingless="none" borderless="none">Box 4</xb-box>
		<xb-box paddingless="none" borderless="none">Box 5</xb-box>
	</xb-grid>
`;

Playground.args = {
	paddingless: 'none',
	borderless: 'none',
};
