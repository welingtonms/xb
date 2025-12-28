import React from 'react';

import { SizeArg } from '../../utils/arg-types';

import './badge.define';
import './badge-group.define';
import '../icon/icon.define';
import '../layout';

export default {
	title: 'Components/Badge',
	parameters: {
		layout: 'padded',
	},
	argTypes: {
		// backgroundColor: { control: 'color' },
		color: {
			control: 'select',
			options: [
				'gray',
				'primary',
				'error',
				'warning',
				'success',
				'blue-gray',
				'blue-light',
				'blue',
				'indigo',
				'purple',
				'pink',
				'rose',
				'orange',
			],
		},
		size: SizeArg,
	},
	tags: [ 'autodocs' ],
};

/** @type {BadgeStory} */
export const Playground = {
	render: ( args ) => {
		return (
			<xb-stack>
				<xb-cluster style={ { '--xb-cluster-gap': '16px' } }>
					<xb-badge color={ args.color } size={ args.size }>
						Potatoes
					</xb-badge>
					<xb-badge variant="icon" color={ args.color } size={ args.size }>
						<xb-icon name="check"></xb-icon>
					</xb-badge>
					<xb-badge color={ args.color } size={ args.size }>
						<xb-icon slot="leading" name="check"></xb-icon>
						Potatoes
					</xb-badge>
					<xb-badge color={ args.color } size={ args.size }>
						Potatoes
						<xb-icon slot="trailing" name="check"></xb-icon>
					</xb-badge>
				</xb-cluster>

				<xb-cluster style={ { '--xb-cluster-gap': '16px' } }>
					<xb-badge-group color={ args.color } size={ args.size }>
						<xb-badge slot="leading" color={ args.color } size={ args.size }>
							New feature
						</xb-badge>
						We have just released a new version of our product.
					</xb-badge-group>
					<xb-badge-group color={ args.color } size={ args.size }>
						<xb-badge slot="leading" color={ args.color } size={ args.size }>
							New feature
						</xb-badge>
						We have just released a new version of our product.
						<xb-icon slot="trailing" name="check"></xb-icon>
					</xb-badge-group>
					<xb-badge-group color={ args.color } size={ args.size }>
						We have just released a new version of our product.
						<xb-badge slot="trailing" color={ args.color } size={ args.size }>
							New feature
						</xb-badge>
					</xb-badge-group>

					<xb-badge-group color={ args.color } size={ args.size }>
						We have just released a new version of our product.
						<xb-badge slot="trailing" color={ args.color } size={ args.size }>
							New feature
							<xb-icon slot="trailing" name="arrow-right"></xb-icon>
						</xb-badge>
					</xb-badge-group>
				</xb-cluster>
			</xb-stack>
		);
	},

	args: {
		color: 'primary',
		size: 'md',
	},
};
