import { html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { DatePicker } from './date-picker';
import { CalendarDate } from '../../../utils/date-time/date';
import { XBElement } from '../../../components/xb-element';
import { datePickerStyles } from './date-picker.styles';
import { generateGrid } from './grid-generator';
import createLogger from '../../../utils/logger';

const logger = createLogger( 'date-range-picker' );

export class DateRangePicker extends DatePicker {
	static styles = [ datePickerStyles() ];

	/**
	 * Initial range value [start, end] (ISO strings).
	 * @type {[string|null, string|null]}
	 */
	@property( { type: Array, attribute: 'initial-value' } ) accessor initialValue = [ null, null ];

	/**
	 * Draft selected range (interactive state).
	 * @type {[CalendarDate|null, CalendarDate|null]}
	 */
	@state() accessor draftSelectedRange = [ null, null ];

	/**
	 * Internal value state.
	 * @type {[string|null, string|null]}
	 */
	@state() accessor selectedRange = [ null, null ];

	/**
	 * @type {[string|null, string|null]}
	 */
	get value() {
		return this.selectedRange;
	}

	set value( val ) {
		this.selectedRange = this.#normalizeRange( val );
		this.updateFormValue();
	}

	/**
	 * @param {unknown} value
	 * @returns {[string|null, string|null]}
	 */
	#normalizeRange( value ) {
		if ( ! Array.isArray( value ) ) {
			return [ null, null ];
		}

		return [ value[ 0 ] ?? null, value[ 1 ] ?? null ];
	}

	/**
	 * @override
	 * @returns {[string|null, string|null]}
	 */
	getInitialFormValue() {
		return this.initialValue;
	}

	/**
	 * @override
	 * @param {unknown} [value]
	 */
	initializeFormValue( value = this.getInitialFormValue() ) {
		const consolidated = this.#normalizeRange( value ?? this.initialValue );
		this.selectedRange = consolidated;
		this.draftSelectedRange = [ null, null ];
		this.updateFormValue();
	}

	get startDate() {
		// Return committed start date unless picking? No.
		// Internal usage: renderDay checks this.startDate.
		// We should update renderDay to look at draftSelectedRange directly.
		return this.selectedRange[ 0 ] ? CalendarDate.fromISO( this.selectedRange[ 0 ] ) : null;
	}

	set startDate( val ) {
		// No-op or throw?
	}

	get endDate() {
		return this.selectedRange[ 1 ] ? CalendarDate.fromISO( this.selectedRange[ 1 ] ) : null;
	}

	set endDate( val ) {}

	/**
	 * Current picking state.
	 * @type {'start' | 'end' | null}
	 */
	picking = null;

	/**
	 * Name for start input (form submission).
	 * @type {string}
	 */
	@property( { type: String, attribute: 'name-start' } ) accessor nameStart;

	/**
	 * Name for end input (form submission).
	 * @type {string}
	 */
	@property( { type: String, attribute: 'name-end' } ) accessor nameEnd;

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-date-range-picker', ...config, type: DateRangePicker } );
	}

	constructor() {
		super();

		this.panes = 2;
	}

	expand( args ) {
		if ( ! this.open ) {
			// Sync active state (parsed from selectedRange ISOs)
			const s = this.selectedRange[ 0 ] ? CalendarDate.fromISO( this.selectedRange[ 0 ] ) : null;
			const e = this.selectedRange[ 1 ] ? CalendarDate.fromISO( this.selectedRange[ 1 ] ) : null;
			this.draftSelectedRange = [ s, e ];
		}
		super.expand( args ); // DatePicker.expand also does draftSelectedDate logic but we ignore it here
	}

	collapse( args ) {
		super.collapse( args );
	}

	/**
	 * @override
	 * @param {import('lit').PropertyValues<this>} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'open' ) && ! this.open ) {
			this.draftSelectedRange = [ null, null ];
		}
	}

	/**
	 * @override
	 */
	handleApply( e ) {
		e?.stopPropagation();
		const [ start, end ] = this.draftSelectedRange;
		if ( start && end ) {
			this.#selectRange( start, end, true );
		} else {
			// Maybe allow clearing?
			this.handleClear();
			return;
		}
		this.collapse();
	}

	/**
	 * @param {import('lit').PropertyValues<this>} changedProperties
	 */
	willUpdate( changedProperties ) {
		if ( changedProperties.has( 'initialValue' ) && Array.isArray( this.initialValue ) ) {
			this.initializeFormValue( this.initialValue );
		}

		super.willUpdate( changedProperties );
	}

	/**
	 * Renders a day in the calendar grid with range-specific logic.
	 * @override
	 * @param {import('./grid-generator').DayInfo} dayInfo
	 * @returns {import('lit').TemplateResult}
	 */
	renderDay( dayInfo ) {
		const { date, isCurrentMonth } = dayInfo;

		// Use draft range for visuals
		const [ start, end ] = this.draftSelectedRange;

		// Only show selection for days in the current month view
		// to avoid double-rendering in multi-pane views.
		const isStart = isCurrentMonth && start && date.compare( start ) === 0;
		const isEnd = isCurrentMonth && end && date.compare( end ) === 0;

		let isInRange = false;
		if ( isCurrentMonth && start && end ) {
			isInRange = date.compare( start ) > 0 && date.compare( end ) < 0;
		}

		// Picking visual feedback
		// If picking end (start set, end null), show range from start to hover?
		// Current logic: basic static range.

		const isBlocked = date.matches( ...this.constraints );

		const classes = {
			day: true,
			'-selected': isStart || isEnd,
			'-range-start': isStart,
			'-range-end': isEnd,
			'-in-range': isInRange,
			'-today': dayInfo.isToday,
			'-faded': ! dayInfo.isCurrentMonth,
			'-blocked': isBlocked,
		};

		const ariaLabel = this.formatter.format( date, { dateStyle: 'long' } );

		return html`
			<td>
				<button
					type="button"
					tabindex="-1"
					class=${ classMap( classes ) }
					data-value=${ date.toString() }
					aria-label=${ ariaLabel }
					?disabled=${ isBlocked }
					@click=${ () => this.handleDayClick( dayInfo ) }
				>
					${ date.day }
				</button>
			</td>
		`;
	}

	/**
	 * Handles clicks on individual days in the calendar.
	 * @override
	 * @param {import('./grid-generator').DayInfo} dayInfo
	 */
	handleDayClick( dayInfo ) {
		const { date } = dayInfo;

		// Use draft range logic
		let [ newStart, newEnd ] = this.draftSelectedRange;

		if ( this.picking === 'start' ) {
			newStart = date;
			if ( newEnd && newStart.compare( newEnd ) > 0 ) {
				newEnd = null;
				this.picking = 'end';
			} else {
				if ( newEnd ) {
					this.picking = null;
				} else {
					this.picking = 'end';
				}
			}
		} else if ( this.picking === 'end' ) {
			newEnd = date;
			if ( newStart && newEnd.compare( newStart ) < 0 ) {
				// Swap if end date is before start date
				[ newStart, newEnd ] = [ newEnd, newStart ];
				this.picking = null;
			} else {
				this.picking = null;
			}
		} else {
			if ( ! newStart || ( newStart && newEnd ) ) {
				newStart = date;
				newEnd = null;
				this.picking = 'end';
			} else {
				if ( date.compare( newStart ) < 0 ) {
					[ newStart, newEnd ] = [ date, newStart ];
				} else {
					newEnd = date;
				}
				this.picking = null;
			}
		}

		// Update draft only
		this.draftSelectedRange = [ newStart, newEnd ];
	}

	/**
	 * Checks if a date range contains any blocked dates.
	 * @param {CalendarDate|null} start
	 * @param {CalendarDate|null} end
	 * @returns {boolean}
	 */
	#isRangeBlocked( start, end ) {
		if ( ! start ) return false;

		// If end is null, just check start
		if ( ! end ) {
			if ( start.matches( ...this.constraints ) ) {
				// Assuming 'logger' is defined elsewhere or will be imported.
				// If not, this line will cause a ReferenceError.
				logger.warn( 'Date blocked', start );
				return true;
			}
			return false;
		}

		// Iterate from start to end
		// Optimization: if range is huge, this checks every day.
		// JS Date arithmetic is fast enough for UI ranges usually.
		let current = start;
		const limit = 365 * 2; // Safety break
		let count = 0;

		while ( current.compare( end ) <= 0 && count < limit ) {
			if ( current.matches( ...this.constraints ) ) {
				// Assuming 'logger' is defined elsewhere or will be imported.
				// If not, this line will cause a ReferenceError.
				logger.warn( 'Range contains blocked date', current );
				// Maybe show dialog message?
				return true;
			}
			current = current.add( 1, 'day' );
			count++;
		}
		return false;
	}

	/**
	 * Updates range checking constraints and form values.
	 * @param {CalendarDate|null} start
	 * @param {CalendarDate|null} end
	 * @param {boolean} [emitChange=true]
	 * @returns {boolean} True if selection was successful.
	 */
	#selectRange( start, end, emitChange = true ) {
		if ( this.#isRangeBlocked( start, end ) ) {
			this.setDialogMessage( 'Selection contains blocked dates.' );
			return false;
		}

		this.setDialogMessage( '' ); // Clear error

		// this.startDate = start; // Removed
		// this.endDate = end; // Removed

		// Update internal value state (ISO strings)
		this.selectedRange = [ start ? start.toString() : null, end ? end.toString() : null ];

		this.updateFormValue();

		if ( start && end && emitChange ) {
			this.emit( 'change' );
			// this.hide(); // Apply button handles hide now
		}
		return true;
	}

	/**
	 * @override
	 */
	updateFormValue() {
		const [ start, end ] = this.value;

		const formData = new FormData();

		if ( start ) {
			formData.append( this.nameStart ?? `${ this.name }-start`, start );
		}

		if ( end ) {
			formData.append( this.nameEnd ?? `${ this.name }-end`, end );
		}

		this.setFormValue( formData );
	}

	onFormReset() {
		this.initializeFormValue();
	}

	/* DatePicker handles this automatically via the nav buttons bound to these methods */

	/**
	 * Handles preset selection with range parsing support.
	 * @override
	 * @param {string} prompt
	 */
	handlePresetClick( prompt ) {
		// 1. Try to parse range prompt
		const range = this.parser.parseRange( prompt );
		if ( range ) {
			// Directly update draft logic?
			// Or reuse selectRange logic but for draft?
			// #selectRange commits values.
			// We need a way to set draft range safely (checking constraints).

			if ( this.#isRangeBlocked( range[ 0 ], range[ 1 ] ) ) {
				this.setDialogMessage( 'Selection contains blocked dates.' );
				return;
			}
			this.setDialogMessage( '' );
			this.draftSelectedRange = [ range[ 0 ], range[ 1 ] ];
			this.viewDate = range[ 0 ];
			return;
		}

		// 2. Fallback: Parse single date
		const date = this.parser.parse( prompt );
		if ( date ) {
			if ( this.#isRangeBlocked( date, date ) ) {
				this.setDialogMessage( 'Selection contains blocked dates.' );
				return;
			}
			this.setDialogMessage( '' );
			this.draftSelectedRange = [ date, date ];
			this.viewDate = date;
		}
	}

	/**
	 * Renders the custom dual-input trigger.
	 * @returns {import('lit').TemplateResult}
	 */
	renderPicker() {
		// Use committed state for inputs
		const start = this.selectedRange[ 0 ] ? CalendarDate.fromISO( this.selectedRange[ 0 ] ) : null;
		const end = this.selectedRange[ 1 ] ? CalendarDate.fromISO( this.selectedRange[ 1 ] ) : null;

		const startValue = start ? this.formatter.format( start ) : '';
		const endValue = end ? this.formatter.format( end ) : '';

		return html`
			<input
				id="range-start"
				type="text"
				class="trigger"
				role="combobox"
				aria-haspopup="dialog"
				aria-expanded=${ this.open ? 'true' : 'false' }
				placeholder="Start Date"
				.value=${ startValue }
				@click=${ () => this.#handleTriggerClick( 'start' ) }
			/>
			<span class="range-separator">—</span>
			<input
				id="range-end"
				type="text"
				class="trigger"
				role="combobox"
				aria-haspopup="dialog"
				aria-expanded=${ this.open ? 'true' : 'false' }
				placeholder="End Date"
				.value=${ endValue }
				@click=${ () => this.#handleTriggerClick( 'end' ) }
			/>
			<span class="sr-only">
				Start date: ${ startValue || 'empty' }, End date: ${ endValue || 'empty' }
			</span>
		`;
	}

	shouldShowClearButton = () => {
		const start = this.selectedRange[ 0 ] ? CalendarDate.fromISO( this.selectedRange[ 0 ] ) : null;
		const end = this.selectedRange[ 1 ] ? CalendarDate.fromISO( this.selectedRange[ 1 ] ) : null;

		return this.clearable && ( start || end );
	};

	/**
	 * Handles clicks on the start/end input triggers.
	 * @param {'start'|'end'} target
	 */
	#handleTriggerClick( target ) {
		if ( ! this.open ) {
			this.picking = target;
			this.expand();
		} else {
			// If already open, just switch picking mode? or toggle?
			// "Standard" behavior: if I click end, I want to pick end.
			this.picking = target;
		}
	}

	handleClear( e ) {
		e?.stopPropagation();
		this.selectedRange = [ null, null ];
		this.draftSelectedRange = [ null, null ]; // Clear draft to sync UI if open
		// this.startDate = null; // Removed
		// this.endDate = null; // Removed
		this.picking = null;
		this.updateFormValue();
		this.emit( 'clear' );
		this.emit( 'change' );
	}
}

/**
 * @typedef {import('../../../utils/date-time/date.js').CalendarDate} CalendarDate
 */
