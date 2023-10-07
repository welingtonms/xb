import { html } from 'lit';

import { PlacementArg } from '../../common/arg-types';

import '../button';
import '../icon';
import '../layout/box';
import './tooltip';

/** @type {Meta} */
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

/** @type {TooltipStory} */
export const Playground = {
	render: ( args ) => html`
		<xb-button id="my-anchor" emphasis="ghost">
			<xb-icon name="favorite"></xb-icon>
		</xb-button>

		<xb-tooltip anchor="my-anchor" placement=${ args.placement } .trigger=${ args.trigger }>
			<xb-box borderless>Lorem ipsum dolor sit amet.</xb-box>
		</xb-tooltip>
	`,

	args: {
		placement: 'bottom-start',
		trigger: [ 'click' ],
	},
};

/**
 * @typedef {import('./tooltip').Tooltip} Tooltip
 * @typedef {import('@storybook/web-components').StoryObj<Tooltip>} TooltipStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
