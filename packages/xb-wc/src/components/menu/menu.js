import { customElement } from 'lit/decorators.js';

import { BaseMenu } from './base-menu';
import MenuPatternController from '../../controllers/menu-pattern';

@customElement( 'xb-menu' )
export class Menu extends BaseMenu {
	/** @type {MenuPatternController} */
	_controller;

	constructor() {
		super();

		this._controller = new MenuPatternController( this );
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'tabindex', 0 );
	}
}

/**
 * @typedef {import('./base-menu').BaseMenuAttributes} MenuAttributes
 */
