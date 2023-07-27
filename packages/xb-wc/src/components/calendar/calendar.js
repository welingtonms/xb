import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { repeat } from 'lit/directives/repeat.js';
import withClassy from '@welingtonms/classy';

import XBElement from '../../common/xb-element';
import styles from './calendar.styles';
import CalendarController from './calendar.controller';

import '../button';
import '../text';

@customElement( 'xb-calendar' )
export class Calendar extends XBElement {
	static styles = [ styles() ];

	/**
	 * Calendar month.
	 * @type {CalendarAttributes['month']}
	 */
	@property( { type: Number } ) month;

	/**
	 * Calendar year.
	 * @type {CalendarAttributes['year']}
	 */
	@property( { type: Number } ) year;

	/**
	 * Calendar range start.
	 * @type {CalendarAttributes['rangeStart']}
	 */
	@property( { type: String, attribute: 'range-start', reflect: true } ) rangeStart;

	/**
	 * Calendar range start.
	 * @type {CalendarAttributes['rangeEnd']}
	 */
	@property( { type: String, attribute: 'range-end', reflect: true } ) rangeEnd;

	/** @type {CalendarController} */
	controller;

	constructor() {
		super();

		this.controller = new CalendarController( this );
	}

	render() {
		const { classy } = withClassy( {} );

		return html`
			<div class="header">
				${ map(
					[ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
					( day ) =>
						html`
							<xb-text
								variant="overline"
								align="center"
								style="--xb-text-color: rgba(var(--xb-color-primary-500, 38, 84, 124), 1)"
							>
								${ day }
							</xb-text>
						`
				) }
			</div>

			<div class="days">
				${ repeat(
					this.controller.days,
					( day, index ) =>
						day == null
							? String( index )
							: `${ this.controller.getYear() }-${ this.controller.getMonth() }-${ day }`,
					( day ) => html`
						${ day == null
							? html`
									<span></span>
							  `
							: html`
									<xb-button
										class=${ classy( 'day', {
											'-range-start': this.rangeStart == day,
											'-range-end': this.rangeEnd == day,
										} ) }
										emphasis="text"
										@click=${ () => {
											if ( this.rangeStart == null || this.rangeEnd != null ) {
												this.rangeStart = day;
												this.rangeEnd = null;
											} else {
												if ( day < this.rangeStart ) {
													[ this.rangeStart, this.rangeEnd ] = [ day, this.rangeStart ];
												} else {
													this.rangeEnd = day;
												}
											}
										} }
									>
										${ day }
									</xb-button>
							  ` }
					`
				) }
			</div>
		`;
	}

	handleClick( event ) {}
}

/**
 * @typedef {Object} CalendarAttributes
 * @property {number} [month] - Month to be shown.
 * @property {number} [year] - Year to be shown.
 * @property {string} [rangeStart] - Selected date range start.
 * @property {string} [rangeEnd] - Selected date range end.
 * @property {Function} [onChange] - Function
 */

{
	/* <table class=${ classy( 'calendar', {} ) }>
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
</table> */
}
