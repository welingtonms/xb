import React from 'react';

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
			options: ['gray', 'primary', 'error', 'warning', 'success', 'blue-gray', 'blue-light', 'blue', 'indigo', 'purple', 'pink', 'rose', 'orange'],
		},
		scale: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
		},
	},
	tags: ['autodocs'],
  };

/** @type {BadgeStory} */
export const Playground = {
	render: (args) => {
		return (
			<xb-stack>
				<xb-cluster style={{'--xb-cluster-gap': '16px'}}>
					<xb-badge color={args.color} scale={args.scale}>Potatoes</xb-badge>
					<xb-badge variant="icon" color={args.color} scale={args.scale}>
					<xb-icon name="check"></xb-icon>
				</xb-badge>
				<xb-badge color={args.color} scale={args.scale}>
					<xb-icon slot="leading" name="check"></xb-icon>
					Potatoes
				</xb-badge>
				<xb-badge color={args.color} scale={args.scale}>
					Potatoes
					<xb-icon slot="trailing" name="check"></xb-icon>
				</xb-badge>
			</xb-cluster>

				<xb-cluster style={{'--xb-cluster-gap': '16px'}}>
					<xb-badge-group color={args.color} scale={args.scale}>
						<xb-badge slot="leading" color={args.color} scale={args.scale}>New feature</xb-badge>
						We have just released a new version of our product.
					</xb-badge-group>
					<xb-badge-group color={args.color} scale={args.scale}>
						<xb-badge slot="leading" color={args.color} scale={args.scale}>New feature</xb-badge>
						We have just released a new version of our product.
						<xb-icon slot="trailing" name="check"></xb-icon>
					</xb-badge-group>
					<xb-badge-group color={args.color} scale={args.scale}>
						We have just released a new version of our product.
						<xb-badge slot="trailing" color={args.color} scale={args.scale}>New feature</xb-badge>
					</xb-badge-group>

					<xb-badge-group color={args.color} scale={args.scale}>
						We have just released a new version of our product.
						<xb-badge slot="trailing" color={args.color} scale={args.scale}>New feature
						<xb-icon slot="trailing" name="arrow-forward"></xb-icon>

						</xb-badge>
					</xb-badge-group>
				</xb-cluster>
			</xb-stack>
		);
	},

	args: {
		color: 'primary',
		scale: 'md',
	},
};
