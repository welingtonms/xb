import { html, css, nothing } from 'lit';
import { ContextProvider, ContextConsumer } from '@lit/context';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { WithIDMixin } from '../../mixins/with-id';
import { trackSlot } from '../../decorators/track-slot';
import { areSetsEqual } from '../../utils/set';
import { XBElement } from '../xb-element';
import { tableContext, tableRowContext } from './table.context';
import { tableRowStyles } from './table.styles';

import './table-row-select';
import './table-row-expand';

export class TableRow extends WithIDMixin( XBElement ) {
	static styles = [ tableRowStyles() ];

	@property( { type: String, reflect: true } )
	accessor value;

	@state()
	accessor #gridColumns = 'minmax(0, 1fr)';

	/**
	 * Whether the row has expansion content.
	 * @type {boolean}
	 */
	@trackSlot( 'expansion' )
	accessor hasExpansionContent;

	#consumer = new ContextConsumer( this, {
		context: tableContext,
		subscribe: true,
		callback: ( contextValue ) => {
			this.#gridColumns = contextValue?.gridColumns || 'minmax(0, 1fr)';

			this.#updateContext();
		},
	} );

	#provider = new ContextProvider( this, {
		context: tableRowContext,
		initialValue: {
			isExpanded: false,
			isHeaderRow: false,
		},
	} );

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-table-row', ...config, type: TableRow } );
	}

	firstUpdated() {
		this.#updateContext();
	}

	render() {
		const isSelectable = Boolean( this.#consumer.value?.selectable );
		const isExpandable = Boolean( this.#consumer.value?.expandable );

		return html`
			<div class="row-container">
				${ isSelectable || isExpandable
					? html`
							<div
								class=${ classMap( {
									'row-controls': true,
									'-is-selectable': isSelectable,
									'-is-expandable': isExpandable,
								} ) }
							>
								${ isSelectable
									? /**
									   * we hide the default slotted table-row-select for layout purposes so, it any
									   * row is not selectable, it will not affect the layout of the row
									   */
									  html`
											<slot name="row-controls-select">
												<xb-table-row-select hidden></xb-table-row-select>
											</slot>
									  `
									: nothing }
								${ isExpandable
									? /**
									   * we hide the table-row-expand by default for two reasons:
									   * 1) we didn't detect there is expansion content
									   * 2) if it's a header, we don't want to render it (it's uncommon to have a header with expansion content)
									   * in both cases, we render it as invisible for layout purposes
									   */
									  html`
											<slot name="row-controls-expand">
												<xb-table-row-expand
													?hidden=${ ! this.hasExpansionContent || this.isHeaderRow }
												></xb-table-row-expand>
											</slot>
									  `
									: nothing }
							</div>
					  `
					: nothing }
				<div class="content-container">
					<div class="cells-container" style="grid-template-columns: ${ this.#gridColumns }">
						<slot></slot>
					</div>
					<div
						role="row"
						aria-hidden="${ ! this.expanded }"
						style="grid-template-columns: ${ this.#gridColumns }"
						class=${ classMap( {
							'expansion-container': true,
							'is-expanded': this.expanded,
						} ) }
					>
						<slot name="expansion"></slot>
					</div>
				</div>
			</div>
		`;
	}

	get expanded() {
		return this.#consumer.value?.expandedRows.has( this.id );
	}

	get isHeaderRow() {
		return this.closest( 'xb-table-header' ) !== null;
	}

	#updateContext = () => {
		this.#provider.value = {
			isExpanded: this.expanded,
			isHeaderRow: this.isHeaderRow,
		};
	};
}
