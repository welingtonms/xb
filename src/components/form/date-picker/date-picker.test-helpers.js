import { expect, userEvent, waitFor } from 'storybook/test';

import { pressKey, queryShadow, waitForUpgrade } from '../../../utils/test-tools.js';

export const ANCHOR_DATE = '2023-12-20';
export const ANCHOR_RANGE_START = '2023-12-10';
export const ANCHOR_RANGE_END = '2023-12-20';

/**
 * @param {Element & { value?: string | [string | null, string | null]; updateComplete?: Promise<unknown> }} picker
 * @param {string | [string | null, string | null]} value
 */
export async function setCommittedValue( picker, value ) {
	picker.value = value;
	await picker.updateComplete;

	const anchor = Array.isArray( value ) ? value[ 0 ] : value;
	if ( anchor ) {
		await setPickerViewMonth( picker, anchor );
	}
}

/**
 * @param {Element | null | undefined} buttonHost
 */
export async function clickPickerButton( buttonHost ) {
	await waitForUpgrade( buttonHost );
	await userEvent.click( buttonHost );
}

/**
 * @param {HTMLElement} canvasElement
 * @param {string} [selector='xb-date-picker']
 */
export async function getDatePickerParts( canvasElement, selector = 'xb-date-picker' ) {
	const picker = canvasElement.querySelector( selector );
	await waitForUpgrade( picker );

	await waitFor( async () => {
		await expect( queryShadow( picker, 'input.trigger, #range-start' ) ).toBeTruthy();
	} );

	return {
		picker,
		trigger: queryShadow( picker, 'input.trigger' ),
		calendar: () => queryShadow( picker, '#calendar' ),
		prevMonth: () => queryShadow( picker, '.prev-month' ),
		nextMonth: () => queryShadow( picker, '.next-month' ),
		monthLabel: () => queryShadow( picker, '.month-year-label' ),
		day: ( iso ) => queryShadow( picker, `button.day[data-value="${ iso }"]` ),
		focusedDay: () => queryShadow( picker, 'button.day[tabindex="0"]' ),
		cancelButton: () => queryShadow( picker, '.footer xb-button[variant="secondary-gray"]' ),
		applyButton: () => queryShadow( picker, '.footer xb-button[variant="primary"]' ),
	};
}

/**
 * @param {HTMLElement} canvasElement
 */
export async function getDateRangePickerParts( canvasElement ) {
	const parts = await getDatePickerParts( canvasElement, 'xb-date-range-picker' );

	return {
		...parts,
		startTrigger: queryShadow( parts.picker, '#range-start' ),
		endTrigger: queryShadow( parts.picker, '#range-end' ),
	};
}

/**
 * @param {Element} picker
 * @param {Element} trigger
 */
export async function openCalendar( picker, trigger ) {
	await userEvent.click( trigger );
	await waitFor( async () => {
		await expect( trigger ).toHaveAttribute( 'aria-expanded', 'true' );
		await expect( queryShadow( picker, '#calendar' ) ).toBeTruthy();
	} );
}

/**
 * @param {Element & { viewDate?: { year: number; month: number; day: number }; updateComplete?: Promise<unknown> }} picker
 * @param {string} isoDate - Any date in the target month (YYYY-MM-DD)
 */
export async function setPickerViewMonth( picker, isoDate ) {
	const { CalendarDate } = await import( '../../../utils/date-time/date.js' );
	const date = CalendarDate.fromISO( isoDate );
	picker.viewDate = new CalendarDate( date.year, date.month, 1 );
	await picker.updateComplete;
}

/**
 * @param {Element} picker
 * @param {string} targetIso
 * @param {() => Element | null} getFocusedDay
 */
export async function navigateFocusedDayTo( picker, targetIso, getFocusedDay ) {
	const maxSteps = 50;
	for ( let i = 0; i < maxSteps; i++ ) {
		const focused = getFocusedDay();
		if ( focused?.getAttribute( 'data-value' ) === targetIso ) {
			return;
		}
		const focusedIso = focused?.getAttribute( 'data-value' ) ?? '';
		const focusedDate = new Date( focusedIso );
		const targetDate = new Date( targetIso );
		if ( focusedDate < targetDate ) {
			pressPickerKey( picker, 'ArrowRight' );
		} else {
			pressPickerKey( picker, 'ArrowLeft' );
		}
		await waitFor( async () => {
			await expect( getFocusedDay()?.getAttribute( 'data-value' ) ).not.toBe( focusedIso );
		} );
	}
	throw new Error( `Could not navigate focused day to ${ targetIso }` );
}

/**
 * @param {Element} picker
 * @param {string} key
 */
export function pressPickerKey( picker, key ) {
	pressKey( picker, key );
}
