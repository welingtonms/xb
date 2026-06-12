import { expect, userEvent, fn, waitFor } from 'storybook/test';

import {
	ANCHOR_DATE,
	ANCHOR_RANGE_END,
	ANCHOR_RANGE_START,
	clickPickerButton,
	getDateRangePickerParts,
	navigateFocusedDayTo,
	openCalendar,
	pressPickerKey,
	setCommittedValue,
	setPickerViewMonth,
} from './date-picker.test-helpers.js';

import './date-range-picker.define';
import '../../button/button.define';
import '../../icon/icon.define';
import '../../i18n/i18n.provider';

export default {
	title: 'Components/Form/Picker/Date Range Picker',
	component: 'xb-date-range-picker',
	argTypes: {
		locale: {
			control: 'select',
			options: [ 'en-US', 'pt-BR', 'es-MX', 'ja-JP' ],
		},
		disabled: {
			control: 'boolean',
		},
	},
};

const Template = ( { locale = 'en-US', value = [ null, null ], disabled = false } ) => {
	return (
		<div style={ { padding: '2rem' } }>
			<xb-i18n-provider locale={ locale }>
				<xb-date-range-picker clearable value={ value } disabled={ disabled }></xb-date-range-picker>
			</xb-i18n-provider>
		</div>
	);
};

export const Default = Template.bind( {} );
Default.args = {
	locale: 'en-US',
	value: [ null, null ],
};

export const WithValue = Template.bind( {} );
WithValue.args = {
	locale: 'en-US',
	value: [ ANCHOR_RANGE_START, ANCHOR_RANGE_END ],
};

export const OpensCalendar = {
	name: 'Test: Opens calendar',
	tags: [ '!autodocs' ],
	render: () => (
		<div style={ { padding: '2rem' } }>
			<xb-i18n-provider locale="en-US">
				<xb-date-range-picker
					clearable
					value={ [ ANCHOR_RANGE_START, ANCHOR_RANGE_END ] }
				></xb-date-range-picker>
			</xb-i18n-provider>
		</div>
	),
	play: async ( { canvasElement, step } ) => {
		const { startTrigger } = await getDateRangePickerParts( canvasElement );

		await step( 'calendar is closed initially', async () => {
			await expect( startTrigger ).toHaveAttribute( 'aria-expanded', 'false' );
		} );

		await step( 'click start trigger opens calendar', async () => {
			await userEvent.click( startTrigger );
			await expect( startTrigger ).toHaveAttribute( 'aria-expanded', 'true' );
		} );
	},
};

export const SelectRangeViaClick = {
	name: 'Test: Select range via click',
	tags: [ '!autodocs' ],
	args: {
		change: fn(),
	},
	render: ( args ) => (
		<div style={ { padding: '2rem' } }>
			<xb-i18n-provider locale="en-US">
				<xb-date-range-picker clearable onchange={ args.change }></xb-date-range-picker>
			</xb-i18n-provider>
		</div>
	),
	play: async ( { canvasElement, args, step } ) => {
		const { picker, startTrigger, endTrigger, day, applyButton } =
			await getDateRangePickerParts( canvasElement );
		picker.addEventListener( 'change', args.change );

		await step( 'select start and end days', async () => {
			await setPickerViewMonth( picker, ANCHOR_RANGE_START );
			await openCalendar( picker, startTrigger );
			await userEvent.click( day( ANCHOR_RANGE_START ) );
			await userEvent.click( day( ANCHOR_RANGE_END ) );
			await expect( day( ANCHOR_RANGE_START ) ).toHaveClass( '-range-start' );
			await expect( day( ANCHOR_RANGE_END ) ).toHaveClass( '-range-end' );
		} );

		await step( 'apply commits range', async () => {
			await clickPickerButton( applyButton() );
			await waitFor( async () => {
				await expect( picker.value ).toEqual( [ ANCHOR_RANGE_START, ANCHOR_RANGE_END ] );
				await expect( args.change ).toHaveBeenCalled();
				await expect( startTrigger ).toHaveAttribute( 'aria-expanded', 'false' );
				await expect( endTrigger.value ).not.toBe( '' );
			} );
		} );
	},
};

export const KeyboardDayNavigation = {
	name: 'Test: Keyboard day navigation',
	tags: [ '!autodocs' ],
	render: () => (
		<div style={ { padding: '2rem' } }>
			<xb-i18n-provider locale="en-US">
				<xb-date-range-picker
					clearable
					value={ [ ANCHOR_RANGE_START, ANCHOR_RANGE_END ] }
				></xb-date-range-picker>
			</xb-i18n-provider>
		</div>
	),
	play: async ( { canvasElement, step } ) => {
		const { picker, startTrigger, focusedDay } = await getDateRangePickerParts( canvasElement );
		await setCommittedValue( picker, [ ANCHOR_RANGE_START, ANCHOR_RANGE_END ] );

		await step( 'open calendar with first day of month focused', async () => {
			await openCalendar( picker, startTrigger );
			await waitFor( async () => {
				await expect( focusedDay() ).toHaveAttribute( 'data-value', '2023-12-01' );
			} );
		} );

		await step( 'ArrowRight moves focus one day forward', async () => {
			pressPickerKey( picker, 'ArrowRight' );
			await waitFor( async () => {
				await expect( focusedDay() ).toHaveAttribute( 'data-value', '2023-12-02' );
			} );
		} );

		await step( 'ArrowDown moves focus one week forward', async () => {
			pressPickerKey( picker, 'ArrowDown' );
			await waitFor( async () => {
				await expect( focusedDay() ).toHaveAttribute( 'data-value', '2023-12-09' );
			} );
		} );
	},
};

export const MonthNavigationViaButtons = {
	name: 'Test: Month navigation via buttons',
	tags: [ '!autodocs' ],
	render: () => (
		<div style={ { padding: '2rem' } }>
			<xb-i18n-provider locale="en-US">
				<xb-date-range-picker
					clearable
					value={ [ ANCHOR_RANGE_START, ANCHOR_RANGE_END ] }
				></xb-date-range-picker>
			</xb-i18n-provider>
		</div>
	),
	play: async ( { canvasElement, step } ) => {
		const { picker, startTrigger, monthLabel, nextMonth, prevMonth } =
			await getDateRangePickerParts( canvasElement );
		await setCommittedValue( picker, [ ANCHOR_RANGE_START, ANCHOR_RANGE_END ] );

		await step( 'open calendar on December 2023', async () => {
			await openCalendar( picker, startTrigger );
			await expect( monthLabel() ).toHaveTextContent( /December\s+2023/ );
		} );

		await step( 'next month button shows January 2024', async () => {
			await userEvent.click( nextMonth() );
			await waitFor( async () => {
				await expect( monthLabel() ).toHaveTextContent( /January\s+2024/ );
			} );
		} );

		await step( 'prev month button returns to December 2023', async () => {
			await userEvent.click( prevMonth() );
			await waitFor( async () => {
				await expect( monthLabel() ).toHaveTextContent( /December\s+2023/ );
			} );
		} );
	},
};

export const MonthNavigationViaKeys = {
	name: 'Test: Month navigation via keys',
	tags: [ '!autodocs' ],
	render: () => (
		<div style={ { padding: '2rem' } }>
			<xb-i18n-provider locale="en-US">
				<xb-date-range-picker
					clearable
					value={ [ ANCHOR_RANGE_START, ANCHOR_RANGE_END ] }
				></xb-date-range-picker>
			</xb-i18n-provider>
		</div>
	),
	play: async ( { canvasElement, step } ) => {
		const { picker, startTrigger, monthLabel } = await getDateRangePickerParts( canvasElement );
		await setCommittedValue( picker, [ ANCHOR_RANGE_START, ANCHOR_RANGE_END ] );

		await step( 'open calendar on December 2023', async () => {
			await openCalendar( picker, startTrigger );
			await expect( monthLabel() ).toHaveTextContent( /December\s+2023/ );
		} );

		await step( 'PageDown shows January 2024', async () => {
			pressPickerKey( picker, 'PageDown' );
			await waitFor( async () => {
				await expect( monthLabel() ).toHaveTextContent( /January\s+2024/ );
			} );
		} );

		await step( 'PageUp returns to December 2023', async () => {
			pressPickerKey( picker, 'PageUp' );
			await waitFor( async () => {
				await expect( monthLabel() ).toHaveTextContent( /December\s+2023/ );
			} );
		} );
	},
};

export const SelectRangeViaKeyboard = {
	name: 'Test: Select range via keyboard',
	tags: [ '!autodocs' ],
	args: {
		change: fn(),
	},
	render: ( args ) => (
		<div style={ { padding: '2rem' } }>
			<xb-i18n-provider locale="en-US">
				<xb-date-range-picker clearable onchange={ args.change }></xb-date-range-picker>
			</xb-i18n-provider>
		</div>
	),
	play: async ( { canvasElement, args, step } ) => {
		const { picker, startTrigger, focusedDay, day, applyButton } =
			await getDateRangePickerParts( canvasElement );
		picker.addEventListener( 'change', args.change );

		await step( 'select start day via keyboard', async () => {
			await setPickerViewMonth( picker, ANCHOR_RANGE_START );
			await openCalendar( picker, startTrigger );
			await navigateFocusedDayTo( picker, ANCHOR_RANGE_START, () => focusedDay() );
			focusedDay().focus();
			await userEvent.keyboard( '{Enter}' );
			await waitFor( async () => {
				await expect( day( ANCHOR_RANGE_START ) ).toHaveClass( '-range-start' );
			} );
		} );

		await step( 'navigate to end day and select via Enter', async () => {
			await navigateFocusedDayTo( picker, ANCHOR_RANGE_END, () => focusedDay() );
			focusedDay().focus();
			await userEvent.keyboard( '{Enter}' );
			await waitFor( async () => {
				await expect( day( ANCHOR_RANGE_END ) ).toHaveClass( '-range-end' );
			} );
		} );

		await step( 'apply commits keyboard range', async () => {
			await clickPickerButton( applyButton() );
			await waitFor( async () => {
				await expect( picker.value ).toEqual( [ ANCHOR_RANGE_START, ANCHOR_RANGE_END ] );
				await expect( args.change ).toHaveBeenCalled();
			} );
		} );
	},
};

export const CancelButton = {
	name: 'Test: Cancel button',
	tags: [ '!autodocs' ],
	args: {
		change: fn(),
	},
	render: ( args ) => (
		<div style={ { padding: '2rem' } }>
			<xb-i18n-provider locale="en-US">
				<xb-date-range-picker
					clearable
					value={ [ ANCHOR_RANGE_START, ANCHOR_RANGE_END ] }
					onchange={ args.change }
				></xb-date-range-picker>
			</xb-i18n-provider>
		</div>
	),
	play: async ( { canvasElement, args, step } ) => {
		const { picker, startTrigger, endTrigger, day, cancelButton } =
			await getDateRangePickerParts( canvasElement );
		picker.addEventListener( 'change', args.change );
		await setCommittedValue( picker, [ ANCHOR_RANGE_START, ANCHOR_RANGE_END ] );

		await step( 'change draft range', async () => {
			await openCalendar( picker, startTrigger );
			await userEvent.click( day( '2023-12-05' ) );
			await userEvent.click( day( '2023-12-28' ) );
		} );

		await step( 'cancel discards draft and keeps committed range', async () => {
			await clickPickerButton( cancelButton() );
			await waitFor( async () => {
				await expect( startTrigger ).toHaveAttribute( 'aria-expanded', 'false' );
				await expect( picker.value ).toEqual( [ ANCHOR_RANGE_START, ANCHOR_RANGE_END ] );
				await expect( args.change ).not.toHaveBeenCalled();
				await expect( endTrigger.value ).not.toBe( '' );
			} );
		} );
	},
};

export const ApplyButton = {
	name: 'Test: Apply button',
	tags: [ '!autodocs' ],
	args: {
		change: fn(),
	},
	render: ( args ) => (
		<div style={ { padding: '2rem' } }>
			<xb-i18n-provider locale="en-US">
				<xb-date-range-picker
					clearable
					value={ [ ANCHOR_RANGE_START, ANCHOR_RANGE_END ] }
					onchange={ args.change }
				></xb-date-range-picker>
			</xb-i18n-provider>
		</div>
	),
	play: async ( { canvasElement, args, step } ) => {
		const { picker, startTrigger, day, applyButton } = await getDateRangePickerParts( canvasElement );
		picker.addEventListener( 'change', args.change );
		await setCommittedValue( picker, [ ANCHOR_RANGE_START, ANCHOR_RANGE_END ] );
		const newStart = '2023-12-05';

		await step( 'pick new start while keeping end and apply', async () => {
			await openCalendar( picker, startTrigger );
			await userEvent.click( day( newStart ) );
			await clickPickerButton( applyButton() );
			await waitFor( async () => {
				await expect( picker.value ).toEqual( [ newStart, ANCHOR_RANGE_END ] );
				await expect( args.change ).toHaveBeenCalled();
				await expect( startTrigger ).toHaveAttribute( 'aria-expanded', 'false' );
			} );
		} );
	},
};

export const TriggerPickingModes = {
	name: 'Test: Trigger picking modes',
	tags: [ '!autodocs' ],
	args: {
		change: fn(),
	},
	render: ( args ) => (
		<div style={ { padding: '2rem' } }>
			<xb-i18n-provider locale="en-US">
				<xb-date-range-picker
					clearable
					value={ [ ANCHOR_RANGE_START, ANCHOR_RANGE_END ] }
					onchange={ args.change }
				></xb-date-range-picker>
			</xb-i18n-provider>
		</div>
	),
	play: async ( { canvasElement, args, step } ) => {
		const { picker, startTrigger, endTrigger, day, applyButton } =
			await getDateRangePickerParts( canvasElement );
		picker.addEventListener( 'change', args.change );
		await setCommittedValue( picker, [ ANCHOR_RANGE_START, ANCHOR_RANGE_END ] );
		const newEnd = '2023-12-28';
		const newStart = '2023-12-05';

		await step( 'opening via end trigger adjusts end date', async () => {
			await openCalendar( picker, endTrigger );
			await userEvent.click( day( newEnd ) );
			await clickPickerButton( applyButton() );
			await waitFor( async () => {
				await expect( picker.value ).toEqual( [ ANCHOR_RANGE_START, newEnd ] );
			} );
		} );

		await step( 'opening via start trigger adjusts start date', async () => {
			args.change.mockClear();
			await openCalendar( picker, startTrigger );
			await userEvent.click( day( newStart ) );
			await clickPickerButton( applyButton() );
			await waitFor( async () => {
				await expect( picker.value ).toEqual( [ newStart, newEnd ] );
				await expect( args.change ).toHaveBeenCalled();
			} );
		} );
	},
};
