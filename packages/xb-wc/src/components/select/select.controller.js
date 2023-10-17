import { isPrintableCharacter } from '../../utils/string';
import BoundaryController from '../../controllers/boundary';
import FocusManagerController from '../../controllers/focus-manager';
import KeyboardSupportController from '../../controllers/keyboard-support';
import SelectionManagerController from '../../controllers/selection-manager';

import DataController from './data.controller';

const ITEM_QUERY = '[role="option"]';

/**
 * @implements {ReactiveController}
 */
class SelectController {
	/** @type {SelectControllerHost} */
	host;

	/** @type {SelectControllers} */
	controllers;

	/**
	 * @param {SelectControllerHost} host
	 */
	constructor( host ) {
		( this.host = host ).addController( this );
	}

	get boundary() {
		return this.controllers.boundary;
	}

	get data() {
		return this.controllers.data;
	}

	get focus() {
		return this.controllers.focus;
	}

	get selection() {
		return this.controllers.selection;
	}

	get keyboard() {
		return this.controllers.keyboard;
	}

	get queried() {
		return this.controllers.focus.queried;
	}

	hostConnected() {
		this.host.addEventListener( 'click', this._handleOptionClick );
		this.host.addEventListener( 'focusout', this._handleFocusOut );
		this.host.addEventListener( 'keyup', this._handleKeyUp );
		this.host.addEventListener( 'xb:interact-out', this._handleClickOutside );

		this.controllers = {
			boundary: new BoundaryController( this.host ),
			data: new DataController( this.host, this.host.datasources ),
			focus: new FocusManagerController( this.host, {
				// TODO: test focusability based on https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_disabled_controls
				query: [ ITEM_QUERY ],
				searchable: false,
				getInteractiveElement: ( host ) => {
					return host.getReferenceElement();
				},
			} ),
			keyboard: new KeyboardSupportController(
				this.host,
				/**
				 * [!] It's key to remember here that, then the select is expanded the focus
				 * remains on the combobox element, not on the listbox itself. For that reason,
				 * the target of the keyboard event will always be the combobox, so we have to use
				 * use evidences from the controllers and the select component to decide what to do based
				 * on the pressed key.
				 *
				 * Reference: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/#roles_states_properties
				 */
				[
					{
						shortcut: {
							key: 'ArrowUp',
						},
						/**
						 * @param {KeyboardEvent} event
						 */
						handler: () => {
							if ( this.host.open ) {
								this.controllers.focus.focusPrevious();
							} else {
								this.host.expand( { emit: false, position: 'last' } );
							}
						},
					},
					{
						shortcut: {
							key: 'ArrowDown',
						},
						/**
						 * @param {KeyboardEvent} event
						 */
						handler: () => {
							if ( this.host.open ) {
								this.controllers.focus.focusNext();
							} else {
								this.host.expand( { emit: false, position: 'first' } );
							}
						},
					},
					{
						shortcut: {
							key: 'ArrowDown',
							alt: true,
						},
						/**
						 * @param {KeyboardEvent} event
						 */
						handler: ( event ) => {
							if ( ! this.host.open && event.target.matches( 'xb-select-trigger' ) ) {
								this.host.show();
								this.controllers.boundary.activate();
							}
						},
					},
					{
						shortcut: [
							{
								key: 'Enter',
							},
						],
						handler: () => {
							/**
							 * since the focus is kept on the combobox element (aka input), not on
							 * the listbox itself, the event will not be dispatched from the listbox;
							 * thus, the only cue we have to know if the user is pressing <Enter> on
							 * an option is by checking the `focused` element.
							 */
							const target = this.controllers.focus.focused;

							if ( target && target.matches( 'xb-option' ) ) {
								this._toggleValue( target.value );
							}
						},
					},
				],
				{
					getEventTarget: ( host ) => host.renderRoot,
				}
			),
			selection: new SelectionManagerController( this.host ),
		};
	}

	hostDisconnected() {
		this.host.removeEventListener( 'click', this._handleOptionClick );
		this.host.removeEventListener( 'focusout', this._handleFocusOut );
		this.host.removeEventListener( 'keyup', this._handleKeyUp );
		this.host.removeEventListener( 'xb:interact-out', this._handleClickOutside );
	}

	_handleFocusOut = () => {
		this.controllers.focus.clear();
	};

	/**
	 * The baseline for this method is the `_handleOptionClick` in the
	 * `ListboxPatternController`.
	 * @param {Event} event
	 */
	_handleOptionClick = ( event ) => {
		const { target } = event;

		if ( ! target.matches( ITEM_QUERY ) ) {
			return;
		}

		this.controllers.focus.focus( target );
		this._toggleValue( target.value );
	};

	_handleClickOutside = () => {
		this.host.collapse();
	};

	_handleKeyUp = ( event ) => {
		if ( isPrintableCharacter( event.key ) ) {
			this.controllers.focus.clear();
		}
	};

	_toggleValue = ( value ) => {
		this.controllers.selection.toggle( value );

		this.host.emit( 'xb:change', {
			detail: { value: this.controllers.selection.toValue() },
		} );
	};
}

export default SelectController;

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('./select').Select} Select
 */

/**
 * @typedef {import('../../controllers/focus-manager').default} FocusManagerController
 * @typedef {import('../../controllers/keyboard-support').default} KeyboardSupportController
 * @typedef {import('../../controllers/boundary').default} BoundaryController
 */

/**
 * @typedef {{
 *  boundary: BoundaryController;
 * 	data: DataController;
 * 	focus: FocusManagerController;
 * 	keyboard: KeyboardSupportController;
 * 	selection: SelectionManagerController;
 * }} SelectControllers
 */

/**
 * @typedef {ReactiveControllerHost & Select & {
 * 	selection: SelectionType,
 * 	value: SelectionOption | SelectionOption[] | null
 * }} SelectControllerHost
 */
