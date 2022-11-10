import { html } from 'lit-html';

import Docs from './text-input.api.mdx';
import './text-input';

export default {
	title: 'Components/form/text input',

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
	},
	parameters: {
		docs: {
			page: Docs,
		},
	},
};

export const Playground = ( args ) => html`
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
`;

Playground.args = {
	type: 'text',
	disabled: false,
	size: 'small',
};
