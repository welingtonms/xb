import { html } from 'lit-html';

import './spinner';

/** @type {import('../../common/arg-types').Meta} */
const meta = {
	title: 'Components/spinner',
	component: 'xb-spinner',
	argTypes: {},
	parameters: {},
};

export default meta;

/** @type {import('../../common/arg-types').StoryObj} */
export const Playground = {
	render: () => html`
		<xb-spinner></xb-spinner>
	`,
	args: {},
};
