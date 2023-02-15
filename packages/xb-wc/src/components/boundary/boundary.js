import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import XBElement from '../../common/xb-element';
import styles from './boundary.styles';
import Keyboard from '../../common/keyboard';

@customElement( 'xb-boundary' )
export class InteractionBoundary extends XBElement {
	static styles = [ styles() ];

	/**
	 * Should the focus trap be active.
	 * @type {boolean}
	 */
	@property( { type: Boolean, reflect: true } ) active;

	constructor() {
		super();

		this.active = false;
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
		return html`
			<slot></slot>
		`;
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
		window.addEventListener( 'blur', this._handleBlurEvent );
	}

	_unsubscribe() {
		document.removeEventListener( 'mousedown', this._handleEvent );
		document.removeEventListener( 'keyup', this._handleEvent );
		document.removeEventListener( 'touchend', this._handleEvent );
		window.removeEventListener( 'blur', this._handleBlurEvent );
	}

	_handleEvent = ( e ) => {
		const isInside = e.composedPath().includes( this );

		if ( isInside && ! this.active ) {
			this.activate();
			this.emit( 'xb-interact-in' );
		} else if ( ( ! isInside || Keyboard( e ).is( 'ESC' ) ) && this.active ) {
			this.deactivate();
			this.emit( 'xb-interact-out' );
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
			this.emit( 'xb-interact-out' );
		}
	};
}
