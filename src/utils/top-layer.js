/**
 * Feature detection for Popover API and top-layer element kinds.
 * Not a behavioral **Overlay adapter** — see CONTEXT.md and `docs/adr/0002-overlay-adapters.md`.
 */
export function supportsPopover() {
	return Object.hasOwn( HTMLElement.prototype, 'popover' );
}

/**
 * @param {HTMLElement | null} element
 */
export function isPopover( element ) {
	if ( ! element ) {
		return false;
	}

	return supportsPopover() && element.matches( '[popover]' );
}

/**
 * @param {HTMLElement | null} element
 */
export function isDialog( element ) {
	if ( ! element ) {
		return false;
	}

	return element.matches( 'dialog' );
}
