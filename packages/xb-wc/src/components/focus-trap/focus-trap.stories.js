import { html } from 'lit-html';

import Docs from './focus-trap.api.mdx';
import './focus-trap';
import '../button';

export default {
	title: 'Metacomponents/focus-trap',

	argTypes: {},
	parameters: {
		docs: {
			page: Docs,
		},
	},
};

export const Playground = ( args ) =>
	html`
		<xb-box>
			<xb-focus-trap>
				<xb-button value="change"> &hearts; </xb-button>
				<xb-button value="accept">&diams;</xb-button>
				<xb-button value="leave">&clubs;</xb-button>
			</xb-focus-trap>
		</xb-box>
		<xb-button emphasis="flat"> Click </xb-button>
	`;

Playground.args = {};
