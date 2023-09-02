import FocusManagerController from '../../controllers/focus-manager';
import KeyboardSupportController from '../../controllers/keyboard-support';
import SelectionManagerController from '../../controllers/selection-manager';

const ITEM_QUERY = ':is([role="radio"], [role="checkbox"])';

/**
 * @implements {ReactiveController}
 */
class ToggleGroupController {
	/** @type {ToggleGroupControllerHost} */
	host;

	/** @type {ToggleGroupControllers} */
	controllers;

	/**
	 * @param {ToggleGroupControllerHost} host
	 */
	constructor( host ) {
		this.controllers = {
			focus: new FocusManagerController( host, {
				query: [ ITEM_QUERY ],
			} ),
			keyboard: new KeyboardSupportController( host, [
				{
					shortcut: [
						{
							key: 'ArrowUp',
						},
						{
							key: 'ArrowLeft',
						},
					],
					callback: () => {
						this.controllers.focus.focusPrevious();
					},
				},
				{
					shortcut: [
						{
							key: 'ArrowDown',
						},
						{
							key: 'ArrowRight',
						},
					],
					callback: () => {
						this.controllers.focus.focusNext();
					},
				},
				{
					shortcut: {
						key: ' ',
					},
					callback: () => {
						const target = this.controllers.focus.focused;

						this._toggleValue( target.value );
					},
				},
			] ),
			selection: new SelectionManagerController( host ),
		};

		( this.host = host ).addController( this );
	}

	get focus() {
		return this.controllers.focus;
	}

	get selection() {
		return this.controllers.selection;
	}

	get queried() {
		return this.controllers.focus.queried;
	}

	hostConnected() {
		this.host.addEventListener( 'focusin', this._handleFocusIn );
		this.host.addEventListener( 'focusout', this._handleFocusOut );
		this.host.addEventListener( 'click', this._handleToggleClick );
	}

	hostDisconnected() {
		this.host.removeEventListener( 'focusin', this._handleFocusIn );
		this.host.removeEventListener( 'focusout', this._handleFocusOut );
		this.host.removeEventListener( 'click', this._handleToggleClick );
	}

	_handleFocusIn = () => {
		// TODO: adjust to comply with https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#focusabilityofdisabledcontrols
		const firstSelected = this.queried.find(
			( item ) => item.checked && ! item.disabled
		);

		if ( ! firstSelected ) {
			this.controllers.focus.focusFirst();
		} else {
			this.controllers.focus.focus( firstSelected );
		}
	};

	_handleFocusOut = () => {
		this.controllers.focus.clearFocus();
	};

	/**
	 * @param {Event} event
	 */
	_handleToggleClick = ( event ) => {
		const { target } = event;

		if ( ! target.matches( ITEM_QUERY ) ) {
			return;
		}

		this.controllers.focus.focus( target );
		this._toggleValue( target.value );
	};

	_toggleValue = ( value ) => {
		this.controllers.selection.toggle( value );

		this.host.emit( 'xb:change', {
			detail: { value: this.controllers.selection.toValue() },
		} );
	};
}

export default ToggleGroupController;

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('../../common/xb-element').default} XBElement
 */

/**
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionType} SelectionType
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionState} SelectionState
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionStrategy} SelectionStrategy
 * @typedef {'select' | 'unselect' | 'toggle'} SelectionOperation
 */

/**
 * @typedef {import('../focus-manager').default} FocusManagerController
 * @typedef {import('../keyboard-support').default} KeyboardSupportController
 * @typedef {import('../selection-manager').default} SelectionManagerController
 */

/**
 * @typedef {{
 * 	focus: FocusManagerController;
 * 	keyboard: KeyboardSupportController;
 * 	selection: SelectionManagerController;
 * }} ToggleGroupControllers
 */

/**
 * @typedef {ReactiveControllerHost & XBElement & {
 * 	selection: SelectionType,
 * 	value: SelectionOption | SelectionOption[] | null
 * }} ToggleGroupControllerHost
 */
