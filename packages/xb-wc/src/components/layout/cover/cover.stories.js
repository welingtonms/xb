import { html } from 'lit-html';

import '../../text';
import '../box';

import './cover';

export default {
	title: 'Foundation/Layouts/cover',
	component: 'xb-cover',
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

const style = '--xb-cover-background-color: rgb(var(--xb-color-background));';

export const Playground = {
	render: ( args ) => html`
		<xb-cover
			style=${ style }
			paddingless=${ args.paddingless }
			borderless=${ args.borderless }
		>
			<xb-text>Box 1</xb-text>
			<xb-box class="-cover-centered" paddingless="none" borderless="none">
				Box 2. I'm vertically centered
			</xb-box>
			<xb-text>Box 3</xb-text>
		</xb-cover>
	`,

	args: {
		paddingless: 'none',
		borderless: 'none',
	},
};
