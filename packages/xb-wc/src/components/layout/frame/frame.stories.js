import { html } from 'lit-html';

import { BorderlessArg, PaddinglessArg } from '../../../common/arg-types';
import '../box';
import './frame';

export default {
	title: 'Foundation/Layouts/frame',
	component: 'xb-frame',
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

const style = '--xb-frame-background-color: rgb(var(--xb-color-background));';

export const Playground = {
	render: ( args ) => html`
		<xb-frame
			style=${ style }
			paddingless=${ args.paddingless }
			borderless=${ args.borderless }
		>
			<img src="https://picsum.photos/200/300" />
		</xb-frame>
	`,

	args: {
		paddingless: 'none',
		borderless: 'none',
	},
};
