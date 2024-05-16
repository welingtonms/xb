import React, { useRef, useEffect } from 'react';
import { html, render } from 'lit';

import { userEvent } from '@storybook/test';
import { expect } from '@storybook/test';

import { within } from '../../../utils/test-tools';

import createComponent from '../../../utils/create-component';

import '../../layout/box';
import '../../layout/stack';
import './checkbox.define';
import { Checkbox as CheckboxElement } from './checkbox';

export const Checkbox = createComponent({
	tagName: 'xb-checkbox',
	elementClass: CheckboxElement,
	displayName: 'Checkbox',
	events: {
		onChange: 'change',
	},
});

/** @type {Meta} */
const meta = {
	title: 'Components/form/checkbox',
	component: 'xb-checkbox',

	argTypes: {
		disabled: {
			control: {
				type: 'boolean',
			},
		},
		change: {
			action: 'changed',
			table: {
				disable: true,
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
				<xb-checkbox value="accept">Accept WC</xb-checkbox>
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

/** @type {CheckboxStory} */
export const Playground = {
	args: {
		disabled: false,
		size: 'extra-small',
	},
	render: (args) => (
		<xb-stack>
			<WebComponent args={args} />

			<Checkbox value="change" disabled={args.disabled} onChange={args.change}>
				Accept React
			</Checkbox>
		</xb-stack>
	),

	// play: async ({ canvasElement }) => {
	// 	const canvas = within(canvasElement);

	// 	await expect(canvas.getByRole('checkbox', { name: /accept/i })).not.toBeChecked();

	// 	await userEvent.click(canvas.getByRole('checkbox', { name: /accept/i }));

	// 	await expect(canvas.getByRole('checkbox', { name: /accept/i })).toBeChecked();

	// 	await userEvent.click(canvas.getByRole('checkbox', { name: /accept/i }));

	// 	await expect(canvas.getByRole('checkbox', { name: /accept/i })).not.toBeChecked();
	// },
};

/** @type {CheckboxStory} */
// export const Mixed = {
// 	args: {
// 		disabled: false,
// 		size: 'extra-small',
// 	},
// 	render: ( args ) => html`
// 		<xb-stack role="group">
// 			<xb-checkbox
// 				id="xb-checkbox-1"
// 				size=${ args.size }
// 				?disabled=${ args.disabled }
// 				@xb:change=${ args.change }
// 				aria-controls="xb-checkbox-1-1 xb-checkbox-1-2"
// 			>
// 				1.
// 			</xb-checkbox>
// 			<xb-box borderless="all">
// 				<xb-checkbox
// 					id="xb-checkbox-1-1"
// 					size=${ args.size }
// 					?disabled=${ args.disabled }
// 					@xb:change=${ args.change }
// 					aria-controls="xb-checkbox-1-1-1 xb-checkbox-1-1-2 xb-checkbox-1-1-3"
// 				>
// 					1.1.
// 				</xb-checkbox>
// 				<xb-box borderless="all">
// 					<xb-checkbox
// 						id="xb-checkbox-1-1-1"
// 						value="1.1.1."
// 						size=${ args.size }
// 						?disabled=${ args.disabled }
// 						@xb:change=${ args.change }
// 					>
// 						1.1.1.
// 					</xb-checkbox>
// 					<xb-checkbox
// 						id="xb-checkbox-1-1-2"
// 						value="1.1.2."
// 						size=${ args.size }
// 						?disabled=${ args.disabled }
// 						@xb:change=${ args.change }
// 					>
// 						1.1.2.
// 					</xb-checkbox>
// 					<xb-checkbox
// 						id="xb-checkbox-1-1-3"
// 						value="1.1.3."
// 						size=${ args.size }
// 						?disabled=${ args.disabled }
// 						@xb:change=${ args.change }
// 					>
// 						1.1.3.
// 					</xb-checkbox>
// 				</xb-box>
// 				<xb-checkbox
// 					id="xb-checkbox-1-2"
// 					value="1.2."
// 					size=${ args.size }
// 					?disabled=${ args.disabled }
// 					@xb:change=${ args.change }
// 				>
// 					1.2.
// 				</xb-checkbox>
// 			</xb-box>
// 		</xb-stack>
// 	`,

// 	play: async ( { canvasElement, step } ) => {
// 		const idt = 'indeterminate';
// 		const canvas = within( canvasElement );

// 		await expect( canvas.getByRole( 'checkbox', { name: '1.' } ) ).not.toBeChecked();
// 		await expect( canvas.getByRole( 'checkbox', { name: '1.1.' } ) ).not.toBeChecked();
// 		await expect( canvas.getByRole( 'checkbox', { name: '1.1.1.' } ) ).not.toBeChecked();
// 		await expect( canvas.getByRole( 'checkbox', { name: '1.1.2.' } ) ).not.toBeChecked();
// 		await expect( canvas.getByRole( 'checkbox', { name: '1.1.3.' } ) ).not.toBeChecked();
// 		await expect( canvas.getByRole( 'checkbox', { name: '1.2.' } ) ).not.toBeChecked();

// 		await userEvent.click( canvas.getByRole( 'checkbox', { name: '1.1.1.' } ) );

// 		await expect( canvas.getByRole( 'checkbox', { name: '1.' } ) ).toHaveAttribute( idt );
// 		await expect( canvas.getByRole( 'checkbox', { name: '1.1.' } ) ).toHaveAttribute( idt );
// 		await expect( canvas.getByRole( 'checkbox', { name: '1.1.1.' } ) ).toBeChecked();

// 		await expect( canvas.getByRole( 'checkbox', { name: '1.2.' } ) ).not.toBeChecked();

// 		await step(
// 			'Cycles the tri-state checkbox among unchecked, mixed, and checked states.',
// 			async () => {
// 				await step( 'checked', async () => {
// 					await userEvent.click( canvas.getByRole( 'checkbox', { name: '1.1.' } ) );

// 					await expect( canvas.getByRole( 'checkbox', { name: '1.' } ) ).toHaveAttribute( idt );
// 					await expect( canvas.getByRole( 'checkbox', { name: '1.' } ) ).not.toBeChecked();

// 					await expect( canvas.getByRole( 'checkbox', { name: '1.1.' } ) ).not.toHaveAttribute(
// 						idt
// 					);
// 					await expect( canvas.getByRole( 'checkbox', { name: '1.1.' } ) ).toBeChecked();

// 					await expect( canvas.getByRole( 'checkbox', { name: '1.1.1.' } ) ).toBeChecked();
// 					await expect( canvas.getByRole( 'checkbox', { name: '1.1.2.' } ) ).toBeChecked();
// 					await expect( canvas.getByRole( 'checkbox', { name: '1.1.3.' } ) ).toBeChecked();

// 					await expect( canvas.getByRole( 'checkbox', { name: '1.2.' } ) ).not.toBeChecked();
// 				} );

// 				await step( 'unchecked', async () => {
// 					await userEvent.click( canvas.getByRole( 'checkbox', { name: '1.1.' } ) );

// 					await expect( canvas.getByRole( 'checkbox', { name: '1.' } ) ).not.toHaveAttribute( idt );
// 					await expect( canvas.getByRole( 'checkbox', { name: '1.' } ) ).not.toBeChecked();

// 					await expect( canvas.getByRole( 'checkbox', { name: '1.1.' } ) ).not.toHaveAttribute(
// 						idt
// 					);
// 					await expect( canvas.getByRole( 'checkbox', { name: '1.1.' } ) ).not.toBeChecked();

// 					await expect( canvas.getByRole( 'checkbox', { name: '1.1.1.' } ) ).not.toBeChecked();
// 					await expect( canvas.getByRole( 'checkbox', { name: '1.1.2.' } ) ).not.toBeChecked();
// 					await expect( canvas.getByRole( 'checkbox', { name: '1.1.3.' } ) ).not.toBeChecked();

// 					await expect( canvas.getByRole( 'checkbox', { name: '1.2.' } ) ).not.toBeChecked();
// 				} );

// 				await step( 'mixed (restores the previous state)', async () => {
// 					await userEvent.click( canvas.getByRole( 'checkbox', { name: '1.1.' } ) );

// 					await expect( canvas.getByRole( 'checkbox', { name: '1.' } ) ).toHaveAttribute( idt );
// 					await expect( canvas.getByRole( 'checkbox', { name: '1.' } ) ).not.toBeChecked();

// 					await expect( canvas.getByRole( 'checkbox', { name: '1.1.' } ) ).toHaveAttribute( idt );
// 					await expect( canvas.getByRole( 'checkbox', { name: '1.1.' } ) ).not.toBeChecked();

// 					await expect( canvas.getByRole( 'checkbox', { name: '1.1.1.' } ) ).toBeChecked();
// 					await expect( canvas.getByRole( 'checkbox', { name: '1.1.2.' } ) ).not.toBeChecked();
// 					await expect( canvas.getByRole( 'checkbox', { name: '1.1.3.' } ) ).not.toBeChecked();

// 					await expect( canvas.getByRole( 'checkbox', { name: '1.2.' } ) ).not.toBeChecked();
// 				} );
// 			}
// 		);

// 		await userEvent.click( canvas.getByRole( 'checkbox', { name: '1.1.2.' } ) );

// 		await expect( canvas.getByRole( 'checkbox', { name: '1.' } ) ).toHaveAttribute( idt );
// 		await expect( canvas.getByRole( 'checkbox', { name: '1.' } ) ).not.toBeChecked();

// 		await expect( canvas.getByRole( 'checkbox', { name: '1.1.' } ) ).toHaveAttribute( idt );
// 		await expect( canvas.getByRole( 'checkbox', { name: '1.1.' } ) ).not.toBeChecked();

// 		await expect( canvas.getByRole( 'checkbox', { name: '1.1.1.' } ) ).toBeChecked();
// 		await expect( canvas.getByRole( 'checkbox', { name: '1.1.2.' } ) ).toBeChecked();
// 		await expect( canvas.getByRole( 'checkbox', { name: '1.1.3.' } ) ).not.toBeChecked();

// 		await expect( canvas.getByRole( 'checkbox', { name: '1.2.' } ) ).not.toBeChecked();

// 		await userEvent.click( canvas.getByRole( 'checkbox', { name: '1.1.3.' } ) );

// 		await expect( canvas.getByRole( 'checkbox', { name: '1.' } ) ).toHaveAttribute( idt );
// 		await expect( canvas.getByRole( 'checkbox', { name: '1.' } ) ).not.toBeChecked();

// 		await expect( canvas.getByRole( 'checkbox', { name: '1.1.' } ) ).not.toHaveAttribute( idt );
// 		await expect( canvas.getByRole( 'checkbox', { name: '1.1.' } ) ).toBeChecked();

// 		await expect( canvas.getByRole( 'checkbox', { name: '1.1.1.' } ) ).toBeChecked();
// 		await expect( canvas.getByRole( 'checkbox', { name: '1.1.2.' } ) ).toBeChecked();
// 		await expect( canvas.getByRole( 'checkbox', { name: '1.1.3.' } ) ).toBeChecked();

// 		await expect( canvas.getByRole( 'checkbox', { name: '1.2.' } ) ).not.toBeChecked();

// 		await userEvent.click( canvas.getByRole( 'checkbox', { name: '1.2.' } ) );

// 		await expect( canvas.getByRole( 'checkbox', { name: '1.' } ) ).not.toHaveAttribute( idt );
// 		await expect( canvas.getByRole( 'checkbox', { name: '1.' } ) ).toBeChecked();

// 		await expect( canvas.getByRole( 'checkbox', { name: '1.1.' } ) ).not.toHaveAttribute( idt );
// 		await expect( canvas.getByRole( 'checkbox', { name: '1.1.' } ) ).toBeChecked();

// 		await expect( canvas.getByRole( 'checkbox', { name: '1.1.1.' } ) ).toBeChecked();
// 		await expect( canvas.getByRole( 'checkbox', { name: '1.1.2.' } ) ).toBeChecked();
// 		await expect( canvas.getByRole( 'checkbox', { name: '1.1.3.' } ) ).toBeChecked();

// 		await expect( canvas.getByRole( 'checkbox', { name: '1.2.' } ) ).toBeChecked();
// 	},
// };

/**
 * @typedef {import('./checkbox').Checkbox} Checkbox
 * @typedef {import('@storybook/web-components').StoryObj<Checkbox>} CheckboxStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
