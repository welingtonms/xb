import { property } from 'lit/decorators.js';

import ListboxPatternController from '../../controllers/listbox-pattern';
import { WithSelectionMixin } from '../../mixins/with-selection';
import { toAttribute } from '../../mixins/with-selection/with-selection.helpers';
import { XBElement } from '../xb-element';

import { BaseList } from './base-list';

export class List extends WithSelectionMixin( BaseList ) {
	/** @type {ListboxPatternController} */
	#pattern;

	/**
	 * Current selection reflected for consumers.
	 * @type {string | undefined}
	 */
	@property( { type: String, attribute: 'value', reflect: true } ) accessor value;

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-list', ...config, type: List } );
	}

	constructor() {
		super();

		this.#pattern = new ListboxPatternController( this, {
			getSelectionType: () => {
				return this.type ?? 'single';
			},
		} );
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'role', 'listbox' );
		this.setAttribute( 'tabindex', '0' );

		this.addEventListener( 'change', this.#onPatternChange );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.removeEventListener( 'change', this.#onPatternChange );
	}

	async firstUpdated() {
		await this.updateComplete;

		this.#updateMultiselectable();
		this.#initialize( this.getAttribute( 'value' ) );
	}

	/**
	 * @param {import('lit').PropertyValues} changedProperties
	 */
	update( changedProperties ) {
		if ( changedProperties.has( 'type' ) ) {
			this.#updateMultiselectable();
		}

		super.update( changedProperties );
	}

	handleFormReset = () => {
		this.#initialize( this.getAttribute( 'initial-value' ) ?? this.getAttribute( 'value' ) );
	};

	get query() {
		return this.#pattern.query;
	}

	#initialize( value ) {
		this.#pattern.selection.init( this.getRawValue( value ) );
		this.#updateItems();
		this.#syncValueAttribute();
	}

	#onPatternChange = () => {
		this.#updateItems();
		this.#syncValueAttribute();
	};

	#updateItems = () => {
		for ( const item of this.#pattern.query.members ) {
			item.selected = this.#pattern.selection.has( item.value );
		}
	};

	#syncValueAttribute = () => {
		const nextValue = this.#pattern.selection.value();

		this.value = toAttribute( nextValue );
	};

	#updateMultiselectable = () => {
		if ( this.type === 'multiple' ) {
			this.setAttribute( 'aria-multiselectable', 'true' );
		} else {
			this.removeAttribute( 'aria-multiselectable' );
		}
	};
}

/**
 * @typedef {import('./base-list').BaseListAttributes} BaseListAttributes
 */

/**
 * @typedef {BaseListAttributes & {
 * 	value?: string;
 * }} ListAttributes
 */
