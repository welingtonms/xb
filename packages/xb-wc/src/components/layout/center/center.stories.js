import { html } from 'lit-html';

import Docs from './center.api.mdx';
import './center';

export default {
	title: 'Foundation/Layouts/center',
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
	'--xb-center-background-color: rgb(var(--xb-color-background)); --xb-center-border-style: solid;';

export const Playground = ( args ) =>
	html`
		<div
			style="display: flex; flex-direction: column; width: 100%; gap: var(--xb-spacing-4);"
		>
			<xb-center style=${ style } borderless paddingless>Content</xb-center>
			<xb-center
				style=${ style }
				paddingless=${ args.paddingless }
				borderless=${ args.borderless }
				>Content</xb-center
			>
		</div>
	`;

Playground.args = {
	paddingless: 'none',
	borderless: 'none',
};
