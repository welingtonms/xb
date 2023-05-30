import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import toArray from '@welingtonms/xb-toolset/dist/to-array';

import DataController from './data.controller';
import SelectionBoundary from '../../common/selection-boundary';

import styles from './select.styles';

import '../dropdown';
import '../layout/box';
import '../menu';
import '../text';
import './select-menu';
import './select-option';
import './select-trigger';

/**
 * @param {SelectionState} state
 * @param {SelectionEventDetail['value']} value
 * @returns {string[]}
 */
function getChanged( state, value ) {
	/**
	 * TODO: evaluate the need to optimize based on the type (multiple, single, or single-strict),
	 * for example, returning only `value` (since the existing selected options won't change), and
	 * returning both the current state and value for single selections.
	 */
	return Array.from( new Set( [ ...state.keys(), ...toArray( value ) ] ) );
}

function createOption( { value, label, type, disabled, selected } ) {
	const option = Object.assign( document.createElement( 'xb-option' ), {
		value,
		innerHTML: label,

		disabled,
		selected,
	} );

	option.dataset.type = type;

	return option;
}

@customElement( 'xb-select' )
export class Select extends SelectionBoundary {
	static styles = [ styles() ];

	@property( {} ) datasources;

	/**
	 * Should the dropdown be disabled.
	 * @type {SelectAttributes['disabled']}
	 */
	@property( { type: Boolean, reflect: true } ) disabled;

	/**
	 * Select is loading options.
	 * @type {SelectAttributes['loading']}
	 */
	@property( { type: Boolean, reflect: true } ) loading;

	/**
	 * Is this a multiple selection?
	 * @type {SelectAttributes['multiple']}
	 */
	@property( { type: Boolean } ) multiple;

	/**
	 * Should the dropdown menu be open.
	 * @type {SelectAttributes['open']}
	 */
	@property( { type: Boolean, reflect: true } ) open;

	/**
	 * Select placeholder.
	 * @type {SelectAttributes['placeholder']}
	 */
	@property( { type: String } ) placeholder;

	/**
	 * Select variant.
	 * @type {SelectAttributes['placement']}
	 */
	@property( { type: String } ) placement;

	/** @type {DataController} */
	_controller;

	constructor() {
		super();

		this.datasources = [];
		this.disabled = false;
		this.listen = 'xb-option-click';
		this.loading = false;
		this.multiple = false;
		this.open = false;
		this.placeholder = 'Search & Select';
		this.placement = 'bottom-start';
	}

	connectedCallback() {
		super.connectedCallback();

		this._controller = new DataController( this, this.datasources );

		this.addEventListener( 'xb-clear', this._handleClear );
		this.addEventListener( 'xb-dropdown-collapse', this._handleCollapse );
		this.addEventListener( 'xb-select-search', this._handleSearch );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.removeEventListener( 'xb-clear', this._handleClear );
		this.removeEventListener( 'xb-dropdown-collapse', this._handleCollapse );
		this.removeEventListener( 'xb-select-search', this._handleSearch );
	}

	firstUpdated() {
		const defaultSlot = this.shadowRoot.querySelector( 'slot' );
		const nodes = defaultSlot.assignedNodes( { flatten: true } );

		/**
		 * Tabs and line breaks are valid nodes when rendering static nodes.
		 * The problem is that they prevent the slot fallback content (empty options message)
		 * from being shown. To prevent that, we remove all text nodes.
		 */
		nodes.forEach( ( node ) => {
			if ( node.nodeType == Node.TEXT_NODE && node.parentNode ) {
				node.parentNode.removeChild( node );
			}
		} );

		this._controller.query( '', 'static' );
	}

	/**
	 * @param {import('lit').PropertyValues<Select>} changedProperties
	 */
	update( changedProperties ) {
		if ( changedProperties.has( 'multiple' ) ) {
			this.type = this.multiple ? 'multiple' : 'single';
		}

		if ( changedProperties.has( 'datasources' ) ) {
			this._controller.setDatasources( this.datasources );
		}

		super.update( changedProperties );
	}

	/**
	 * @param {import('lit').PropertyValues<Select>} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		this._renderDataOptions();

		if ( changedProperties.has( 'selection' ) ) {
			this._handleSelectionChange();
		}
	}

	get dropdown() {
		return this.shadowRoot.querySelector( 'xb-dropdown' );
	}

	get options() {
		const defaultSlot = this.shadowRoot.querySelector( 'slot' );

		return ( defaultSlot?.assignedElements() || [] ).filter( ( item ) =>
			item.matches( 'xb-option' )
		);
	}

	get trigger() {
		return this.shadowRoot.querySelector( 'xb-select-trigger' );
	}

	render() {
		return html`
			<xb-dropdown placement="${ ifDefined( this.placement ) }">
				<xb-select-trigger slot="reference"></xb-select-trigger>

				<xb-select-menu
					slot="floating"
					id="menu"
					role="listbox"
					aria-multiselectable=${ this.multiple ? 'true' : 'false' }
					aria-label="Options"
					?loading=${ this.loading }
				>
					<slot @slotchange=${ this._handleSlotChanged }>
						<xb-text class="empty" variant="body-2">No options available.</xb-text>
					</slot>
				</xb-select-menu>
			</xb-dropdown>
		`;
	}

	/**
	 * @param {SelectionOption | SelectionOption[] | null} value
	 * @returns {string[]}
	 */
	_toSelectionValue( value ) {
		return this._controller.toValue( value );
	}
	/**
	 * Sync the `disabled`, and `selected` attributes for the provided
	 * `options`, or all the rendered options, if no `options` is provided.
	 * @param {SelectOption[]} [options]
	 */
	_syncOptions( options ) {
		( options ?? this.options ).forEach( ( option ) => {
			option.disabled = this.disabled || option.disabled;
			option.selected = this.selection.has( option.value );
			option.type = this.multiple ? 'multiple' : 'single';
		} );
	}

	_updateTrigger() {
		const selection = this.selection;
		const trigger = this.trigger;

		if ( selection.size === 0 ) {
			trigger.placeholder = this.placeholder;
			return;
		}

		if ( this.multiple ) {
			trigger.placeholder = `${ selection.size } selected`;
		} else {
			const [ value ] = Array.from( selection.keys() );
			const item = this._controller.getItem( value );
			const { label } = this._controller.toOption( item );

			trigger.placeholder = label;
		}
	}

	_removeDataOptions() {
		this.options.forEach( ( option ) => {
			option.remove();
		} );
	}

	_renderDataOptions() {
		let keys = new Set();

		if ( this._controller.mode == 'default' ) {
			keys = new Set( [
				...this._controller.getGroup( 'static' ).keys(),
				...this.selection.keys(),
			] );
		} else {
			keys = new Set( this._controller.getGroup( 'queried' ) );
		}

		Array.from( keys.keys() ).forEach( ( key ) => {
			const item = this._controller.getItem( key );

			if ( ! item ) {
				return;
			}

			const { value, label, _type } = this._controller.toOption( item );

			// avoid re-rendering an option previously rendered
			if ( this.querySelector( `xb-option[value="${ value }"]` ) ) {
				return;
			}

			this.appendChild(
				createOption( {
					type: _type,
					value,
					label,

					// TODO: how to keep the previous disabled state?
					disabled: this.disabled,
					selected: this.selection.has( value ),
				} )
			);
		} );

		this._syncOptions();
	}

	/**
	 * Trigger search operation for the select.
	 * @param {CustomEvent<SearchEventDetail>} event
	 */
	_handleSearch = async ( event ) => {
		const { query } = event.detail;

		this._removeDataOptions();

		if ( query === '' ) {
			this._controller.setMode( 'default' );
			this._renderDataOptions();

			return;
		}

		this._controller.setMode( 'search' );

		this.dropdown.expand();

		this.loading = true;

		await this._controller.query( query );

		this.loading = false;
	};

	_handleClear = () => {
		this._removeDataOptions();

		this._controller.setMode( 'default' );
		this._controller.query( '' );
	};

	_handleSlotChanged() {
		this._syncOptions();
	}

	_handleSelectionChange = () => {
		const changed = getChanged( this.selection, this._toSelectionValue( this.value ) );

		let optionsToSync = [];
		Array.from( new Set( [ ...changed, ...this.selection.keys() ] ) ).forEach(
			( value ) => {
				const node = this.querySelector( `xb-option[value="${ value }"]` );

				if ( node ) {
					optionsToSync.push( node );
				}
			}
		);

		this._syncOptions( optionsToSync );
		this._updateTrigger();

		if ( ! this.multiple && this.selection.size === 1 ) {
			this.dropdown.collapse();
		}

		const getConsolidatedValue = () => {
			if ( this.selection.size === 0 ) {
				return null;
			}

			const values = Array.from( this.selection ).map( ( key ) => {
				return this._controller.getItem( key ) ?? key;
			} );

			return this.multiple ? values : values[ 0 ];
		};

		this.emit( 'xb-change', {
			detail: { value: getConsolidatedValue() },
		} );
	};

	_handleCollapse = () => {
		this.trigger.clear();

		if ( this._controller.mode == 'search' ) {
			this._removeDataOptions();
			this._controller.query( '' );
		}

		this._controller.setMode( 'default' );
	};
}

/**
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionType} SelectionType
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionState} SelectionState
 */

/**
 * @typedef {import('../dropdown/dropdown').Dropdown} Dropdown
 * @typedef {import('../popover/popover').PopoverPlacement} SelectPlacement
 * @typedef {import('../../common/selection-boundary').SelectionEventDetail} SelectionEventDetail
 * @typedef {import('../../common/selection-boundary').SelectionOption} SelectionOption
 * @typedef {import('./data.controller').Datasource} SelectDatasource
 * @typedef {import('./data.controller').DatasourceAdapter} SelectDatasourceAdapter
 * @typedef {import('./data.controller').DatasourcesHelper} DatasourcesHelper
 * @typedef {import('./data.controller').DynamicDatasource} SelectDynamicDatasource
 * @typedef {import('./data.controller').StaticDatasource} SelectStaticDatasource
 * @typedef {import('./select-menu').SelectMenu} SelectMenu
 * @typedef {import('./select-option').SelectOption} SelectOption
 * @typedef {import('./select-trigger').SearchEventDetail} SearchEventDetail
 * @typedef {import('./select-trigger').SelectTrigger} SelectTrigger
 */

/**
 * @typedef {Object} SelectAttributes
 * @property {SelectPlacement} [placement] - Select placement.
 * @property {boolean} [open] - Should the dropdown menu be open.
 * @property {boolean} [disabled] - Should the dropdown be disabled.
 * @property {boolean} [loading] - Is the select options being loaded.
 * @property {boolean} [multiple] - Is this a multiple selection?
 * @property {string} [placeholder] - Select placeholder
 * @property {SelectDatasource | SelectDatasource[]} [datasources]
 * @property {null | SelectionOption | SelectionOption[]} [value]
 */

/**
 * @typedef {Object} SelectContext
 * @property {boolean} multiple
 * @property {boolean} disabled
 * @property {boolean} loading
 * @property {null | SelectionOption | SelectionOption[]} value
 */
