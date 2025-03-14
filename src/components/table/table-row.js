import { html, css, nothing } from 'lit';
import { ContextProvider, ContextConsumer } from '@lit/context';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { trackSlot } from '../../decorators/track-slot';
import { areSetsEqual } from '../../utils/set';
import { XBElement } from '../xb-element';
import { tableContext, tableRowContext } from './table.context';
import { tableRowStyles } from './table.styles';

import '../icon/icon.define';
import '../form/checkbox/checkbox.define';

import './table-control-select';
import './table-control-expand';

export class TableRow extends XBElement {
	static styles = [ tableRowStyles() ];

	@property( { type: Boolean, reflect: true } )
	accessor expanded = false;

	@property( { type: String, reflect: true } )
	accessor value;

	@state()
	accessor #gridTemplate = 'minmax(0, 1fr)';

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
			this.#gridTemplate = contextValue?.gridTemplate || 'minmax(0, 1fr)';
		},
	} );

	#provider = new ContextProvider( this, {
		context: tableRowContext,
		value: {
			isExpanded: false,
			isHeader: false,
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

	connectedCallback() {
		super.connectedCallback();

		this.addEventListener( 'expand', this.#toggleExpand );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.removeEventListener( 'expand', this.#toggleExpand );
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
									? html`
											<slot name="row-controls-select"></slot>
									  `
									: nothing }
								${ isExpandable
									? html`
											<slot name="row-controls-expand">
												<xb-table-control-expand
													?hidden=${ ! this.hasExpansionContent || this.isHeader }
												></xb-table-control-expand>
											</slot>
									  `
									: nothing }
							</div>
					  `
					: nothing }
				<div class="content-container">
					<div class="cells-container" style="grid-template-columns: ${ this.#gridTemplate }">
						<slot></slot>
					</div>
					<div
						class="expansion-container"
						role="row"
						aria-hidden="${ ! this.expanded }"
						style="grid-template-columns: ${ this.#gridTemplate }"
					>
						<slot name="expansion"></slot>
					</div>
				</div>
			</div>
		`;
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

	#toggleExpand = ( event ) => {
		this.expanded = ! this.expanded;

		this.#updateContext();
	};

	#updateContext = () => {
		this.#provider.value = {
			isExpanded: this.expanded,
			isHeader: this.isHeader,
		};
	};
}
