import { html, nothing } from 'lit';
import { map } from 'lit/directives/map.js';
import { customElement, property } from 'lit/decorators.js';
import withClassy from '@welingtonms/classy';
import { DateConstraint, DateFactory, DateFormatter } from '@welingtonms/xb-date';

import XBElement from '../../common/xb-element';
import '../button';
import '../text';
import styles from './calendar.styles';

const t = DateFactory();
t.set( {
	hour: 0,
	minute: 0,
	second: 0,
	millisecond: 0,
} );

const f = new DateFormatter( 'ddd, DD/MM/YYYY hh:mm:ss', {
	// delimiters: [ ' ', 'de', ',' ],
} );
console.log( 'DateFormatter', t.get(), f.format( t ) );

const today = t.get();
console.log( 'today', today );

function buildWeeks( dateArg ) {
	const date = DateFactory( dateArg );

	const skip = new Date( date.getYear(), date.getMonth() ).getDay();
	const daysInMonth = 40 - new Date( date.getYear(), date.getMonth(), 40 ).getDate();

	const weeks = [ [ ...Array( skip ) ].map( () => null ) ];

	for ( let i = 0; i < daysInMonth; i++ ) {
		const lastWeek = weeks[ weeks.length - 1 ];

		lastWeek.push( i + 1 );

		if ( lastWeek.length === 7 ) {
			weeks.push( [] );
		}
	}

	const lastWeek = weeks[ weeks.length - 1 ];
	while ( lastWeek.length % 7 !== 0 ) {
		lastWeek.push( null );
	}

	console.log( 'weeks', weeks );
	return weeks;
}

@customElement( 'xb-calendar' )
export class Calendar extends XBElement {
	static styles = [ styles() ];

	/**
	 * Calendar date.
	 * @type {CalendarAttributes['date']}
	 */
	@property( { type: Date } ) date;

	/** @type {Array<Array<number | null>>} */
	weeks;

	constructor() {
		super();

		/** @type {CalendarAttributes['date']} */
		this.date = new Date();

		this.weeks = buildWeeks( this.date );
	}

	render() {
		const { when, classy } = withClassy( { variant: this.variant } );

		/**
		 * heavily based on https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table
		 */
		return html`
			<table
				class=${ classy( 'calendar', {
					'-primary': when( { variant: 'primary' } ),
					'-secondary': when( { variant: 'secondary' } ),
					'-tertiary': when( { variant: 'tertiary' } ),
				} ) }
			>
				<thead>
					<tr>
						${ map(
							[ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
							( day ) =>
								html`
									<th scope="col">
										<xb-text
											variant="overline"
											style="--xb-text-color: rgba(var(--xb-color-primary-500, 38, 84, 124), 1)"
										>
											${ day }
										</xb-text>
									</th>
								`
						) }
					</tr>
				</thead>
				<tbody>
					${ map(
						this.weeks,
						( week ) =>
							html`
								<tr>
									${ map(
										week,
										( day ) => html`
											<td>
												${ day == null
													? nothing
													: html`
															<xb-button emphasis="text">${ day }</xb-button>
													  ` }
											</td>
										`
									) }
								</tr>
							`
					) }
				</tbody>
				<slot></slot>
			</table>
		`;
	}
}

/**
 * @typedef {Object} CalendarAttributes
 * @property {Date} [date] - Date value.
 * @property {Function} [onChange] - Function
 */
