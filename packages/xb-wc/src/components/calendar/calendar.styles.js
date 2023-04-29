import { css } from 'lit';

import transition from '../../styles/transition.styles';
import { active, hovered, enabled } from '../../styles/state.styles';
import p, { px, py } from '../../styles/padding.styles';
import token from '../../utils/get-token';

function styles() {
	return [
		css`
			:host {
				--primary: 299 100% 69% / 1;
				--in-range: 299 100% 69% / 0.5;
				--previous: 299 100% 69% / 0.25;
				--potential: 73 97% 66% / 1;
				--dark: 0 0% 15%;
				--light: 0 0% 100%;
			}

			.sr-only {
				position: absolute;
				width: 1px;
				height: 1px;
				padding: 0;
				margin: -1px;
				overflow: hidden;
				clip: rect( 0, 0, 0, 0 );
				white-space: nowrap;
				border-width: 0;
			}

			.calendar {
				${ px( token( ' spacing-4' ) ) };

				position: relative;
				display: inline-flex;
				flex-direction: column;
				gap: 1px;
			}

			/* Source: https://www.bram.us/2023/01/12/sibling-scopes-in-css-thanks-to-has/?utm_source=pocket_saves */
			.-range-start,
			.-range-start ~ :has( ~ .-range-end ),
			.-range-end {
				${ transition( [ { property: 'background-color' } ] ) };

				background-color: ${ token( 'color-gray-200' ) };
			}

			.-range-start:hover,
			.-range-end:hover,
			.-range-start ~ :has( ~ .-range-end ):hover {
				background-color: ${ token( 'color-gray-300' ) };
			}

			.header {
				@include p( spacing-0 );

				display: grid;
				grid-template-rows: 40px;
				grid-template-columns: repeat( 7, 40px );
				align-items: center;

				gap: 1px;

				& > .previous-year,
				& > .previous-month,
				& > .next-year,
				& > .next-month {
					@include rounded( 50% );
					@include m( $spacing-0 );

					background: rgba( $color-gray-100, 1 );
					border-color: transparent;
					font-size: $font-size-2xl;

					@include hoverable {
						background: rgba( $color-gray-300, 1 );
						color: rgba( $color-primary-500, 1 );
					}

					> .cb-icon {
						justify-self: center;
					}
				}

				& > .date-display {
					display: grid;
					grid-template-rows: 28px 12px;
					grid-template-columns: 1fr;
					align-items: center;

					& > .year,
					& > .month {
						text-align: center;
					}

					& > .year {
						font-size: $font-size-2xl;
					}

					& > .month {
						font-size: $font-size-xs;
					}
				}
			}

			.days {
				display: grid;
				grid-template-columns: repeat( 7, 40px );

				@include px( $spacing-0 );
				@include pt( $spacing-4 );
				@include pb( $spacing-0 );

				gap: 1px;

				& > .day {
					@include rounded( 0 );
					font-size: $font-size-xs;

					position: relative;
					display: inline-flex;
					align-items: center;
					justify-content: center;

					&.is-today {
						color: rgba( $color-blue-300, 1 );
					}

					&.is-selected {
						background: rgba( $color-gray-200, 1 );

						@include hoverable {
							background: rgba( $color-gray-300, 1 );
							border-color: rgba( $color-gray-300, 1 );
						}
					}
				}

				& > .week-day {
					font-weight: $font-weight-bold;

					text-decoration: none;
				}
			}

			.quick-actions {
				margin-top: $spacing-4;
			}
		`,
	];
}

export default styles;
