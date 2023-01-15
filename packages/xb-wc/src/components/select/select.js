import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import toArray from '@welingtonms/xb-toolset/dist/to-array';

import { createSelectController } from './select.controller';
import SelectionMixin from '../../mixins/selection';
import XBElement from '../../common/xb-element';

import '../dropdown';
import '../menu';
import '../text';

import '../layout/box';

import './select-trigger';
import './select-menu';
import './select-option';

export class Select extends SelectionMixin( XBElement, {
	listen: 'xb-select',
} ) {
	/** @type {SelectController} */
	_controller;

	/** @type {Dropdown} */
	_dropdown;

	/** @type {SelectTrigger} */
	_trigger;

	/** @type {SelectMenu} */
	_menu;

	/** @type {SelectOption[]} */
	_options;

	static get properties() {
		return {
			/**
			 * Select variant.
			 * @type {SelectAttributes['placement']}
			 */
			placement: { type: String },

			/**
			 * Select placeholder.
			 * @type {SelectAttributes['placeholder']}
			 */
			placeholder: { type: String },

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

			datasources: {},
		};
	}

	constructor() {
		super();

		/** @type {SelectAttributes['open']} */
		this.open = false;

		/** @type {SelectAttributes['placement']} */
		this.placement = 'bottom-start';

		/** @type {SelectAttributes['placeholder']} */
		this.placeholder = 'Search & Select';

		/** @type {SelectAttributes['disabled']} */
		this.disabled = false;

		/** @type {SelectAttributes['loading']} */
		this.loading = false;

		/** @type {SelectAttributes['multiple']} */
		this.multiple = false;

		/** @type {import('@welingtonms/xb-toolset/dist/selection').SelectionType} */
		this.type = 'single';

		// TODO: fix the mess in the roles for select and dropdown components
		/** @type {SelectAttributes['role']} */
		this.role = 'radiogroup';

		/** @type {SelectAttributes['datasources']} */
		this.datasources = [];
	}

	/**
	 * @param {import('lit').PropertyValues<OptionGroup>} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'multiple' ) ) {
			this.type = this.multiple ? 'multiple' : 'single';
			this.role = [ 'single' ].includes( this.type ) ? 'radiogroup' : 'group';

			this._controller = createSelectController( this );
		}
	}

	getInitialValue( value ) {
		return toArray( value ).map( ( option ) => {
			const { value } = this._controller.datasources.resolve( option );

			return value;
		} );
	}

	render() {
		return html`
			<xb-dropdown placement="${ ifDefined( this.placement ) }">
				<xb-select-trigger slot="trigger"></xb-select-trigger>

				<xb-select-menu slot="menu" ?loading=${ this.loading }>
					<slot @slotchange=${ this._handleSlotChanged }>
						<xb-box borderless>
							<xb-text variant="body-2">No options available.</xb-text>
						</xb-box>
					</slot>
				</xb-select-menu>
			</xb-dropdown>
		`;
	}

	get dropdown() {
		this._dropdown =
			this._dropdown ?? this.shadowRoot.querySelector( 'xb-dropdown' );

		return this._dropdown;
	}

	get trigger() {
		this._trigger =
			this._trigger ?? this.shadowRoot.querySelector( 'xb-select-trigger' );

		return this._trigger;
	}

	get menu() {
		this._menu =
			this._menu ?? this.shadowRoot.querySelector( 'xb-select-menu' );

		return this._menu;
	}

	get options() {
		if ( this._options == null ) {
			/** @type {HTMLSlotElement} */
			const defaultSlot = this.shadowRoot.querySelector( 'slot' );

			this._options = [
				...defaultSlot.assignedElements( { flatten: true } ),
			].filter( ( item ) => item.matches( 'xb-option' ) );
		}

		return this._options;
	}

	get selection() {
		/** @type {SelectionController} */
		const controller = this._selectionController;

		return controller.selection;
	}

	_handleSlotChanged() {
		// we set to null so the getter will re-run the query
		this._options = null;

		this._controller._updateOptions();
	}
}

window.customElements.define( 'xb-select', Select );

/**
 * @typedef {import('../popover/popover').PopoverPlacement} SelectPlacement
 * @typedef {import('../../controllers/selection/selection.controller').default} SelectionController
 * @typedef {import('../dropdown/dropdown').Dropdown} Dropdown
 * @typedef {import('lit/directives/ref.js').Ref} Ref
 * @typedef {import('./select-trigger').SelectTrigger} SelectTrigger
 * @typedef {import('./select-menu').SelectMenu} SelectMenu
 * @typedef {import('./select-option').SelectOption} SelectOption
 * @typedef {import('./select.controller').default} SelectController
 * @typedef {import('./select.controller').SelectDatasource} SelectDatasource
 */

/**
 * @typedef {Object} SelectAttributes
 * @property {SelectPlacement} [placement] - Select placement.
 * @property {boolean} [open] - Should the dropdown menu be open.
 * @property {boolean} [disabled] - Should the dropdown be disabled.
 * @property {boolean} [loading] - Is the select options being loaded.
 * @property {boolean} [multiple] - Is this a multiple selection?
 * @property {'group' | 'radiogroup'} role - Aria role
 * @property {string} placeholder - Select placeholder
 * @property {SelectDatasource | SelectDatasource[]} datasources
 */
