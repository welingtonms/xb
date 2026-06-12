import { RovingFocusController } from '../focus-manager';
import { KeyboardSupportController } from '../keyboard-support';
import { isFocusable, isNotHidden, QueryController } from '../query';
import { SelectionManagerController } from '../selection-manager';

/**
 * Focus, keyboard, and selection policy for a combobox disclosure host.
 *
 * Host must extend {@link DisclosureFloatingElement} and supply selection callbacks.
 *
 * @implements {import('lit').ReactiveController}
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/combobox/ ARIA APG, Combobox Pattern}
 */
export class ComboboxPatternController {
	/** @type {ComboboxPatternControllerHost} */
	host;

	/** @type {ComboboxPatternControllers} */
	controllers;

	/** @type {ComboboxPatternControllerOptions} */
	#options;

	/**
	 * @param {ComboboxPatternControllerHost} host
	 * @param {ComboboxPatternControllerOptions} [options]
	 */
	constructor( host, options = {} ) {
		this.host = host;
		this.#options = options;

		this.controllers = {
			query: new QueryController( host, {
				getMembers: ( comboboxHost ) => comboboxHost.slottedOptions ?? [],
			} ),
			focus: new RovingFocusController( host, {
				getFocusable: () => {
					return this.controllers.query.filter( isFocusable, isNotHidden );
				},
				searchable: false,
			} ),
			keyboard: new KeyboardSupportController(
				host,
				[
					{
						shortcut: {
							key: 'ArrowUp',
						},
						handler: async () => {
							await this.#handleArrowUp();
						},
					},
					{
						shortcut: {
							key: 'ArrowDown',
						},
						handler: async () => {
							await this.#handleArrowDown();
						},
					},
					{
						shortcut: {
							key: 'Enter',
						},
						handler: ( event ) => {
							this.#handleEnter( event );
						},
					},
					{
						shortcut: {
							key: 'Escape',
						},
						handler: ( event ) => {
							this.#handleEscape( event );
						},
					},
				],
				{
					getControllerTarget: () => {
						return this.#options.getControllerTarget?.( this.host ) ?? this.host;
					},
				}
			),
			selection: new SelectionManagerController( host, {
				getSelectionType: () => {
					return this.#options.getSelectionType?.( this.host ) ?? this.host.type;
				},
			} ),
		};

		host.addController( this );
	}

	get focus() {
		return this.controllers.focus;
	}

	get keyboard() {
		return this.controllers.keyboard;
	}

	get selection() {
		return this.controllers.selection;
	}

	get query() {
		return this.controllers.query;
	}

	async #handleArrowUp() {
		if ( ! this.host.open ) {
			this.host.expand();

			await this.host.updateComplete;

			const firstSelected = this.#options.getFirstSelected?.( this.host );

			if ( firstSelected ) {
				this.controllers.focus.focus( firstSelected );
			} else {
				this.controllers.focus.focusLast();
			}
		} else {
			this.controllers.focus.focusPrevious();
		}
	}

	async #handleArrowDown() {
		if ( ! this.host.open ) {
			this.host.expand();

			await this.host.updateComplete;

			const firstSelected = this.#options.getFirstSelected?.( this.host );

			if ( firstSelected ) {
				this.controllers.focus.focus( firstSelected );
			} else {
				this.controllers.focus.focusFirst();
			}
		} else {
			this.controllers.focus.focusNext();
		}
	}

	/**
	 * @param {KeyboardEvent} event
	 */
	#handleEnter( event ) {
		/** @type {HTMLElement} */
		const element = event.target;

		if ( ! element.matches( 'xb-option' ) ) {
			return;
		}

		if ( this.host.open ) {
			/** @type {HTMLElement | null} */
			const option = this.controllers.focus.focused;

			if ( ! option || option.disabled ) {
				return;
			}

			this.#options.toggleValue?.( this.host, option.value );

			if ( this.host.type !== 'multiple' ) {
				this.host.collapse( { focusOnTrigger: true } );
			}
		}
	}

	/**
	 * @param {KeyboardEvent} event
	 */
	#handleEscape( event ) {
		const { target } = event;

		if ( ! target ) {
			return;
		}

		if ( this.host.open ) {
			this.host.collapse( { focusOnTrigger: true } );
		}
	}
}

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('../../components/disclosure-floating-element').DisclosureFloatingElement} DisclosureFloatingElement
 * @typedef {import('../../utils/selection').SelectionType} SelectionType
 * @typedef {import('../focus-manager/roving-focus.controller').RovingFocusController} RovingFocusController
 * @typedef {import('../keyboard-support/keyboard-support.controller').KeyboardSupportController} KeyboardSupportController
 * @typedef {import('../selection-manager/selection-manager.controller').SelectionManagerController} SelectionManagerController
 */

/**
 * @typedef {Object} ComboboxPatternControllerOptions
 * @property {function(ComboboxPatternControllerHost): SelectionType} [getSelectionType]
 * @property {function(ComboboxPatternControllerHost): HTMLElement | null | undefined} [getFirstSelected]
 * @property {function(ComboboxPatternControllerHost, string): void} [toggleValue]
 * @property {function(ComboboxPatternControllerHost): EventTarget} [getControllerTarget]
 */

/**
 * @typedef {ReactiveControllerHost & DisclosureFloatingElement & {
 * 	type: SelectionType;
 * 	slottedOptions?: HTMLElement[];
 * 	expand: (args?: import('../../components/disclosure-floating-element').DisclosureExpandArgs) => void | Promise<void>;
 * 	collapse: (args?: import('../../components/disclosure-floating-element').DisclosureCollapseArgs) => void | Promise<void>;
 * }} ComboboxPatternControllerHost
 */

/**
 * @typedef {import('../query').QueryController} QueryController
 */

/**
 * @typedef {{
 * 	query: QueryController;
 * 	focus: RovingFocusController;
 * 	keyboard: KeyboardSupportController;
 * 	selection: SelectionManagerController;
 * }} ComboboxPatternControllers
 */
