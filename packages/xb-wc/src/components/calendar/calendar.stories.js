import { html } from 'lit-html';

import './calendar';

/** @type {import('../../common/arg-types').Meta} */
const meta = {
	title: 'Components/calendar',
	component: 'xb-calendar',

	argTypes: {},
	parameters: {
		// docs: {
		// 	// page: Docs,
		// },
	},
};

export default meta;

/** @type {import('../../common/arg-types').StoryObj} */
export const Playground = {
	render: ( args ) => html`
		<xb-calendar month=${ args.month } year=${ args.year }></xb-calendar>
	`,

	args: {
		month: 6,
		year: 2023,
	},
};
