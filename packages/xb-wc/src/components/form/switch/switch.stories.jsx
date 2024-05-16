import React, { useRef, useEffect } from 'react';
import { html, render } from 'lit';

import { userEvent, within } from '@storybook/test';
import { expect } from '@storybook/test';

import createComponent from '../../../utils/create-component';

import '../../layout/stack';
import './switch.define';
import { Switch as SwitchElement } from './switch';

export const Switch = createComponent({
	tagName: 'xb-switch',
	elementClass: SwitchElement,
	displayName: 'Switch',
	events: {
		onChange: 'change',
	},
});

/** @type {Meta} */
const meta = {
	title: 'Components/form/switch',
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
				<xb-switch>Accept life options</xb-switch>
			`,
			rootRef.current
		);

		elementRef.current = rootRef.current.querySelector(meta.component);

		let currentArgs = args;

		elementRef.current.disabled = currentArgs.disabled;
		elementRef.current.checked = currentArgs.checked;

		elementRef.current.addEventListener('change', currentArgs.change);

		return () => {
			elementRef.current.removeEventListener('change', currentArgs.change);
		};
	}, [args]);

	return <div id="wc-root" ref={rootRef}></div>;
}

/** @type {SwitchStory} */
export const Playground = {
	render: (args) => (
		<xb-stack>
			<WebComponent args={args} />

			<Switch onChange={args.change} checked={args.checked} disabled={args.disabled}>
				Accept life options
			</Switch>
		</xb-stack>
	),

	// play: async ({ canvasElement }) => {
	// 	const canvas = within(canvasElement);
	// 	await expect(canvas.getByRole('switch', { name: /Accept life options/i })).not.toBeChecked();
	// 	await userEvent.click(canvas.getByRole('switch', { name: /Accept life options/i }));
	// 	await expect(canvas.getByRole('switch', { name: /Accept life options/i })).toBeChecked();
	// 	await userEvent.click(canvas.getByRole('switch', { name: /Accept life options/i }));
	// 	await expect(canvas.getByRole('switch', { name: /Accept life options/i })).not.toBeChecked();
	// },
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
