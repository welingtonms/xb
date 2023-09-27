import { html } from 'lit-html';

import './steps';
import './steps-step';

import '../layout';

/** @type {import('../../common/arg-types').Meta} */
const meta = {
	title: 'Components/steps',
	component: 'xb-steps',

	argTypes: {
		open: { control: 'boolean' },
	},
	parameters: {},
};

export default meta;

/** @type {import('../../common/arg-types').StoryObj} */
export const Playground = {
	render: ( args ) => html`
		<xb-steps>
			<xb-step completed label="Basic Info">1</xb-step>
			<xb-step active label="Stops">2</xb-step>
			<xb-step label="Review">3</xb-step>
		</xb-steps>
	`,

	args: {
		open: false,
	},
};
