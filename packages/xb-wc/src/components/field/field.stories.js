import { html } from 'lit';

import './field';

import '../form';
import '../toggle-group';
import '../text';

export default {
	title: 'Components/field',
	component: 'xb-field',

	argTypes: {},
	parameters: {},
};

export const Playground = {
	render: ( args ) => html`
		<xb-stack style="--xb-stack-gap: var(--xb-spacing-6);">
			<xb-field
				required
				label="Your life decision"
				prompt="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
			>
				<xb-toggle-group>
					<xb-toggle value="change">Change</xb-toggle>

					<xb-toggle value="accept">Accept</xb-toggle>

					<xb-toggle value="leave">Leave</xb-toggle>
				</xb-toggle-group>

				<xb-text slot="prompt" variant="caption" as="small">
					Cebolas fritas
				</xb-text>
			</xb-field>

			<xb-field
				label="Name"
				tip="Your name."
				prompt="Lorem consectetur adipiscing elit."
			>
				<xb-text-input type="text"></xb-text-input>
			</xb-field>

			<xb-field
				label="Multiple options"
				required
				tip="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lectus erat, bibendum non mollis eu, pharetra et est."
			>
				<xb-stack as="fieldset" paddingless>
					<xb-checkbox value="change">Change</xb-checkbox>
					<xb-checkbox value="accept">Accept</xb-checkbox>
					<xb-checkbox value="leave">Leave</xb-checkbox>
				</xb-stack>
			</xb-field>

			<xb-field
				label="Additional options"
				tip="Consectetur adipiscing elit. Nunc lectus erat, bibendum non mollis eu, pharetra et est."
			>
				<xb-select>
					<xb-option value="change">Change</xb-option>
					<xb-option value="accept">Accept</xb-option>
					<xb-option value="leave">Leave</xb-option>
				</xb-select>
			</xb-field>

			<xb-field
				label="Exclusive options"
				required
				tip="Nunc lectus erat, bibendum non mollis eu, pharetra et est."
				status="danger"
				prompt="Select one option here"
			>
				<xb-radio-group>
					<xb-radio value="change">Change</xb-radio>
					<xb-radio value="accept">Accept</xb-radio>
					<xb-radio value="leave">Leave</xb-radio>
				</xb-radio-group>
			</xb-field>
		</xb-stack>
	`,

	args: {},
};
