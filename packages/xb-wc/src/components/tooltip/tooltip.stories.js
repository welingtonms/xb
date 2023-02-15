import { html } from 'lit';

import { PlacementArg } from '../../common/arg-types';
import './tooltip';
import '../button';
import '../icon';

/** @type {import('../../common/arg-types').Meta} */
const meta = {
	title: 'Components/tooltip',
	component: 'xb-tooltip',

	argTypes: {
		placement: PlacementArg,

		trigger: {
			control: {
				type: 'text',
			},
		},
	},
	parameters: {},
};

export default meta;

/** @type {import('../../common/arg-types').StoryObj} */
export const Playground = {
	render: ( args ) => html`
		<xb-tooltip placement=${ args.placement } trigger=${ args.trigger }>
			<xb-box borderless slot="floating">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lectus erat,
				bibendum non mollis eu, pharetra et est.
			</xb-box>

			<xb-button emphasis="ghost">
				<xb-icon name="favorite" slot="leading"></xb-icon>
			</xb-button>
		</xb-tooltip>
	`,

	args: {
		placement: 'bottom-start',
		trigger: 'click',
	},
};
