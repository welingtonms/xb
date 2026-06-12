import React from 'react';

import { userEvent, expect, fn, waitFor } from 'storybook/test';
import { pressKey } from '../../../utils/test-tools.js';
import { expectSelectOpen, getOption, getSelectParts } from './select.test-helpers.js';
import '../../layout';
import '../../icon/icon.define';
import './select.define';

const STATIC_OPTIONS = (
	<>
		<xb-option value="first">First</xb-option>
		<xb-option value="second">Second</xb-option>
		<xb-option value="third">Third</xb-option>
	</>
);

export default {
	title: 'Components/Form/Select',
	parameters: {
		layout: 'padded',
	},
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
		loading: {
			control: {
				type: 'boolean',
			},
		},
		type: {
			control: 'radio',
			options: [ 'single-strict', 'single', 'multiple' ],
		},
		responsive: {
			control: 'boolean',
		},
	},
};

/** @type {import('../../../utils/arg-types.js').StoryObj} */
export const Playground = {
	render: ( args ) => (
		<xb-stack>
			<xb-select
				name="xb-select"
				default-value="change"
				loading={ args.loading }
				type={ args.type }
				onchange={ args.change }
				disabled={ args.disabled }
				responsive={ args.responsive }
			>
				<xb-option value="accept">Accept</xb-option>
				<xb-option value="change">Change</xb-option>
				<xb-option value="leave">Leave</xb-option>
			</xb-select>

			<xb-select
				name="xb-select"
				default-value="change"
				loading={ args.loading }
				type={ args.type }
				onchange={ args.change }
				disabled={ args.disabled }
				responsive={ args.responsive }
			>
				<xb-option value="accept" icon="user">
					Phoenix Baker
				</xb-option>
				<xb-option value="change" icon="user">
					John Doe
				</xb-option>
				<xb-option value="leave" icon="user">
					Jane Doe
				</xb-option>
			</xb-select>
		</xb-stack>
	),

	args: {
		loading: false,
		type: 'single',
		disabled: false,
		responsive: true,
	},
};

/** @type {import('../../../utils/arg-types.js').StoryObj} */
export const ExpandCollapse = {
	name: 'Test: Expand collapse',
	tags: [ '!autodocs' ],
	render: () => (
		<xb-select type="single" loading={ false } disabled={ false }>
			{ STATIC_OPTIONS }
		</xb-select>
	),
	play: async ( { canvasElement, step } ) => {
		const { searchInput, select } = await getSelectParts( canvasElement );
		const option = ( value ) => getOption( canvasElement, value );

		await step( 'expands when search input is clicked', async () => {
			await userEvent.click( searchInput );
			await expectSelectOpen( select, true );

			await waitFor( async () => {
				await expect( option( 'first' ) ).toBeInTheDocument();
				await expect( option( 'second' ) ).toBeInTheDocument();
				await expect( option( 'third' ) ).toBeInTheDocument();
			} );
		} );

		await step( 'collapses when search input is clicked again', async () => {
			await userEvent.click( searchInput );
			await expectSelectOpen( select, false );
		} );
	},
};

/** @type {import('../../../utils/arg-types.js').StoryObj} */
export const KeyboardNavigation = {
	name: 'Test: Keyboard navigation',
	tags: [ '!autodocs' ],
	args: {
		change: fn(),
	},
	render: ( args ) => (
		<xb-select type="single" loading={ false } disabled={ false } onchange={ args.change }>
			{ STATIC_OPTIONS }
		</xb-select>
	),
	play: async ( { canvasElement, step } ) => {
		const { searchInput, select } = await getSelectParts( canvasElement );
		const option = ( value ) => getOption( canvasElement, value );

		await step( 'menu starts collapsed', async () => {
			await expectSelectOpen( select, false );
		} );

		await step( 'ArrowDown opens menu and focuses first option', async () => {
			searchInput.focus();
			pressKey( select, 'ArrowDown' );

			await expectSelectOpen( select, true );
			await waitFor( async () => {
				await expect( option( 'first' ) ).toHaveClass( 'is-focused' );
			} );
			await expect( option( 'second' ) ).not.toHaveClass( 'is-focused' );
			await expect( option( 'third' ) ).not.toHaveClass( 'is-focused' );
		} );

		await step( 'ArrowDown moves focus through options and wraps', async () => {
			pressKey( select, 'ArrowDown' );
			await waitFor( async () => {
				await expect( option( 'second' ) ).toHaveClass( 'is-focused' );
			} );

			pressKey( select, 'ArrowDown' );
			await waitFor( async () => {
				await expect( option( 'third' ) ).toHaveClass( 'is-focused' );
			} );

			pressKey( select, 'ArrowDown' );
			await waitFor( async () => {
				await expect( option( 'first' ) ).toHaveClass( 'is-focused' );
			} );
		} );

		await step( 'ArrowUp moves focus backward and wraps', async () => {
			pressKey( select, 'ArrowUp' );
			await waitFor( async () => {
				await expect( option( 'third' ) ).toHaveClass( 'is-focused' );
			} );

			pressKey( select, 'ArrowUp' );
			await waitFor( async () => {
				await expect( option( 'second' ) ).toHaveClass( 'is-focused' );
			} );

			pressKey( select, 'ArrowUp' );
			await waitFor( async () => {
				await expect( option( 'first' ) ).toHaveClass( 'is-focused' );
			} );
		} );

		await step( 'Escape closes menu', async () => {
			pressKey( select, 'Escape' );
			await expectSelectOpen( select, false );
		} );

		await step( 'ArrowUp opens menu and focuses last option', async () => {
			pressKey( select, 'ArrowUp' );

			await expectSelectOpen( select, true );
			await waitFor( async () => {
				await expect( option( 'third' ) ).toHaveClass( 'is-focused' );
			} );
		} );
	},
};

/** @type {import('../../../utils/arg-types.js').StoryObj} */
export const SingleSelection = {
	name: 'Test: Single selection',
	tags: [ '!autodocs' ],
	render: () => (
		<xb-select type="single" loading={ false } disabled={ false }>
			{ STATIC_OPTIONS }
		</xb-select>
	),
	play: async ( { canvasElement, step } ) => {
		const { handleButton, select } = await getSelectParts( canvasElement );
		const option = ( value ) => getOption( canvasElement, value );

		await step( 'selects third option from expanded menu', async () => {
			await userEvent.click( handleButton );
			await expectSelectOpen( select, true );

			await userEvent.click( option( 'third' ) );

			await expectSelectOpen( select, false );
			await expect( option( 'first' ) ).not.toHaveAttribute( 'selected' );
			await expect( option( 'first' ) ).not.toHaveAttribute( 'aria-selected' );
			await expect( option( 'second' ) ).not.toHaveAttribute( 'selected' );
			await expect( option( 'second' ) ).not.toHaveAttribute( 'aria-selected' );
			await expect( option( 'third' ) ).toHaveAttribute( 'selected' );
			await expect( option( 'third' ) ).toHaveAttribute( 'aria-selected', 'true' );
		} );
	},
};

/** @type {import('../../../utils/arg-types.js').StoryObj} */
export const SingleSelectionOnChange = {
	name: 'Test: Single selection on change',
	tags: [ '!autodocs' ],
	args: {
		change: fn(),
	},
	render: ( args ) => (
		<xb-select type="single" loading={ false } disabled={ false } onchange={ args.change }>
			{ STATIC_OPTIONS }
		</xb-select>
	),
	play: async ( { canvasElement, args, step } ) => {
		const { handleButton, select } = await getSelectParts( canvasElement );
		const option = ( value ) => getOption( canvasElement, value );
		select.addEventListener( 'change', args.change );

		await step( 'fires change when selecting first option', async () => {
			await userEvent.click( handleButton );
			await expectSelectOpen( select, true );

			await userEvent.click( option( 'first' ) );

			await expectSelectOpen( select, false );
			await expect( args.change ).toHaveBeenCalled();
			await expect( select.value ).toBe( 'first' );
		} );
	},
};

/** @type {import('../../../utils/arg-types.js').StoryObj} */
export const SingleSelectionWithKeyboard = {
	name: 'Test: Single selection with keyboard',
	tags: [ '!autodocs' ],
	args: {
		change: fn(),
	},
	render: ( args ) => (
		<xb-select type="single" loading={ false } disabled={ false } onchange={ args.change }>
			{ STATIC_OPTIONS }
		</xb-select>
	),
	play: async ( { canvasElement, args, step } ) => {
		const { searchInput, handleButton, select } = await getSelectParts( canvasElement );
		const option = ( value ) => getOption( canvasElement, value );
		select.addEventListener( 'change', args.change );

		await step( 'filters options while typing', async () => {
			await expectSelectOpen( select, false );

			await userEvent.type( searchInput, 'second' );

			await waitFor(
				async () => {
					await expectSelectOpen( select, true );
					await expect( option( 'first' ) ).toHaveAttribute( 'hidden' );
					await expect( option( 'second' ) ).not.toHaveAttribute( 'hidden' );
					await expect( option( 'third' ) ).toHaveAttribute( 'hidden' );
				},
				{ timeout: 2000 }
			);
		} );

		await step( 'selects focused option after keyboard navigation', async () => {
			pressKey( select, 'ArrowDown' );
			await waitFor( async () => {
				await expect( option( 'second' ) ).toHaveClass( 'is-focused' );
			} );

			await userEvent.click( option( 'second' ) );

			await expectSelectOpen( select, false );
		} );

		await step( 'persists selection after reopening menu', async () => {
			await userEvent.click( handleButton );

			await expect( option( 'first' ) ).toBeInTheDocument();
			await expect( option( 'second' ) ).toBeInTheDocument();
			await expect( option( 'third' ) ).toBeInTheDocument();

			await expect( option( 'first' ) ).not.toHaveAttribute( 'selected' );
			await expect( option( 'second' ) ).toHaveAttribute( 'selected' );
			await expect( option( 'third' ) ).not.toHaveAttribute( 'selected' );
			await expect( args.change ).toHaveBeenCalled();
		} );
	},
};
