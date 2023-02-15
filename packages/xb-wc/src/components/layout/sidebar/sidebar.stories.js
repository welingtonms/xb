import { html } from 'lit-html';

import { BorderlessArg, PaddinglessArg } from '../../../common/arg-types';
import '../box';
import './sidebar';

/** @type {import('../../../common/arg-types').Meta} */
const meta = {
	title: 'Foundation/Layouts/sidebar',
	component: 'sidebar',
	argTypes: {
		paddingless: PaddinglessArg,
		borderless: BorderlessArg,
		sidePosition: {
			control: 'select',
			options: [ 'left', 'right' ],
		},
		minContentWidth: {
			control: 'select',
			options: [ '25%', '50%', '75%' ],
		},
		children: {
			table: {
				disable: true,
			},
		},
	},
	parameters: {},
};

export default meta;

/** @type {import('../../../common/arg-types').StoryObj} */
export const Playground = {
	render: ( args ) => html`
		<xb-sidebar
			style="--xb-sidebar-background-color: rgb(var(--xb-color-background)); --xb-sidebar-min-content-width: ${ args.minContentWidth };"
			side-position=${ args.sidePosition }
			paddingless=${ args.paddingless }
			borderless=${ args.borderless }
		>
			<xb-box paddingless="none" borderless="none">
				${ args.sidePosition === 'left'
					? 'I am the side content.'
					: 'I am the main content.' }
			</xb-box>

			<xb-box paddingless="none" borderless="none">
				${ args.sidePosition === 'left'
					? 'I am the main content.'
					: 'I am the side content.' }
			</xb-box>
		</xb-sidebar>
	`,

	args: {
		paddingless: 'none',
		borderless: 'none',
		sidePosition: 'left',
		minContentWidth: '50%',
	},
};
