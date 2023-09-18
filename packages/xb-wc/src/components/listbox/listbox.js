import { customElement } from 'lit/decorators.js';

import { BaseListbox } from './base-listbox';
import WithSelection from '../../mixins/with-selection';
import ListboxPatternController from '../../controllers/listbox-pattern';

/**
 * @class
 * @template WithSelection, BaseListbox
 */
@customElement( 'xb-listbox' )
export class Listbox extends WithSelection( BaseListbox ) {
	/** @type {ListboxPatternController} */
	_controller;

	constructor() {
		super();

		this.selection = 'multiple';

		this._controller = new ListboxPatternController( this );
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'tabindex', this.tabIndex ?? '0' );
	}

	/**
	 * @param {import('lit').PropertyValues<this>} changedProperties
	 */
	update( changedProperties ) {
		if ( changedProperties.has( 'value' ) ) {
			this._controller.selection.value = toArray( this.value );
		}

		super.update( changedProperties );
	}

	/**
	 * @param {import('lit').PropertyValues<this>} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		this.setAttribute( 'aria-multiselectable', this.selection === 'multiple' );

		for ( const element of this._controller.focus.queried ) {
			element.selected = this._controller.selection.selection.has( element.value );
		}
	}
}

/**
 * @typedef {import('./base-listbox').BaseListboxAttributes} BaseListboxAttributes
 * @typedef {import('../../mixins/with-selection').WithSelectionAttributes} WithSelectionAttributes
 */

/**
 * @typedef {BaseListboxAttributes & WithSelectionAttributes} ListboxAttributes
 */
