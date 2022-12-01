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
			.-extra-small {
				${ unsafeCSS( property ) }: 24px;
				min-width: 24px;
			}

			.-small {
				${ unsafeCSS( property ) }: 40px;
				min-width: 40px;
			}

			.-medium {
				${ unsafeCSS( property ) }: 56px;
				min-width: 56px;
			}

			.-large {
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
