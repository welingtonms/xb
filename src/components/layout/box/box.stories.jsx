import React from 'react';

import { BorderlessArg, PaddinglessArg } from '../../../utils/arg-types';

import './box.define';

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

export const Playground = {
	render: ( args ) => (
		<xb-box
			style={ { '--xb-box-background-color': 'rgb(var(--xb-color-background))' } }
			paddingless={ args.paddingless }
			borderless={ args.borderless }
		>
			<span slot="leading">&diams;</span>
			Content
			<span slot="trailing">&clubs;</span>
		</xb-box>
	),

	args: {
		paddingless: 'none',
		borderless: 'none',
	},
};
