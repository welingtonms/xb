import { html } from 'lit-html';

import '../box';
import './cluster';

export default {
	title: 'Foundation/Layouts/cluster',
	component: 'xb-cluster',
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
	parameters: {},
};

const style = '--xb-cluster-background-color: rgb(var(--xb-color-background));';

export const Playground = {
	render: ( args ) => html`
		<xb-cluster
			style=${ style }
			paddingless=${ args.paddingless }
			borderless=${ args.borderless }
		>
			<xb-box paddingless="none" borderless="none">Box 1</xb-box>
			<xb-box paddingless="none" borderless="none">Box 2</xb-box>
			<xb-box paddingless="none" borderless="none">Box 3</xb-box>
		</xb-cluster>
	`,

	args: {
		paddingless: 'none',
		borderless: 'none',
	},
};
