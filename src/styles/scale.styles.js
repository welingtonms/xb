import { css, unsafeCSS } from 'lit';

import { wrapTargetedSelector } from './helpers';
import toCSSResult from '../utils/to-css-result';

const DEFAULT_ARGS = { property: 'height' };

/**
 *
 * @param {ElementScaleProps} args
 * @returns {import('lit').CSSResultArray}
 */
function styles( args ) {
	const { target, property } = { ...DEFAULT_ARGS, ...( args || {} ) };

	if ( ! target ) {
		throw new Error( 'target is required' );
	}

	return css`
		/*
		 * using scale because 'size' is a valid HTML attribute
		 * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/size
		 */
		${ wrapTargetedSelector( target, "[scale='small']" ) } {
			${ unsafeCSS( property ) }: 24px;

			font-size: ${ toCSSResult( 'font-size-sm' ) };
		}

		${ wrapTargetedSelector( target, "[scale='medium']" ) },
		${ wrapTargetedSelector( target, ':not([scale])' ) } {
			${ unsafeCSS( property ) }: 40px;

			/* font-size: ${ toCSSResult( 'font-size-sm' ) }; */
		}

		${ wrapTargetedSelector( target, "[scale='large']" ) } {
			${ unsafeCSS( property ) }: 56px;

			font-size: ${ toCSSResult( 'font-size-base' ) };
		}
	`;
}

// ${ unsafeCSS( target ) }[scale='extra-small'] {
// 	${ unsafeCSS( property ) }: 18px;

// 	font-size: ${ token( 'font-size-xs' ) };
// }

export default styles;

/**
 * @typedef {Object} ElementScaleProps
 * @property {string} property - property to which height value should be applied.
 * @property {string} target - CSS selector for the style target.
 */

/**
 * @typedef {('extra-small' | 'small' | 'medium' | 'large')} ElementScale
 */
