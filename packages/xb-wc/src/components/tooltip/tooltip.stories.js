import { html } from 'lit';

import { PlacementArg } from '../../common/arg-types';

import '../button';
import '../icon';
import '../layout/box';
import './tooltip';

/** @type {import('../../common/arg-types').Meta} */
const meta = {
	title: 'Components/tooltip',
	component: 'xb-tooltip',

	argTypes: {
		placement: PlacementArg,

		trigger: {
			control: 'check',
			options: [ 'click', 'hover', 'focus' ],
		},
	},
	parameters: {},
};

export default meta;

/** @type {import('../../common/arg-types').StoryObj} */
export const Playground = {
	render: ( args ) => html`
		<xb-tooltip placement=${ args.placement } trigger=${ args.trigger }>
			<xb-button slot="reference" emphasis="ghost">
				<xb-icon name="favorite" slot="leading"></xb-icon>
			</xb-button>
			<xb-box borderless slot="floating">Lorem ipsum dolor sit amet.</xb-box>
		</xb-tooltip>
	`,

	args: {
		placement: 'bottom-start',
		trigger: 'click',
	},
};
