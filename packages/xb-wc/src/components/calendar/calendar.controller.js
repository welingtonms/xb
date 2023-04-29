import { DateFactory } from '@welingtonms/xb-date';

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
			this.date = DateFactory( this.host.date );
			this.days = this.getCalendarDays();
		}
	}

	hostUpdated() {
		const newDate = DateFactory( this.host.date );

		if ( newDate.toString() !== this.date.toString() ) {
			this.date = newDate;
			this.days = this.getCalendarDays();
		}
	}

	getYear() {
		return this.date.getYear();
	}

	getMonth() {
		// we sum 1 because months start at 0
		return this.date.getMonth() + 1;
	}

	getCalendarDays() {
		const date = this.date;

		// get in which day of the week the month starts so we skip the days of the previous month
		const skip = new Date( date.getYear(), date.getMonth() ).getDay();
		// setting the day to 0 to the next month sets the date to the last day of the specified month.
		const daysInMonth = new Date( date.getYear(), date.getMonth() + 1, 0 ).getDate();

		const days = [ ...Array( skip ) ].map( () => null ); //?

		for ( let i = 0; i < daysInMonth; i++ ) {
			days.push( i + 1 );
		}

		while ( days.length % 7 !== 0 ) {
			days.push( null );
		}

		console.log( 'days', days );
		return days;
	}
}

export default CalendarController;
