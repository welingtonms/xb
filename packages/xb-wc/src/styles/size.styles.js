import { css, unsafeCSS } from 'lit';

const DEFAULT_ARGS = { property: 'height' };

/**
 *
 * @param {ElementSizeProps} args
 * @returns {import('lit').CSSResultArray}
 */
function styles( args ) {
	const { property } = { ...DEFAULT_ARGS, ...( args || {} ) };

	return [
		css`
			.-extra-small,
			:host( [size='extra-small'] ) {
				${ unsafeCSS( property ) }: 24px;
				min-width: 24px;
			}

			.-small,
			:host( [size='small'] ) {
				${ unsafeCSS( property ) }: 40px;
				min-width: 40px;
			}

			.-medium,
			:host( [size='medium'] ) {
				${ unsafeCSS( property ) }: 56px;
				min-width: 56px;
			}

			.-large,
			:host( [size='large'] ) {
				${ unsafeCSS( property ) }: 72px;
				min-width: 72px;
			}
		`,
	];
}

export default styles;

/**
 * @typedef {Object} ElementSizeProps
 * @property {string} property - property to which height value should be applied.
 */

/**
 * @typedef {('extra-small' | 'small' | 'medium' | 'large')} ElementSize
 */
