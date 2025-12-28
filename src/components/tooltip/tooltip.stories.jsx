import React, { useEffect } from 'react';

import { PlacementArg } from '../../utils/arg-types';

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

		anchor.addEventListener( 'mousedown', ( e ) => {
			isDragging = true;

			// Calculate offset between cursor and element's top-left corner
			const rect = anchor.getBoundingClientRect();
			offsetX = e.clientX - rect.left;
			offsetY = e.clientY - rect.top;

			anchor.style.cursor = 'grabbing';
		} );

		document.addEventListener( 'mousemove', ( e ) => {
			if ( ! isDragging ) return;

			anchor.style.left = e.clientX - offsetX + 'px';
			anchor.style.top = e.clientY - offsetY + 'px';
		} );

		document.addEventListener( 'mouseup', () => {
			isDragging = false;
			anchor.style.cursor = 'move';
		} );

		return () => {
			anchor.removeEventListener( 'mousedown', ( e ) => {
				isDragging = false;
				anchor.style.cursor = 'default';
			} );
			document.removeEventListener( 'mousemove', ( e ) => {
				if ( ! isDragging ) return;

				anchor.style.left = e.clientX - offsetX + 'px';
				anchor.style.top = e.clientY - offsetY + 'px';
			} );
			document.removeEventListener( 'mouseup', () => {
				isDragging = false;
				anchor.style.cursor = 'default';
			} );
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

/**
 * @typedef {import('./tooltip').Tooltip} Tooltip
 * @typedef {import('@storybook/web-components').StoryObj<Tooltip>} TooltipStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
