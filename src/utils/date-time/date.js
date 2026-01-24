/**
 * @typedef {Object} DateComponents
 * @property {number} year - Full year (e.g., 2023)
 * @property {number} month - Month index (1-12)
 * @property {number} day - Day of the month (1-31)
 */

/**
 * A timezone-agnostic date representation.
 * Represents a specific calendar day (e.g., "October 27th") regardless of time or location.
 */
export class CalendarDate {
	/**
	 * @param {number | DateComponents} yearOrComponents - Year or components object
	 * @param {number} [month] - Month (1-12)
	 * @param {number} [day] - Day (1-31)
	 */
	constructor( yearOrComponents, month, day ) {
		if ( typeof yearOrComponents === 'object' ) {
			this.year = yearOrComponents.year;
			this.month = yearOrComponents.month;
			this.day = yearOrComponents.day;
		} else {
			this.year = yearOrComponents;
			this.month = month;
			this.day = day;
		}
	}

	/**
	 * Creates a CalendarDate instance from an ISO 8601 string (YYYY-MM-DD)
	 * @param {string} isoString
	 * @returns {CalendarDate}
	 */
	static fromISO( isoString ) {
		const [ y, m, d ] = isoString.split( '-' ).map( Number );
		return new CalendarDate( y, m, d );
	}

	/**
	 * Returns a CalendarDate representing today (local time).
	 * @returns {CalendarDate}
	 */
	static today() {
		const now = new globalThis.Date();
		return new CalendarDate( now.getFullYear(), now.getMonth() + 1, now.getDate() );
	}

	/**
	 * Returns the number of days in the month for the given year.
	 * @param {number} year
	 * @param {number} month (1-12)
	 * @returns {number}
	 */
	static daysInMonth( year, month ) {
		// efficient trick: day 0 of next month is last day of current
		return new globalThis.Date( year, month, 0 ).getDate();
	}

	/**
	 * returns a native Date object (local time at noon to avoid rollover issues).
	 * @returns {Date}
	 */
	toDate() {
		return new globalThis.Date( this.year, this.month - 1, this.day, 12 );
	}

	/**
	 * Returns the day of the week (0-6, 0 is Sunday).
	 * Uses UTC to ensure the intrinsic day of the week for this calendar date.
	 * @returns {number}
	 */
	getDay() {
		return new globalThis.Date(
			globalThis.Date.UTC( this.year, this.month - 1, this.day )
		).getUTCDay();
	}

	/**
	 * @returns {string} ISO 8601 formatted string (YYYY-MM-DD)
	 */
	toString() {
		const m = String( this.month ).padStart( 2, '0' );
		const d = String( this.day ).padStart( 2, '0' );
		return `${ this.year }-${ m }-${ d }`;
	}

	/**
	 * Compare two dates.
	 * @param {CalendarDate} other
	 * @returns {number} -1 if before, 0 if equal, 1 if after
	 */
	compare( other ) {
		if ( this.year !== other.year ) return this.year - other.year;
		if ( this.month !== other.month ) return this.month - other.month;
		return this.day - other.day;
	}

	/**
	 * Adds units to the date and returns a new instance.
	 * @param {number} amount
	 * @param {'day' | 'week' | 'month' | 'year'} unit
	 * @returns {CalendarDate}
	 */
	add( amount, unit ) {
		let { year, month, day } = this;

		if ( unit === 'week' ) {
			return this.add( amount * 7, 'day' );
		}

		if ( unit === 'year' ) {
			year += amount;
		} else if ( unit === 'month' ) {
			month += amount;
			// Handle year rollovers
			while ( month > 12 ) {
				month -= 12;
				year++;
			}
			while ( month < 1 ) {
				month += 12;
				year--;
			}
		} else if ( unit === 'day' ) {
			// For days, we can rely on JS Date to handle the heavy lifting of rollovers
			// Construct a UTC date to avoid timezone issues (noon UTC is safe)
			const jsDate = new globalThis.Date( globalThis.Date.UTC( year, month - 1, day ) );
			jsDate.setUTCDate( jsDate.getUTCDate() + amount );
			return new CalendarDate(
				jsDate.getUTCFullYear(),
				jsDate.getUTCMonth() + 1,
				jsDate.getUTCDate()
			);
		}

		// Adjustment for month/year changes (clamp day to valid range)
		// e.g. Jan 31 + 1 month -> Feb 28 (not Feb 31)
		if ( unit === 'month' || unit === 'year' ) {
			const maxDays = CalendarDate.daysInMonth( year, month );
			if ( day > maxDays ) {
				day = maxDays;
			}
		}

		return new CalendarDate( year, month, day );
	}

	subtract( amount, unit ) {
		return this.add( -amount, unit );
	}

	/**
	 * Check if the current date matches **at least one** of the provided constraints.
	 * Constraints can be:
	 * - CalendarDate instance or ISO string (exact match)
	 * - [start, end] range (inclusive, null means open-ended)
	 * - Function (date: CalendarDate) => boolean
	 * @param {...(string | CalendarDate | Array | (date: CalendarDate) => boolean)} constraints
	 * @returns {boolean}
	 */
	matches( ...constraints ) {
		if ( constraints.length === 0 ) return false;

		return constraints.some( ( constraint ) => {
			// 1. Function
			if ( typeof constraint === 'function' ) {
				return constraint( this );
			}

			// 2. Range [start, end]
			if ( Array.isArray( constraint ) ) {
				const [ start, end ] = constraint;
				const startDate = start
					? start instanceof CalendarDate
						? start
						: CalendarDate.fromISO( start )
					: null;
				const endDate = end
					? end instanceof CalendarDate
						? end
						: CalendarDate.fromISO( end )
					: null;

				const afterStart = ! startDate || this.compare( startDate ) >= 0;
				const beforeEnd = ! endDate || this.compare( endDate ) <= 0;
				return afterStart && beforeEnd;
			}

			// 3. Single Value (Date or String)
			const target =
				constraint instanceof CalendarDate ? constraint : CalendarDate.fromISO( constraint );
			return this.compare( target ) === 0;
		} );
	}
}
