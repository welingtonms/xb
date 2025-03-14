import { html, css } from 'lit';
import { ContextProvider } from '@lit/context';
import { property } from 'lit/decorators.js';

import { XBElement } from '../xb-element';
import { SelectionManagerController } from '../../controllers/selection-manager';
import { WithSelectionMixin } from '../../mixins/with-selection';

import { tableContext } from './table.context';

import { tableStyles } from './table.styles';

import './table-body';
import './table-row';
import './table-cell';

export class Table extends WithSelectionMixin( XBElement ) {
	static styles = [ tableStyles() ];

	@property( { type: Boolean, reflect: true } )
	accessor expandable = false;

	@property( { type: Boolean, reflect: true } )
	accessor selectable = false;

	/** @type {TableControllers} */
	#controllers;

	#provider = new ContextProvider( this, {
		context: tableContext,
		value: {
			gridTemplate: '',
			expandable: false,
			selectable: false,
			type: 'multiple',
			selection: new Set(),
		},
	} );

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-table', ...config, type: Table } );
	}

	constructor() {
		super();

		this.#controllers = {
			selection: new SelectionManagerController( this ),
		};
	}

	connectedCallback() {
		super.connectedCallback();

		this.type = 'multiple';

		this.addEventListener( 'copy', this.#handleCopy );
		this.addEventListener( 'toggle', this.#handleRowToggle );
		this.addEventListener( 'select-all', this.#handleSelectAllRows );
		this.addEventListener( 'unselect-all', this.#handleUnselectAllRows );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.removeEventListener( 'copy', this.#handleCopy );
		this.removeEventListener( 'toggle', this.#handleRowToggle );
		this.removeEventListener( 'select-all', this.#handleSelectAllRows );
		this.removeEventListener( 'unselect-all', this.#handleUnselectAllRows );
	}

	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'selectable' ) || changedProperties.has( 'expandable' ) ) {
			this.#updateContext();
		}
	}

	firstUpdated() {
		const observer = new MutationObserver( () => {
			this.#updateContext();
		} );

		observer.observe( this, { childList: true, subtree: true } );

		setTimeout( () => {
			this.#updateContext();
		}, 0 );
	}

	render() {
		return html`
			<div class="table-container">
				<slot></slot>
			</div>
		`;
	}

	get value() {
		return this.#controllers.selection.value();
	}

	/**
	 * @param {string | string[] | null} value
	 */
	set value( value ) {
		this.#onValueChange( this.getRawValue( value ) );
	}

	#getAvailableValues = () => {
		return Array.from( this.querySelectorAll( 'xb-table-row[value]' ) ).map( ( row ) => row.value );
	};

	/**
	 * Handles copy event to preserve table structure
	 * @param {ClipboardEvent} e
	 */
	#handleCopy = ( e ) => {
		e.preventDefault();

		const selection = window.getSelection();
		const rows = Array.from( this.querySelectorAll( 'xb-table-row' ) );

		/**
		 * Formats complex cell content for copying
		 * @param {string} content
		 * @returns {string}
		 */
		const formatCellContent = ( content = '' ) => {
			// Remove excessive whitespace and normalize line breaks
			return content
				.replace( /\s+/g, ' ' )
				.replace( /[\n\r]+/g, ' ' )
				.trim();
		};

		// Get the total number of columns from the first row
		const totalColumns = Array.from(
			rows[ 0 ]?.querySelectorAll( 'xb-table-cell:not([slot="expansion"])' ) || []
		).reduce( ( sum, cell ) => sum + ( parseInt( cell.getAttribute( 'colspan' ) ) || 1 ), 0 );

		// Build table data, handling colspan
		const tableData = rows
			.map( ( row, index ) => {
				const cells = Array.from( row.querySelectorAll( 'xb-table-cell:not([slot="expansion"])' ) );
				const rowData = [];

				cells.forEach( ( cell ) => {
					if ( ! selection?.containsNode( cell, true ) ) {
						// Add empty cells for unselected content to maintain structure
						const colspan = parseInt( cell.getAttribute( 'colspan' ) ) || 1;
						for ( let i = 0; i < colspan; i++ ) {
							rowData.push( '' );
							console.log( index, rowData );
						}
						return;
					}

					const content = formatCellContent( cell.textContent );
					const colspan = parseInt( cell.getAttribute( 'colspan' ) ) || 1;

					// Add the content to first cell of colspan
					rowData.push( content );
					console.log( index, rowData, { content, colspan } );

					// Add empty strings for remaining colspan cells to maintain structure
					for ( let i = 1; i < colspan; i++ ) {
						rowData.push( '' );
						console.log( index, rowData );
					}
				} );

				// console.log('befor', index, rowData);

				// Ensure all rows have the same number of columns
				while ( rowData.length < totalColumns ) {
					rowData.push( '' );
				}

				return rowData;
			} )
			.filter( ( row ) => row.some( ( cell ) => cell !== '' ) ); // Only include rows that have content

		// Convert to TSV (Tab-Separated Values) for spreadsheet compatibility
		const tsvContent = tableData.map( ( row ) => row.join( '\t' ) ).join( '\n' );

		e.clipboardData?.setData( 'text/plain', tsvContent );
	};

	/**
	 * @param {CustomEvent} event
	 */
	#handleRowToggle = ( event ) => {
		if ( event.target.matches( 'xb-table-control-select' ) ) {
			event.stopPropagation();
			const { /** @type {TableRow} */ target } = event;

			this.#controllers.selection.toggle( target.value );
			this.#updateContext();

			this.emit( 'change' );
		}
	};

	#handleSelectAllRows = ( event ) => {
		if ( event.target.matches( 'xb-table-control-select' ) ) {
			event.stopPropagation();

			this.#controllers.selection.selectAll( this.#getAvailableValues() );
			this.#updateContext();

			this.emit( 'change' );
		}
	};

	#handleUnselectAllRows = ( event ) => {
		if ( event.target.matches( 'xb-table-control-select' ) ) {
			event.stopPropagation();

			this.#controllers.selection.unselectAll();
			this.#updateContext();

			this.emit( 'change' );
		}
	};

	/**
	 * @param {string[]} value
	 */
	#onValueChange = ( value ) => {
		this.#controllers.selection.init( value );

		this.#updateContext();
	};

	#updateContext = () => {
		const template = this.#extractGridTemplate();

		this.#provider.setValue( {
			gridTemplate: template,
			expandable: this.expandable,
			selectable: this.selectable,
			allValues: new Set( this.#getAvailableValues() ),
			selectedValues: this.#controllers.selection.selection,
			type: this.type,
		} );
	};

	#extractGridTemplate() {
		const headerRow = this.querySelector( 'xb-table-row' );
		if ( ! headerRow ) return [ '1fr' ];

		const cells = Array.from(
			headerRow.querySelectorAll( 'xb-table-cell:not([slot="expansion"])' )
		);
		const widths = Array( cells.length ).fill( '1fr' );

		cells.forEach( ( cell, index ) => {
			const width = cell.width || '1fr';
			const colspan = parseInt( cell.colspan || 1 );

			widths[ index ] = width;

			for ( let i = 1; i < colspan; i++ ) {
				widths[ index + i ] = width;
			}
		} );

		const template = widths
			.map( ( width ) => {
				const unit = ! isNaN( width ) && typeof width !== 'boolean' ? 'px' : '';
				return `${ width }${ unit }`;
			} )
			.join( ' ' );

		return template;
	}
}

/**
 * @typedef {import('./table-row').TableRow} TableRow
 */

/**
 * @typedef {{
 *  selection: SelectionManagerController;
 * }} TableControllers
 */
