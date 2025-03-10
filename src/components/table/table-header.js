import { html, css } from 'lit';

import { XBElement } from '../xb-element';
import { tableHeaderStyles } from './table.styles';

export class TableHeader extends XBElement {
  static styles = [ tableHeaderStyles() ];

  /**
	 * @param {{
  *  name: string,
  *  registry: CustomElementRegistry,
  * }} config
  */
	static define( config ) {
		XBElement.define( { name: 'xb-table-header', ...config, type: TableHeader } );
	}

  render() {
    return html`
      <div class="header-container">
        <slot></slot>
      </div>
    `;
  }
}
