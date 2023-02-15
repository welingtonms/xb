import { html } from 'lit-html';

import { SizeArg } from '../../../common/arg-types';
import './text-input';

/** @type {import('../../../common/arg-types').Meta} */
const meta = {
	title: 'Components/form/text input',
	component: 'xb-text-input',

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
		size: SizeArg,
	},
	parameters: {},
};

export default meta;

/** @type {import('../../../common/arg-types').StoryObj} */
export const Playground = {
	render: ( args ) => html`
		<xb-stack>
			<xb-text-input
				type=${ args.type }
				size=${ args.size }
				?disabled=${ args.disabled }
				@input=${ args.input }
			></xb-text-input>
			<xb-text-input
				type=${ args.type }
				size=${ args.size }
				?disabled=${ args.disabled }
				@input=${ args.input }
			>
				<span slot="leading">&hearts;</span>
			</xb-text-input>
			<xb-text-input
				type=${ args.type }
				size=${ args.size }
				?disabled=${ args.disabled }
				@input=${ args.input }
			>
				<span slot="trailing">&hearts;</span>
			</xb-text-input>
			<xb-cluster paddingless>
				<xb-text-input
					type=${ args.type }
					size=${ args.size }
					?disabled=${ args.disabled }
					@input=${ args.input }
				>
					<span slot="leading">&hearts;</span>
					<span slot="trailing">&clubs;</span>
				</xb-text-input>
				<xb-button emphasis="flat" size=${ args.size }>Button</xb-button>
			</xb-cluster>
		</xb-stack>
	`,

	args: {
		type: 'text',
		disabled: false,
		size: 'small',
	},
};
