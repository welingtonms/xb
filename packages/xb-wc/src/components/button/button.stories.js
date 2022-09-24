import { html } from 'lit-html';

import Docs from './button.api.mdx';
import './button';

export default {
	title: 'Components/button',
	argTypes: {
		emphasis: {
			control: {
				type: 'select',
				options: [ 'text', 'ghost', 'flat' ],
			},
		},
		children: {
			table: {
				disable: true,
			},
		},
		click: {
			action: 'clicked',
			table: {
				disable: true,
			},
		},
		disabled: {
			control: {
				type: 'boolean',
			},
		},
		size: {
			control: {
				type: 'select',
				options: [ 'small', 'medium', 'large' ],
			},
		},
	},
	parameters: {
		docs: {
			page: Docs,
		},
	},
};

export const Playground = ( args ) => html`
	<xb-button
		emphasis="text"
		size=${ args.size }
		?disabled=${ args.disabled }
		@click=${ args.click }
		>Button</xb-button
	>
	<xb-button
		emphasis="ghost"
		size=${ args.size }
		?disabled=${ args.disabled }
		@click=${ args.click }
		>Button</xb-button
	>
	<xb-button
		emphasis="flat"
		size=${ args.size }
		?disabled=${ args.disabled }
		@click=${ args.click }
		>Button</xb-button
	>
`;

Playground.args = {
	emphasis: 'ghost',
	size: 'small',
	disabled: false,
};
