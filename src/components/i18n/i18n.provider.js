import { LitElement, html } from 'lit';
import { ContextProvider } from '@lit/context';
import { i18nContext } from './i18n.context.js';
import { Formatter } from '../../utils/date-time/formatter.js';

/**
 * @typedef {import('./i18n.context.js').I18nContextValue} I18nContextValue
 */

export class I18nProvider extends LitElement {
	static get properties() {
		return {
			locale: { type: String, reflect: true },
			timeZone: { type: String, attribute: 'time-zone', reflect: true },
		};
	}

	/** @type {ContextProvider<import('@lit/context').Context<unknown, I18nContextValue>>} */
	#provider = new ContextProvider( this, {
		context: i18nContext,
		initialValue: this._getContextValue(),
	} );

	constructor() {
		super();
		this.locale = 'en-US';
		this.timeZone = 'UTC';
	}

	/**
	 * @param {import('lit').PropertyValues} changedProperties
	 */
	update( changedProperties ) {
		if ( changedProperties.has( 'locale' ) || changedProperties.has( 'timeZone' ) ) {
			this.#provider.setValue( this._getContextValue() );
		}
		super.update( changedProperties );
	}

	_getContextValue() {
		const formatter = new Formatter( this.locale );

		// Derive defaults from locale
		// 1. Weekdays (Sun, Mon...)
		const weekDaysArray = formatter.getWeekdays( 'long' );
		const weekDays = weekDaysArray.reduce( ( acc, curr, idx ) => {
			// Map 0->sunday, 1->monday (matches JS Date.getDay())
			const keys = [ 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ];
			acc[ keys[ idx ] ] = curr;
			return acc;
		}, {} );

		// 2. Months
		const monthsArray = formatter.getMonths( 'long' );
		const months = monthsArray.reduce( ( acc, curr, idx ) => {
			const keys = [
				'january',
				'february',
				'march',
				'april',
				'may',
				'june',
				'july',
				'august',
				'september',
				'october',
				'november',
				'december',
			];
			acc[ keys[ idx ] ] = curr;
			return acc;
		}, {} );

		// 3. Week Start
		let weekStart = 'sunday';
		try {
			if ( typeof Intl.Locale !== 'undefined' && 'weekInfo' in new Intl.Locale( this.locale ) ) {
				// @ts-ignore
				const info = new Intl.Locale( this.locale ).weekInfo;
				const map = {
					1: 'monday',
					2: 'tuesday',
					3: 'wednesday',
					4: 'thursday',
					5: 'friday',
					6: 'saturday',
					7: 'sunday',
				};
				if ( info && info.firstDay ) {
					weekStart = map[ info.firstDay ] || 'sunday';
				}
			}
		} catch ( e ) {
			// Fallback
		}

		return {
			locale: this.locale,
			timeZone: this.timeZone,
			weekStart,
			dateFormat: 'MM/DD/YYYY',
			translations: {
				weekDays,
				months,
				presets: {},
				relativeDates: {
					today: 'Today',
					yesterday: 'Yesterday',
					tomorrow: 'Tomorrow',
				},
			},
		};
	}

	render() {
		return html`
			<slot></slot>
		`;
	}
}

customElements.define( 'xb-i18n-provider', I18nProvider );
