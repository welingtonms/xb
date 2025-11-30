import React, { useRef, useEffect } from 'react';
import { html, render } from 'lit';

import './text-input.define';
import '../../button/button.define';
import '../../icon/icon.define';
import '../../text/text.define';
import '../select/select.define';

import { TextInput as TextInputElement } from './text-input';

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
		disabled: { control: 'boolean' },
	},
	parameters: {},
};

/** @type {StoryObj} */
export const Playground = {
	render: ( args ) => (
		<xb-stack>
			<xb-text-input type="text" disabled={ args.disabled } />
			<xb-text-input type="text" disabled={ args.disabled }>
				<xb-select borderless="all" slot="addon-leading" type="single-strict">
					<xb-option value="USD">USD</xb-option>
					<xb-option value="EUR">EUR</xb-option>
					<xb-option value="GBP">GBP</xb-option>
				</xb-select>
				{ /* <xb-button slot="addon-leading" scale="sm" variant="icon" icon="certificate"></xb-button> */ }
			</xb-text-input>
			<xb-text-input type="text" disabled={ args.disabled }>
				<xb-button
					slot="addon-trailing"
					scale="sm"
					variant="icon"
					icon="magnifying-glass"
				></xb-button>
			</xb-text-input>

			<xb-text-input type="text" disabled={ args.disabled }>
				<xb-icon slot="leading" name="magnifying-glass" />
			</xb-text-input>

			<xb-text-input type="text" disabled={ args.disabled }>
				<xb-text slot="leading">https://</xb-text>
			</xb-text-input>

			<xb-text-input type="text" disabled={ args.disabled }>
				<xb-text slot="trailing">,00</xb-text>
			</xb-text-input>

			<xb-text-input type="text" disabled={ args.disabled }>
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
