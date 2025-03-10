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

/**
 * @param {HTMLElement | DocumentFragment} node
 * @param {string[]} slotSelectors
 * @returns {boolean}
 */
export function hasSlottedContent( node, ...slotSelectors ) {
	const slots = slotSelectors
		.map( ( selector ) => {
			return node?.querySelector( selector );
		} )
		.filter( Boolean );

	return slots.some( ( slot ) => {
		return slot.assignedNodes( { flatten: true } ).length > 0;
	} );
}

/**
 * Check if slotted content matches the given selectors
 * @param {HTMLElement | DocumentFragment} node
 * @param {string} slotSelector
 * @param {string[]} selectors
 * @returns {boolean}
 */
export function matchesSlottedContent( node, slotSelector, ...selectors ) {
	/** @type {HTMLSlotElement} */
	const slot = node?.querySelector( slotSelector );

	// get all assigned nodes from the slots
	const assignedNodes = slot?.assignedNodes( { flatten: true } ) || [];

	return assignedNodes.some( ( node ) => {
		return selectors.some( ( selector ) => {
			return node.matches( selector );
		} );
	} );
}
