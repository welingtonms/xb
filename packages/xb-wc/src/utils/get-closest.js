/**
 * Based on https://stackoverflow.com/questions/54520554/custom-element-getrootnode-closest-function-crossing-multiple-parent-shadowd
 * @param {String} selector
 * @param {Element} base
 * @returns {null|Element}
 */
function closest( selector, base ) {
	function closestFrom( el ) {
		if ( ! el || el === document || el === window ) {
			return null;
		}

		if ( el.assignedSlot ) {
			el = el.assignedSlot;
		}

		let found = el.closest( selector );

		return found ? found : closestFrom( el.getRootNode().host );
	}

	return closestFrom( base );
}

export default closest;
