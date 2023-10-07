import { html } from 'lit-html';

import './steps';
import './steps-step';

import '../layout';

/** @type {Meta} */
const meta = {
	title: 'Components/steps',
	component: 'xb-steps',

	argTypes: {},
	parameters: {},
};

export default meta;

/** @type {StepsStory} */
export const Playground = {
	render: ( args ) => {
		return html`
			<xb-stack>
				<xb-steps>
					<xb-step active label="Basic Info">1</xb-step>
					<xb-step label="Stops">2</xb-step>
					<xb-step label="Commodities">3</xb-step>
					<xb-step label="Extra Charges">4</xb-step>
					<xb-step label="Review">5</xb-step>
				</xb-steps>

				<xb-steps>
					<xb-step completed label="Basic Info">1</xb-step>
					<xb-step completed label="Stops">2</xb-step>
					<xb-step active label="Commodities">3</xb-step>
					<xb-step label="Extra Charges">4</xb-step>
					<xb-step label="Review">5</xb-step>
				</xb-steps>

				<xb-steps>
					<xb-step completed label="Basic Info">1</xb-step>
					<xb-step completed label="Stops">2</xb-step>
					<xb-step completed label="Commodities">3</xb-step>
					<xb-step completed label="Extra Charges">4</xb-step>
					<xb-step active label="Review">5</xb-step>
				</xb-steps>
			</xb-stack>
		`;
	},

	args: {},
};

/**
 * @typedef {import('./steps').Steps} Steps
 * @typedef {import('@storybook/web-components').StoryObj<Steps>} StepsStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
