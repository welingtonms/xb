import { html } from 'lit-html';

import { BorderlessArg, PaddinglessArg } from '../../../common/arg-types';
import '../box';
import './switcher';

export default {
	title: 'Foundation/Layouts/switcher',
	component: 'xb-switcher',
	argTypes: {
		paddingless: PaddinglessArg,
		borderless: BorderlessArg,
		children: {
			table: {
				disable: true,
			},
		},
		limit: {
			control: 'select',
			options: [ 3, 4, 5, 6 ],
		},
	},
	parameters: {},
};

const style = '--xb-switcher-background-color: rgb(var(--xb-color-background));';

export const Playground = {
	render: ( args ) => html`
		<xb-switcher
			style=${ style }
			paddingless=${ args.paddingless }
			borderless=${ args.borderless }
			limit=${ args.limit }
		>
			<xb-box paddingless="none" borderless="none">Here is the content from Box 1</xb-box>
			<xb-box paddingless="none" borderless="none">Here is the content from Box 2</xb-box>
			<xb-box paddingless="none" borderless="none">Here is the content from Box 3</xb-box>
			<xb-box paddingless="none" borderless="none">Here is the content from Box 4</xb-box>
			<xb-box paddingless="none" borderless="none">Here is the content from Box 5</xb-box>
		</xb-switcher>
	`,

	args: {
		limit: 4,
		paddingless: 'none',
		borderless: 'none',
	},
};
