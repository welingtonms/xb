/**
 * Re-dispatches an event from the provided element.
 *
 * Source: https://github.com/material-components/material-web/blob/master/controller/events.ts
 *
 * @example
 * class MyInput extends LitElement {
 *   render() {
 *     return html`<input @change=${this.redispatchEvent}>`;
 *   }
 *
 *   protected redispatchEvent(event: Event) {
 *     redispatchEvent(this, event);
 *   }
 * }
 *
 * @param {Element} element The element to dispatch the event from.
 * @param {Event} event The event to re-dispatch.
 * @return Whether or not the event was dispatched (if cancelable).
 */
export function redispatchEvent( element, event ) {
	// For bubbling events in SSR light DOM (or composed), stop their propagation
	// and dispatch the copy.
	if ( event.bubbles && ( ! element.shadowRoot || event.composed ) ) {
		event.stopPropagation();
	}

	const copy = Reflect.construct( event.constructor, [ event.type, event ] );
	const dispatched = element.dispatchEvent( copy );
	if ( ! dispatched ) {
		event.preventDefault();
	}

	return dispatched;
}

/**
 * Check if `event` happened on the given `element`.
 * @param {Event} event
 * @param {HTMLElement} element
 * @returns {boolean} - true if the event happened on the given element, false otherwise.
 */
export function isInsideElement( event, element ) {
	if ( element.shadowRoot ) {
		return event.composedPath().includes( element );
	}

	return element.contains( event.target );
}
