import React, { useRef, useEffect } from 'react';
import { html, render } from 'lit';

import { userEvent } from '@storybook/test';
import { expect } from '@storybook/test';

import { within } from '../../../utils/test-tools';

import createComponent from '../../../utils/create-component';

import '../../layout/stack';
import './radio.define';
import { RadioGroup as RadioGroupElement } from './radio-group';
import { Radio as RadioElement } from './radio';

export const RadioGroup = createComponent({
	tagName: 'xb-radio-group',
	elementClass: RadioGroupElement,
	displayName: 'RadioGroup',
	events: {
		onChange: 'change',
	},
});

export const Radio = createComponent({
	tagName: 'xb-radio',
	elementClass: RadioElement,
	displayName: 'Radio',
});

/** @type {Meta} */
const meta = {
	title: 'Components/form/radio',
	component: 'xb-radio-group',

	argTypes: {
		change: {
			action: 'changed',
			table: {
				disable: true,
			},
		},
		disabled: {
			control: {
				type: 'boolean',
			},
		},
	},
	parameters: {},
};

export default meta;

function WebComponent({ args }) {
	/** @type {React.MutableRefObject<HTMLDivElement>} */
	const rootRef = useRef();
	/** @type {React.MutableRefObject<HTMLElement>} */
	const elementRef = useRef();

	useEffect(() => {
		render(
			html`
				<xb-radio-group name="life-choice">
					<xb-radio value="accept">Accept</xb-radio>
					<xb-radio value="change">Change</xb-radio>
					<xb-radio value="leave">Leave</xb-radio>
				</xb-radio-group>
			`,
			rootRef.current
		);

		elementRef.current = rootRef.current.querySelector(meta.component);

		let currentArgs = args;

		elementRef.current.disabled = currentArgs.disabled;

		elementRef.current.addEventListener('change', currentArgs.change);

		return () => {
			elementRef.current.removeEventListener('change', currentArgs.change);
		};
	}, [args]);

	return <div id="wc-root" ref={rootRef}></div>;
}

/** @type {RadioGroupStory} */
export const Playground = {
	render: (args) => (
		<xb-stack>
			<WebComponent args={args} />

			<RadioGroup name="life-choice" disabled={args.disabled} onChange={args.change}>
				<Radio value="accept">Accept</Radio>
				<Radio value="change">Change</Radio>
				<Radio value="leave">Leave</Radio>
			</RadioGroup>
		</xb-stack>
	),
	// play: async ( { canvasElement } ) => {
	// 	const canvas = within( canvasElement );

	// 	await expect( canvas.getByRole( 'radio', { name: /accept/i } ) ).not.toBeChecked();
	// 	await expect( canvas.getByRole( 'radio', { name: /change/i } ) ).not.toBeChecked();
	// 	await expect( canvas.getByRole( 'radio', { name: /leave/i } ) ).not.toBeChecked();

	// 	await userEvent.click( canvas.getByRole( 'radio', { name: /change/i } ) );

	// 	await expect( canvas.getByRole( 'radio', { name: /accept/i } ) ).not.toBeChecked();
	// 	await expect( canvas.getByRole( 'radio', { name: /change/i } ) ).toBeChecked();
	// 	await expect( canvas.getByRole( 'radio', { name: /leave/i } ) ).not.toBeChecked();
	// },

	args: {
		disabled: false,
	},
};

/**
 * @typedef {import('./radio-group').RadioGroup} RadioGroup
 * @typedef {import('@storybook/web-components').StoryObj<RadioGroup>} RadioGroupStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
