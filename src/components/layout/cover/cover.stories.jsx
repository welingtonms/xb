import React from 'react';

import { BorderlessArg, PaddinglessArg } from '../../../utils/arg-types';
import '../../text/text.define';
import '../box/box.define';

import './cover.define';

export default {
	title: 'Foundation/Layouts/cover',
	component: 'xb-cover',
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

const style = { '--xb-cover-background-color': 'rgb(var(--xb-color-background))' };

export const Playground = {
	render: ( args ) => (
		<xb-cover style={ style } paddingless={ args.paddingless } borderless={ args.borderless }>
			<xb-text>Box 1</xb-text>
			<xb-box className="-cover-centered" paddingless="none" borderless="none">
				Box 2. I'm vertically centered
			</xb-box>
			<xb-text>Box 3</xb-text>
		</xb-cover>
	),

	args: {
		paddingless: 'none',
		borderless: 'none',
	},
};
