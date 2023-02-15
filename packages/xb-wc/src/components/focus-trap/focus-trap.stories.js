import { html } from 'lit-html';

import './focus-trap';
import '../button';

/** @type {import('../../common/arg-types').Meta} */
const meta = {
	title: 'Metacomponents/focus-trap',
	component: 'xb-focus-trap',

	argTypes: {},
	parameters: {},
};

export default meta;

/** @type {import('../../common/arg-types').StoryObj} */
export const Playground = {
	render: ( args ) =>
		html`
			<xb-box>
				<xb-focus-trap>
					<xb-button value="change">&hearts;</xb-button>
					<xb-button value="accept">&diams;</xb-button>
					<xb-button value="leave">&clubs;</xb-button>
				</xb-focus-trap>
			</xb-box>
			<xb-button emphasis="flat">Click</xb-button>
		`,

	args: {},
};
