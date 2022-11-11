import { html } from 'lit-html';

import Docs from './dropdown.api.mdx';
import './dropdown';

export default {
	title: 'Components/dropdown',

	argTypes: {
		placement: {
			control: {
				type: 'select',
				options: [
					'top-start',
					'top-end',
					'right-start',
					'right-end',
					'bottom-start',
					'bottom-end',
					'left-start',
					'left-end',
				],
			},
		},
	},
	parameters: {
		docs: {
			page: Docs,
		},
	},
};

export const Playground = ( args ) =>
	html` <xb-dropdown placement=${ args.placement }></xb-dropdown> `;

Playground.args = {
	placement: 'bottom-start',
};
