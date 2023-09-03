import { html } from 'lit-html';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { BorderlessArg, PaddinglessArg, SizeArg } from '../../common/arg-types';
import './button';

/** @type {import('../../common/arg-types').Meta} */
const meta = {
	title: 'Components/button',
	component: 'xb-button',

	argTypes: {
		emphasis: {
			control: 'select',
			options: [ 'text', 'ghost', 'flat' ],
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
		borderless: BorderlessArg,
		paddingless: PaddinglessArg,
	},
	parameters: {},
};

/** @type {import('../../common/arg-types').StoryObj} */
export const Playground = {
	render: ( args ) => html`
		<xb-button
			class="test"
			emphasis="text"
			paddingless=${ args.paddingless }
			borderless=${ args.borderless }
			size=${ args.size }
			?disabled=${ args.disabled }
			@click=${ args.click }
		>
			<xb-icon name="favorite" slot="leading"></xb-icon>
			Accept
		</xb-button>
		<xb-button
			aria-label="Like this post"
			emphasis="text"
			paddingless=${ args.paddingless }
			borderless=${ args.borderless }
			size=${ args.size }
			?disabled=${ args.disabled }
			@click=${ args.click }
		>
			<xb-icon name="favorite"></xb-icon>
		</xb-button>
		<xb-button
			emphasis="ghost"
			paddingless=${ args.paddingless }
			borderless=${ args.borderless }
			size=${ args.size }
			?disabled=${ args.disabled }
			@click=${ args.click }
		>
			<xb-icon name="arrow-back" slot="leading"></xb-icon>
			Change
		</xb-button>
		<xb-button
			aria-label="Refresh the list"
			emphasis="ghost"
			paddingless=${ args.paddingless }
			borderless=${ args.borderless }
			size=${ args.size }
			?disabled=${ args.disabled }
			@click=${ args.click }
		>
			<xb-icon name="refresh"></xb-icon>
		</xb-button>
		<xb-button
			emphasis="flat"
			paddingless=${ args.paddingless }
			borderless=${ args.borderless }
			size=${ args.size }
			?disabled=${ args.disabled }
			@click=${ args.click }
		>
			Leave
			<xb-icon name="star" slot="trailing"></xb-icon>
		</xb-button>
		<xb-button
			aria-label="Favorite this post"
			emphasis="flat"
			paddingless=${ args.paddingless }
			borderless=${ args.borderless }
			size=${ args.size }
			?disabled=${ args.disabled }
			@click=${ args.click }
		>
			<xb-icon name="star"></xb-icon>
		</xb-button>
	`,
	play: async ( { canvasElement } ) => {
		const canvas = within( canvasElement );

		await expect( canvas.getAllByRole( 'button' ) ).toHaveLength( 6 );
		await expect( canvas.getByRole( 'button', { name: /accept/i } ) ).not.toBeDisabled();
	},

	args: {
		borderless: 'none',
		disabled: false,
		emphasis: 'ghost',
		paddingless: 'none',
		size: 'small',
	},
};

/** @type {import('../../common/arg-types').StoryObj} */
export const Link = {
	render: ( args ) => html`
		<xb-button
			emphasis=${ args.emphasis }
			paddingless=${ args.paddingless }
			borderless=${ args.borderless }
			size=${ args.size }
			?disabled=${ args.disabled }
			href="https://www.google.com/"
			target="_blank"
		>
			Link
		</xb-button>
	`,
	play: async ( { canvasElement } ) => {
		const canvas = within( canvasElement );

		await expect( canvas.getAllByRole( 'link' ) ).toHaveLength( 1 );

		await userEvent.click( canvas.getByRole( 'link' ) );
	},

	args: {
		borderless: 'none',
		disabled: false,
		emphasis: 'ghost',
		paddingless: 'none',
		size: 'small',
	},
};

export default meta;
