import { html } from 'lit-html';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { SizeArg } from '../../common/arg-types';

import '../layout';
import './switch';

/** @type {Meta} */
const meta = {
	title: 'Components/switch',
	component: 'xb-switch',

	argTypes: {
		change: {
			action: 'changed',
			table: {
				disable: true,
			},
		},
		checked: { control: 'boolean' },
		disabled: { control: 'boolean' },
		size: SizeArg,
	},
	parameters: {},
};

export default meta;

/** @type {SwitchStory} */
export const Playground = {
	render: ( args ) => html`
		<xb-switch
			@xb:change=${ args.change }
			?checked=${ args.checked }
			?disabled=${ args.disabled }
			size=${ args.size }
		>
			Accept life options
		</xb-switch>
	`,

	play: async ( { canvasElement } ) => {
		const canvas = within( canvasElement );
		await expect(
			canvas.getByRole( 'switch', { name: /Accept life options/i } )
		).not.toBeChecked();
		await userEvent.click( canvas.getByRole( 'switch', { name: /Accept life options/i } ) );
		await expect( canvas.getByRole( 'switch', { name: /Accept life options/i } ) ).toBeChecked();
		await userEvent.click( canvas.getByRole( 'switch', { name: /Accept life options/i } ) );
		await expect(
			canvas.getByRole( 'switch', { name: /Accept life options/i } )
		).not.toBeChecked();
	},
	args: {
		checked: false,
		disabled: false,
		size: 'extra-small',
	},
};

/**
 * @typedef {import('./switch').Switch} Switch
 * @typedef {import('@storybook/web-components').StoryObj<Switch>} SwitchStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
