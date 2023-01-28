import { html } from 'lit-html';

import './badge';

export default {
	title: 'Components/badge',
	component: 'xb-badge',

	argTypes: {
		// backgroundColor: { control: 'color' },
		variant: {
			control: {
				type: 'select',
				options: [ 'neutral', 'primary', 'secondary', 'terciary' ],
			},
		},
	},
	parameters: {
		// docs: {
		// 	// page: Docs,
		// },
	},
};

export const Playground = {
	render: ( args ) => html`
		<xb-badge variant=${ args.variant }>Potatoes</xb-badge>
	`,

	args: {
		variant: 'primary',
	},
};
