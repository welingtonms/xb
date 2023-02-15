import { html } from 'lit-html';

import { BorderlessArg, PaddinglessArg } from '../../../common/arg-types';
import '../box';
import './stack';

/** @type {import('../../../common/arg-types').Meta} */
const meta = {
	title: 'Foundation/Layouts/stack',
	component: 'xb-stack',
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
	'--xb-stack-background-color: rgb(var(--xb-color-background)); width: 100%;';

export default meta;

/** @type {import('../../../common/arg-types').StoryObj} */
export const Playground = {
	render: ( args ) => html`
		<xb-stack
			style=${ style }
			paddingless=${ args.paddingless }
			borderless=${ args.borderless }
		>
			<xb-box paddingless="none" borderless="none">Box 1</xb-box>
			<xb-box paddingless="none" borderless="none">Box 2</xb-box>
			<xb-box paddingless="none" borderless="none">Box 3</xb-box>
		</xb-stack>
	`,

	args: {
		paddingless: 'none',
		borderless: 'none',
	},
};
