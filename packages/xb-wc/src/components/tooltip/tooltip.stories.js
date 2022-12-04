import { html } from 'lit';

import { PlacementArg } from '../../common/arg-types';
import './tooltip';
import '../button';
import '../icon';

export default {
	title: 'Components/tooltip',

	argTypes: {
		placement: PlacementArg,

		trigger: {
			control: {
				type: 'text',
			},
		},
	},
	parameters: {
		docs: {
			// page: Docs,
		},
	},
};

export const Playground = ( args ) => html`<xb-tooltip
	placement=${ args.placement }
	trigger=${ args.trigger }
>
	<xb-box borderless slot="floating"
		>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lectus erat,
		bibendum non mollis eu, pharetra et est.</xb-box
	>

	<xb-button emphasis="text">
		<xb-icon name="favorite" slot="leading"></xb-icon>
	</xb-button>
</xb-tooltip>`;

Playground.args = {
	placement: 'bottom-start',
	trigger: 'hover',
};
