import { html } from 'lit';

import { SELECT_EVENT } from './select.constants';
import SelectionMixin from '../../mixins/selection';
import XBElement from '../../common/xb-element';

import '../dropdown';

import './select-trigger';
import './select-menu';
import './select-option';

export class Select extends SelectionMixin( XBElement, {
	listen: SELECT_EVENT,
} ) {
	/** @type {HTMLSlotElement} */
	_defaultSlot;

	static get properties() {
		return {
			/**
			 * Select variant.
			 * @type {SelectAttributes['placement']}
			 */
			placement: { type: String },

			/**
			 * Should the dropdown menu be open.
			 * @type {SelectAttributes['open']}
			 */
			open: {
				type: Boolean,
				reflect: true,
			},

			/**
			 * Should the dropdown be disabled.
			 * @type {SelectAttributes['disabled']}
			 */
			disabled: {
				type: Boolean,
				reflect: true,
			},

			/**
			 * Select is loading options.
			 * @type {SelectAttributes['loading']}
			 */
			loading: {
				type: Boolean,
				reflect: true,
			},

			/**
			 * Is this a multiple selection?
			 * @type {SelectAttributes['multiple']}
			 */
			multiple: {
				type: Boolean,
			},

			/**
			 * Aria role
			 * @type {SelectAttributes['role']}
			 */
			role: {
				type: String,
				reflect: true,
			},
		};
	}

	constructor() {
		super();

		/** @type {SelectAttributes['open']} */
		this.open = false;

		/** @type {SelectAttributes['placement']} */
		this.placement = 'bottom-start';

		/** @type {SelectAttributes['disabled']} */
		this.disabled = false;

		/** @type {SelectAttributes['loading']} */
		this.loading = false;

		/** @type {SelectAttributes['multiple']} */
		this.multiple = false;

		/** @type {import('@welingtonms/xb-toolset/dist/selection').SelectionType} */
		this.type = 'single';

		/** @type {SelectAttributes['role']} */
		this.role = 'radiogroup';
	}

	/**
	 * @param {import('lit').PropertyValues<OptionGroup>} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'multiple' ) ) {
			console.log( 'type changed', this.type );
			this.type = this.multiple ? 'multiple' : 'single';
			this.role = [ 'single' ].includes( this.type ) ? 'radiogroup' : 'group';
		}

		if ( changedProperties.has( 'role' ) ) {
			this._getOptions().forEach( ( option ) => {
				this._setOptionRole( option );
			} );
		}

		if ( changedProperties.has( 'disabled' ) ) {
			this._getOptions().forEach( ( option ) => {
				this._setOptionDisabled( option );
			} );
		}

		this._getOptions().forEach( ( option ) => {
			this._setOptionSelected( option );
		} );
	}

	render() {
		return html`<xb-dropdown>
			<xb-select-trigger slot="trigger"></xb-select-trigger>
			<xb-select-menu slot="menu" ?loading=${ this.loading }>
				<slot></slot>
			</xb-select-menu>
		</xb-dropdown>`;
	}

	/**
	 * @returns {import('./select-option').SelectOption[]}
	 */
	_getOptions() {
		this._defaultSlot =
			this._defaultSlot ?? this.shadowRoot.querySelector( 'slot' );

		return [
			...this._defaultSlot.assignedElements( { flatten: true } ),
		].filter( ( item ) => item.tagName.toLowerCase() === 'xb-option' );
	}

	/**
	 * @param {import('./select-option').SelectOption} option
	 */
	_setOptionRole( option ) {
		option.setAttribute(
			'role',
			[ 'single' ].includes( this.type ) ? 'radio' : 'checkbox'
		);
	}

	/**
	 * @param {import('./select-option').SelectOption} option
	 */
	_setOptionSelected( option ) {
		/** @type {SelectionController} */
		const controller = this._controller;

		option.selected = controller.selection.has( option.value );
	}

	/**
	 * @param {import('./select-option').SelectOption} option
	 */
	_setOptionDisabled( option ) {
		option.disabled = this.disabled;
	}
}

window.customElements.define( 'xb-select', Select );

/**
 * @typedef {import('../popover/popover').PopoverPlacement} SelectPlacement
 */

/**
 * @typedef {Object} SelectAttributes
 * @property {SelectPlacement} [placement] - Select placement.
 * @property {boolean} [open] - Should the dropdown menu be open.
 * @property {boolean} [disabled] - Should the dropdown be disabled.
 * @property {boolean} [loading] - Is the select options being loaded.
 * @property {boolean} [multiple] - Is this a multiple selection?
 * @property {'group' | 'radiogroup'} role Aria role
 */

/**
 * @typedef {import('./interaction-boundary').InteractionBoundary} InteractionBoundary
 */
