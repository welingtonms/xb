import { html } from 'lit';

import XBElement from '../../common/xb-element';
import styles from './boundary.styles';
import Keyboard from '../../common/keyboard';

export class InteractionBoundary extends XBElement {
	static styles = [ styles() ];

	/** @type {HTMLSlotElement} */
	_defaultSlot;

	static get properties() {
		return {
			/**
			 * Should the focus trap be active.
			 * @type {boolean}
			 */
			active: { type: Boolean, reflect: true },
		};
	}

	constructor() {
		super();

		this.active = false;

		/** @type {boolean} */
		this.disabled = false;
	}

	connectedCallback() {
		super.connectedCallback();

		this._subscribe();
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this._unsubscribe();
	}

	render() {
		return html`<slot></slot>`;
	}

	activate = () => {
		if ( this.active ) {
			return;
		}

		this.active = true;
	};

	deactivate = () => {
		if ( ! this.active ) {
			return;
		}

		this.active = false;
	};

	_subscribe() {
		document.addEventListener( 'mousedown', this._handleEvent );
		document.addEventListener( 'keyup', this._handleEvent );
		document.addEventListener( 'touchend', this._handleEvent );
		// window.addEventListener( 'blur', this._handleBlurEvent );
	}

	_unsubscribe() {
		document.removeEventListener( 'mousedown', this._handleEvent );
		document.removeEventListener( 'keyup', this._handleEvent );
		document.removeEventListener( 'touchend', this._handleEvent );
		// window.removeEventListener( 'blur', this._handleBlurEvent );
	}

	_getHost() {
		this._defaultSlot =
			this._defaultSlot ?? this.shadowRoot.querySelector( 'slot' );

		return this._defaultSlot.assignedElements( { flatten: true } )[ 0 ];
	}

	_handleEvent = ( e ) => {
		const isInside = e.composedPath().includes( this );

		if ( isInside && ! this.active ) {
			this.activate();
		} else if ( ( ! isInside || Keyboard( e ).is( 'ESC' ) ) && this.active ) {
			this.deactivate();
			this._publish();
		}
	};

	_handleBlurEvent = ( e ) => {
		const isInside = e.composedPath().includes( this );

		if ( ! isInside && this.active ) {
			/**
			 * if the blur event happened in the watched element and the click outside
			 * watcher is activated, then we deactivate it
			 */
			this.deactivate();
			this._publish();
		}
	};

	_publish = () => {
		this.emit( 'xb-interact-out' );
	};
}

window.customElements.define( 'xb-boundary', InteractionBoundary );
