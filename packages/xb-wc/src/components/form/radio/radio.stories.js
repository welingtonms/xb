import { html } from 'lit-html';

import './radio-group';
import './radio';

/** @type {import('../../../common/arg-types').Meta} */
const meta = {
	title: 'Components/form/radio',
	component: 'xb-radio',

	argTypes: {
		type: {
			control: 'select',
			options: [ 'text', 'password', 'number' ],
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
			control: 'select',
			options: [ 'small', 'medium', 'large' ],
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

export default meta;

/** @type {import('../../../common/arg-types').StoryObj} */
export const Playground = {
	render: ( args ) => html`
		<xb-radio-group
			size=${ args.size }
			?disabled=${ args.disabled }
			@xb-change=${ args.change }
		>
			<xb-radio value="change">Change</xb-radio>
			<xb-radio value="accept">Accept</xb-radio>
			<xb-radio value="leave">Leave</xb-radio>
		</xb-radio-group>
	`,

	args: {
		type: 'text',
		disabled: false,
		size: 'small',
	},
};
