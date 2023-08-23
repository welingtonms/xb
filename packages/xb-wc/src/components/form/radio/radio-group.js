import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import RadioGroupPatternController from '../../../controllers/radio-group-pattern';
import XBElement from '../../../common/xb-element';

import styles from './radio-group.styles';

@customElement( 'xb-radio-group' )
export class RadioGroup extends XBElement {
	static styles = [ styles() ];
	/**
	 * Selection strategy.
	 * @type {SelectionType}
	 */
	@property( { type: String } ) selection;

	/**
	 * Selection value.
	 * This should be typed in the subclass.
	 * @type {SelectionOption | SelectionOption[] | null}
	 */
	@property() value;

	/** @type {RadioGroupPatternController} */
	_controller;

	constructor() {
		super();

		this.selection = 'single-strict';
		this._controller = new RadioGroupPatternController( this );
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

		for ( const element of this._controller.focus.queried ) {
			element.checked = this._controller.selection.selection.has( element.value );
		}
	}

	render() {
		return html`
			<slot></slot>
		`;
	}
}

/**
 * @typedef {import('../../common/prop-types').HTMLTag} HTMLTag
 */

/**
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionType} SelectionType
 */
