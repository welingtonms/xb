import { html } from 'lit-html';

import { BorderlessArg, PaddinglessArg } from '../../../common/arg-types';
import './center';

export default {
	title: 'Foundation/Layouts/center',
	component: 'xb-center',
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

const style =
	'--xb-center-background-color: rgb(var(--xb-color-background)); --xb-center-border-style: solid;';

export const Playground = {
	render: ( args ) =>
		html`
			<div
				style="display: flex; flex-direction: column; width: 100%; gap: var(--xb-spacing-4);"
			>
				<xb-center style=${ style } borderless paddingless>Content</xb-center>
				<xb-center
					style=${ style }
					paddingless=${ args.paddingless }
					borderless=${ args.borderless }
				>
					Content
				</xb-center>
			</div>
		`,

	args: {
		paddingless: 'none',
		borderless: 'none',
	},
};
