import React from 'react';

import { ScaleArg } from '../../utils/arg-types';

import toCSSValue from '../../utils/to-css-value';

import '../layout/layout.define';
import '../icon/icon.define';
import './menu.define';

export default {
	title: 'Components/Menu',
	parameters: {
		layout: 'padded',
	},
	argTypes: {
		loading: {
			control: 'boolean',
		},
		click: {
			action: 'clicked',
			table: {
				disable: true,
			},
		},
	},
};

export const Playground = {
	args: {
		size: 'small',
			},
	render: ( args ) => {
		return (
			<xb-stack>
				<xb-menu aria-label="Life choices" loading={ args.loading } size={ args.size } onclick={ args.click }>
					<xb-item>Accept</xb-item>
					<xb-item>Change</xb-item>
					<xb-item>Leave</xb-item>
				</xb-menu>
				<xb-menu aria-label="Life choices" loading={ args.loading } size={ args.size } onclick={ args.click }>
					<xb-item icon="check">Accept</xb-item>
					<xb-item icon="arrows-clockwise">Change</xb-item>
					<xb-item icon="sign-out">Leave</xb-item>
				</xb-menu>
				<xb-menu aria-label="Life choices" loading={ args.loading } size={ args.size } onclick={ args.click }>
					<xb-item>
						<xb-icon name="circle-fill" size={ 8 } color={ toCSSValue( 'color-success-500' ) }></xb-icon>
						Accept
					</xb-item>
					<xb-item>
						<xb-icon name="circle-fill" size={ 8 } color={ toCSSValue( 'color-warning-500' ) }></xb-icon>
						Change
					</xb-item>
					<xb-item>
						<xb-icon name="circle-fill" size={ 8 } color={ toCSSValue( 'color-error-500' ) }></xb-icon>
						Leave
					</xb-item>
				</xb-menu>
			</xb-stack>
		);
	},
};

/**
 * @typedef {import('./menu').Menu} Menu
 * @typedef {import('@storybook/web-components').StoryObj<Menu>} MenuStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
