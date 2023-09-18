import { BaseMenu } from '../menu';
import WithSelection from '../../mixins/with-selection';

/**
 * @class
 * @template WithSelection, BaseMenu
 */
export class BaseListbox extends WithSelection( BaseMenu ) {
	constructor() {
		super();

		this.selection = 'multiple';
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'role', 'listbox' );
	}
}

/**
 * @typedef {import('../menu').BaseMenuAttributes} BaseMenuAttributes
 * @typedef {import('../../mixins/with-selection').WithSelectionAttributes} WithSelectionAttributes
 */

/**
 * @typedef {BaseMenuAttributes & WithSelectionAttributes} BaseListboxAttributes
 */
