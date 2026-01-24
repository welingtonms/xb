import { CalendarDate } from '../../../utils/date-time/date';

/**
 * @typedef {Object} DayInfo
 * @property {CalendarDate} date
 * @property {boolean} isCurrentMonth
 * @property {boolean} isToday
 */

/**
 * Generates the calendar grid for a specific month.
 * @param {number} year
 * @param {number} month (1-12)
 * @param {'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'} weekStart
 * @returns {DayInfo[]} Array of 42 days (6 weeks)
 */
export function generateGrid( year, month, weekStart = 'sunday' ) {
	const weekDayMap = {
		sunday: 0,
		monday: 1,
		tuesday: 2,
		wednesday: 3,
		thursday: 4,
		friday: 5,
		saturday: 6,
	};
	const weekStartIdx = weekDayMap[ weekStart.toLowerCase() ] ?? 0;

	// 1. Find the first day of the month
	const firstDay = new CalendarDate( year, month, 1 );

	// 2. Determine "real" weekday
	const jsDate = new globalThis.Date( year, month - 1, 1 );
	const firstDayWeekday = jsDate.getDay();

	// 3. Calculate offset
	const offset = ( firstDayWeekday - weekStartIdx + 7 ) % 7;

	const gridStart = firstDay.subtract( offset, 'day' );

	const days = [];
	const today = new globalThis.Date();
	const todayDate = new CalendarDate( today.getFullYear(), today.getMonth() + 1, today.getDate() );

	let current = gridStart;
	for ( let i = 0; i < 42; i++ ) {
		days.push( {
			date: current,
			isCurrentMonth: current.month === month,
			isToday: current.compare( todayDate ) === 0,
		} );
		current = current.add( 1, 'day' );
	}

	return days;
}
