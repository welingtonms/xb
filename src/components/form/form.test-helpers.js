import React from 'react';

import { expect, userEvent, waitFor } from 'storybook/test';

import { queryShadow, waitForUpgrade, within } from '../../utils/test-tools.js';
import {
	ANCHOR_DATE,
	ANCHOR_RANGE_END,
	ANCHOR_RANGE_START,
	getDatePickerParts,
	getDateRangePickerParts,
	setCommittedValue,
} from './date-picker/date-picker.test-helpers.js';
import { expectSelectOpen, getOption, getSelectParts } from './select/select.test-helpers.js';

export const CHANGED_DATE = '2023-12-15';
export const CHANGED_RANGE_START = '2023-12-01';
export const CHANGED_RANGE_END = '2023-12-15';
export const CHANGED_TEXT = 'Changed greeting';

/** @type {Record<string, string | null>} */
export const EMPTY_FORM_DATA = {
	'xb-text-input': '',
	'xb-checkbox-agree': null,
	'xb-checkbox-newsletter': null,
	'xb-radio-group': 'yes',
	'xb-switch': 'off',
	'xb-toggle-group': null,
	'xb-select': null,
	'xb-date-picker': null,
	'xb-date-range-picker-start': null,
	'xb-date-range-picker-end': null,
};

/** @type {Record<string, string | null>} */
export const INITIAL_FORM_DATA = {
	'xb-text-input': 'Hello',
	'xb-checkbox-agree': 'agree-tc',
	'xb-checkbox-newsletter': 'on',
	'xb-radio-group': 'no',
	'xb-switch': 'on',
	'xb-toggle-group': 'align-center',
	'xb-select': 'letter-b',
	'xb-date-picker': ANCHOR_DATE,
	'xb-date-range-picker-start': ANCHOR_RANGE_START,
	'xb-date-range-picker-end': ANCHOR_RANGE_END,
};

/** @type {Record<string, string | null>} */
export const CHANGED_FORM_DATA = {
	'xb-text-input': CHANGED_TEXT,
	'xb-checkbox-agree': 'agree-tc',
	'xb-checkbox-newsletter': 'on',
	'xb-radio-group': 'no',
	'xb-switch': 'on',
	'xb-toggle-group': 'align-right',
	'xb-select': 'letter-c',
	'xb-date-picker': CHANGED_DATE,
	'xb-date-range-picker-start': CHANGED_RANGE_START,
	'xb-date-range-picker-end': CHANGED_RANGE_END,
};

const DATE_PICKER_PRESETS = [
	{ label: 'Start of Week', prompt: 'week' },
	{ label: 'Start of Month', prompt: 'month' },
];

const DATE_RANGE_PICKER_PRESETS = [ 'Past 7 days', 'Past 30 days' ];

/**
 * @param {'empty' | 'initial'} mode
 */
export function renderIntegrationForm( mode ) {
	const isInitial = mode === 'initial';

	return (
		<xb-i18n-provider locale="en-US">
			<form data-testid="integration-form">
				<xb-stack>
					<xb-text-input
						type="text"
						name="xb-text-input"
						placeholder="Greeting"
						default-value={ isInitial ? 'Hello' : undefined }
					></xb-text-input>

					<xb-checkbox
						name="xb-checkbox-agree"
						value="agree-tc"
						initial-checked={ isInitial ? true : undefined }
					>
						Agree with T&amp;C
					</xb-checkbox>

					<xb-checkbox
						name="xb-checkbox-newsletter"
						initial-checked={ isInitial ? true : undefined }
					>
						Receive newsletter
					</xb-checkbox>

					<xb-radio-group name="xb-radio-group" initial-value={ isInitial ? 'no' : undefined }>
						<xb-radio value="yes">Yes</xb-radio>
						<xb-radio value="no">No</xb-radio>
					</xb-radio-group>

					<xb-switch name="xb-switch" initial-checked={ isInitial ? true : undefined }>
						Accept notifications
					</xb-switch>

					<xb-toggle-group
						type="single-strict"
						name="xb-toggle-group"
						initial-value={ isInitial ? 'align-center' : undefined }
					>
						<xb-toggle value="align-left" aria-label="Align text to the left">
							<xb-icon name="text-align-left" />
						</xb-toggle>
						<xb-toggle value="align-center" aria-label="Align text to the center">
							<xb-icon name="text-align-center" />
						</xb-toggle>
						<xb-toggle value="align-right" aria-label="Align text to the right">
							<xb-icon name="text-align-right" />
						</xb-toggle>
					</xb-toggle-group>

					<xb-select
						clearable
						name="xb-select"
						initial-value={ isInitial ? 'letter-b' : undefined }
					>
						<xb-option value="letter-a">Letter A</xb-option>
						<xb-option value="letter-b">Letter B</xb-option>
						<xb-option value="letter-c">Letter C</xb-option>
					</xb-select>

					<xb-date-picker
						clearable
						presets={ DATE_PICKER_PRESETS }
						name="xb-date-picker"
						initial-value={ isInitial ? ANCHOR_DATE : undefined }
					></xb-date-picker>

					<xb-date-range-picker
						clearable
						presets={ DATE_RANGE_PICKER_PRESETS }
						name="xb-date-range-picker"
						initial-value={
							isInitial
								? JSON.stringify( [ ANCHOR_RANGE_START, ANCHOR_RANGE_END ] )
								: undefined
						}
					></xb-date-range-picker>

					<xb-cluster>
						<xb-button type="reset" variant="secondary-color">
							Reset
						</xb-button>
						<xb-button type="submit" variant="primary">
							Submit
						</xb-button>
					</xb-cluster>
				</xb-stack>
			</form>
		</xb-i18n-provider>
	);
}

/**
 * @param {HTMLFormElement | null | undefined} form
 * @returns {Record<string, string | string[]>}
 */
export function readFormData( form ) {
	if ( ! form ) {
		throw new Error( 'readFormData: form element is required' );
	}

	/** @type {Record<string, string | string[]>} */
	const result = {};

	for ( const [ key, value ] of new FormData( form ).entries() ) {
		if ( key in result ) {
			const existing = result[ key ];
			result[ key ] = Array.isArray( existing ) ? [ ...existing, value ] : [ existing, value ];
		} else {
			result[ key ] = value;
		}
	}

	return result;
}

/**
 * @param {Element | null | undefined} textInput
 * @param {string} value
 */
async function setTextInputValue( textInput, value ) {
	await waitForUpgrade( textInput );

	const input = queryShadow( textInput, 'input' );

	if ( ! input ) {
		throw new Error( 'Text input control not found' );
	}

	input.focus();
	input.value = value;
	input.dispatchEvent( new Event( 'input', { bubbles: true, composed: true } ) );
}

/**
 * @param {HTMLElement} canvasElement
 */
export async function waitForIntegrationFormReady( canvasElement ) {
	const controls = canvasElement.querySelectorAll(
		'xb-text-input, xb-checkbox, xb-radio-group, xb-switch, xb-toggle-group, xb-select, xb-option, xb-date-picker, xb-date-range-picker'
	);

	for ( const control of controls ) {
		await waitForUpgrade( control );
	}
}

/**
 * @param {HTMLFormElement | null | undefined} form
 * @param {Record<string, string | null | undefined>} expected
 */
export async function expectFormData( form, expected ) {
	await waitFor( async () => {
		const actual = readFormData( form );

		for ( const [ key, value ] of Object.entries( expected ) ) {
			if ( value === null || value === undefined ) {
				await expect( actual[ key ], `expected "${ key }" to be absent` ).toBeUndefined();
			} else {
				await expect( actual[ key ], `expected "${ key }" to be "${ value }"` ).toBe( value );
			}
		}

		for ( const key of Object.keys( actual ) ) {
			if ( ! ( key in expected ) ) {
				throw new Error( `Unexpected form field "${ key }" with value "${ actual[ key ] }"` );
			}
		}
	} );
}

/**
 * @param {HTMLElement} canvasElement
 * @returns {HTMLFormElement}
 */
export function getIntegrationForm( canvasElement ) {
	/** @type {HTMLFormElement | null} */
	const form = canvasElement.querySelector( 'form[data-testid="integration-form"]' );

	if ( ! form ) {
		throw new Error( 'Integration form not found' );
	}

	return form;
}

/**
 * @param {ReturnType<typeof within>} canvas
 * @param {RegExp} name
 */
async function ensureCheckboxChecked( canvas, name ) {
	/** @type {HTMLElement} */
	const checkbox = canvas.getByRole( 'checkbox', { name } );

	if ( ! checkbox.checked ) {
		await userEvent.click( checkbox );
	}
}

/**
 * @param {HTMLElement} canvasElement
 * @param {ReturnType<typeof within>} canvas
 */
async function ensureSwitchChecked( canvasElement, canvas ) {
	const switchEl = canvasElement.querySelector( 'xb-switch' );
	await waitForUpgrade( switchEl );

	if ( ! switchEl.checked ) {
		await userEvent.click( canvas.getByRole( 'switch', { name: /accept notifications/i } ) );
	}
}

/**
 * @param {HTMLElement} canvasElement
 */
export async function fillAllFields( canvasElement ) {
	await waitForIntegrationFormReady( canvasElement );

	const canvas = within( canvasElement );
	const textInput = canvasElement.querySelector( 'xb-text-input' );

	await setTextInputValue( textInput, CHANGED_TEXT );

	await ensureCheckboxChecked( canvas, /agree with t&c/i );
	await ensureCheckboxChecked( canvas, /receive newsletter/i );
	await userEvent.click( canvas.getByRole( 'radio', { name: /^no$/i } ) );
	await ensureSwitchChecked( canvasElement, canvas );
	await userEvent.click( canvas.getByRole( 'radio', { name: /^Align text to the right$/i } ) );

	const { handleButton, select } = await getSelectParts( canvasElement );

	await userEvent.click( handleButton );
	await expectSelectOpen( select, true );
	await userEvent.click( getOption( canvasElement, 'letter-c' ) );
	await expectSelectOpen( select, false );

	const { picker: datePicker } = await getDatePickerParts( canvasElement );
	await setCommittedValue( datePicker, CHANGED_DATE );

	const { picker: rangePicker } = await getDateRangePickerParts( canvasElement );
	await setCommittedValue( rangePicker, [ CHANGED_RANGE_START, CHANGED_RANGE_END ] );
}

/**
 * @param {ReturnType<typeof within>} canvas
 */
export async function clickReset( canvas ) {
	await userEvent.click( canvas.getByRole( 'button', { name: /^reset$/i } ) );
}
