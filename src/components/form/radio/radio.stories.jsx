import React from 'react';

import { expect, waitFor } from 'storybook/test';
import { pressKey, waitForUpgrade, within } from '../../../utils/test-tools.js';

import '../../layout/layout.define';
import '../../icon/icon.define';
import '../../text/text.define';
import './radio.define';

const RADIO_ITEMS = (
	<>
		<xb-radio value="accept">Accept</xb-radio>
		<xb-radio value="change">Change</xb-radio>
		<xb-radio value="leave">Leave</xb-radio>
	</>
);

/**
 * @param {{
 *  initialValue?: string,
 *  disabled?: boolean,
 *  change?: (...args: unknown[]) => void,
 * }} props
 */
function RadioGroupFixture( { initialValue, disabled = false, change } ) {
	return (
		<xb-radio-group
			name="life-choice"
			disabled={ disabled }
			initial-value={ initialValue }
			onchange={ change }
		>
			{ RADIO_ITEMS }
		</xb-radio-group>
	);
}

/**
 * @param {HTMLElement} canvasElement
 */
async function waitForRadioGroup( canvasElement ) {
	/** @type {HTMLElement | null} */
	let group = null;

	await waitFor( () => {
		group = canvasElement.querySelector( 'xb-radio-group' );
		expect( group ).toBeTruthy();
	} );

	await waitForUpgrade( group );

	for ( const radio of canvasElement.querySelectorAll( 'xb-radio' ) ) {
		await waitForUpgrade( radio );
	}

	within( canvasElement );

	return group;
}

/**
 * @param {HTMLElement} canvasElement
 * @param {string} value
 */
async function getRadio( canvasElement, value ) {
	for ( const radio of canvasElement.querySelectorAll( 'xb-radio' ) ) {
		await waitForUpgrade( radio );

		if ( radio.value === value ) {
			return radio;
		}
	}

	throw new Error( `Radio with value "${ value }" not found` );
}

/**
 * @param {HTMLElement} group
 * @param {HTMLElement} radio
 * @param {HTMLElement[]} allRadios
 */
async function expectVirtualFocusOn( group, radio, allRadios ) {
	await waitFor( async () => {
		await expect( group ).toHaveFocus();
		await expect( group ).toHaveAttribute( 'aria-activedescendant', radio.id );
		await expect( radio.classList.contains( 'is-focused' ) ).toBe( true );
	} );

	for ( const other of allRadios ) {
		if ( other !== radio ) {
			await expect( other.classList.contains( 'is-focused' ) ).toBe( false );
		}
	}
}

/**
 * @param {HTMLElement} radio
 * @param {boolean} selected
 */
async function expectRadioSelected( radio, selected ) {
	if ( selected ) {
		await expect( radio ).toHaveAttribute( 'aria-checked', 'true' );
	} else {
		await expect( radio ).not.toHaveAttribute( 'aria-checked' );
	}
}

export default {
	title: 'Components/Form/Radio',
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
	},
};

/** @type {RadioGroupStory} */
export const Playground = {
	render: ( args ) => (
		<xb-stack>
			<xb-radio-group name="life-choice" disabled={ args.disabled } onChange={ args.change }>
				<xb-radio value="accept">Accept</xb-radio>
				<xb-radio value="change">
					Change
					<xb-text variant="text-sm" slot="description">
						Save my login details for next time.
					</xb-text>
				</xb-radio>
				<xb-radio value="leave">
					Leave
					<xb-text variant="text-sm" slot="description">
						Save my login details for next time.
					</xb-text>
				</xb-radio>
				<xb-radio value="na"></xb-radio>
			</xb-radio-group>
		</xb-stack>
	),

	args: {
		disabled: false,
	},
};

/** @type {RadioGroupStory} */
export const DefaultSelection = {
	name: 'Test: Default selection',
	tags: [ '!autodocs' ],
	render: () => <RadioGroupFixture />,
	play: async ( { canvasElement, step } ) => {
		const group = await waitForRadioGroup( canvasElement );
		const accept = await getRadio( canvasElement, 'accept' );
		const change = await getRadio( canvasElement, 'change' );
		const leave = await getRadio( canvasElement, 'leave' );

		await step( 'selects first radio at mount when no initial value', async () => {
			await waitFor( async () => {
				await expectRadioSelected( accept, true );
				await expect( group.value ).toBe( 'accept' );
			} );

			await expectRadioSelected( change, false );
			await expectRadioSelected( leave, false );
		} );
	},
};

/** @type {RadioGroupStory} */
export const GroupFocusWithoutInitialValue = {
	name: 'Test: Group focus without initial value',
	tags: [ '!autodocs' ],
	render: () => <RadioGroupFixture />,
	play: async ( { canvasElement, step } ) => {
		const group = await waitForRadioGroup( canvasElement );
		const accept = await getRadio( canvasElement, 'accept' );
		const change = await getRadio( canvasElement, 'change' );
		const leave = await getRadio( canvasElement, 'leave' );
		const radios = [ accept, change, leave ];

		await step( 'virtual focus lands on the selected first radio', async () => {
			group.focus();

			await expectVirtualFocusOn( group, accept, radios );
		} );
	},
};

/** @type {RadioGroupStory} */
export const GroupFocusWithInitialValue = {
	name: 'Test: Group focus with initial value',
	tags: [ '!autodocs' ],
	render: () => <RadioGroupFixture initialValue="change" />,
	play: async ( { canvasElement, step } ) => {
		const group = await waitForRadioGroup( canvasElement );
		const accept = await getRadio( canvasElement, 'accept' );
		const change = await getRadio( canvasElement, 'change' );
		const leave = await getRadio( canvasElement, 'leave' );
		const radios = [ accept, change, leave ];

		await step( 'virtual focus lands on the initial-value radio', async () => {
			await waitFor( async () => {
				await expectRadioSelected( change, true );
			} );

			group.focus();

			await expectVirtualFocusOn( group, change, radios );
		} );
	},
};

/** @type {RadioGroupStory} */
export const KeyboardNavigation = {
	name: 'Test: Keyboard navigation',
	tags: [ '!autodocs' ],
	render: () => <RadioGroupFixture />,
	play: async ( { canvasElement, step } ) => {
		const group = await waitForRadioGroup( canvasElement );
		const accept = await getRadio( canvasElement, 'accept' );
		const change = await getRadio( canvasElement, 'change' );
		const leave = await getRadio( canvasElement, 'leave' );
		const radios = [ accept, change, leave ];

		group.focus();
		await expectVirtualFocusOn( group, accept, radios );

		await step( 'ArrowDown moves virtual focus and selection forward', async () => {
			pressKey( group, 'ArrowDown' );

			await expectVirtualFocusOn( group, change, radios );
			await expectRadioSelected( change, true );
			await expectRadioSelected( accept, false );
			await expect( group.value ).toBe( 'change' );

			pressKey( group, 'ArrowDown' );

			await expectVirtualFocusOn( group, leave, radios );
			await expectRadioSelected( leave, true );
			await expect( group.value ).toBe( 'leave' );

			pressKey( group, 'ArrowDown' );

			await expectVirtualFocusOn( group, accept, radios );
			await expectRadioSelected( accept, true );
			await expect( group.value ).toBe( 'accept' );
		} );

		await step( 'ArrowUp moves virtual focus and selection backward', async () => {
			pressKey( group, 'ArrowUp' );

			await expectVirtualFocusOn( group, leave, radios );
			await expectRadioSelected( leave, true );
			await expect( group.value ).toBe( 'leave' );

			pressKey( group, 'ArrowUp' );

			await expectVirtualFocusOn( group, change, radios );
			await expectRadioSelected( change, true );
			await expect( group.value ).toBe( 'change' );
		} );

		await step( 'ArrowRight moves virtual focus and selection forward', async () => {
			pressKey( group, 'ArrowRight' );

			await expectVirtualFocusOn( group, leave, radios );
			await expectRadioSelected( leave, true );
			await expect( group.value ).toBe( 'leave' );
		} );

		await step( 'ArrowLeft moves virtual focus and selection backward', async () => {
			pressKey( group, 'ArrowLeft' );

			await expectVirtualFocusOn( group, change, radios );
			await expectRadioSelected( change, true );
			await expect( group.value ).toBe( 'change' );
		} );
	},
};

/**
 * @typedef {import('./radio-group').RadioGroup} RadioGroup
 * @typedef {import('@storybook/web-components').StoryObj<RadioGroup>} RadioGroupStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */
