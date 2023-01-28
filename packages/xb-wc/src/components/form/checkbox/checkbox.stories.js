import { html } from 'lit-html';

import './checkbox';

export default {
	title: 'Components/form/checkbox',
	component: 'xb-checkbox',

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
	parameters: {},
};

export const Playground = {
	render: ( args ) => html`
		<xb-stack>
			<xb-checkbox
				value="change"
				size=${ args.size }
				?disabled=${ args.disabled }
				@xb-change=${ args.change }
			>
				Change
			</xb-checkbox>
			<xb-checkbox
				value="accept"
				size=${ args.size }
				?disabled=${ args.disabled }
				@xb-change=${ args.change }
			>
				Accept
			</xb-checkbox>
			<xb-checkbox
				value="leave"
				size=${ args.size }
				?disabled=${ args.disabled }
				@xb-change=${ args.change }
			>
				Leave
			</xb-checkbox>
		</xb-stack>
	`,

	args: {
		type: 'text',
		disabled: false,
		size: 'small',
	},
};
