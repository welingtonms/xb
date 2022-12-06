import { html } from 'lit';

import './field';

import '../form';
import '../toggle-group';
import '../text';

export default {
	title: 'Components/field',

	argTypes: {},
	parameters: {
		docs: {
			// page: Docs,
		},
	},
};

export const Playground = ( args ) => html`<xb-stack
	style="--xb-stack-gap: var(--xb-spacing-4);"
>
	<xb-field
		required
		label="Your life decision"
		prompt="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
	>
		<!-- <xb-text slot="label" variant="caption"
			>Your
			<b>life</b>
			decision</xb-text
		> -->

		<xb-toggle-group>
			<xb-toggle value="change">Change</xb-toggle>

			<xb-toggle value="accept">Accept</xb-toggle>

			<xb-toggle value="leave">Leave</xb-toggle>
		</xb-toggle-group>
	</xb-field>

	<xb-field label="Name" tip="Your name.">
		<xb-text-input type="text"></xb-text-input>
	</xb-field>

	<xb-field
		label="Options"
		required
		tip="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lectus erat, bibendum non mollis eu, pharetra et est."
	>
		<xb-stack paddingless>
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
	</xb-field>
</xb-stack>`;

Playground.args = {};
