import React from 'react';

import { BorderlessArg, PaddinglessArg } from '../../../utils/arg-types';
import '../box/box.define';
import './frame.define';

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

const style = { '--xb-frame-background-color': 'rgb(var(--xb-color-background))' };

export const Playground = {
	render: ( args ) => (
		<xb-frame style={ style } paddingless={ args.paddingless } borderless={ args.borderless }>
			<img src="https://picsum.photos/200/300" />
		</xb-frame>
	),

	args: {
		paddingless: 'none',
		borderless: 'none',
	},
};
