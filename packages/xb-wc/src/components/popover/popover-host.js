import { html, LitElement } from 'lit';
import { computePosition, flip, shift, offset } from '@floating-ui/dom';

import styles from './popover-host.styles';

export class PopoverHost extends LitElement {
	static styles = [ styles() ];

	/** @type {HTMLElement | null} */
	_reference = null;

	/** @type {HTMLElement | null} */
	_floating = null;

	static get properties() {
		return {};
	}

	constructor() {
		super();
	}

	firstUpdated() {
		const [ triggerSlot, floatingSlot ] =
			this.shadowRoot.querySelectorAll( 'slot' );

		[ this._reference ] = triggerSlot.assignedElements( { flatten: true } );
		[ this._floating ] = floatingSlot.assignedElements( { flatten: true } );
	}

	updated() {
		super.updated();

		this._updateFloationPosition();
	}

	render() {
		return html`
			<slot name="trigger"></slot>
			<slot @slotchange=${ this._updateFloationPosition }></slot>
		`;
	}

	_updateFloationPosition() {
		const reference = this._getReference();
		const floating = this._getFloating();

		if ( floating == null || reference == null ) {
			console.warn(
				'[popover-host]',
				'both floating and reference elements should be available',
				{ reference, floating }
			);

			return;
		}

		const strategy = floating.position || 'fixed';
		const placement = floating.placement || 'top-end';

		computePosition( reference, floating, {
			strategy,
			placement,
			middleware: [ offset( 6 ), flip(), shift() ],
		} ).then( ( { x, y } ) => {
			floating.style.setProperty( '--xb-popover-left', `${ x }px` );
			floating.style.setProperty( '--xb-popover-top', `${ y }px` );
		} );
	}

	_getReference() {
		return this._reference;
	}

	_getFloating() {
		return this._floating;
	}
}

window.customElements.define( 'xb-popover-host', PopoverHost );
