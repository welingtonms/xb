import { html } from 'lit-html';

import { PlacementArg } from '../../common/arg-types';
import Docs from './popover.api.mdx';
import './popover';
import '../icon';

export default {
	title: 'Components/popover',

	argTypes: {
		placement: PlacementArg,
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
	<xb-popover placement="${ args.placement }">
		<xb-icon
			name="star"
			slot="anchor"
			style="--xb-icon-color: rgb(var(--xb-color-secondary-500));"
		></xb-icon>
		<span slot="floating">
			<xb-box borderless>
				Proin facilisis mauris ut tortor vulputate placerat.
			</xb-box>
		</span>
	</xb-popover>
`;

Playground.args = {
	variant: 'primary',
	placement: 'top-end',
};
