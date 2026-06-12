import { expect, userEvent, fn, waitFor } from 'storybook/test';

import { queryShadow, waitForUpgrade } from '../../../utils/test-tools.js';
import {
	ANCHOR_DATE,
	clickPickerButton,
	getDatePickerParts,
	openCalendar,
	pressPickerKey,
	setCommittedValue,
	setPickerViewMonth,
} from './date-picker.test-helpers.js';

import './date-picker.define';
import '../../button/button.define';
import '../../icon/icon.define';
import '../../i18n/i18n.provider';

export default {
	title: 'Components/Form/Picker/Date Picker',
	component: 'xb-date-picker',
	argTypes: {
		locale: {
			control: 'select',
			options: [ 'en-US', 'pt-BR', 'es-MX', 'ja-JP' ],
		},
		value: { control: 'text' },
		disabled: {
			control: 'boolean',
		},
		responsive: {
			control: 'boolean',
		},
	},
};

const Template = ( { locale = 'en-US', value = '', disabled = false, responsive = true } ) => {
	return (
		<div style={ { padding: '2rem' } }>
			<xb-i18n-provider locale={ locale }>
				<xb-date-picker
					clearable
					value={ value }
					disabled={ disabled }
					responsive={ responsive }
				></xb-date-picker>
			</xb-i18n-provider>
		</div>
	);
};

export const Default = Template.bind( {} );
Default.args = {
	locale: 'en-US',
	value: null,
};

export const Internationalization = ( { value } ) => {
	return (
		<div style={ { display: 'flex', gap: '2rem', flexWrap: 'wrap' } }>
			<xb-i18n-provider locale="en-US">
				<h4>en-US (Sunday Start)</h4>
				<xb-date-picker value={ value }></xb-date-picker>
			</xb-i18n-provider>

			<xb-i18n-provider locale="pt-BR">
				<h4>pt-BR (Monday Start? Verify)</h4>
				<xb-date-picker value={ value }></xb-date-picker>
			</xb-i18n-provider>

			<xb-i18n-provider locale="ja-JP">
				<h4>ja-JP</h4>
				<xb-date-picker value={ value }></xb-date-picker>
			</xb-i18n-provider>
		</div>
	);
};

Internationalization.args = {
	value: '2023-10-27',
};

export const WithPresets = ( { locale = 'en-US' } ) => {
	const presets = [
		'today',
		'yesterday',
		'tomorrow',
		{ label: 'Start of Week', prompt: 'week' },
		{ label: 'Start of Month', prompt: 'month' },
		{ label: 'Start of Year', prompt: 'year' },
		{ label: '1 Week Ago', prompt: '1 week ago' },
		{ label: 'In 2 Months', prompt: 'in 2 months' },
		{ label: 'My Birthday', prompt: '2023-01-24' },
	];

	return (
		<div style={ { padding: '2rem' } }>
			<xb-i18n-provider locale={ locale }>
				<xb-date-picker clearable presets={ presets }></xb-date-picker>
			</xb-i18n-provider>
		</div>
	);
};
WithPresets.args = {
	locale: 'en-US',
};

export const WithConstraints = ( { locale = 'en-US' } ) => {
	// 1. Block weekends (Function constraint)
	const blockWeekends = ( date ) => {
		const day = date.getDay();
		return day === 0 || day === 6;
	};

	// 2. Block specific dates (String constraint)
	const blockHolidays = [ '2023-12-25', '2024-01-01' ];

	// 3. Block range (Array constraint)
	// Block first 10 days of January 2024
	const blockRange = [ '2024-01-01', '2024-01-10' ];

	const constraints = [ blockWeekends, ...blockHolidays, blockRange ];

	return (
		<div style={ { padding: '2rem' } }>
			<p>Constraints: Block weekends, Xmas, New Year, and Jan 1-10, 2024.</p>
			<xb-i18n-provider locale={ locale }>
				<xb-date-picker clearable constraints={ constraints } value="2023-12-20"></xb-date-picker>
			</xb-i18n-provider>
		</div>
	);
};
WithConstraints.args = {
	locale: 'en-US',
};

export const OpensCalendar = {
	name: 'Test: Opens calendar',
	tags: [ '!autodocs' ],
	render: () => (
		<div style={ { padding: '2rem' } }>
			<xb-i18n-provider locale="en-US">
				<xb-date-picker clearable value="2023-12-20"></xb-date-picker>
			</xb-i18n-provider>
		</div>
	),
	play: async ( { canvasElement, step } ) => {
		const picker = canvasElement.querySelector( 'xb-date-picker' );

		await waitForUpgrade( picker );

		const trigger = queryShadow( picker, 'input.trigger' );

		await step( 'calendar is closed initially', async () => {
			await expect( trigger ).toHaveAttribute( 'aria-expanded', 'false' );
		} );

		await step( 'click opens calendar', async () => {
			await userEvent.click( trigger );
			await expect( trigger ).toHaveAttribute( 'aria-expanded', 'true' );
			await expect( queryShadow( picker, '#calendar' ) ).toBeTruthy();
		} );

		await step( 'escape closes calendar', async () => {
			await userEvent.keyboard( '{Escape}' );
			await expect( trigger ).toHaveAttribute( 'aria-expanded', 'false' );
		} );
	},
};

export const SelectDateViaClick = {
	name: 'Test: Select date via click',
	tags: [ '!autodocs' ],
	args: {
		change: fn(),
	},
	render: ( args ) => (
		<div style={ { padding: '2rem' } }>
			<xb-i18n-provider locale="en-US">
				<xb-date-picker clearable onchange={ args.change }></xb-date-picker>
			</xb-i18n-provider>
		</div>
	),
	play: async ( { canvasElement, args, step } ) => {
		const { picker, trigger, day, applyButton } = await getDatePickerParts( canvasElement );
		picker.addEventListener( 'change', args.change );

		await step( 'open calendar and select day', async () => {
			await setPickerViewMonth( picker, ANCHOR_DATE );
			await openCalendar( picker, trigger );
			await userEvent.click( day( '2023-12-25' ) );
			await expect( day( '2023-12-25' ) ).toHaveAttribute( 'aria-selected', 'true' );
		} );

		await step( 'apply commits selection', async () => {
			await clickPickerButton( applyButton() );
			await waitFor( async () => {
				await expect( picker.value ).toBe( '2023-12-25' );
				await expect( args.change ).toHaveBeenCalled();
				await expect( trigger ).toHaveAttribute( 'aria-expanded', 'false' );
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
				<xb-date-picker clearable value={ ANCHOR_DATE }></xb-date-picker>
			</xb-i18n-provider>
		</div>
	),
	play: async ( { canvasElement, step } ) => {
		const { picker, trigger, focusedDay } = await getDatePickerParts( canvasElement );
		await setCommittedValue( picker, ANCHOR_DATE );

		await step( 'open calendar with anchor date focused', async () => {
			await openCalendar( picker, trigger );
			await waitFor( async () => {
				await expect( focusedDay() ).toHaveAttribute( 'data-value', ANCHOR_DATE );
			} );
		} );

		await step( 'ArrowRight moves focus one day forward', async () => {
			pressPickerKey( picker, 'ArrowRight' );
			await waitFor( async () => {
				await expect( focusedDay() ).toHaveAttribute( 'data-value', '2023-12-21' );
			} );
		} );

		await step( 'ArrowLeft moves focus one day backward', async () => {
			pressPickerKey( picker, 'ArrowLeft' );
			await waitFor( async () => {
				await expect( focusedDay() ).toHaveAttribute( 'data-value', ANCHOR_DATE );
			} );
		} );

		await step( 'ArrowDown moves focus one week forward', async () => {
			pressPickerKey( picker, 'ArrowDown' );
			await waitFor( async () => {
				await expect( focusedDay() ).toHaveAttribute( 'data-value', '2023-12-27' );
			} );
		} );

		await step( 'ArrowUp moves focus one week backward', async () => {
			pressPickerKey( picker, 'ArrowUp' );
			await waitFor( async () => {
				await expect( focusedDay() ).toHaveAttribute( 'data-value', ANCHOR_DATE );
			} );
		} );
	},
};

export const CrossMonthDayNavigation = {
	name: 'Test: Cross-month day navigation',
	tags: [ '!autodocs' ],
	render: () => (
		<div style={ { padding: '2rem' } }>
			<xb-i18n-provider locale="en-US">
				<xb-date-picker clearable value="2023-12-31"></xb-date-picker>
			</xb-i18n-provider>
		</div>
	),
	play: async ( { canvasElement, step } ) => {
		const { picker, trigger, focusedDay, monthLabel } = await getDatePickerParts( canvasElement );
		await setCommittedValue( picker, '2023-12-31' );

		await step( 'open calendar on last day of December', async () => {
			await openCalendar( picker, trigger );
			await waitFor( async () => {
				await expect( focusedDay() ).toHaveAttribute( 'data-value', '2023-12-31' );
				await expect( monthLabel() ).toHaveTextContent( /December\s+2023/ );
			} );
		} );

		await step( 'ArrowRight crosses into January', async () => {
			pressPickerKey( picker, 'ArrowRight' );
			await waitFor( async () => {
				await expect( focusedDay() ).toHaveAttribute( 'data-value', '2024-01-01' );
				await expect( monthLabel() ).toHaveTextContent( /January\s+2024/ );
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
				<xb-date-picker clearable value={ ANCHOR_DATE }></xb-date-picker>
			</xb-i18n-provider>
		</div>
	),
	play: async ( { canvasElement, step } ) => {
		const { picker, trigger, monthLabel, nextMonth, prevMonth } =
			await getDatePickerParts( canvasElement );
		await setCommittedValue( picker, ANCHOR_DATE );

		await step( 'open calendar on December 2023', async () => {
			await openCalendar( picker, trigger );
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
				<xb-date-picker clearable value={ ANCHOR_DATE }></xb-date-picker>
			</xb-i18n-provider>
		</div>
	),
	play: async ( { canvasElement, step } ) => {
		const { picker, trigger, monthLabel } = await getDatePickerParts( canvasElement );
		await setCommittedValue( picker, ANCHOR_DATE );

		await step( 'open calendar on December 2023', async () => {
			await openCalendar( picker, trigger );
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

export const SelectDateViaKeyboard = {
	name: 'Test: Select date via keyboard',
	tags: [ '!autodocs' ],
	args: {
		change: fn(),
	},
	render: ( args ) => (
		<div style={ { padding: '2rem' } }>
			<xb-i18n-provider locale="en-US">
				<xb-date-picker clearable value={ ANCHOR_DATE } onchange={ args.change }></xb-date-picker>
			</xb-i18n-provider>
		</div>
	),
	play: async ( { canvasElement, args, step } ) => {
		const { picker, trigger, focusedDay, day, applyButton } =
			await getDatePickerParts( canvasElement );
		picker.addEventListener( 'change', args.change );
		await setCommittedValue( picker, ANCHOR_DATE );

		await step( 'navigate to target day with arrow keys', async () => {
			await openCalendar( picker, trigger );
			pressPickerKey( picker, 'ArrowRight' );
			pressPickerKey( picker, 'ArrowRight' );
			pressPickerKey( picker, 'ArrowRight' );
			pressPickerKey( picker, 'ArrowRight' );
			pressPickerKey( picker, 'ArrowRight' );
			await waitFor( async () => {
				await expect( focusedDay() ).toHaveAttribute( 'data-value', '2023-12-25' );
			} );
		} );

		await step( 'Enter selects focused day as draft', async () => {
			focusedDay().focus();
			await userEvent.keyboard( '{Enter}' );
			await waitFor( async () => {
				await expect( day( '2023-12-25' ) ).toHaveAttribute( 'aria-selected', 'true' );
			} );
		} );

		await step( 'apply commits keyboard selection', async () => {
			await clickPickerButton( applyButton() );
			await waitFor( async () => {
				await expect( picker.value ).toBe( '2023-12-25' );
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
				<xb-date-picker clearable value={ ANCHOR_DATE } onchange={ args.change }></xb-date-picker>
			</xb-i18n-provider>
		</div>
	),
	play: async ( { canvasElement, args, step } ) => {
		const { picker, trigger, day, cancelButton } = await getDatePickerParts( canvasElement );
		picker.addEventListener( 'change', args.change );
		await setCommittedValue( picker, ANCHOR_DATE );
		const committedDisplay = trigger.value;

		await step( 'change draft selection', async () => {
			await openCalendar( picker, trigger );
			await userEvent.click( day( '2023-12-25' ) );
			await expect( day( '2023-12-25' ) ).toHaveAttribute( 'aria-selected', 'true' );
		} );

		await step( 'cancel discards draft and restores committed value', async () => {
			await clickPickerButton( cancelButton() );
			await waitFor( async () => {
				await expect( trigger ).toHaveAttribute( 'aria-expanded', 'false' );
				await expect( picker.value ).toBe( ANCHOR_DATE );
				await expect( trigger.value ).toBe( committedDisplay );
				await expect( args.change ).not.toHaveBeenCalled();
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
				<xb-date-picker clearable value={ ANCHOR_DATE } onchange={ args.change }></xb-date-picker>
			</xb-i18n-provider>
		</div>
	),
	play: async ( { canvasElement, args, step } ) => {
		const { picker, trigger, day, applyButton } = await getDatePickerParts( canvasElement );
		picker.addEventListener( 'change', args.change );
		await setCommittedValue( picker, ANCHOR_DATE );

		await step( 'pick new day and apply', async () => {
			await openCalendar( picker, trigger );
			await userEvent.click( day( '2023-12-25' ) );
			await clickPickerButton( applyButton() );
			await waitFor( async () => {
				await expect( picker.value ).toBe( '2023-12-25' );
				await expect( args.change ).toHaveBeenCalled();
				await expect( trigger ).toHaveAttribute( 'aria-expanded', 'false' );
			} );
		} );
	},
};

export const DraftNotCommittedUntilApply = {
	name: 'Test: Draft not committed until Apply',
	tags: [ '!autodocs' ],
	render: () => (
		<div style={ { padding: '2rem' } }>
			<xb-i18n-provider locale="en-US">
				<xb-date-picker clearable value={ ANCHOR_DATE }></xb-date-picker>
			</xb-i18n-provider>
		</div>
	),
	play: async ( { canvasElement, step } ) => {
		const { picker, trigger, day } = await getDatePickerParts( canvasElement );
		await setCommittedValue( picker, ANCHOR_DATE );
		const committedDisplay = trigger.value;

		await step( 'draft selection does not update trigger', async () => {
			await openCalendar( picker, trigger );
			await userEvent.click( day( '2023-12-25' ) );
			await expect( picker.value ).toBe( ANCHOR_DATE );
			await expect( trigger.value ).toBe( committedDisplay );
		} );
	},
};
