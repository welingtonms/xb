import { html } from 'lit';
import { ContextConsumer } from '@lit/context';

import { areSetsEqual } from '../../utils/set';
import { XBElement } from '../xb-element';
import { tableContext } from './table.context';
import { tableControlSelectStyles } from './table.styles';

import '../form/checkbox/checkbox.define';

export class TableControlSelect extends XBElement {
	static styles = [ tableControlSelectStyles() ];
	#consumer = new ContextConsumer( this, {
		context: tableContext,
		subscribe: true,
	} );

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-table-control-select', ...config, type: TableControlSelect } );
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
					if ( this.isHeader ) {
						if ( this.selected ) {
							this.emit( 'unselect-all' );
						} else {
							this.emit( 'select-all' );
						}
					} else {
						this.emit( 'toggle' );
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
			this.isHeader &&
			this.#consumer.value?.selectedValues.size > 0 &&
			! areSetsEqual( this.#consumer.value?.allValues, this.#consumer.value?.selectedValues )
		);
	}

	get selected() {
		if ( this.isHeader ) {
			return areSetsEqual( this.#consumer.value?.allValues, this.#consumer.value?.selectedValues );
		}

		return this.#consumer.value?.selectedValues.has( this.value );
	}

	get isHeader() {
		return this.closest( 'xb-table-header' ) !== null;
	}
}
