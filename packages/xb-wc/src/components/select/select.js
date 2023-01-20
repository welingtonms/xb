import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import toArray from '@welingtonms/xb-toolset/dist/to-array';

import { SELECT_EVENT } from './select.constants';
import DataController from './data.controller';
import SelectionMixin from '../../mixins/selection';
import styles from './select.styles';
import XBElement from '../../common/xb-element';

import '../dropdown';
import '../menu';
import '../text';

import '../layout/box';

import './select-trigger';
import './select-menu';
import './select-option';

function createOption( { value, label, type } ) {
	const option = Object.assign( document.createElement( 'xb-option' ), {
		value,
		innerHTML: label,
	} );

	option.dataset.type = type;

	return option;
}

export class Select extends SelectionMixin( XBElement, {
	listen: SELECT_EVENT,
} ) {
	/** @type {DataController} */
	_dataController;

	/** @type {Dropdown} */
	_dropdown;

	/** @type {SelectTrigger} */
	_trigger;

	/** @type {SelectMenu} */
	_menu;

	/** @type {SelectOption[]} */
	_options;

	static styles = [ styles() ];

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

		this._dataController = new DataController( this );
	}

	connectedCallback() {
		this._dataController.init( this.datasources );

		this._handleSelectionChange = this._handleSelectionChange.bind( this );
		this._handleDropdownCollapse = this._handleDropdownCollapse.bind( this );
		this._handleSearch = this._handleSearch.bind( this );
		this._handleSlotChanged = this._handleSlotChanged.bind( this );

		this.addEventListener(
			'xb-dropdown-collapse',
			this._handleDropdownCollapse
		);
		this.addEventListener( 'xb-select-search', this._handleSearch );
		this.addEventListener( 'xb-selection-change', this._handleSelectionChange );

		/**
		 * It's intentional to call super.connectedCallback() here.
		 * We need the data controller initialization before the selection controller,
		 * in the selection mixin, to initialize the selection value, as we need the datasources
		 * ready to resolve.
		 */
		super.connectedCallback();
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.removeEventListener(
			'xb-dropdown-collapse',
			this._handleDropdownCollapse
		);
		this.removeEventListener( 'xb-select-search', this._handleSearch );
		this.removeEventListener(
			'xb-selection-change',
			this._handleSelectionChange
		);
	}

	/**
	 * @param {import('lit').PropertyValues<Select>} changedProperties
	 */
	update( changedProperties ) {
		if ( changedProperties.has( 'multiple' ) ) {
			this.type = this.multiple ? 'multiple' : 'single';
			this.role = [ 'single' ].includes( this.type ) ? 'radiogroup' : 'group';
		}

		if ( changedProperties.has( 'datasources' ) ) {
			this._dataController.reset( this.datasources );
		}

		super.update( changedProperties );
	}

	/**
	 * @param {import('lit').PropertyValues<OptionGroup>} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		this._renderDataOptions();
		this._syncOptions();
		this._updateTrigger();
	}

	/**
	 * Used in the SelectionMixin class.
	 * @param {*} value
	 * @returns
	 */
	getInitialValue( value ) {
		return toArray( value ).map( ( option ) => {
			const { value } = this._dataController.resolve( option );
			return value;
		} );
	}

	render() {
		return html`
			<xb-dropdown placement="${ ifDefined( this.placement ) }">
				<xb-select-trigger slot="trigger"></xb-select-trigger>

				<xb-select-menu slot="menu" ?loading=${ this.loading }>
					<slot @slotchange=${ this._handleSlotChanged }>
						<xb-text class="empty" variant="body-2">
							No options available.
						</xb-text>
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

	_syncOptions() {
		this.options?.forEach( ( option ) => {
			option.setAttribute(
				'role',
				[ 'single' ].includes( this.type ) ? 'radio' : 'checkbox'
			);

			option.disabled = this.disabled || option.disabled;
			option.checked = this.selection.has( option.value );
		} );
	}

	_updateTrigger() {
		const options = this.options;
		const selection = this.selection;
		const trigger = this.trigger;

		if ( this.type == 'multiple' ) {
			trigger.placeholder =
				selection.size > 0 ? `${ selection.size } selected` : this.placeholder;
		} else {
			/**
			 * TODO: create a datasource with the static options so we can use the
			 * _datasourceHelpers `resolve` function here.
			 */
			const selectedOption = options.find( ( option ) =>
				selection.has( option.value )
			);

			trigger.placeholder = selectedOption?.text() ?? this.placeholder;
		}
	}

	_renderDataOptions() {
		this._dataController.data.forEach( ( option ) => {
			const { value, label } = this._dataController.resolve( option );

			// avoid re-rendering an option previously rendered
			if ( this.querySelector( `xb-option[value="${ value }"]` ) ) {
				return;
			}

			this.appendChild(
				createOption( {
					type: option._type,
					value,
					label,
				} )
			);
		} );
	}

	_removeDataOptions() {
		this._dataController.data.forEach( ( option ) => {
			const { value } = this._dataController.resolve( option );

			if ( this.selection.has( value ) ) {
				// we dont want to remove the option if it is currently selected.
				return;
			}

			this.removeChild( this.querySelector( `xb-option[value="${ value }"]` ) );
			this._dataController.delete( value );
		} );
	}

	/**
	 *
	 * @param {CustomEvent<SearchEventDetail>} e
	 */
	async _handleSearch( e ) {
		const { query } = e.detail;

		if ( query === '' ) {
			return;
		}

		this._removeDataOptions();

		const menu = this.menu;
		const dropdown = this.dropdown;

		dropdown.expand();

		menu.loading = true;

		await this._dataController.query( query );

		menu.loading = false;
	}

	/**
	 *
	 * @param {CustomEvent<SelectionEventDetail>} event
	 */
	_handleSelectionChange( event ) {
		event.stopPropagation();

		const values = Array.from( this.selection ).map( ( key ) => {
			return this._dataController.get( key ) ?? key;
		} );

		if ( ! this.multiple ) {
			this.dropdown.collapse();
		}

		this.emit( 'xb-change', {
			detail: { value: this.multiple ? values : values[ 0 ] ?? null },
		} );
	}

	_handleDropdownCollapse() {
		this.trigger.clear();
	}

	_handleSlotChanged() {
		// we set to null so the getter will re-run the query
		this._options = null;

		this._syncOptions();
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
 * @typedef {import('./select-trigger').SearchEventDetail} SearchEventDetail
 * @typedef {import('../../controllers/selection/selection.controller').SelectionEventDetail} SelectionEventDetail
 * @typedef {import('./data.controller').DatasourceAdapter} SelectDatasourceAdapter
 * @typedef {import('./data.controller').StaticDatasource} SelectStaticDatasource
 * @typedef {import('./data.controller').DynamicDatasource} SelectDynamicDatasource
 * @typedef {import('./data.controller').Datasource} SelectDatasource
 * @typedef {import('./data.controller').DatasourcesHelper} DatasourcesHelper
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
