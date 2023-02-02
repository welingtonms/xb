import { html } from 'lit-html';

import { BorderlessArg, PaddinglessArg } from '../../../common/arg-types';
import './box';

export default {
	title: 'Foundation/Layouts/box',
	component: 'xb-box',
	argTypes: {
		paddingless: PaddinglessArg,
		borderless: BorderlessArg,
		children: {
			table: {
				disable: true,
			},
		},
	},
	parameters: {},
};

const style = '--xb-box-background-color: rgb(var(--xb-color-background));';

export const Playground = {
	render: ( args ) => html`
		<xb-box style=${ style } borderless paddingless>Content</xb-box>
		<xb-box
			style=${ style }
			paddingless=${ args.paddingless }
			borderless=${ args.borderless }
		>
			Content
		</xb-box>
		<xb-box
			style=${ style }
			paddingless=${ args.paddingless }
			borderless=${ args.borderless }
		>
			<span slot="leading">&spades;</span>
			Content
		</xb-box>
		<xb-box
			style=${ style }
			paddingless=${ args.paddingless }
			borderless=${ args.borderless }
		>
			<span slot="trailing">&hearts;</span>
			Content
		</xb-box>
		<xb-box
			style=${ style }
			paddingless=${ args.paddingless }
			borderless=${ args.borderless }
		>
			<span slot="leading">&diams;</span>
			Content
			<span slot="trailing">&clubs;</span>
		</xb-box>
	`,

	args: {
		paddingless: 'none',
		borderless: 'none',
	},
};
