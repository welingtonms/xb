import { html } from 'lit-html';

// import Docs from './button.api.mdx';
import '../layout/stack';
import './toggle-group';
import './toggle';

export default {
	title: 'Components/toggle-group',
	argTypes: {
		change: {
			action: 'changed',
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
		type: {
			control: {
				type: 'select',
				options: [ 'single', 'single-strict', 'multiple' ],
			},
		},
	},
	parameters: {
		docs: {
			// page: Docs,
		},
	},
};

export const Playground = ( args ) => html`
	<xb-stack>
		<xb-toggle-group
			type="${ args.type }"
			size="${ args.size }"
			@xb-change=${ args.change }
		>
			<xb-toggle ?disabled=${ args.disabled } value="change">
				<span slot="leading">&hearts;</span>
				Change</xb-toggle
			>

			<xb-toggle ?disabled=${ args.disabled } value="accept"
				><span slot="leading">&diams;</span> Accept</xb-toggle
			>

			<xb-toggle ?disabled=${ args.disabled } value="leave"
				><span slot="leading">&clubs;</span> Leave</xb-toggle
			>
		</xb-toggle-group>

		<xb-toggle-group
			type="${ args.type }"
			size="${ args.size }"
			@xb-change=${ args.change }
		>
			<xb-toggle ?disabled=${ args.disabled } value="change">Change</xb-toggle>

			<xb-toggle ?disabled=${ args.disabled } value="accept">Accept</xb-toggle>

			<xb-toggle ?disabled=${ args.disabled } value="leave">Leave</xb-toggle>
		</xb-toggle-group>

		<xb-toggle-group
			type="${ args.type }"
			size="${ args.size }"
			@xb-change=${ args.change }
		>
			<xb-toggle ?disabled=${ args.disabled } value="change">
				&hearts;
			</xb-toggle>

			<xb-toggle ?disabled=${ args.disabled } value="accept">&diams;</xb-toggle>

			<xb-toggle ?disabled=${ args.disabled } value="leave">&clubs;</xb-toggle>
		</xb-toggle-group>
	</xb-stack>
`;

Playground.args = {
	// emphasis: 'ghost',
	type: 'multiple',
	size: 'small',
	disabled: false,
};
