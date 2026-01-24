/**
 * @typedef {import('./date').CalendarDate} CalendarDate
 */
import { CalendarDate } from './date';

export class Parser {
	/**
	 * @param {string} locale
	 * @param {string} [weekStart] - 'sunday', 'monday', etc.
	 */
	constructor( locale, weekStart = 'sunday' ) {
		this.locale = locale;
		this.weekStart = weekStart;
	}

	/**
	 * Attempts to parse a date string based on the locale.
	 * @param {string} input
	 * @returns {Date | null}
	 */
	parse( input ) {
		if ( ! input ) return null;

		// 1. Try ISO format first (YYYY-MM-DD)
		if ( /^\d{4}-\d{2}-\d{2}$/.test( input ) ) {
			return CalendarDate.fromISO( input );
		}

		// 2a. Natural Language parsing
		const lowerInput = input.trim().toLowerCase();

		// Keywords
		if ( [ 'today', 'date' ].includes( lowerInput ) ) {
			return CalendarDate.today();
		}
		if ( lowerInput === 'yesterday' ) {
			return CalendarDate.today().subtract( 1, 'day' );
		}
		if ( lowerInput === 'tomorrow' ) {
			return CalendarDate.today().add( 1, 'day' );
		}

		// Start of periods
		if ( lowerInput === 'month' ) {
			const t = CalendarDate.today();
			return new CalendarDate( t.year, t.month, 1 );
		}
		if ( lowerInput === 'year' ) {
			const t = CalendarDate.today();
			return new CalendarDate( t.year, 1, 1 );
		}
		if ( lowerInput === 'week' ) {
			const t = CalendarDate.today();
			// Calculate start of week based on this.weekStart
			const jsDate = new globalThis.Date( t.year, t.month - 1, t.day );
			const currentDay = jsDate.getDay(); // 0=Sun, 1=Mon...
			const weekStartMap = {
				sunday: 0,
				monday: 1,
				tuesday: 2,
				wednesday: 3,
				thursday: 4,
				friday: 5,
				saturday: 6,
			};
			const startDayIndex = weekStartMap[ this.weekStart.toLowerCase() ] ?? 0;

			let diff = currentDay - startDayIndex;
			if ( diff < 0 ) diff += 7;

			return t.subtract( diff, 'day' );
		}

		// Relative: Past ("X days ago")
		// <amount> <unit> ago
		const pastRegex = /^(\d+)\s+(day|week|month|year)s?\s+ago$/;
		const pastMatch = lowerInput.match( pastRegex );
		if ( pastMatch ) {
			const amount = parseInt( pastMatch[ 1 ], 10 );
			const unit = pastMatch[ 2 ];
			return CalendarDate.today().subtract( amount, unit );
		}

		// Relative: Future ("in X days")
		// in <amount> <unit>
		const futureRegex = /^in\s+(\d+)\s+(day|week|month|year)s?$/;
		const futureMatch = lowerInput.match( futureRegex );
		if ( futureMatch ) {
			const amount = parseInt( futureMatch[ 1 ], 10 );
			const unit = futureMatch[ 2 ];
			return CalendarDate.today().add( amount, unit );
		}

		// 2. Determine locale order (e.g. US=MDY, GB=DMY)
		const parts = new Intl.DateTimeFormat( this.locale ).formatToParts(
			new globalThis.Date( 2000, 10, 22 )
		); // Nov 22 2000
		// We look for 'month', 'day', 'year' types
		const formatOrder = parts
			.filter( ( p ) => [ 'month', 'day', 'year' ].includes( p.type ) )
			.map( ( p ) => p.type );

		// 3. Split input by non-digit characters
		const values = input.split( /\D+/ ).filter( Boolean ).map( Number );
		if ( values.length !== 3 ) return null;

		// 4. Map values to parts
		let year, month, day;

		for ( let i = 0; i < 3; i++ ) {
			const type = formatOrder[ i ];
			const val = values[ i ];

			if ( type === 'year' ) year = val;
			else if ( type === 'month' ) month = val;
			else if ( type === 'day' ) day = val;
		}

		// Heuristics for 2-digit years
		if ( year < 100 ) {
			year += 2000; // Simplified window
		}

		// Basic validity check
		if ( month < 1 || month > 12 ) return null;
		const maxDays = CalendarDate.daysInMonth( year, month );
		if ( day < 1 || day > maxDays ) return null;

		return new CalendarDate( year, month, day );
	}

	/**
	 * Attempts to parse a range string.
	 * @param {string} prompt
	 * @returns {[CalendarDate, CalendarDate] | null}
	 */
	parseRange( prompt ) {
		if ( ! prompt ) return null;
		const lower = prompt.trim().toLowerCase();
		const today = CalendarDate.today();

		// "Past X days/weeks" or "Last X days/weeks"
		const pastRegex = /^(past|last)\s+(\d+)\s+(day|week|month|year)s?$/;
		const pastMatch = lower.match( pastRegex );
		if ( pastMatch ) {
			const amount = parseInt( pastMatch[ 2 ], 10 );
			const unit = pastMatch[ 3 ];
			// Past 7 days = [today - 7, today] (inclusive)
			const start = today.subtract( amount, unit );
			return [ start, today ];
		}

		// "Next X days/weeks"
		const nextRegex = /^(next)\s+(\d+)\s+(day|week|month|year)s?$/;
		const nextMatch = lower.match( nextRegex );
		if ( nextMatch ) {
			const amount = parseInt( nextMatch[ 2 ], 10 );
			const unit = nextMatch[ 3 ];
			const end = today.add( amount, unit );
			return [ today, end ];
		}

		// "This Month", "Last Month", "Past Month", "Next Month"
		if ( lower.includes( 'month' ) ) {
			if ( lower === 'this month' ) {
				// Return full month [Start, End]
				const start = new CalendarDate( today.year, today.month, 1 );
				const end = new CalendarDate(
					today.year,
					today.month,
					CalendarDate.daysInMonth( today.year, today.month )
				);
				return [ start, end ];
			}
			if ( lower === 'last month' || lower === 'past month' ) {
				const lastMonth = today.subtract( 1, 'month' );
				const start = new CalendarDate( lastMonth.year, lastMonth.month, 1 );
				const end = new CalendarDate(
					lastMonth.year,
					lastMonth.month,
					CalendarDate.daysInMonth( lastMonth.year, lastMonth.month )
				);
				return [ start, end ];
			}
			if ( lower === 'next month' ) {
				const nextMonth = today.add( 1, 'month' );
				const start = new CalendarDate( nextMonth.year, nextMonth.month, 1 );
				const end = new CalendarDate(
					nextMonth.year,
					nextMonth.month,
					CalendarDate.daysInMonth( nextMonth.year, nextMonth.month )
				);
				return [ start, end ];
			}
		}

		// "This Year", "Last Year"
		if ( lower.includes( 'year' ) ) {
			if ( lower === 'this year' ) {
				return [ new CalendarDate( today.year, 1, 1 ), today ];
			}
			if ( lower === 'last year' ) {
				const lastYear = today.year - 1;
				return [ new CalendarDate( lastYear, 1, 1 ), new CalendarDate( lastYear, 12, 31 ) ];
			}
		}

		return null;
	}
}
