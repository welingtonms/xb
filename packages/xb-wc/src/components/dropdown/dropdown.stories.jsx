import React, { useRef, useEffect } from 'react';
import { html, render } from 'lit';

import { PlacementArg } from '../../common/arg-types';

import createComponent from '../../utils/create-component';

import '../layout/stack';

import './dropdown.define';
import { Dropdown as DropdownElement } from './dropdown';
import { DropdownItem as DropdownItemElement } from './dropdown-item';
import { DropdownMenu as DropdownMenuElement } from './dropdown-menu';
import { DropdownTrigger as DropdownTriggerElement } from './dropdown-trigger';

const Dropdown = createComponent({
	tagName: 'xb-dropdown',
	elementClass: DropdownElement,
	displayName: 'Dropdown',
});

const DropdownItem = createComponent({
	tagName: 'xb-dropdown-item',
	elementClass: DropdownItemElement,
	displayName: 'DropdownItem',
});

const DropdownMenu = createComponent({
	tagName: 'xb-dropdown-menu',
	elementClass: DropdownMenuElement,
	displayName: 'DropdownMenu',
});

const DropdownTrigger = createComponent({
	tagName: 'xb-dropdown-trigger',
	elementClass: DropdownTriggerElement,
	displayName: 'DropdownTrigger',
});

/** @type {import('../../common/arg-types').Meta} */
const meta = {
	title: 'Components/dropdown',
	component: 'xb-dropdown',

	argTypes: {
		placement: PlacementArg,
		click: {
			action: true,
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
	/** @type {React.MutableRefObject<HTMLElement[]>} */
	const elementsRefs = useRef();

	useEffect(() => {
		render(
			html`
				<xb-dropdown>
					<xb-dropdown-trigger>Actions</xb-dropdown-trigger>

					<xb-dropdown-menu>
						<xb-dropdown-item onclick=${args.click}>Accept</xb-dropdown-item>
						<xb-dropdown-item onclick=${args.click}>Change</xb-dropdown-item>
						<xb-dropdown-item onclick=${args.click}>Leave</xb-dropdown-item>
					</xb-dropdown-menu>
				</xb-dropdown>
			`,
			rootRef.current
		);

		elementRef.current = rootRef.current.querySelector(meta.component);
		elementsRefs.current = rootRef.current.querySelectorAll('xb-dropdown-item');

		let currentArgs = args;

		elementRef.current.disabled = currentArgs.disabled;

		elementsRefs.current.forEach((element) => {
			element.addEventListener('click', currentArgs.click);
		});

		return () => {
			elementsRefs.current.forEach((element) => {
				element.removeEventListener('click', currentArgs.click);
			});
		};
	}, [args]);

	return <div id="wc-root" ref={rootRef}></div>;
}

/** @type {import('../../common/arg-types').StoryObj} */
export const Playground = {
	render: (args) => (
		<xb-stack>
			<WebComponent args={args} />

			<Dropdown>
				<DropdownTrigger>Actions</DropdownTrigger>

				<DropdownMenu>
					<DropdownItem onClick={args.click}>Accept</DropdownItem>
					<DropdownItem onClick={args.click}>Change</DropdownItem>
					<DropdownItem onClick={args.click}>Leave</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</xb-stack>
	),

	play: async ({ canvasElement }) => {
		// const canvas = within( canvasElement );
		// await expect( canvas.getByRole( 'button', { name: /actions/i } ) ).toBeInTheDocument();
		// await expect( canvas.queryByRole( 'menu' ) ).not.toBeInTheDocument();
		// await userEvent.click( canvas.getByRole( 'button', { name: /actions/i } ) );
		// await expect( canvas.getByRole( 'menu' ) ).toBeInTheDocument();
		// await expect( canvas.getByRole( 'menuitem', { name: /accept/i } ) ).toBeInTheDocument();
		// await expect( canvas.getByRole( 'menuitem', { name: /change/i } ) ).toBeInTheDocument();
		// await expect( canvas.getByRole( 'menuitem', { name: /leave/i } ) ).toBeInTheDocument();
		// await userEvent.click( canvas.getByRole( 'menuitem', { name: /change/i } ) );
		// await expect( canvas.queryByRole( 'menu' ) ).not.toBeInTheDocument();
	},

	args: {
		placement: 'bottom-start',
	},
};
