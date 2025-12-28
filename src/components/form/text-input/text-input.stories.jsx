import React from 'react';

import { SizeArg } from '../../../utils/arg-types';

import './text-input.define';
import '../../button/button.define';
import '../../icon/icon.define';
import '../../text/text.define';
import '../select/select.define';


/** @type {Meta} */
export default {
	title: 'Components/Form/Text Input',
	parameters: {
		layout: 'padded',
	},

	argTypes: {
		disabled: {
			control: {
				type: 'boolean',
			},
		},
		input: {
			action: 'input',
			table: {
				disable: true,
			},
		},
		change: {
			action: 'change',
			table: {
				disable: true,
			},
		},
		size: SizeArg,
		disabled: { control: 'boolean' },
	},
	parameters: {},
};

/** @type {StoryObj} */
export const Playground = {
	render: ( args ) => (
		<xb-stack>
			<xb-text-input type="text" disabled={ args.disabled } size={ args.size } />
			<xb-text-input type="text" disabled={ args.disabled } size={ args.size }>
				<xb-select borderless="all" slot="addon-leading" type="single-strict">
					<xb-option value="USD">USD</xb-option>
					<xb-option value="EUR">EUR</xb-option>
					<xb-option value="GBP">GBP</xb-option>
				</xb-select>
			</xb-text-input>
			<xb-text-input type="text" disabled={ args.disabled } size={ args.size }>
				<xb-button slot="addon-leading" size="sm" variant="icon" icon="certificate"></xb-button>
			</xb-text-input>
			<xb-text-input type="text" disabled={ args.disabled } size={ args.size }>
				<xb-button
					slot="addon-trailing"
					size="sm"
					variant="icon"
					icon="magnifying-glass"
				></xb-button>
			</xb-text-input>

			<xb-text-input type="text" disabled={ args.disabled } size={ args.size }>
				<xb-icon slot="leading" name="magnifying-glass" />
			</xb-text-input>

			<xb-text-input type="text" disabled={ args.disabled } size={ args.size }>
				<xb-text slot="leading">https://</xb-text>
			</xb-text-input>

			<xb-text-input type="text" disabled={ args.disabled } size={ args.size }>
				<xb-text slot="trailing">,00</xb-text>
			</xb-text-input>

			<xb-text-input type="text" disabled={ args.disabled } size={ args.size }>
				<xb-text slot="leading">USD</xb-text>
				<xb-text slot="trailing">,00</xb-text>
			</xb-text-input>
		</xb-stack>
	),

	args: {
		type: 'text',
		disabled: false,
		size: 'small',
	},
};
