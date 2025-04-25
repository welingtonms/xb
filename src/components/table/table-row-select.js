import { html } from 'lit';
import { ContextConsumer } from '@lit/context';
import { state } from 'lit/decorators.js';

import { areSetsEqual } from '../../utils/set';
import { tableContext, tableRowContext } from './table.context';
import { tableControlSelectStyles } from './table.styles';
import { XBElement } from '../xb-element';

import '../form/checkbox/checkbox.define';

export class TableRowSelect extends XBElement {
	static styles = [ tableControlSelectStyles() ];

	@state()
	accessor #isHeaderRow = false;

	#tableContextConsumer = new ContextConsumer( this, {
		context: tableContext,
		subscribe: true,
	} );

	#tableRowContextConsumer = new ContextConsumer( this, {
		context: tableRowContext,
		subscribe: true,
		callback: ( contextValue ) => {
			this.#isHeaderRow = contextValue?.isHeaderRow ?? false;
		},
	} );

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-table-row-select', ...config, type: TableRowSelect } );
	}

	connectedCallback() {
		super.connectedCallback();

		this.slot = 'row-controls-select';
	}

	render() {
		return html`
			<xb-checkbox
				?indeterminate=${ this.indeterminate }
				?checked=${ this.selected }
				@change=${ () => {
					if ( this.#isHeaderRow ) {
						if ( this.selected ) {
							this.emit( 'unselect-all' );
						} else {
							this.emit( 'select-all' );
						}
					} else {
						if ( this.selected ) {
							this.emit( 'unselect' );
						} else {
							this.emit( 'select' );
						}
					}
				} }
			></xb-checkbox>
		`;
	}

	get value() {
		return this.closest( 'xb-table-row' )?.value;
	}

	get indeterminate() {
		return (
			this.#isHeaderRow &&
			this.#tableContextConsumer.value?.selectedValues.size > 0 &&
			! areSetsEqual(
				this.#tableContextConsumer.value?.allValues,
				this.#tableContextConsumer.value?.selectedValues
			)
		);
	}

	get selected() {
		if ( this.#isHeaderRow ) {
			return areSetsEqual(
				this.#tableContextConsumer.value?.allValues,
				this.#tableContextConsumer.value?.selectedValues
			);
		}

		return this.#tableContextConsumer.value?.selectedValues.has( this.value );
	}
}
