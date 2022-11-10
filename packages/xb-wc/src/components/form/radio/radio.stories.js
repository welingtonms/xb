import { html } from 'lit-html';

import Docs from './radio.api.mdx';
import './radio-group';
import './radio';

export default {
	title: 'Components/form/radio',

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
	<xb-radio-group
		size=${ args.size }
		?disabled=${ args.disabled }
		@xb-change=${ args.change }
	>
		<xb-radio value="change">Change</xb-radio>
		<xb-radio value="accept">Accept</xb-radio>
		<xb-radio value="leave">Leave</xb-radio>
	</xb-radio-group>
`;

Playground.args = {
	type: 'text',
	disabled: false,
	size: 'small',
};
