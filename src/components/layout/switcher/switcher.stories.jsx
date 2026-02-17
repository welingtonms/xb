import React from 'react';

import { BorderlessArg, PaddinglessArg, SpacingArg } from '../../../utils/arg-types';
import '../box/box.define';
import './switcher.define';

export default {
	title: 'Foundation/Layouts/switcher',
	component: 'xb-switcher',
	argTypes: {
		gap: SpacingArg,
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
		threshold: { control: { type: 'number', min: 400, max: 1200, step: 100 } },
	},
	parameters: {},
};

export const Playground = {
	render: ( args ) => (
		<xb-switcher
			style={ {
				'--xb-switcher-background-color': 'rgb(var(--xb-color-background))',
				'--xb-switcher-gap': args.gap,
				'--xb-switcher-threshold': `${ args.threshold }px`,
			} }
			paddingless={ args.paddingless }
			borderless={ args.borderless }
			limit={ args.limit }
		>
			<xb-box paddingless="none" borderless="none">
				Here is the content from Box 1
			</xb-box>
			<xb-box paddingless="none" borderless="none">
				Here is the content from Box 2
			</xb-box>
			<xb-box paddingless="none" borderless="none">
				Here is the content from Box 3
			</xb-box>
			<xb-box paddingless="none" borderless="none">
				Here is the content from Box 4
			</xb-box>
			<xb-box paddingless="none" borderless="none">
				Here is the content from Box 5
			</xb-box>
		</xb-switcher>
	),

	args: {
		gap: '8px',
		threshold: 1000,
		limit: 4,
		paddingless: 'none',
		borderless: 'none',
	},
};
