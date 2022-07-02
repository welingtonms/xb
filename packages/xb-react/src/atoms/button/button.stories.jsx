import React from 'react';
import { expect } from '@storybook/jest';
import { within, userEvent } from '@storybook/testing-library';

import Button from './button';

/** @type {ComponentMeta<typeof Button>} */
const Meta = {
	title: 'Example/Button',
	component: Button,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {
		backgroundColor: { control: 'color' },
		onClick: { action: true },
	},
};

/** @type{ComponentStory<typeof Button>} */
const Template = ( args ) => <Button { ...args } />;

export const Primary = Template.bind( {} );
Primary.args = {
	children: 'Button',
};

export const Demo = Template.bind( {} );

Demo.args = {
	children: 'Button',
};

Demo.play = async ( { args, canvasElement } ) => {
	const canvas = within( canvasElement );
	await userEvent.click( canvas.getByRole( 'button' ) );
	await expect( args.onClick ).toHaveBeenCalled();
	await expect( canvas.getByRole( 'button' ) ).toHaveTextContent(
		args.children
	);
};

export default Meta;

/**
 * @typedef {import("@storybook/react").ComponentStory} ComponentStory
 * @typedef {import("@storybook/react").ComponentMeta} ComponentMeta
 */
