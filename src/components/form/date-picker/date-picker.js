import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, state } from 'lit/decorators.js';
import { ContextConsumer } from '@lit/context';

import { AsFormElementMixin } from '../../../mixins/as-form-element';
import { BoundaryController } from '../../../controllers/boundary';
import { ExpandableController } from '../../../controllers/expandable';
import { FocusManagerController } from '../../../controllers/focus-manager';
import { KeyboardSupportController } from '../../../controllers/keyboard-support';

import { XBElement } from '../../../components/xb-element';
import { FloatingElement } from '../../../components/floating-element';
import { CalendarDate } from '../../../utils/date-time/date';
import { Parser } from '../../../utils/date-time/parser';
import { Formatter } from '../../../utils/date-time/formatter';
import createLogger from '../../../utils/logger';
import { generateGrid } from './grid-generator';
import { i18nContext } from '../../i18n/i18n.context';
import { datePickerStyles, MENU_SELECTOR, TRIGGER_SELECTOR } from './date-picker.styles';
import { trackSlot } from '../../../decorators/track-slot';

import '../../button/button.define';
import '../../icon/icon.define';
import '../../menu/menu.define';

const logger = createLogger( 'date-picker' );

/**
 * @typedef {import('../../../utils/date-time/date.js').CalendarDate} CalendarDate
 * @typedef {import('../../../i18n/i18n.context.js').I18nContextValue} I18nContextValue
 * @fires xb-date-picker-change - Emitted when the date selection changes.
 * @fires xb-date-picker-clear - Emitted when the selection is cleared.
 * @mixes AsFormElementMixin
 * @mixes WithFocusMixin
 */
export class DatePicker extends AsFormElementMixin( FloatingElement ) {
	static styles = [ datePickerStyles() ];

	/**
	 * Date value.
	 * @type {string | null}
	 */
	@state() accessor providedValue = null;

	/**
	 * Draft selected date (interactive state).
	 * @type {CalendarDate|null}
	 */
	@state() accessor draftSelectedDate = null;

	/**
	 * View date.
	 * @type {CalendarDate}
	 */
	@state() accessor viewDate;

	/**
	 * Date selection presets.
	 * Can be an array of strings (keywords) or objects { label, prompt }.
	 * @type {Array<string | { label: string, prompt: string }>}
	 */
	@property( { type: Array } ) accessor presets = [];

	/**
	 * Constraints to block specific dates.
	 * Can be:
	 * - Date string (YYYY-MM-DD or ISO)
	 * - [start, end] range
	 * - Function (CalendarDate) => boolean
	 * @type {Array<string|Array|Function>}
	 */
	@property( { type: Array } ) accessor constraints = [];

	/**
	 * Should the picker be clearable.
	 * @type {boolean}
	 */
	@property( { type: Boolean, reflect: true } ) accessor clearable = false;

	/**
	 * Number of months to display side-by-side.
	 * @type {number}
	 */
	@property( { type: Number } ) accessor panes = 1;

	/** @type {boolean} */
	@trackSlot( 'leading' )
	accessor hasSlottedLeading;

	/** @type {boolean} */
	@trackSlot( 'trailing' )
	accessor hasSlottedTrailing;

	/** @type {boolean} */
	@trackSlot( 'addon-leading' )
	accessor hasSlottedAddonLeading;

	/** @type {boolean} */
	@trackSlot( 'addon-trailing' )
	accessor hasSlottedAddonTrailing;

	/**
	 * Focused date for keyboard navigation.
	 * @type {CalendarDate}
	 */
	@state() accessor focusedDate;

	/**
	 * Selected date.
	 * @type {CalendarDate | null}
	 */
	@state() accessor selectedDate;

	/** @type {{ boundary: BoundaryController; expandable: ExpandableController; focus: FocusManagerController; keyboard: KeyboardSupportController }} */
	#controllers;

	/** @type {ContextConsumer<import('@lit/context').Context<unknown, I18nContextValue>, I18nContextValue>} */
	#i18nConsumer = new ContextConsumer( this, {
		context: i18nContext,
		subscribe: true,
		callback: () => {
			this.requestUpdate();
		},
	} );

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-date-picker', ...config, type: DatePicker } );
	}

	constructor() {
		super();
		// this.providedValue = ''; // Removed as providedValue is now @state and initialized to null

		// open is managed by FloatingElement
		this.position = 'fixed';
		this.viewDate = CalendarDate.today();
		this.viewDate.day = 1; // Always view 1st of month

		// Default placement from legacy
		this.placement = 'bottom-start';

		this.#controllers = {
			boundary: new BoundaryController( this ),
			expandable: new ExpandableController( this, {
				getExpandableElement: () => {
					return this.getFloatingElement();
				},
				isExpanded: () => Boolean( this.open ),
			} ),
			focus: new FocusManagerController( this, {
				query: () => {
					const selectors = 'button.day:not(.-blocked)';
					return Array.from( this.renderRoot?.querySelectorAll( selectors ) );
				},
				focusOnType: false,
				getInteractiveElement: () => {
					return this.getReferenceElement();
				},
			} ),
			keyboard: new KeyboardSupportController( this, this.#getKeyboardShortcuts(), {
				event: 'keydown',
				getEventTarget: () => this.renderRoot,
			} ),
		};
	}

	connectedCallback() {
		super.connectedCallback();
		this.addEventListener( 'focusin', this.#handleFocusIn );
		this.addEventListener( 'focusout', this.#handleFocusOut );
		this.addEventListener( 'click', this.#handleClick );
		this.addEventListener( 'xb:interact-out', this.#handleInteractOut );
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener( 'focusin', this.#handleFocusIn );
		this.removeEventListener( 'focusout', this.#handleFocusOut );
		this.removeEventListener( 'click', this.#handleClick );
		this.removeEventListener( 'xb:interact-out', this.#handleInteractOut );
	}

	/**
	 * @param {import('lit').PropertyValues<this>} changedProperties
	 */
	willUpdate( changedProperties ) {
		if ( changedProperties.has( 'providedValue' ) ) {
			// Attribute changed (external source of truth for initialization)
			// Only update state if providedValue is different from current selectedDate representation
			const newDate =
				this.providedValue && typeof this.providedValue === 'string'
					? CalendarDate.fromISO( this.providedValue )
					: null;
			if ( newDate?.toString() !== this.selectedDate?.toString() ) {
				// Use #selectDate to enforce constraints and logging
				// emitChange = false because this is a reactive prop update, not user interaction
				this.#selectDate( newDate, false );
			}
		}

		super.willUpdate( changedProperties );
	}

	/**
	 * Attempts to set the selected date.
	 * Checks constraints before preventing selection.
	 * @param {CalendarDate|null} date
	 * @param {boolean} [emitChange=true] - Whether to emit change/input events
	 * @returns {boolean} - True if selection was successful (or cleared), false if blocked
	 */
	#selectDate( date, emitChange = true ) {
		if ( ! date ) {
			this.selectedDate = null;
			this.updateFormValue();
			if ( emitChange ) {
				this.emit( 'change' );
			}
			return true;
		}

		if ( date.matches( ...this.constraints ) ) {
			const msg = `Date ${ this.formatter.format( date, {
				dateStyle: 'long',
			} ) } is not available.`;
			logger.warn( msg );
			this.setDialogMessage( msg );
			return false;
		}

		this.selectedDate = date;
		this.updateFormValue();
		if ( emitChange ) {
			this.emit( 'change' );
		}
		return true;
	}

	/**
	 * @param {import('lit').PropertyValues<this>} changedProperties
	 */
	firstUpdated( changedProperties ) {
		if ( this.selectedDate ) {
			this.viewDate = new CalendarDate( this.selectedDate.year, this.selectedDate.month, 1 );
		}

		super.firstUpdated( changedProperties );
	}

	#handleFocusIn = ( event ) => {
		if ( this.contains( event.target ) || event.target === this ) {
			this.#controllers.keyboard.activate();
			this.#controllers.boundary.activate();
		}
	};

	#handleFocusOut = ( event ) => {
		if ( ! this.contains( event.relatedTarget ) ) {
			this.#controllers.keyboard.deactivate();
			this.#controllers.boundary.deactivate();
		}
	};

	#handleClick = ( event ) => {
		if ( this.disabled ) return;

		const target = event.target;
		if ( ! this.open && ( target.matches?.( '.trigger' ) || target.closest( '#picker' ) ) ) {
			// Handled mostly by input click
		}
	};

	#handleInteractOut = () => {
		if ( ! this.open ) return;
		this.#controllers.boundary.deactivate();
		this.#controllers.keyboard.deactivate();
		this.collapse();
	};

	#getKeyboardShortcuts() {
		return [
			{
				shortcut: { key: 'ArrowRight' },
				handler: () => this.#moveFocus( 1, 'day' ),
			},
			{
				shortcut: { key: 'ArrowLeft' },
				handler: () => this.#moveFocus( -1, 'day' ),
			},
			{
				shortcut: { key: 'ArrowUp' },
				handler: () => {
					if ( ! this.open ) {
						this.expand();
						return;
					}
					this.#moveFocus( -1, 'week' );
				},
			},
			{
				shortcut: { key: 'ArrowDown' },
				handler: () => {
					if ( ! this.open ) {
						this.expand();
						return;
					}
					this.#moveFocus( 1, 'week' );
				},
			},
			{
				shortcut: { key: 'Escape' },
				handler: () => {
					if ( this.open ) this.collapse( { focusOnTrigger: true } );
				},
			},
			{
				shortcut: { key: 'Enter' },
				handler: ( e ) => {
					if ( e.target.matches( '.day' ) ) {
						// The click handler on the button will handle selection,
						// but we might want explicit enter support if not using native button activation
					}
				},
			},
		];
	}

	async #moveFocus( amount, unit ) {
		if ( ! this.open ) return;

		// Ensure focusedDate is initialized
		if ( ! this.focusedDate ) {
			this.focusedDate =
				this.selectedDate || new CalendarDate( this.viewDate.year, this.viewDate.month, 1 ); /// @TODO: if no selected date, focus today
		}

		let newDate;
		if ( unit === 'week' ) {
			newDate = this.focusedDate.add( amount * 7, 'day' );
		} else {
			newDate = this.focusedDate.add( amount, 'day' );
		}

		this.focusedDate = newDate;

		// Update view if month changed
		if ( newDate.year !== this.viewDate.year || newDate.month !== this.viewDate.month ) {
			this.viewDate = new CalendarDate( newDate.year, newDate.month, 1 );
		}

		await this.updateComplete;

		// Focus the button
		const btn = this.renderRoot?.querySelector( `button[data-value="${ newDate.toString() }"]` );
		if ( btn ) {
			// Announce new focused date
			this.setDialogMessage( this.formatter.format( newDate, { dateStyle: 'long' } ) );

			btn.focus();
			// We rely on focusin to handle tabindex management via controller or manual logic?
			// The Legacy component used #setTabbableDayButton.
			// Let's mimic that basic behavior manually here for now.
			const currentTabbable = this.renderRoot?.querySelector( '.day[tabindex="0"]' );
			if ( currentTabbable ) currentTabbable.setAttribute( 'tabindex', '-1' );
			btn.setAttribute( 'tabindex', '0' );
		}
	}

	/**
	 * @param {string} message
	 */
	setDialogMessage( message ) {
		const msgEl = this.renderRoot?.querySelector( '#dialog-message' );
		if ( msgEl ) {
			msgEl.textContent = message;
		}
	}

	toggle = ( args ) => {
		return this.open ? this.collapse( args ) : this.expand( args );
	};

	async expand( args ) {
		const { focusOnTrigger = false } = args || {};
		if ( this.disabled ) return;

		if ( ! this.open ) {
			// Sync draft state with committed state
			this.draftSelectedDate = this.selectedDate;
		}

		this.show(); // FloatingElement.show()

		if ( focusOnTrigger ) {
			const trigger = this.getReferenceElement();
			trigger?.focus();
		} else {
			// Focus first available day or selected day
			await this.updateComplete;
			const targetDate =
				this.selectedDate || new CalendarDate( this.viewDate.year, this.viewDate.month, 1 );
			this.#moveFocus( 0, 'day' ); // Hack to trigger focus logic on targetDate
		}

		this.setDialogMessage( 'Cursor keys can navigate dates' );
		this.emit( 'expand' );
	}

	collapse = async ( args ) => {
		const { focusOnTrigger = false } = args || {};

		this.draftSelectedDate = null; // Clear draft
		this.hide(); // FloatingElement.hide()

		if ( focusOnTrigger ) {
			const trigger = this.getReferenceElement();
			trigger?.focus();
		}

		this.emit( 'collapse' );
	};

	/**
	 * @returns {import('../../i18n/i18n.context.js').I18nContextValue}
	 */
	get i18n() {
		return (
			this.#i18nConsumer.value || {
				locale: 'en-US',
				weekStart: 'sunday',
				translations: { months: {}, weekDays: {} },
			}
		);
	}

	get parser() {
		return new Parser( this.i18n.locale, this.i18n.weekStart );
	}

	get formatter() {
		return new Formatter( this.i18n.locale, {
			month: '2-digit',
			day: '2-digit',
			year: 'numeric',
		} );
	}

	get value() {
		return this.selectedDate ? this.selectedDate.toString() : '';
	}

	set value( value ) {
		// If setting value programmatically, update state
		const date = value ? CalendarDate.fromISO( value ) : null;
		this.#selectDate( date, false ); // No change event for programmatic set?
	}

	// --- FloatingElement Implementation ---

	getReferenceElement() {
		return this.renderRoot?.querySelector( TRIGGER_SELECTOR );
	}

	getFloatingElement() {
		return this.renderRoot?.querySelector( MENU_SELECTOR );
	}

	getArrowElement() {
		return null;
	}

	// --- Date Logic ---

	#handlePrevMonth() {
		this.viewDate = this.viewDate.subtract( 1, 'month' );
	}

	#handleNextMonth() {
		this.viewDate = this.viewDate.add( 1, 'month' );
	}

	/**
	 * Handles day selection.
	 * @param {import('./grid-generator.js').DayInfo} dayInfo
	 */
	handleDayClick( dayInfo ) {
		const { date } = dayInfo;
		if ( date.matches( ...this.constraints ) ) {
			return; // Should be blocked by disabled attr, but safety check.
		}

		// Update draft state only
		this.draftSelectedDate = date;
	}

	handleApply( e ) {
		e?.stopPropagation();
		if ( this.draftSelectedDate ) {
			this.#selectDate( this.draftSelectedDate, true ); // this will update selectedDate and emit change
		} else {
			// If draft is null (cleared?), clear selection
			this.handleClear();
			return;
		}
		this.collapse();
	}

	handleCancel( e ) {
		e?.stopPropagation();
		this.collapse();
	}

	handleClear() {
		this.selectedDate = null;
		this.draftSelectedDate = null; // Also clear draft to update UI if open
		this.updateFormValue();

		const trigger = this.getReferenceElement();
		trigger?.focus();

		this.emit( 'clear' );
		this.emit( 'change' );
	}

	updateFormValue() {
		// Sync internal form value with selectedDate
		this.internals.setFormValue( this.value || null );
	}

	formResetCallback() {
		this.providedValue = this.getAttribute( 'value' ) || '';
		this.selectedDate = this.providedValue ? CalendarDate.fromISO( this.providedValue ) : null;
		this.updateFormValue();
	}

	formStateRestoreCallback( state ) {
		if ( state ) {
			this.value = state; // Uses setter -> updates selectedDate
			this.updateFormValue();
		}
	}

	// Call this in firstUpdated or constructor?
	// It's good to sync initially.
	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'open' ) && ! this.open ) {
			this.draftSelectedDate = null;
		}

		if ( changedProperties.has( 'selectedDate' ) ) {
			this.updateFormValue();
		}
	}

	/**
	 * Renders the calendar grid(s) and controls.
	 * @returns {import('lit').TemplateResult}
	 */
	renderCalendar() {
		const months = [];
		for ( let i = 0; i < this.panes; i++ ) {
			months.push( this.viewDate.add( i, 'month' ) );
		}

		return html`
			<div id="calendar" class="${ this.panes > 1 ? 'is-multi-month' : '' }">
				<xb-button
					size="sm"
					variant="icon"
					class="nav-btn prev-month"
					@click=${ this.#handlePrevMonth }
				>
					<xb-icon aria-hidden="true" name="caret-left"></xb-icon>
				</xb-button>

				<xb-button
					size="sm"
					variant="icon"
					class="nav-btn next-month"
					@click=${ this.#handleNextMonth }
				>
					<xb-icon aria-hidden="true" name="caret-right"></xb-icon>
				</xb-button>

				<div class="grids-container">
					${ months.map( ( date ) => this.#renderMonthGrid( date ) ) }
				</div>
			</div>
		`;
	}

	/**
	 * Renders a single month grid.
	 * @param {CalendarDate} date
	 * @returns {import('lit').TemplateResult}
	 */
	#renderMonthGrid( date ) {
		const grid = generateGrid( date.year, date.month, this.i18n.weekStart );
		const weekKeys = [
			'sunday',
			'monday',
			'tuesday',
			'wednesday',
			'thursday',
			'friday',
			'saturday',
		];
		const startIdx = weekKeys.indexOf( this.i18n.weekStart.toLowerCase() );
		const sortedWeekKeys = [ ...weekKeys.slice( startIdx ), ...weekKeys.slice( 0, startIdx ) ];

		const weekHeaders = sortedWeekKeys.map( ( k ) => {
			const def = this.i18n.translations.weekDays?.[ k ];
			return def || { abbr: k.substr( 0, 2 ), label: k };
		} );

		const monthKey = Object.keys( this.i18n.translations.months || {} )[ date.month - 1 ];
		const monthLabel =
			( monthKey && this.i18n.translations.months?.[ monthKey ]?.label ) || `${ date.month }`;
		return html`
			<div class="month-grid">
				<div class="month-year-label">${ monthLabel } ${ date.year }</div>
				<table role="grid">
					<thead>
						<tr>
							${ weekHeaders.map(
								( h ) => html`
									<th aria-label="${ h.label }">${ h.abbr }</th>
								`
							) }
						</tr>
					</thead>
					<tbody>${ this.#renderGridRows( grid ) }</tbody>
				</table>
			</div>
		`;
	}

	/**
	 * @param {import('./grid-generator.js').DayInfo[]} grid
	 * @returns {TemplateResult}
	 */
	#renderGridRows( grid ) {
		// Chunk into weeks
		const weeks = [];
		for ( let i = 0; i < grid.length; i += 7 ) weeks.push( grid.slice( i, i + 7 ) );

		return weeks.map(
			( week ) => html`
				<tr>${ week.map( ( dayInfo ) => this.renderDay( dayInfo ) ) }</tr>
			`
		);
	}

	/**
	 * @param {import('./grid-generator.js').DayInfo} dayInfo
	 * @returns {TemplateResult}
	 */
	renderDay( dayInfo ) {
		// Use draftSelectedDate for visual feedback
		const targetDate = this.draftSelectedDate ?? this.selectedDate;
		const isSelected = targetDate && dayInfo.date.compare( targetDate ) === 0;
		const isBlocked = dayInfo.date.matches( ...this.constraints );

		const classes = {
			day: true,
			'-selected': isSelected,
			'-today': dayInfo.isToday,
			'-faded': ! dayInfo.isCurrentMonth,
			'-blocked': isBlocked,
		};

		const ariaLabel = this.formatter.format( dayInfo.date, { dateStyle: 'long' } );

		return html`
			<td>
				<button
					type="button"
					tabindex="-1"
					class=${ classMap( classes ) }
					data-value=${ dayInfo.date.toString() }
					aria-label=${ ariaLabel }
					aria-selected=${ isSelected ? 'true' : 'false' }
					?disabled=${ isBlocked }
					@click=${ () => this.handleDayClick( dayInfo ) }
				>
					${ dayInfo.date.day }
				</button>
				${ dayInfo.isToday
					? html`
							<span class="events-tray">
								<xb-icon name="circle-fill" size="6"></xb-icon>
							</span>
					  `
					: nothing }
			</td>
		`;
	}

	/**
	 * Handles preset selection.
	 * @param {string} prompt
	 */
	handlePresetClick( prompt ) {
		const targetDate = this.parser.parse( prompt );
		if ( ! targetDate ) return;

		// Update draft state
		this.draftSelectedDate = targetDate;
		this.viewDate = new CalendarDate( targetDate.year, targetDate.month, 1 );
	}

	renderPresets() {
		if ( ! this.presets || this.presets.length === 0 ) return nothing;

		return html`
			<div class="dialog-column">
				<xb-menu class="presets" aria-label="Date presets" size="small">
					${ this.presets.map( ( preset ) => {
						let label, prompt;
						if ( typeof preset === 'string' ) {
							prompt = preset;
							label = this.i18n.translations.relativeDates?.[ preset ] || preset;
						} else {
							label = preset.label;
							prompt = preset.prompt;
						}

						return html`
							<xb-item class="preset" @click=${ () => this.handlePresetClick( prompt ) }>
								${ label }
							</xb-item>
						`;
					} ) }
				</xb-menu>
			</div>
		`;
	}

	renderFooter() {
		return html`
			<div class="footer">
				<xb-button variant="secondary-gray" size="sm" @click=${ this.handleCancel }>
					Cancel
				</xb-button>
				<xb-button variant="primary" size="sm" @click=${ this.handleApply }>Apply</xb-button>
			</div>
		`;
	}

	renderPicker() {
		let displayValue = '';
		if ( this.selectedDate ) {
			displayValue = this.formatter.format( this.selectedDate );
		}

		return html`
			<input
				type="text"
				class="trigger"
				role="combobox"
				aria-haspopup="dialog"
				aria-expanded=${ this.open ? 'true' : 'false' }
				aria-controls="dialog"
				aria-describedby="description"
				aria-autocomplete="none"
				.value=${ displayValue }
				placeholder=${ this.i18n.dateFormat }
				@click=${ this.toggle }
			/>
			<span class="sr-only">(date format: ${ this.i18n.dateFormat })</span>
		`;
	}

	shouldShowClearButton = () => {
		return this.clearable && this.selectedDate;
	};

	render() {
		return html`
			<div
				class="${ classMap( {
					'outer-container': true,
					'has-slotted-addon-leading': this.hasSlottedAddonLeading,
					'has-slotted-addon-trailing': this.hasSlottedAddonTrailing,
					'has-slotted-leading': this.hasSlottedLeading,
					'has-slotted-trailing': this.hasSlottedTrailing,
					'-show-clear-button': this.shouldShowClearButton(),
				} ) }"
			>
				<span class="addon-leading">
					<slot name="addon-leading"></slot>
				</span>
				<div id="picker" class="focus-container">
					<span class="leading">
						<slot name="leading"></slot>
					</span>
					${ this.renderPicker() }

					<span class="trailing">
						<slot name="trailing"></slot>
					</span>
					${ this.shouldShowClearButton()
						? html`
								<xb-button
									size="xs"
									variant="icon"
									aria-label="Clear selection"
									@click=${ ( e ) => {
										e.stopPropagation();
										this.handleClear();
									} }
								>
									<xb-icon aria-hidden="true" name="x"></xb-icon>
								</xb-button>
						  `
						: nothing }
				</div>
				<span class="addon-trailing">
					<slot name="addon-trailing"></slot>
				</span>

				<div id="dialog" role="dialog" aria-modal="true" aria-label="Choose date">
					${ this.renderPresets() }
					<div class="dialog-column">
						${ this.renderCalendar() } ${ this.renderFooter() }
						<div id="dialog-message" class="sr-only" aria-live="polite"></div>
					</div>
				</div>
			</div>
		`;
	}
}
