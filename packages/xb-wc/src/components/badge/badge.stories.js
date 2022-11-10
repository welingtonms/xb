import { html } from 'lit-html';

import Docs from './badge.api.mdx';
import './badge';

export default {
	title: 'Components/badge',

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
		docs: {
			page: Docs,
		},
	},
};

export const Playground = ( args ) => html`
	<xb-badge variant=${ args.variant }>Potatoes</xb-badge>
`;

Playground.args = {
	variant: 'primary',
};
