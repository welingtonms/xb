import { html } from 'lit-html';

import { PlacementArg } from '../../common/arg-types';
import './popover';
import '../icon';

/** @type {import('../../common/arg-types').Meta} */
const meta = {
	title: 'Components/popover',
	component: 'xb-popover',

	argTypes: {
		placement: PlacementArg,
		variant: {
			control: 'select',
			options: [ 'neutral', 'primary', 'secondary', 'tertiary' ],
		},
	},
	parameters: {},
};

export default meta;

/** @type {import('../../common/arg-types').StoryObj} */
export const Playground = {
	render: ( args ) => html`
		<xb-popover placement="${ args.placement }">
			<xb-icon
				name="star"
				slot="anchor"
				style="--xb-icon-color: rgb(var(--xb-color-secondary-500));"
			></xb-icon>
			<span slot="floating">
				<xb-box borderless>Proin facilisis mauris ut tortor vulputate placerat.</xb-box>
			</span>
		</xb-popover>
	`,

	args: {
		variant: 'primary',
		placement: 'top-end',
	},
};
