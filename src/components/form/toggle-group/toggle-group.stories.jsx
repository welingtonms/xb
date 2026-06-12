import React from 'react';

import { userEvent, expect, fn, waitFor } from 'storybook/test';
import { waitForUpgrade, within } from '../../../utils/test-tools.js';

import { SelectionArg } from '../../../utils/arg-types.js';

import '../../layout/layout.define';
import '../../icon/icon.define';
import './toggle-group.define';
import '../../tooltip/tooltip.define';

const TOGGLE_ITEMS = (
	<>
		<xb-toggle value="accept">Accept</xb-toggle>
		<xb-toggle value="change">Change</xb-toggle>
		<xb-toggle value="leave">Leave</xb-toggle>
	</>
);

/**
 * @param {{
 *  type: string,
 *  value?: string | string[] | null,
 *  disabled?: boolean,
 *  change?: (...args: unknown[]) => void,
 * }} props
 */
function ToggleGroupFixture( { type, value, disabled = false, change } ) {
	const ref = React.useRef( null );

	React.useLayoutEffect( () => {
		const element = ref.current;
		if ( ! element || value == null ) {
			return;
		}

		element.value = value;

		const selectedValues = Array.isArray( value ) ? value : [ value ];
		for ( const toggle of element.querySelectorAll( 'xb-toggle' ) ) {
			const isSelected = selectedValues.includes( toggle.value );
			toggle.checked = isSelected;
			if ( isSelected ) {
				toggle.setAttribute( 'aria-checked', 'true' );
			} else {
				toggle.removeAttribute( 'aria-checked' );
			}
		}
	}, [ value ] );

	return (
		<xb-toggle-group
			ref={ ref }
			type={ type }
			disabled={ disabled }
			initial-value={ typeof value === 'string' ? value : undefined }
			onchange={ change }
		>
			{ TOGGLE_ITEMS }
		</xb-toggle-group>
	);
}

/**
 * @param {HTMLElement} canvasElement
 * @param {string} toggleValue
 */
async function getToggle( canvasElement, toggleValue ) {
	const toggle = canvasElement.querySelector( `xb-toggle[value="${ toggleValue }"]` );
	await waitForUpgrade( toggle );
	return toggle;
}

/**
 * @param {HTMLElement} canvasElement
 */
async function waitForToggleGroup( canvasElement ) {
	const group = canvasElement.querySelector( 'xb-toggle-group' );
	await waitForUpgrade( group );

	for ( const toggle of canvasElement.querySelectorAll( 'xb-toggle' ) ) {
		await waitForUpgrade( toggle );
	}

	within( canvasElement );

	const value = group.value;
	if ( value != null ) {
		const selectedValues = Array.isArray( value ) ? value : [ value ];
		for ( const toggle of group.querySelectorAll( 'xb-toggle' ) ) {
			const isSelected = selectedValues.includes( toggle.value );
			toggle.checked = isSelected;
			if ( isSelected ) {
				toggle.setAttribute( 'aria-checked', 'true' );
			} else {
				toggle.removeAttribute( 'aria-checked' );
			}
		}
	}

	return group;
}

export default {
	title: 'Components/Form/Toggle Group',
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
		type: SelectionArg,
	},
};

/** @type {ToggleGroupStory} */
export const Playground = {
	render: ( args ) => (
		<xb-stack style={ { '--xb-stack-gap': '16px', '--xb-stack-align': 'center' } }>
			<xb-toggle-group name="life-choice" type={ args.type } disabled={ args.disabled }>
				<xb-toggle value="accept">Accept</xb-toggle>

				<xb-toggle value="change">Change</xb-toggle>

				<xb-toggle value="leave">Leave</xb-toggle>
			</xb-toggle-group>

			<xb-toggle-group type="single-strict" name="text-alignment" disabled={ args.disabled }>
				<xb-toggle id="left-toggle" value="left">
					<xb-icon name="text-align-left" />
				</xb-toggle>
				<xb-tooltip anchor="left-toggle">Align text to the left</xb-tooltip>

				<xb-toggle id="center-toggle" value="center">
					<xb-icon name="text-align-center" />
				</xb-toggle>
				<xb-tooltip anchor="center-toggle" placement="bottom">
					Align text to the center
				</xb-tooltip>

				<xb-toggle id="right-toggle" value="right">
					<xb-icon name="text-align-right" />
				</xb-toggle>
				<xb-tooltip anchor="right-toggle">Align text to the right</xb-tooltip>

				<xb-toggle id="justify-toggle" value="justify">
					<xb-icon name="text-align-justify" />
				</xb-toggle>
				<xb-tooltip anchor="justify-toggle" placement="bottom">
					Align text to the justify
				</xb-tooltip>
			</xb-toggle-group>
		</xb-stack>
	),

	args: {
		type: 'single',
		disabled: false,
	},
};

/** @type {ToggleGroupStory} */
export const SingleSelectionMounts = {
	name: 'Test: Single selection mounts',
	tags: [ '!autodocs' ],
	render: () => <ToggleGroupFixture type="single" />,
	play: async ( { canvasElement, step } ) => {
		const group = await waitForToggleGroup( canvasElement );

		await step( 'mounts as radiogroup with unchecked radios', async () => {
			await waitFor( async () => {
				await expect( group ).toHaveAttribute( 'role', 'radiogroup' );
			} );

			for ( const toggle of canvasElement.querySelectorAll( 'xb-toggle' ) ) {
				await expect( toggle ).toHaveAttribute( 'role', 'radio' );
				await expect( toggle ).not.toHaveAttribute( 'aria-checked' );
			}
		} );
	},
};

/** @type {ToggleGroupStory} */
export const SingleSelectionInitialValue = {
	name: 'Test: Single selection initial value',
	tags: [ '!autodocs' ],
	render: () => <ToggleGroupFixture type="single" value="change" />,
	play: async ( { canvasElement, step } ) => {
		await waitForToggleGroup( canvasElement );

		await step( 'reflects initial value on toggles', async () => {
			await waitFor( async () => {
				await expect( await getToggle( canvasElement, 'change' ) ).toHaveAttribute(
					'aria-checked',
					'true'
				);
			} );

			await expect( await getToggle( canvasElement, 'accept' ) ).not.toHaveAttribute(
				'aria-checked'
			);
			await expect( await getToggle( canvasElement, 'leave' ) ).not.toHaveAttribute(
				'aria-checked'
			);
		} );
	},
};

/** @type {ToggleGroupStory} */
export const SingleSelectionChange = {
	name: 'Test: Single selection change',
	tags: [ '!autodocs' ],
	args: {
		change: fn(),
	},
	render: ( args ) => <ToggleGroupFixture type="single" value="accept" change={ args.change } />,
	play: async ( { canvasElement, args, step } ) => {
		const group = await waitForToggleGroup( canvasElement );
		group.addEventListener( 'change', args.change );

		const accept = await getToggle( canvasElement, 'accept' );
		const change = await getToggle( canvasElement, 'change' );
		const leave = await getToggle( canvasElement, 'leave' );

		await step( 'starts with accept selected', async () => {
			await waitFor( async () => {
				await expect( accept ).toHaveAttribute( 'aria-checked', 'true' );
			} );

			await expect( change ).not.toHaveAttribute( 'aria-checked' );
			await expect( leave ).not.toHaveAttribute( 'aria-checked' );
		} );

		await step( 'selects change toggle', async () => {
			await userEvent.click( change );

			await expect( accept ).not.toHaveAttribute( 'aria-checked' );
			await expect( change ).toHaveAttribute( 'aria-checked', 'true' );
			await expect( leave ).not.toHaveAttribute( 'aria-checked' );
			await expect( args.change ).toHaveBeenCalled();
			await expect( group.value ).toBe( 'change' );
		} );

		await step( 'deselects when clicking the active toggle', async () => {
			await userEvent.click( change );

			await expect( accept ).not.toHaveAttribute( 'aria-checked' );
			await expect( change ).not.toHaveAttribute( 'aria-checked' );
			await expect( leave ).not.toHaveAttribute( 'aria-checked' );
			await expect( args.change ).toHaveBeenCalledTimes( 2 );
			await expect( group.value ).toBeNull();
		} );
	},
};

/** @type {ToggleGroupStory} */
export const SingleStrictMounts = {
	name: 'Test: Single strict mounts',
	tags: [ '!autodocs' ],
	render: () => <ToggleGroupFixture type="single-strict" />,
	play: async ( { canvasElement, step } ) => {
		const group = await waitForToggleGroup( canvasElement );

		await step( 'mounts as radiogroup with unchecked radios', async () => {
			await waitFor( async () => {
				await expect( group ).toHaveAttribute( 'role', 'radiogroup' );
			} );

			for ( const toggle of canvasElement.querySelectorAll( 'xb-toggle' ) ) {
				await expect( toggle ).toHaveAttribute( 'role', 'radio' );
				await expect( toggle ).not.toHaveAttribute( 'aria-checked' );
			}
		} );
	},
};

/** @type {ToggleGroupStory} */
export const SingleStrictInitialValue = {
	name: 'Test: Single strict initial value',
	tags: [ '!autodocs' ],
	render: () => <ToggleGroupFixture type="single-strict" value="change" />,
	play: async ( { canvasElement, step } ) => {
		await waitForToggleGroup( canvasElement );

		await step( 'reflects initial value on toggles', async () => {
			await waitFor( async () => {
				await expect( await getToggle( canvasElement, 'change' ) ).toHaveAttribute(
					'aria-checked',
					'true'
				);
			} );

			await expect( await getToggle( canvasElement, 'accept' ) ).not.toHaveAttribute(
				'aria-checked'
			);
			await expect( await getToggle( canvasElement, 'leave' ) ).not.toHaveAttribute(
				'aria-checked'
			);
		} );
	},
};

/** @type {ToggleGroupStory} */
export const SingleStrictChange = {
	name: 'Test: Single strict change',
	tags: [ '!autodocs' ],
	args: {
		change: fn(),
	},
	render: ( args ) => (
		<ToggleGroupFixture type="single-strict" value="accept" change={ args.change } />
	),
	play: async ( { canvasElement, args, step } ) => {
		const group = await waitForToggleGroup( canvasElement );
		group.addEventListener( 'change', args.change );

		const accept = await getToggle( canvasElement, 'accept' );
		const change = await getToggle( canvasElement, 'change' );
		const leave = await getToggle( canvasElement, 'leave' );

		await step( 'starts with accept selected', async () => {
			await waitFor( async () => {
				await expect( accept ).toHaveAttribute( 'aria-checked', 'true' );
			} );

			await expect( change ).not.toHaveAttribute( 'aria-checked' );
			await expect( leave ).not.toHaveAttribute( 'aria-checked' );
		} );

		await step( 'selects change toggle', async () => {
			await userEvent.click( change );

			await expect( accept ).not.toHaveAttribute( 'aria-checked' );
			await expect( change ).toHaveAttribute( 'aria-checked', 'true' );
			await expect( leave ).not.toHaveAttribute( 'aria-checked' );
			await expect( args.change ).toHaveBeenCalled();
		} );

		await step( 'keeps change selected when clicked again', async () => {
			await userEvent.click( change );

			await expect( accept ).not.toHaveAttribute( 'aria-checked' );
			await expect( change ).toHaveAttribute( 'aria-checked', 'true' );
			await expect( leave ).not.toHaveAttribute( 'aria-checked' );
			await expect( args.change ).toHaveBeenCalledTimes( 2 );
			await expect( group.value ).toBe( 'change' );
		} );
	},
};

/** @type {ToggleGroupStory} */
export const MultipleSelectionMounts = {
	name: 'Test: Multiple selection mounts',
	tags: [ '!autodocs' ],
	render: () => <ToggleGroupFixture type="multiple" />,
	play: async ( { canvasElement, step } ) => {
		const group = await waitForToggleGroup( canvasElement );

		await step( 'mounts as group with unchecked checkboxes', async () => {
			await waitFor( async () => {
				await expect( group ).toHaveAttribute( 'role', 'group' );
			} );

			for ( const toggle of canvasElement.querySelectorAll( 'xb-toggle' ) ) {
				await expect( toggle ).toHaveAttribute( 'role', 'checkbox' );
				await expect( toggle ).not.toHaveAttribute( 'aria-checked' );
			}
		} );
	},
};

/** @type {ToggleGroupStory} */
export const MultipleSelectionInitialValue = {
	name: 'Test: Multiple selection initial value',
	tags: [ '!autodocs' ],
	render: () => <ToggleGroupFixture type="multiple" value={ [ 'accept', 'leave' ] } />,
	play: async ( { canvasElement, step } ) => {
		await waitForToggleGroup( canvasElement );

		await step( 'reflects initial values on toggles', async () => {
			await waitFor( async () => {
				await expect( await getToggle( canvasElement, 'accept' ) ).toHaveAttribute(
					'aria-checked',
					'true'
				);
			} );

			await expect( await getToggle( canvasElement, 'change' ) ).not.toHaveAttribute(
				'aria-checked'
			);
			await expect( await getToggle( canvasElement, 'leave' ) ).toHaveAttribute(
				'aria-checked',
				'true'
			);
		} );
	},
};

/** @type {ToggleGroupStory} */
export const MultipleSelectionChange = {
	name: 'Test: Multiple selection change',
	tags: [ '!autodocs' ],
	args: {
		change: fn(),
	},
	render: ( args ) => (
		<ToggleGroupFixture type="multiple" value={ [ 'accept' ] } change={ args.change } />
	),
	play: async ( { canvasElement, args, step } ) => {
		const group = await waitForToggleGroup( canvasElement );
		group.value = [ 'accept' ];
		group.addEventListener( 'change', args.change );

		const accept = await getToggle( canvasElement, 'accept' );
		const change = await getToggle( canvasElement, 'change' );
		const leave = await getToggle( canvasElement, 'leave' );

		await step( 'starts with accept selected', async () => {
			await waitFor( async () => {
				await expect( group.value ).toEqual( [ 'accept' ] );
				await expect( accept.checked ).toBe( true );
			} );

			await expect( change.checked ).toBe( false );
			await expect( leave.checked ).toBe( false );
		} );

		await step( 'adds leave to selection', async () => {
			await userEvent.click( leave );

			await waitFor( async () => {
				await expect( group.value ).toEqual( [ 'accept', 'leave' ] );
			} );
			await expect( accept.checked ).toBe( true );
			await expect( leave.checked ).toBe( true );
			await expect( change.checked ).toBe( false );
			await expect( args.change ).toHaveBeenCalled();
		} );

		await step( 'adds change to selection', async () => {
			await userEvent.click( change );

			await waitFor( async () => {
				await expect( group.value ).toEqual( [ 'accept', 'leave', 'change' ] );
			} );
			await expect( accept.checked ).toBe( true );
			await expect( change.checked ).toBe( true );
			await expect( leave.checked ).toBe( true );
			await expect( args.change ).toHaveBeenCalledTimes( 2 );
		} );
	},
};

/**
 * @typedef {import('./toggle-group').ToggleGroup} ToggleGroup
 * @typedef {import('@storybook/web-components').StoryObj<ToggleGroup>} ToggleGroupStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
