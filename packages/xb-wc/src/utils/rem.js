import { unsafeCSS } from 'lit';

import defaultRem from '@welingtonms/xb-toolset/dist/rem';

/**
 * Convert the provided value from `px` to `rem`.
 * @param {number|string} value - value to be converted
 */
function rem( value ) {
	return unsafeCSS( defaultRem( value ) );
}

export default rem;
