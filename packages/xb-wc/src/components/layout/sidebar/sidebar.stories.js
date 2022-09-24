import { html } from 'lit-html';

import Docs from './sidebar.api.mdx';
import '../box';
import './sidebar';

export default {
	title: 'Foundation/Layouts/sidebar',
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
		sidePosition: {
			control: {
				type: 'select',
				options: [ 'left', 'right' ],
			},
		},
		minContentWidth: {
			control: {
				type: 'select',
				options: [ '25%', '50%', '75%' ],
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

export const Playground = ( args ) => html`
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
`;

Playground.args = {
	paddingless: 'none',
	borderless: 'none',
	sidePosition: 'left',
	minContentWidth: '50%',
};
