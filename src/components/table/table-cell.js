import { html, css } from 'lit';
import { property } from 'lit/decorators.js';

import { XBElement } from '../xb-element';
import { tableCellStyles } from './table.styles';

export class TableCell extends XBElement {
  static styles = [ tableCellStyles() ];

  @property({ type: Number, reflect: true })
  accessor colspan = 1;

  @property({ type: String })
  accessor width;

  /**
	 * @param {{
  *  name: string,
  *  registry: CustomElementRegistry,
  * }} config
  */
  static define( config ) {
    XBElement.define( { name: 'xb-table-cell', ...config, type: TableCell } );
  }

  firstUpdated() {
    if (this.closest('xb-table-header')) {
      this.setAttribute('role', 'columnheader');
    } else {
      this.setAttribute('role', 'cell');
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('colspan')) {
      if (this.colspan > 1) {
        this.style.setProperty('--colspan', String(this.colspan));
        this.setAttribute('aria-colspan', this.colspan.toString());
      } else {

        this.removeAttribute('aria-colspan');
      }
    }
  }

	render() {
		return html`
			<div class="cell-container">
				<slot></slot>
			</div>
		`;
	}
}
