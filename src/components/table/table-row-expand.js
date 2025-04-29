import { html } from 'lit';
import { ContextConsumer } from '@lit/context';
import { state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { XBElement } from '../xb-element';
import { tableRowContext } from './table.context';
import { tableControlExpandStyles } from './table.styles';

import '../icon/icon.define';

export class TableRowExpand extends XBElement {
	static styles = [ tableControlExpandStyles() ];

	@state()
	accessor #isRowExpanded = false;

	#consumer = new ContextConsumer( this, {
		context: tableRowContext,
		subscribe: true,
		callback: ( contextValue ) => {
			this.#isRowExpanded = contextValue?.isExpanded;
		},
	} );

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-table-row-expand', ...config, type: TableRowExpand } );
	}

	connectedCallback() {
		super.connectedCallback();

		this.slot = 'row-controls-expand';

		this.addEventListener( 'click', this.#onClick );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.removeEventListener( 'click', this.#onClick );
	}

	render() {
		return html`
			<button
				type="button"
				class=${ classMap( {
					'expand-button': true,
					'-is-expanded': this.#isRowExpanded,
				} ) }
			>
				<xb-icon id="caret" name="caret-right"></xb-icon>
			</button>
		`;
	}

	#onClick = () => {
		if ( this.#isRowExpanded ) {
			this.emit( 'collapse' );
		} else {
			this.emit( 'expand' );
		}
	};
}
