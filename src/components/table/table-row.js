import { html, css, nothing } from 'lit';
import { ContextConsumer } from '@lit/context';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { trackSlot } from '../../decorators/track-slot';
import { areSetsEqual } from '../../utils/set';
import { XBElement } from '../xb-element';
import { tableContext } from './table.context';
import { tableRowStyles } from './table.styles';

import '../icon/icon.define';
import '../form/checkbox/checkbox.define';

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

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-table-row', ...config, type: TableRow } );
	}

	toggleExpand = () => {
		this.expanded = ! this.expanded;
		this.emit( 'expand' );
	};

	render() {
		const isSelectable = Boolean( this.#consumer.value?.selectable );
		const isExpandable = Boolean( this.#consumer.value?.expandable );

		return html`
			<div class="row-container">
				${ isSelectable || isExpandable
					? html`
							<div
								class="checkbox-container"
								style="display: flex; flex-flow: row nowrap; align-items: center; max-block-size: 72px; margin-inline-start: 24px; gap: 12px;"
							>
								${ isSelectable
									? html`
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
									  `
									: nothing }
								${ isExpandable
									? html`
											<button
												type="button"
												class=${ classMap( {
													'expand-button': true,
													'-has-expansion': this.hasExpansionContent,
												} ) }
												@click=${ this.toggleExpand }
											>
												<xb-icon id="caret" name="caret-right"></xb-icon>
											</button>
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
}
