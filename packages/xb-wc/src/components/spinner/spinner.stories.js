import { html } from 'lit-html';

import Docs from './spinner.api.mdx';
import './spinner';

export default {
	title: 'Components/spinner',

	argTypes: {},
	parameters: {
		docs: {
			page: Docs,
		},
	},
};

export const Playground = ( args ) => html` <xb-spinner></xb-spinner> `;

Playground.args = {};
