import { html } from 'lit-html';

import { SizeArg } from '../../common/arg-types';
import Docs from './button.api.mdx';
import './button';

export default {
	title: 'Components/button',
	argTypes: {
		emphasis: {
			control: {
				type: 'select',
				options: [ 'text', 'ghost', 'flat' ],
			},
		},
		children: {
			table: {
				disable: true,
			},
		},
		click: {
			action: 'clicked',
			table: {
				disable: true,
			},
		},
		disabled: {
			control: {
				type: 'boolean',
			},
		},
		size: SizeArg,
	},
	parameters: {
		docs: {
			page: Docs,
		},
	},
};

export const Playground = ( args ) => html`
	<xb-button
		emphasis="text"
		size=${ args.size }
		?disabled=${ args.disabled }
		@click=${ args.click }
	>
		<xb-icon name="favorite" slot="leading"></xb-icon>
		Button</xb-button
	>
	<xb-button
		emphasis="text"
		size=${ args.size }
		?disabled=${ args.disabled }
		@click=${ args.click }
	>
		<xb-icon name="favorite" slot="leading"></xb-icon>
	</xb-button>
	<xb-button
		emphasis="ghost"
		size=${ args.size }
		?disabled=${ args.disabled }
		@click=${ args.click }
	>
		<xb-icon name="arrow-back" slot="leading"></xb-icon>
		Button
	</xb-button>
	<xb-button
		emphasis="ghost"
		size=${ args.size }
		?disabled=${ args.disabled }
		@click=${ args.click }
	>
		<xb-icon name="favorite" slot="leading"></xb-icon>
	</xb-button>
	<xb-button
		emphasis="flat"
		size=${ args.size }
		?disabled=${ args.disabled }
		@click=${ args.click }
	>
		Button
		<xb-icon name="star" slot="trailing"></xb-icon>
	</xb-button>
	<xb-button
		emphasis="flat"
		size=${ args.size }
		?disabled=${ args.disabled }
		@click=${ args.click }
	>
		<xb-icon name="star" slot="trailing"></xb-icon>
	</xb-button>
	<xb-button
		as="a"
		emphasis="text"
		size=${ args.size }
		?disabled=${ args.disabled }
		href="https://www.google.com/"
	>
		Link
	</xb-button>
`;

Playground.args = {
	emphasis: 'ghost',
	size: 'small',
	disabled: false,
};
