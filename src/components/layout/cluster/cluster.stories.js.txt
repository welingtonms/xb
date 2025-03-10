import { html } from 'lit-html';

import { BorderlessArg, PaddinglessArg, SpacingArg } from '../../../common/arg-types';
import '../box';
import './cluster';

/** @type {Meta} */
const meta = {
	title: 'Foundation/Layouts/cluster',
	component: 'xb-cluster',
	argTypes: {
		gap: SpacingArg,
		borderless: BorderlessArg,
		paddingless: PaddinglessArg,
		children: {
			table: {
				disable: true,
			},
		},
	},
	parameters: {},
};

export default meta;

/** @type {ClusterStory} */
export const Playground = {
	render: ( args ) => html`
		<xb-cluster
			style=${ `--xb-cluster-background-color: rgb(var(--xb-color-background)); --xb-cluster-gap: ${ args.gap }` }
			paddingless=${ args.paddingless }
			borderless=${ args.borderless }
		>
			<xb-box paddingless="none" borderless="none">Box 1</xb-box>
			<xb-box paddingless="none" borderless="none">Box 2</xb-box>
			<xb-box paddingless="none" borderless="none">Box 3</xb-box>
		</xb-cluster>
	`,

	args: {
		gap: '8px',
		paddingless: 'none',
		borderless: 'none',
	},
};

/**
 * @typedef {import('./cluster').ClusterLayout} Cluster
 * @typedef {import('@storybook/web-components').StoryObj<Cluster>} ClusterStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
