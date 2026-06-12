import React, { useEffect } from 'react';

import { expect, userEvent, waitFor } from 'storybook/test';

import { PlacementArg } from '../../utils/arg-types';
import { waitForUpgrade } from '../../utils/test-tools.js';

import '../layout';
import '../button/button.define';
import '../icon/icon.define';
import './tooltip.define';

/** @type {Meta} */
const meta = {
	title: 'Components/Tooltip',
	component: 'xb-tooltip',

	argTypes: {
		placement: PlacementArg,

		trigger: {
			control: 'check',
			options: [ 'click', 'hover', 'focus' ],
		},
	},
	parameters: {},
};

export default meta;

const TooltipDemo = () => {
	useEffect( () => {
		const anchor = document.getElementById( 'my-anchor' );
		let isDragging = false;
		let offsetX, offsetY;

		const onPointerDown = ( e ) => {
			isDragging = true;
			anchor.setPointerCapture( e.pointerId );

			// Calculate offset between cursor and element's top-left corner
			const rect = anchor.getBoundingClientRect();
			offsetX = e.clientX - rect.left;
			offsetY = e.clientY - rect.top;

			anchor.style.cursor = 'grabbing';
		};

		const onPointerMove = ( e ) => {
			if ( ! isDragging ) return;

			anchor.style.left = e.clientX - offsetX + 'px';
			anchor.style.top = e.clientY - offsetY + 'px';
		};

		const onPointerUp = ( e ) => {
			isDragging = false;
			anchor.releasePointerCapture( e.pointerId );
			anchor.style.cursor = 'move';
		};

		anchor.addEventListener( 'pointerdown', onPointerDown );
		anchor.addEventListener( 'pointermove', onPointerMove );
		anchor.addEventListener( 'pointerup', onPointerUp );

		return () => {
			anchor.removeEventListener( 'pointerdown', onPointerDown );
			anchor.removeEventListener( 'pointermove', onPointerMove );
			anchor.removeEventListener( 'pointerup', onPointerUp );
		};
	}, [] );

	return null;
};

/** @type {TooltipStory} */
export const Playground = {
	render: ( args ) => (
		<xb-stack>
			<TooltipDemo />
			<xb-button id="my-anchor" variant="icon" icon="star"></xb-button>

			<xb-tooltip
				anchor="my-anchor"
				placement={ args.placement }
				trigger={ args.trigger }
				style={
					{
						// '--d': '1em' /* distance between tooltip and anchor */,
						// position: 'absolute',
						// 'position-anchor': '--anchor',
						// 'position-area': 'top',
						// bottom: 'var(--d)',
					}
				}
			>
				Lorem ipsum dolor sit amet.
			</xb-tooltip>
		</xb-stack>
	),

	args: {
		placement: 'bottom-start',
		trigger: [ 'click' ],
	},
};

const TooltipTriggerTemplate = ( { trigger } ) => (
	<div style={ { padding: '4rem' } }>
		<button id="tooltip-anchor" type="button">
			reference
		</button>
		<xb-tooltip anchor="tooltip-anchor" trigger={ trigger }>
			Lorem ipsum dolor sit amet.
		</xb-tooltip>
	</div>
);

export const TriggerOnClick = {
	name: 'Test: Trigger on click',
	tags: [ '!autodocs' ],
	render: () => <TooltipTriggerTemplate trigger={ [ 'click' ] } />,
	play: async ( { canvasElement, step } ) => {
		const tooltip = canvasElement.querySelector( 'xb-tooltip' );
		const anchor = canvasElement.querySelector( '#tooltip-anchor' );

		await waitForUpgrade( tooltip );

		if ( tooltip.open ) {
			await tooltip.hide();
		}

		await step( 'tooltip is hidden initially', async () => {
			await expect( tooltip.open ).toBe( false );
		} );

		await step( 'click opens tooltip', async () => {
			await userEvent.click( anchor );
			await waitFor( () => expect( tooltip.open ).toBe( true ) );
		} );

		await step( 'click again closes tooltip', async () => {
			await userEvent.click( anchor );
			await waitFor( () => expect( tooltip.open ).toBe( false ) );
		} );
	},
};

export const TriggerOnHover = {
	name: 'Test: Trigger on hover',
	tags: [ '!autodocs' ],
	render: () => <TooltipTriggerTemplate trigger={ [ 'hover' ] } />,
	play: async ( { canvasElement, step } ) => {
		const tooltip = canvasElement.querySelector( 'xb-tooltip' );
		const anchor = canvasElement.querySelector( '#tooltip-anchor' );

		await waitForUpgrade( tooltip );

		if ( tooltip.open ) {
			await tooltip.hide();
		}

		await step( 'hover opens tooltip', async () => {
			await userEvent.hover( anchor );
			await waitFor( () => expect( tooltip.open ).toBe( true ), { timeout: 1000 } );
		} );

		await step( 'unhover closes tooltip', async () => {
			await userEvent.unhover( anchor );
			await waitFor( () => expect( tooltip.open ).toBe( false ), { timeout: 1500 } );
		} );
	},
};

export const TriggerOnFocus = {
	name: 'Test: Trigger on focus',
	tags: [ '!autodocs' ],
	render: () => <TooltipTriggerTemplate trigger={ [ 'focus' ] } />,
	play: async ( { canvasElement, step } ) => {
		const tooltip = canvasElement.querySelector( 'xb-tooltip' );
		const anchor = canvasElement.querySelector( '#tooltip-anchor' );

		await waitForUpgrade( tooltip );

		if ( tooltip.open ) {
			await tooltip.hide();
		}

		await step( 'focus opens tooltip', async () => {
			anchor.focus();
			await waitFor( () => expect( tooltip.open ).toBe( true ) );
		} );

		await step( 'blur closes tooltip', async () => {
			anchor.blur();
			await waitFor( () => expect( tooltip.open ).toBe( false ), { timeout: 1000 } );
		} );
	},
};

/**
 * @typedef {import('./tooltip').Tooltip} Tooltip
 * @typedef {import('@storybook/web-components').StoryObj<Tooltip>} TooltipStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
