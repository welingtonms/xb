import { html } from 'lit-html';

import './badge';

/** @type {import('../../common/arg-types').Meta} */
const meta = {
	title: 'Components/badge',
	component: 'xb-badge',

	argTypes: {
		// backgroundColor: { control: 'color' },
		variant: {
			control: 'select',
			options: [ 'neutral', 'primary', 'secondary', 'tertiary' ],
		},
	},
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
		<xb-badge variant=${ args.variant }>Potatoes</xb-badge>
	`,

	args: {
		variant: 'primary',
	},
};
