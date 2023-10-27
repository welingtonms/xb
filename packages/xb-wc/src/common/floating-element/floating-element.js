import { property } from 'lit/decorators.js';

import FloatingController from '../../controllers/floating';
import XBElement from '../xb-element';

/**
 * Offer the basic wiring to `@floating-ui/dom` to render a floating element.
 */
export default class FloatingElement extends XBElement {
	/**
	 * FloatingElement positioning strategy.
	 * @type {FloatingElementAttributes['position']}
	 */
	@property( { type: String, reflect: true } ) accessor position;

	/**
	 * FloatingElement placement.
	 * @type {FloatingElementAttributes['placement']}
	 */
	@property( { type: String, reflect: true } ) accessor placement;

	/**
	 * Should popover's floating be open.
	 * @type {FloatingElementAttributes['open']}
	 */
	@property( { type: Boolean, reflect: true } ) accessor open;

	/** @type {FloatingController} */
	_controller;

	constructor() {
		super();

		this.position = 'fixed';
		this.placement = 'top-end';
		this.open = false;

		this._controller = new FloatingController( this );
	}

	get reference() {
		return this._controller.reference;
	}

	get floating() {
		return this._controller.floating;
	}

	get arrow() {
		return this._controller.arrow;
	}

	show() {
		this._controller.show();
	}

	hide() {
		this._controller.hide();
	}

	toggle() {
		this._controller.toggle();
	}
}

/**
 * @typedef {import('@floating-ui/dom').Strategy} FloatingElementPosition
 * @typedef {import('@floating-ui/dom').Placement} FloatingElementPlacement
 */

/**
 * @typedef {Object} FloatingElementAttributes
 * @property {FloatingElementPosition} [position] - FloatingElement position.
 * @property {FloatingElementPlacement} [placement] - FloatingElement placement.
 * @property {boolean} [open] - Should FloatingElement's floating be open.
 */
