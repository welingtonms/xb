import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import toArray from '@welingtonms/xb-toolset/dist/to-array';

import FocusManagerController from '../../../controllers/focus-manager';
import KeyboardSupportController from '../../../controllers/keyboard-support';
import SelectionManagerController from '../../../controllers/selection-manager';
import withSelection from '../../../mixins/with-selection';
import XBElement from '../../../common/xb-element';

import { groupStyles } from './radio.styles';

const ITEM_QUERY = '[role="radio"]';

/**
 * This class uses the `withSelection` for "learning" purposes.
 * The `selection` props should not be exposed and changed at all.
 */
@customElement( 'xb-radio-group' )
export class RadioGroup extends withSelection( XBElement ) {
	static styles = [ groupStyles() ];

	/** @type {RadioGroupControllers} */
	_controllers;

	constructor() {
		super();

		this.selection = 'single-strict';

		this._controllers = {
			focus: new FocusManagerController( this, {
				query: [ `${ ITEM_QUERY }:not([disabled])` ],
			} ),
			keyboard: new KeyboardSupportController( this, [
				{
					shortcut: [
						{
							key: 'ArrowUp',
						},
						{
							key: 'ArrowLeft',
						},
					],
					handler: () => {
						this._controllers.focus.focusPrevious();

						const target = this._controllers.focus.focused;
						this._toggleValue( target.value );
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
					handler: () => {
						this._controllers.focus.focusNext();

						const target = this._controllers.focus.focused;
						this._toggleValue( target.value );
					},
				},
				{
					shortcut: {
						key: ' ',
					},
					handler: () => {
						const target = this._controllers.focus.focused;

						this._toggleValue( target.value );
					},
				},
			] ),
			selection: new SelectionManagerController( this ),
		};

		this.addEventListener( 'focusin', this._handleFocusIn );
		this.addEventListener( 'focusout', this._handleFocusOut );
		this.addEventListener( 'click', this._handleOptionClick );
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'role', 'radiogroup' );
		this.setAttribute( 'tabindex', 0 );
	}

	/**
	 * @param {import('lit').PropertyValues<this>} changedProperties
	 */
	update( changedProperties ) {
		if ( changedProperties.has( 'value' ) ) {
			this._controllers.selection.init( toArray( this.value ) );
		}

		super.update( changedProperties );
	}

	/**
	 * @param {import('lit').PropertyValues<this>} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		for ( const element of this._controllers.focus.queried ) {
			element.checked = this._controllers.selection.selection.has( element.value );
		}
	}

	render() {
		return html`
			<slot></slot>
		`;
	}

	_handleFocusIn = () => {
		const firstChecked = this._controllers.focus.queried.find(
			( item ) => item.checked && ! item.disabled
		);

		if ( ! firstChecked ) {
			this._controllers.focus.focusFirst();
		} else {
			this._controllers.focus.focus( firstChecked );
		}
	};

	_handleFocusOut = () => {
		this._controllers.focus.clear();
	};

	/**
	 * @param {Event} event
	 */
	_handleOptionClick = ( event ) => {
		const { target } = event;

		if ( ! target.matches( ITEM_QUERY ) ) {
			return;
		}

		this._controllers.focus.focus( target );
		this._toggleValue( target.value );
	};

	_toggleValue = ( value ) => {
		this._controllers.selection.select( value );

		this.emit( 'xb:change', {
			detail: { value: this._controllers.selection.toValue() },
		} );
	};
}

/**
 * @typedef {import('../../common/prop-types').HTMLTag} HTMLTag
 */

/**
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionType} SelectionType
 */

/**
 * @typedef {import('../../../controllers/focus-manager').default} FocusManagerController
 * @typedef {import('../../../controllers/keyboard-support').default} KeyboardSupportController
 * @typedef {import('../../../controllers/selection-manager').default} SelectionManagerController
 */

/**
 * @typedef {{
 * 	focus: FocusManagerController;
 * 	keyboard: KeyboardSupportController;
 * 	selection: SelectionManagerController;
 * }} RadioGroupControllers
 */
