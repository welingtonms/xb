import React, { useRef, useEffect } from 'react';
import { html, render } from 'lit';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import createComponent from '../../utils/create-component';

import '../layout';
import './button.define';
import { Button as ButtonElement } from './button';

export const Button = createComponent({
	tagName: 'xb-button',
	elementClass: ButtonElement,
	displayName: 'Button',
});

/** @type {Meta} */
const meta = {
	title: 'Components/button',
	component: 'xb-button',

	argTypes: {
		variant: {
			control: 'select',
			options: ['text', 'ghost', 'flat'],
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
				<xb-button type="submit" variant="ghost" size="small" onclick=${args.click}>
					Submit
				</xb-button>
			`,
			rootRef.current
		);

		elementRef.current = rootRef.current.querySelector(meta.component);

		let currentArgs = args;

		elementRef.current.disabled = currentArgs.disabled;

		elementRef.current.addEventListener('click', currentArgs.click);

		return () => {
			elementRef.current.removeEventListener('click', currentArgs.click);
		};
	}, [args]);

	return <div id="wc-root" ref={rootRef}></div>;
}

export const Playground = {
	render: (args) => (
		<form
			action="http://www.foo.com"
			method="post"
			onSubmit={(event) => {
				event.preventDefault();

				console.log('form submitted with', ...new FormData(event.target));
			}}
		>
			<fieldset>
				<xb-stack>
					<input type="text" name="greeting" placeholder="Greeting" />

					<WebComponent args={args} />

					<Button type="submit" variant="ghost" size="small" onClick={args.click}>
						Submit React
					</Button>
				</xb-stack>
			</fieldset>
		</form>
	),
	play: async ({ canvasElement, args }) => {
		// const canvas = within(canvasElement);
		// await expect(canvas.getByText('Submit')).not.toBeDisabled();
		// await userEvent.click(canvas.getByText('Submit'));
		// await expect(args.click).toHaveBeenCalled();
	},

	args: {
		borderless: 'none',
		disabled: false,
		emphasis: 'ghost',
		paddingless: 'none',
		scale: 'small',
	},
};
