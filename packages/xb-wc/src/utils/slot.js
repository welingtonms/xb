/**
 * Given a slot, this function iterates over all of its assigned text nodes and returns the concatenated text as a
 * string. This is useful because we can't use slot.textContent as an alternative.
 * Source: https://github.com/shoelace-style/shoelace/blob/next/src/internal/slot.ts
 * @param {HTMLSlotElement | undefined | null} slot
 * @returns {string}
 */
export function getTextContent( slot ) {
	if ( ! slot ) {
		return '';
	}
	const nodes = slot.assignedNodes( { flatten: true } );
	let text = '';

	[ ...nodes ].forEach( ( node ) => {
		if ( node.nodeType === Node.TEXT_NODE ) {
			text += node.textContent;
		}
	} );

	return text.trim();
}
