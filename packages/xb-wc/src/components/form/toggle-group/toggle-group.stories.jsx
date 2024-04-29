import React, { useRef, useEffect } from 'react';
import { html, render } from 'lit';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import createComponent from '../../../utils/create-component';

import { SelectionArg } from '../../../common/arg-types';

import '../../layout';
import './toggle-group.define';
import { ToggleGroup as ToggleGroupElement } from './toggle-group';
import { Toggle as ToggleElement } from './toggle';

export const ToggleGroup = createComponent({
	tagName: 'xb-toggle-group',
	elementClass: ToggleGroupElement,
	displayName: 'ToggleGroup',
	events: {
		onChange: 'change',
	},
});

export const Toggle = createComponent({
	tagName: 'xb-toggle',
	elementClass: ToggleElement,
	displayName: 'Toggle',
});

/** @type {Meta} */
const meta = {
	title: 'Components/form/toggle-group',
	component: 'xb-toggle-group',
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
		type: SelectionArg,
	},
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
				<xb-toggle-group>
					<xb-toggle value="accept">
						<span slot="leading">&diams;</span>
						Accept
					</xb-toggle>

					<xb-toggle value="change">
						<span slot="leading">&hearts;</span>
						Change
					</xb-toggle>

					<xb-toggle value="leave">
						<span slot="leading">&clubs;</span>
						Leave
					</xb-toggle>
				</xb-toggle-group>
			`,
			rootRef.current
		);

		elementRef.current = rootRef.current.querySelector(meta.component);

		let currentArgs = args;

		elementRef.current.disabled = currentArgs.disabled;
		elementRef.current.type = currentArgs.type;

		elementRef.current.addEventListener('change', currentArgs.change);

		return () => {
			elementRef.current.removeEventListener('change', currentArgs.change);
		};
	}, [args]);

	return <div id="wc-root" ref={rootRef}></div>;
}

/** @type {ToggleGroupStory} */
export const Playground = {
	render: (args) => (
		<xb-stack>
			<WebComponent args={args} />

			<ToggleGroup type={args.type} disabled={args.disabled} onChange={args.change}>
				<Toggle value="accept">
					<span slot="leading">&diams;</span>
					Accept
				</Toggle>

				<Toggle value="change">
					<span slot="leading">&hearts;</span>
					Change
				</Toggle>

				<Toggle value="leave">
					<span slot="leading">&clubs;</span>
					Leave
				</Toggle>
			</ToggleGroup>
		</xb-stack>
	),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		// await expect( canvas.getByRole( 'radiogroup' ) ).toBeInTheDocument();

		// await step( 'No toggle is selected', async () => {
		// 	await expect( canvas.getByRole( 'radio', { name: /accept/i } ) ).not.toBeChecked();
		// 	await expect( canvas.getByRole( 'radio', { name: /change/i } ) ).not.toBeChecked();
		// 	await expect( canvas.getByRole( 'radio', { name: /leave/i } ) ).not.toBeChecked();
		// } );

		// await step( "Select 'change' toggle", async () => {
		// 	await userEvent.click( canvas.getByRole( 'radio', { name: /change/i } ) );

		// 	await expect( canvas.getByRole( 'radio', { name: /accept/i } ) ).not.toBeChecked();
		// 	await expect( canvas.getByRole( 'radio', { name: /change/i } ) ).toBeChecked();
		// 	await expect( canvas.getByRole( 'radio', { name: /leave/i } ) ).not.toBeChecked();
		// } );

		// await step( "Select 'accept' toggle", async () => {
		// 	await userEvent.click( canvas.getByRole( 'radio', { name: /accept/i } ) );

		// 	await expect( canvas.getByRole( 'radio', { name: /accept/i } ) ).toBeChecked();
		// 	await expect( canvas.getByRole( 'radio', { name: /change/i } ) ).not.toBeChecked();
		// 	await expect( canvas.getByRole( 'radio', { name: /leave/i } ) ).not.toBeChecked();
		// } );

		// await step( "Select 'leave' toggle", async () => {
		// 	await userEvent.click( canvas.getByRole( 'radio', { name: /leave/i } ) );

		// 	await expect( canvas.getByRole( 'radio', { name: /accept/i } ) ).not.toBeChecked();
		// 	await expect( canvas.getByRole( 'radio', { name: /change/i } ) ).not.toBeChecked();
		// 	await expect( canvas.getByRole( 'radio', { name: /leave/i } ) ).toBeChecked();
		// } );

		// await step( "Unselect 'leave' toggle", async () => {
		// 	await userEvent.click( canvas.getByRole( 'radio', { name: /leave/i } ) );

		// 	await expect( canvas.getByRole( 'radio', { name: /accept/i } ) ).not.toBeChecked();
		// 	await expect( canvas.getByRole( 'radio', { name: /change/i } ) ).not.toBeChecked();
		// 	await expect( canvas.getByRole( 'radio', { name: /leave/i } ) ).not.toBeChecked();
		// } );
	},

	args: {
		type: 'single',
		disabled: false,
	},
};

/**
 * @typedef {import('./toggle-group').ToggleGroup} ToggleGroup
 * @typedef {import('@storybook/web-components').StoryObj<ToggleGroup>} ToggleGroupStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
