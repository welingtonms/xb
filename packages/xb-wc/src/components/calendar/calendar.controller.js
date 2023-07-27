import { createDate } from '@welingtonms/xb-date';
import logger from '../../utils/logger';

function fromMonthYearToDate( year, month ) {
	if ( month == null || year == null ) {
		return createDate();
	}

	return createDate( new Date( year, month - 1, 1 ) );
}

/**
 * @implements {import('lit').ReactiveController}
 */
class CalendarController {
	/** @type {ReactiveControllerHost} */
	host;

	/** @type {import('@welingtonms/xb-date').XBDate} */
	date;

	/** @type {(number | null)[]} */
	days;

	/**
	 * @param {ReactiveControllerHost} host
	 * @param {null | Datasource | Datasource[]} [datasources]
	 */
	constructor( host ) {
		( this.host = host ).addController( this );
	}

	hostConnected() {
		if ( this.date == null ) {
			this.date = fromMonthYearToDate( this.host.year, this.host.month );

			this.days = this.getCalendarDays();
		}
	}

	hostUpdate() {
		const newDate = fromMonthYearToDate( this.host.year, this.host.month );

		if ( newDate.toString() !== this.date.toString() ) {
			this.date = newDate;

			this.days = this.getCalendarDays();
		}
	}

	getYear() {
		return this.date.year();
	}

	getMonth() {
		// we sum 1 because months start at 0
		return this.date.month() + 1;
	}

	// getCalendarDays() {
	// 	const date = this.date;

	// 	// get in which day of the week the month starts so we skip the days of the previous month
	// 	const skip = new Date( date.year(), date.month() ).getDay();
	// 	// setting the day to 0 to the next month sets the date to the last day of the specified month.
	// 	const daysInMonth = new Date( date.year(), date.month() + 1, 0 ).getDate();

	// 	const days = [ ...Array( skip ) ].map( () => null ); //?

	// 	for ( let i = 0; i < daysInMonth; i++ ) {
	// 		days.push( i + 1 );
	// 	}

	// 	while ( days.length % 7 !== 0 ) {
	// 		days.push( null );
	// 	}

	// 	logger.debug( 'days', days );
	// 	return days;
	// }
	getCalendarDays() {
		const year = this.date.year();
		const month = this.date.month();

		const skip = new Date( year, month ).getDay();
		const daysInMonth = new Date( year, month + 1, 0 ).getDate();

		const days = Array.from( { length: skip }, () => null );
		for ( let i = 0; i < daysInMonth; i++ ) {
			days.push( i + 1 );
		}

		const padding = 7 - ( ( skip + daysInMonth ) % 7 );
		const paddedDays = days.concat( Array.from( { length: padding }, () => null ) );

		logger.debug( 'days', paddedDays );
		return paddedDays;
	}
}

export default CalendarController;
