import { html } from 'lit';

import XBElement from '../../common/xb-element';
import styles from './resize-observer.styles';

/**
 * Based on https://github.dev/shoelace-style/shoelace/blob/a0f83c3b2bbee6089bdfb1f56a6474fff027865b/src/components/resize-observer/resize-observer.ts#L17
 */
export default class XBResizeObserver extends XBElement {
	static styles = [ styles() ];

	/** @type {ResizeObserver} */
	_resizeObserver;

	/** @type {HTMLElement[]} */
	_observedElements;

	/** @type {number} */
	_timeout;

	static get properties() {
		return {
			/** Disables the observer. */
			disabled: {
				type: Boolean,
				reflect: true,
			},

			debounced: {
				type: Boolean,
			},

			type: {
				type: String,
			},
		};
	}

	constructor() {
		super();

		/** @type {ResizeObserverAttributes['disabled']} */
		this.disabled = false;

		/** @type {ResizeObserverAttributes['type']} */
		this.type = 'content';

		/** @type {ResizeObserverAttributes['debounced']} */
		this.debounced = true;

		this._observedElements = [];
	}

	connectedCallback() {
		super.connectedCallback();

		this._resizeObserver = new ResizeObserver(
			/**
			 * @param {ResizeObserverEntry[]} entries
			 */
			( entries ) => {
				clearTimeout( this._timeout );

				const callback = () => {
					this.emit( 'xb-resize', { detail: { entries } } );
				};

				if ( this.debounced ) {
					this._timeout = setTimeout( callback, 250 );
				} else {
					callback();
				}
			}
		);

		if ( ! this.disabled ) {
			this._startObserver();
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this._stopObserver();
	}

	/**
	 * @param {import('lit').PropertyValues<ToggleGroup>} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'disabled' ) ) {
			if ( this.disabled ) {
				this._stopObserver();
			} else {
				this._startObserver();
			}
		}

		if ( changedProperties.has( 'type' ) && ! this.disabled ) {
			this._stopObserver();
			this._startObserver();
		}
	}

	render() {
		return html`<slot @slotchange=${ this._handleSlotChange }></slot>`;
	}

	_handleSlotChange() {
		if ( ! this.disabled ) {
			this._startObserver();
		}
	}

	_startObserver() {
		this._resizeObserver.disconnect();
		// Unwatch previous elements
		// this._observedElements.forEach( ( el ) =>
		// 	this._resizeObserver.unobserve( el )
		// );

		this._observedElements = [];

		if ( this.type == 'content' ) {
			const slot = this.shadowRoot.querySelector( 'slot' );

			if ( slot !== null ) {
				/** @type {HTMLElement[]} */
				const elements = slot.assignedElements( { flatten: true } );

				// Watch new elements
				elements.forEach( ( el ) => {
					this._resizeObserver.observe( el );
					this._observedElements.push( el );
				} );
			}
		}

		if ( this.type == 'window' ) {
			this._resizeObserver.observe( document.body );
			this._observedElements.push( document.body );
		}
	}

	_stopObserver() {
		this._resizeObserver.disconnect();
	}
}

window.customElements.define( 'xb-resize-observer', XBResizeObserver );

/**
 * @typedef {Object} ResizeObserverAttributes
 * @property {boolean} disabled
 * @property {boolean} debounced
 * @property {'window' | 'content'} type
 */