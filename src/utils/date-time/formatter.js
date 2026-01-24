/**
 * @typedef {import('./date').CalendarDate} CalendarDate
 */

/**
 * Formats a Date object using Intl.DateTimeFormat.
 */
export class Formatter {
	/**
	 * @param {string} locale
	 * @param {Intl.DateTimeFormatOptions} [options] - Optional options
	 */
	constructor( locale, options ) {
		this.locale = locale;
		this.options = options;
	}

	/**
	 * Returns an array of weekday object for the current locale.
	 * @param {'long' | 'short' | 'narrow'} format
	 * @returns {{ label: string, abbr: string }[]}
	 */
	getWeekdays( format = 'long' ) {
		// We start from a known Sunday (e.g. 2023-01-01 was a Sunday)
		// and iterate 7 days.
		const weekDays = [];
		const date = new globalThis.Date( '2023-01-01T12:00:00Z' ); // Sunday

		const labelFormatter = new Intl.DateTimeFormat( this.locale, {
			weekday: format,
			timeZone: 'UTC',
		} );
		const abbrFormatter = new Intl.DateTimeFormat( this.locale, {
			weekday: 'short',
			timeZone: 'UTC',
		} );

		for ( let i = 0; i < 7; i++ ) {
			weekDays.push( {
				label: labelFormatter.format( date ),
				abbr: abbrFormatter.format( date ),
			} );
			date.setUTCDate( date.getUTCDate() + 1 );
		}
		return weekDays;
	}

	/**
	 * Returns an array of month objects for the current locale.
	 * @param {'long' | 'short' | 'narrow'} format
	 * @returns {{ label: string, abbr: string, value: number }[]}
	 */
	getMonths( format = 'long' ) {
		const months = [];
		// Start from Jan 15th to avoid any rollover quirks
		const date = new globalThis.Date( '2023-01-15T12:00:00Z' );

		const labelFormatter = new Intl.DateTimeFormat( this.locale, {
			month: format,
			timeZone: 'UTC',
		} );
		const abbrFormatter = new Intl.DateTimeFormat( this.locale, {
			month: 'short',
			timeZone: 'UTC',
		} );

		for ( let i = 0; i < 12; i++ ) {
			months.push( {
				label: labelFormatter.format( date ),
				abbr: abbrFormatter.format( date ),
				value: i, // 0-indexed for internal compatibility
			} );
			date.setUTCMonth( date.getUTCMonth() + 1 );
		}
		return months;
	}

	/**
	 * Formats a CalendarDate object.
	 * @param {CalendarDate} date
	 * @param {Intl.DateTimeFormatOptions} [options]
	 */
	format( date, options ) {
		const { timeZone = 'UTC', ...rest } = { ...( options ?? this.options ) };
		// Create a UTC date that matches the calendar date "at noon" to be safe
		// If we want "May 5th", we create "2023-05-05T12:00:00Z".
		// Then we format it using the requested timezone or UTC.

		// NOTE: This is a simplification. True "floating" date formatting usually means
		// "Format this as if it is this date in the local timezone".
		// For a Date Picker, we usually render the "Day" cells.

		const jsDate = new globalThis.Date(
			globalThis.Date.UTC( date.year, date.month - 1, date.day, 12 )
		);

		return new Intl.DateTimeFormat( this.locale, {
			...rest,
			timeZone,
		} ).format( jsDate );
	}
}
