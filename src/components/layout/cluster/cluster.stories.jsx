import React from 'react';

import { BorderlessArg, PaddinglessArg, SpacingArg } from '../../../utils/arg-types';
import '../box/box.define';
import './cluster.define';

export default {
	title: 'Foundation/Layouts/cluster',
	component: 'xb-cluster',
	argTypes: {
		gap: SpacingArg,
		borderless: BorderlessArg,
		paddingless: PaddinglessArg,
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
		<xb-cluster
			style={ {
				'--xb-cluster-background-color': 'rgb(var(--xb-color-background))',
				'--xb-cluster-gap': args.gap,
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
		</xb-cluster>
	),

	args: {
		gap: '8px',
		paddingless: 'none',
		borderless: 'none',
	},
};
