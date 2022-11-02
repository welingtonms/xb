import { html } from 'lit';
import withClassy from '@welingtonms/classy';

import { TOGGLE_EVENT } from './toggle-group.constants';
import SelectionController from '../../controllers/selection';
import styles from './toggle-group.styles';
import XBElement from '../../common/xb-element';

import '../layout/cluster';

export class ToggleGroup extends XBElement {
	static styles = [ styles() ];

	/** @type {SelectionController} */
	selectionController;

	/** @type {HTMLSlotElement} */
	defaultSlot;

	static get properties() {
		return {
			/**
			 * Strategy for toggling.
			 * @type {import('@welingtonms/xb-toolset/dist/selection').SelectionType}
			 */
			type: { type: String },

			/**
			 * Aria role
			 * @type {'group' | 'radiogroup'}
			 */
			role: {
				type: String,
				reflect: true,
			},

			_selection: {
				state: true,
			},
		};
	}

	constructor() {
		super();

		this.type = 'single-strict';
		this.role = [ 'single', 'single-strict' ].includes( this.type )
			? 'radiogroup'
			: 'group';

		/** @type {import('@welingtonms/xb-toolset/dist/selection').SelectionState} */
		this._selection = new Set();
	}

	connectedCallback() {
		super.connectedCallback();

		this.selectionController = new SelectionController(
			this,
			this.type,
			TOGGLE_EVENT
		);
	}

	firstUpdated() {
		this.defaultSlot = this.renderRoot?.querySelector( 'slot' );

		this._handleSlotChange();
	}

	updated() {
		this._getToggles().forEach( ( toggle ) => {
			toggle.checked = this._selection.has( toggle.value );
		} );
	}

	render() {
		const { classy, when } = withClassy( { type: this.type } );

		// TODO: add proper accessibility features
		return html`
			<xb-cluster
				class=${ classy( 'toggle-group', {
					'-single': when( { type: [ 'single', 'single-strict' ] } ),
					'-multiple': when( { type: 'multiple' } ),
				} ) }
				borderless="none"
				paddingless="none"
				?disabled="${ this.disabled }"
			>
				<slot @slotchange=${ this._handleSlotChange }></slot>
			</xb-cluster>
		`;
	}

	_handleSlotChange() {
		this._getToggles().forEach( ( toggle ) => {
			toggle.setAttribute(
				'role',
				[ 'single', 'single-strict' ].includes( this.type )
					? 'radio'
					: 'checkbox'
			);
		} );
	}

	_getToggles() {
		return [ ...this.defaultSlot.assignedElements( { flatten: true } ) ].filter(
			( item ) => item.tagName.toLowerCase() === 'xb-toggle'
		);
	}
}

window.customElements.define( 'xb-toggle-group', ToggleGroup );

// @ts-ignore
// declare global {
//   interface HTMLElementTagNameMap {
//     "xb-toggle-group": ToggleGroup;
//   }
// }

/**
 * @typedef {('text' | 'ghost' | 'flat')} ButtonEmphasis
 * @typedef {('small' | 'medium' | 'large')} ButtonSize
 */
