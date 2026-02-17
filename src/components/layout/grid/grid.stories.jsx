import React from 'react';

import { BorderlessArg, PaddinglessArg, SpacingArg } from '../../../utils/arg-types';
import '../box/box.define';
import './grid.define';

export default {
	title: 'Foundation/Layouts/grid',
	component: 'xb-grid',
	argTypes: {
		paddingless: PaddinglessArg,
		borderless: BorderlessArg,
		gap: SpacingArg,
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
		<xb-grid
			style={ {
				'--xb-grid-background-color': 'rgb(var(--xb-color-background))',
				'--xb-grid-gap': args.gap,
			} }
			paddingless={ args.paddingless }
			borderless={ args.borderless }
		>
			<xb-box paddingless="none" borderless="none">
				Box 1
			</xb-box>
			<xb-box paddingless="none" borderless="none">
				Box 2
			</xb-box>
			<xb-box paddingless="none" borderless="none">
				Box 3
			</xb-box>
			<xb-box paddingless="none" borderless="none">
				Box 4
			</xb-box>
			<xb-box paddingless="none" borderless="none">
				Box 5
			</xb-box>
		</xb-grid>
	),

	args: {
		gap: '8px',
		paddingless: 'none',
		borderless: 'none',
	},
};
