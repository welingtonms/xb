import { html } from 'lit';

import { PlacementArg, SizeArg } from '../../common/arg-types';
import './select';

export default {
	title: 'Components/select',

	argTypes: {
		change: {
			action: 'changed',
			table: {
				disable: true,
			},
		},
		placement: PlacementArg,
		size: SizeArg,
		loading: {
			control: {
				type: 'boolean',
			},
		},
		multiple: {
			control: {
				type: 'boolean',
			},
		},
	},
	parameters: {
		docs: {
			// page: Docs,
		},
	},
};

export const Playground = ( args ) => html`<xb-select
	?loading=${ args.loading }
	?multiple=${ args.multiple }
	@xb-change=${ args.change }
>
	<xb-option value="change">
		<!-- <xb-icon name="favorite" slot="leading"></xb-icon> -->
		Change</xb-option
	>
	<xb-option value="accept">
		<!-- <xb-icon name="star" slot="leading"></xb-icon> -->
		Accept</xb-option
	>
	<xb-option value="leave">
		<!-- <xb-icon name="cloud" slot="leading"></xb-icon> -->
		Leave</xb-option
	>
</xb-select>`;

Playground.args = {
	// placement: 'bottom-start',
	loading: false,
	multiple: false,
};
