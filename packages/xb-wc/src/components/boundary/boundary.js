import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import BoundaryController from '../../controllers/boundary';
import XBElement from '../../common/xb-element';

import styles from './boundary.styles';

@customElement( 'xb-boundary' )
export class InteractionBoundary extends XBElement {
	static styles = [ styles() ];

	/**
	 * Should the focus trap be active.
	 * @type {boolean}
	 */
	@property( { type: Boolean, reflect: true } ) active;

	/** @type {BoundaryController} */
	_controller;

	constructor() {
		super();

		this.active = false;

		this._controller = new BoundaryController( this );
	}

	/**
	 * @param {import('lit').PropertyValues<this>} changedProperties
	 */
	update( changedProperties ) {
		super.update( changedProperties );

		if ( changedProperties.has( 'active' ) ) {
			if ( this.active ) {
				this._controller.activate();
			} else {
				this._controller.deactivate();
			}
		}
	}

	render() {
		return html`
			<slot></slot>
		`;
	}

	activate = () => {
		if ( this.active ) {
			return;
		}

		this.active = true;
	};

	deactivate = () => {
		if ( ! this.active ) {
			return;
		}

		this.active = false;
	};
}
