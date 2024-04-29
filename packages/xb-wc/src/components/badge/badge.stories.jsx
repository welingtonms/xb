import React, { useRef, useEffect } from 'react';
import { html, render } from 'lit';

import createComponent from '../../utils/create-component';

import '../layout';
import './badge.define';
import { Badge as BadgeElement } from './badge';

const Badge = createComponent({
	tagName: 'xb-badge',
	elementClass: BadgeElement,
	displayName: 'Badge',
});

/** @type {Meta} */
const meta = {
	title: 'Components/badge',
	component: 'xb-badge',

	argTypes: {
		// backgroundColor: { control: 'color' },
		variant: {
			control: 'select',
			options: ['neutral', 'primary', 'secondary', 'tertiary'],
		},
	},
	parameters: {
		// docs: {
		// 	// page: Docs,
		// },
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
				<xb-badge>Potatoes</xb-badge>
			`,
			rootRef.current
		);

		elementRef.current = rootRef.current.querySelector(meta.component);

		elementRef.current.variant = args.variant;
	}, [args]);

	return <div id="wc-root" ref={rootRef}></div>;
}

/** @type {BadgeStory} */
export const Playground = {
	render: (args) => {
		return (
			<xb-stack>
				<WebComponent args={args} />

				<Badge variant={args.variant}>Potatoes</Badge>
			</xb-stack>
		);
	},

	args: {
		variant: 'primary',
	},
};

/**
 * @typedef {import('./badge').Badge} Badge
 * @typedef {import('@storybook/react').StoryObj<Badge>} BadgeStory
 * @typedef {import('@storybook/react').Meta} Meta
 */
