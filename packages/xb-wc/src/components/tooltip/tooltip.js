import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { convertTriggerFromAttribute } from './tooltip.helpers';
import createLogger from '../../utils/logger';
import FloatingElement, { supportsPopover } from '../../common/floating-element';
import Keyboard from '../../common/keyboard';

import styles from './tooltip.styles';

const logger = createLogger( 'tooltip' );

@customElement( 'xb-tooltip' )
export class Tooltip extends FloatingElement {
	static styles = [ styles() ];

	/**
	 * Controls how the tooltip is activated. Possible options include `click`, `hover`, `focus`, and `manual`. Multiple
	 * options can be passed by separating them with a space. When manual is used, the tooltip must be activated
	 * programmatically.
	 * @type {TooltipAttributes[ 'placement']}
	 */
	@property( { converter: { fromAttribute: convertTriggerFromAttribute } } ) trigger;

	/**
	 * Controls how the tooltip is activated. Possible options include `click`, `hover`, `focus`, and `manual`. Multiple
	 * options can be passed by separating them with a space. When manual is used, the tooltip must be activated
	 * programmatically.
	 * @type {TooltipAttributes[ 'anchor']}
	 */
	@property( { type: String, reflect: true } ) anchor;

	constructor() {
		super();

		this.position = 'absolute';
		this.trigger = [ 'hover' ];
	}

	connectedCallback() {
		super.connectedCallback();

		if ( ! this.reference ) {
			logger.debug( 'no reference element provided' );
			return;
		}

		this.reference.addEventListener( 'blur', this._handleBlur, true );
		this.reference.addEventListener( 'click', this._handleClick );
		this.reference.addEventListener( 'focus', this._handleFocus, true );
		this.reference.addEventListener( 'keydown', this._handleKeyDown );
		this.reference.addEventListener( 'mouseout', this._handleMouseOut );
		this.reference.addEventListener( 'mouseover', this._handleMouseOver );

		if ( supportsPopover() ) {
			this.setAttribute( 'popover', 'manual' );
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		if ( ! this.reference ) {
			logger.debug( 'no reference element provided' );
			return;
		}

		this.reference.removeEventListener( 'blur', this._handleBlur, true );
		this.reference.removeEventListener( 'click', this._handleClick );
		this.reference.removeEventListener( 'focus', this._handleFocus, true );
		this.reference.removeEventListener( 'keydown', this._handleKeyDown );
		this.reference.removeEventListener( 'mouseout', this._handleMouseOut );
		this.reference.removeEventListener( 'mouseover', this._handleMouseOver );
	}

	/**
	 * @returns {HTMLElement | null}
	 */
	getReferenceElement() {
		// this does not work when the tooltip is inside another element's shadow root.
		return document.querySelector( `#${ this.anchor }` );
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

	// <slot name="reference" aria-describedby="floating"></slot>
	// <slot
	// 	name="floating"
	// 	id="floating"
	// 	role="tooltip"
	// 	aria-live=${ this.open ? 'polite' : 'off' }
	// ></slot>

	render() {
		return html`
			<slot></slot>
		`;
	}

	_handleFocus = () => {
		if ( this._hasTrigger( 'focus' ) ) {
			this.show();
		}
	};

	_handleBlur = () => {
		if ( this._hasTrigger( 'focus' ) ) {
			this.hide();
		}
	};

	_handleClick = () => {
		if ( this._hasTrigger( 'click' ) ) {
			this.toggle();
		}
	};

	/**
	 * @param {KeyboardEvent} event
	 */
	_handleKeyDown = ( event ) => {
		if ( this.open && Keyboard( event ).is( [ 'ESC' ] ) ) {
			event.stopPropagation();
			this.hide();
		}
	};

	_handleMouseOver = () => {
		if ( this._hasTrigger( 'hover' ) ) {
			clearTimeout( this.hoverTimeout );

			this.hoverTimeout = window.setTimeout( () => this.show(), 450 );
		}
	};

	_handleMouseOut = () => {
		if ( this._hasTrigger( 'hover' ) ) {
			clearTimeout( this.hoverTimeout );

			this.hoverTimeout = window.setTimeout( () => this.hide(), 250 );
		}
	};

	_hasTrigger( triggerType ) {
		return this.trigger.includes( triggerType );
	}
}

/**
 * @typedef {import('../../common/floating-element').FloatingElementPlacement} DropdownPlacement
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
