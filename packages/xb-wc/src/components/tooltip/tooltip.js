import { html } from 'lit';
import { property } from 'lit/decorators.js';

import { convertTriggerFromAttribute } from './tooltip.helpers';
import { FloatingElement } from '../../common/floating-element';
import { WithIDMixin } from '../../mixins/with-id';
import { XBElement } from '../../common/xb-element';
import createLogger from '../../utils/logger';
import Keyboard from '../../common/keyboard';

import styles from './tooltip.styles';

const logger = createLogger( 'tooltip' );

/**
 * @template WithIDMixin, FloatingElement
 */
export class Tooltip extends WithIDMixin( FloatingElement ) {
	static styles = [ styles() ];

	/**
	 * Controls how the tooltip is activated. Possible options include `click`, `hover`, `focus`, and `manual`. Multiple
	 * options can be passed by separating them with a space. When manual is used, the tooltip must be activated
	 * programmatically.
	 * @type {TooltipAttributes[ 'placement']}
	 */
	@property( { converter: { fromAttribute: convertTriggerFromAttribute } } ) accessor trigger;

	/**
	 * Controls how the tooltip is activated. Possible options include `click`, `hover`, `focus`, and `manual`. Multiple
	 * options can be passed by separating them with a space. When manual is used, the tooltip must be activated
	 * programmatically.
	 * @type {TooltipAttributes[ 'anchor']}
	 */
	@property( { type: String, reflect: true } ) accessor anchor;

	/** @type {TooltipControllers} */
	#controllers;

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-tooltip', ...config, type: Tooltip } );
	}

	constructor() {
		super();

		this.internals.role = 'tooltip';
		this.position = 'absolute';
		this.trigger = [ 'hover' ];

		this.#controllers = {
			abort: new AbortController(),
		};
	}

	connectedCallback() {
		super.connectedCallback();

		if ( ! this.reference ) {
			logger.debug( 'no reference element provided' );
			return;
		}

		const signal = this.#controllers.abort.signal;

		this.reference.addEventListener( 'click', this.#onClick, { signal } );
		this.reference.addEventListener( 'focusin', this.#onFocusIn, { signal } );
		this.reference.addEventListener( 'focusout', this.#onFocusOut, { signal } );
		this.reference.addEventListener( 'keydown', this.#onKeyDown, { signal } );
		this.reference.addEventListener( 'mouseout', this.#onMouseOut, { signal } );
		this.reference.addEventListener( 'mouseover', this.#onMouseOver, { signal } );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		if ( ! this.reference ) {
			return;
		}

		const controller = this.#controllers.abort;

		// removes all listeners
		controller.abort();

		this.#controllers = {
			abort: new AbortController(),
		};
	}

	firstUpdated() {
		super.firstUpdated();

		if ( this.reference ) {
			this.reference.setAttribute( 'aria-describedby', this.id );
		}
		// <slot name="reference" aria-describedby="floating"></slot>
		// <slot
		// 	name="floating"
		// 	id="floating"
		// 	role="tooltip"
		// 	aria-live=${ this.open ? 'polite' : 'off' }
		// ></slot>
	}

	update( changedProperties ) {
		super.update( changedProperties );

		if ( changedProperties.has( 'open' ) ) {
			this.setAttribute( 'aria-live', this.open ? 'polite' : 'off' );
		}
	}

	/**
	 * @returns {HTMLElement | null}
	 */
	getReferenceElement() {
		// this does not work when the tooltip is inside another element's shadow root.
		// return document.querySelector( `#${ this.anchor }` );
		// source: https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/tooltip/tooltip.ts#L350
		// private getAnchorElement(id: string = ""): HTMLElement | null {
		const rootNode = this.getRootNode();
		if ( rootNode instanceof ShadowRoot ) {
			return rootNode.getElementById( this.anchor );
		}

		return document.getElementById( this.anchor );
		// }
	}

	/**
	 * @returns {HTMLElement | null}
	 */
	getFloatingElement() {
		return this;
	}

	getArrowElement() {
		return null;
	}

	render() {
		return html`
			<slot></slot>
		`;
	}

	#onFocusIn = () => {
		if ( this.#hasTrigger( 'focus' ) ) {
			this.show();
		}
	};

	#onFocusOut = () => {
		if ( this.#hasTrigger( 'focus' ) ) {
			this.hide();
		}
	};

	#onClick = () => {
		if ( this.#hasTrigger( 'click' ) ) {
			this.toggle();
		}
	};

	/**
	 * @param {KeyboardEvent} event
	 */
	#onKeyDown = ( event ) => {
		if ( this.open && Keyboard( event ).is( 'Escape' ) ) {
			event.stopPropagation();
			this.hide();
		}
	};

	#onMouseOver = () => {
		if ( this.#hasTrigger( 'hover' ) ) {
			clearTimeout( this.hoverTimeout );

			this.hoverTimeout = window.setTimeout( () => this.show(), 450 );
		}
	};

	#onMouseOut = () => {
		if ( this.#hasTrigger( 'hover' ) ) {
			clearTimeout( this.hoverTimeout );

			this.hoverTimeout = window.setTimeout( () => this.hide(), 250 );
		}
	};

	#hasTrigger( triggerType ) {
		return this.trigger.includes( triggerType );
	}
}

/**
 * @typedef {import('../../common/floating-element').FloatingElementPlacement} TooltipPlacement
 * @typedef {'hover' | 'focus' | 'click'} TooltipTrigger
 */

/**
 * @typedef {Object} TooltipAttributes
 * @property {TooltipPlacement} [placement] - Tooltip placement.
 * @property {boolean} [open] - Should the dropdown menu be open.
 * @property {TooltipTrigger | TooltipTrigger[]} trigger
 * @property {string} anchor - Element that triggers the tooltip.
 */

/**
 * @typedef {import('./interaction-boundary').InteractionBoundary} InteractionBoundary
 */

/**
 * @typedef {{
 * 	abort: AbortController;
 * }} TooltipControllers
 */
