import React from 'react';

import { BorderlessArg, PaddinglessArg } from '../../../utils/arg-types';
import './center.define';

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

export const Playground = {
	render: ( args ) => (
		<div
			style={ {
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				gap: 'var(--xb-spacing-4)',
			} }
		>
			<xb-center
				style={ {
					'--xb-center-background-color': 'rgb(var(--xb-color-background))',
					'--xb-center-border-style': 'solid',
				} }
				paddingless={ args.paddingless }
				borderless={ args.borderless }
			>
				Content
			</xb-center>
		</div>
	),

	args: {
		paddingless: 'none',
		borderless: 'none',
	},
};
