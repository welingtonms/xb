import { css, unsafeCSS } from 'lit';

const DEFAULT_ARGS = { property: 'height' };

/**
 *
 * @param {ElementSizeProps} args
 * @returns {import('lit').CSSResultArray}
 */
function styles( args ) {
	const { property } = { ...DEFAULT_ARGS, ...( args || {} ) };

	return css`
		.-xs,
		:host( [size='xs'] ) {
			${ unsafeCSS( property ) }: 24px;
			min-width: 24px;
		}

		.-sm,
		:host( [size='sm'] ) {
			${ unsafeCSS( property ) }: 40px;
			min-width: 40px;
		}

		.-md,
		:host( [size='md'] ) {
			${ unsafeCSS( property ) }: 56px;
			min-width: 56px;
		}

		.-lg,
		:host( [size='lg'] ) {
			${ unsafeCSS( property ) }: 72px;
			min-width: 72px;
		}

		.-xl,
		:host( [size='xl'] ) {
			${ unsafeCSS( property ) }: 72px;
			min-width: 72px;
		}

		.-2xl,
		:host( [size='2xl'] ) {
			${ unsafeCSS( property ) }: 72px;
			min-width: 72px;
		}
	`;
}

export default styles;

/**
 * @typedef {Object} ElementSizeProps
 * @property {string} property - property to which height value should be applied.
 */

/**
 * @typedef {import('../utils/arg-types').ElementSize} ElementSize
 */
