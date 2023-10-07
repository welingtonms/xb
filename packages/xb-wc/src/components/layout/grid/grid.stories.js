import { html } from 'lit-html';

import { BorderlessArg, PaddinglessArg, SpacingArg } from '../../../common/arg-types';
import '../box';
import './grid';

/** @type {Meta} */
const meta = {
	title: 'Foundation/Layouts/grid',
	component: 'xb-grid',
	argTypes: {
		paddingless: PaddinglessArg,
		borderless: BorderlessArg,
		gap: SpacingArg,
		children: {
			table: {
				disable: true,
			},
		},
	},
	parameters: {},
};

export default meta;

/** @type {GridStory} */
export const Playground = {
	render: ( args ) => html`
		<xb-grid
			style=${ `--xb-grid-background-color: rgb(var(--xb-color-background)); --xb-grid-gap: ${ args.gap }` }
			paddingless=${ args.paddingless }
			borderless=${ args.borderless }
		>
			<xb-box paddingless="none" borderless="none">Box 1</xb-box>
			<xb-box paddingless="none" borderless="none">Box 2</xb-box>
			<xb-box paddingless="none" borderless="none">Box 3</xb-box>
			<xb-box paddingless="none" borderless="none">Box 4</xb-box>
			<xb-box paddingless="none" borderless="none">Box 5</xb-box>
		</xb-grid>
	`,

	args: {
		gap: '8px',
		paddingless: 'none',
		borderless: 'none',
	},
};

/**
 * @typedef {import('./grid').GridLayout} Grid
 * @typedef {import('@storybook/web-components').StoryObj<Grid>} GridStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
