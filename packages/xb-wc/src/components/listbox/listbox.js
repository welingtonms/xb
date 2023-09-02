import { customElement } from 'lit/decorators.js';

import { Menu } from '../menu/menu';
import withSelection from '../../mixins/with-selection';
import ListboxPatternController from '../../controllers/listbox-pattern';

import styles from './listbox.styles';

import '../spinner';

@customElement( 'xb-listbox' )
export class Listbox extends withSelection( Menu ) {
	static styles = [ styles() ];

	constructor() {
		super();

		this.selection = 'multiple';
	}

	createController() {
		return new ListboxPatternController( this );
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'role', 'listbox' );
	}

	/**
	 * @param {import('lit').PropertyValues<this>} changedProperties
	 */
	update( changedProperties ) {
		if ( changedProperties.has( 'value' ) ) {
			this._controller.selection.value = toArray( value );
		}

		if ( changedProperties.has( 'type' ) ) {
			this._provider.setValue( { type: this.type } );
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
 * @typedef {import('../../common/prop-types').HTMLTag} HTMLTag
 */

/**
 * @typedef {Object} ListboxAttributes
 * @property {boolean} loading - Is the menu options being loaded.
 * @property {boolean} bordered - Should the list item be bordered?
 */
