import { BaseMenu } from './base-menu';
import MenuPatternController from '../../controllers/menu-pattern';

import { XBElement } from '../xb-element';

export class Menu extends BaseMenu {
	/** @type {MenuPatternController} */
	#controller;

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-menu', ...config, type: Menu } );
	}

	constructor() {
		super();

		this.#controller = new MenuPatternController( this );
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'tabindex', 0 );
	}
}

/**
 * @typedef {import('./base-menu').BaseMenuAttributes} MenuAttributes
 */
