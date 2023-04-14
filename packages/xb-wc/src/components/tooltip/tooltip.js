import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import withClassy from '@welingtonms/classy';

import { convertTriggerFromAttribute } from './tooltip.helpers';
import Keyboard from '../../common/keyboard';
import FloatingElement from '../../common/floating-element';

import styles from './tooltip.styles';

import '../resize-observer';

@customElement( 'xb-tooltip' )
export class Tooltip extends FloatingElement {
	static styles = [ styles() ];

	/**
	 * Controls how the tooltip is activated. Possible options include `click`, `hover`, `focus`, and `manual`. Multiple
	 * options can be passed by separating them with a space. When manual is used, the tooltip must be activated
	 * programmatically.
	 * @type {string}
	 */
	@property( { converter: { fromAttribute: convertTriggerFromAttribute } } ) trigger;

	constructor() {
		super();

		/** @type {TooltipTrigger[]} */
		this.trigger = [ 'hover' ];

		this._handleBlur = this._handleBlur.bind( this );
		this._handleClick = this._handleClick.bind( this );
		this._handleFocus = this._handleFocus.bind( this );
		this._handleKeyDown = this._handleKeyDown.bind( this );
		this._handleMouseOut = this._handleMouseOut.bind( this );
		this._handleMouseOver = this._handleMouseOver.bind( this );
	}

	connectedCallback() {
		super.connectedCallback();

		this.updateComplete.then( () => {
			this.addEventListener( 'blur', this._handleBlur, true );
			this.addEventListener( 'click', this._handleClick );
			this.addEventListener( 'focus', this._handleFocus, true );
			this.addEventListener( 'keydown', this._handleKeyDown );
			this.addEventListener( 'mouseout', this._handleMouseOut );
			this.addEventListener( 'mouseover', this._handleMouseOver );
		} );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.removeEventListener( 'blur', this.handleBlur, true );
		this.removeEventListener( 'focus', this.handleFocus, true );
		this.removeEventListener( 'click', this.handleClick );
		this.removeEventListener( 'keydown', this.handleKeyDown );
		this.removeEventListener( 'mouseover', this.handleMouseOver );
		this.removeEventListener( 'mouseout', this.handleMouseOut );
	}

	render() {
		const { classy } = withClassy( {
			open: this.open,
		} );

		return html`
			<xb-resize-observer type="window" @xb-resize=${ this.reposition }>
				<slot name="reference" aria-describedby="floating"></slot>
				<slot
					name="floating"
					id="floating"
					role="tooltip"
					aria-live=${ this.open ? 'polite' : 'off' }
				></slot>
			</xb-resize-observer>
		`;
	}

	_handleFocus() {
		if ( this._hasTrigger( 'focus' ) ) {
			this.show();
		}
	}

	_handleBlur() {
		if ( this._hasTrigger( 'focus' ) ) {
			this.hide();
		}
	}

	_handleClick() {
		if ( this._hasTrigger( 'click' ) ) {
			this.toggle();
		}
	}

	/**
	 * @param {KeyboardEvent} event
	 */
	_handleKeyDown( event ) {
		if ( this.open && Keyboard( event ).is( [ 'ESC' ] ) ) {
			event.stopPropagation();
			this.hide();
		}
	}

	_handleMouseOver() {
		if ( this._hasTrigger( 'hover' ) ) {
			clearTimeout( this.hoverTimeout );

			this.hoverTimeout = window.setTimeout( () => this.show(), 450 );
		}
	}

	_handleMouseOut() {
		if ( this._hasTrigger( 'hover' ) ) {
			clearTimeout( this.hoverTimeout );

			this.hoverTimeout = window.setTimeout( () => this.hide(), 250 );
		}
	}

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
 */

/**
 * @typedef {import('./interaction-boundary').InteractionBoundary} InteractionBoundary
 */
