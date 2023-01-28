import { html } from 'lit-html';

import './spinner';

export default {
	title: 'Components/spinner',
	component: 'xb-spinner',
	argTypes: {},
	parameters: {},
};

export const Playground = {
	render: ( args ) =>
		html`
			<xb-spinner></xb-spinner>
		`,
	args: {},
};
