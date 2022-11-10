import { html } from 'lit-html';

import Docs from './checkbox.api.mdx';
import './checkbox';

export default {
	title: 'Components/form/checkbox',

	argTypes: {
		type: {
			control: {
				type: 'select',
				options: [ 'text', 'password', 'number' ],
			},
		},
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
		size: {
			control: {
				type: 'select',
				options: [ 'small', 'medium', 'large' ],
			},
		},
		change: {
			action: 'changed',
			table: {
				disable: true,
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
	<xb-stack>
		<xb-checkbox
			value="change"
			size=${ args.size }
			?disabled=${ args.disabled }
			@xb-change=${ args.change }
			>Change</xb-checkbox
		>
		<xb-checkbox
			value="accept"
			size=${ args.size }
			?disabled=${ args.disabled }
			@xb-change=${ args.change }
			>Accept</xb-checkbox
		>
		<xb-checkbox
			value="leave"
			size=${ args.size }
			?disabled=${ args.disabled }
			@xb-change=${ args.change }
			>Leave</xb-checkbox
		>
	</xb-stack>
`;

Playground.args = {
	type: 'text',
	disabled: false,
	size: 'small',
};
