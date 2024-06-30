import React, { useRef, useEffect } from 'react';
import { html, render } from 'lit';
import { userEvent } from '@storybook/test';
import { expect } from '@storybook/test';

import { within } from '../../utils/test-tools.js';

import '../layout';
import './button.define';
import { Button } from './Button.jsx';

/** @type {Meta} */
const meta = {
	title: 'Components/button',
	component: 'xb-button',

	argTypes: {
		variant: {
			control: 'select',
			options: [ 'text', 'ghost', 'flat' ],
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

function WebComponent( { args } ) {
	/** @type {React.MutableRefObject<HTMLDivElement>} */
	const rootRef = useRef();
	/** @type {React.MutableRefObject<HTMLElement>} */
	const elementRef = useRef();

	useEffect( () => {
		render(
			html`
				<xb-button type="submit" variant="ghost">Submit</xb-button>
			`,
			rootRef.current
		);

		elementRef.current = rootRef.current.querySelector( meta.component );

		let currentArgs = args;

		elementRef.current.disabled = currentArgs.disabled;
		elementRef.current.variant = currentArgs.variant;

		elementRef.current.addEventListener( 'click', currentArgs.click );

		return () => {
			elementRef.current.removeEventListener( 'click', currentArgs.click );
		};
	}, [ args ] );

	return <div id="wc-root" ref={ rootRef }></div>;
}

export const Playground = {
	render: ( args ) => (
		<xb-stack>
			<WebComponent args={ args } />

			<Button
				type="submit"
				disabled={ args.disabled }
				variant={ args.variant }
				size="small"
				onClick={ args.click }
			>
				Submit
			</Button>
		</xb-stack>
	),
	play: async ( { canvasElement, args } ) => {
		const canvas = within( canvasElement );

		const button = await canvas.getAllByText( 'Submit' )[ 0 ];
		await expect( button ).not.toBeDisabled();
		await userEvent.click( button );
		await expect( args.click ).toHaveBeenCalled();
	},

	args: {
		variant: 'ghost',
		disabled: false,
	},
};
