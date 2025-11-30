import { isInsideElement } from '../../utils/events';
import { ToggleableController } from '../togglable.controller';

import createLogger from '../../utils/logger';

const logger = createLogger( 'boundary-controller' );

export class BoundaryController extends ToggleableController {
	/**
	 * @param {BoundaryControllerHost} host
	 * @param {boolean} [active] - Should the boundary check be active?
	 */
	constructor( host, active ) {
		super(host, {
			controllerType: 'boundary',
			active,
		});
	}


	activate() {
		this.#subscribe();
		super.activate();
	}

	deactivate() {
		this.#unsubscribe();
		super.deactivate();
	}

	#subscribe() {
		document.addEventListener('mousedown', this.#onEvent);
		document.addEventListener('touchend', this.#onEvent);
		document.addEventListener('focusout', this.#onFocusOutEvent);

		/** @type {ReactiveElement} */
		const hostAsElement = this.host;
		// eslint-disable-next-line prefer-destructuring
		const renderRoot = hostAsElement.renderRoot;
		if (renderRoot) {
			renderRoot.addEventListener('focusout', this.#handleInnerFocusOutEvent);
		}
	}

	#unsubscribe() {
		document.removeEventListener('mousedown', this.#onEvent);
		document.removeEventListener('touchend', this.#onEvent);
		document.removeEventListener('focusout', this.#onFocusOutEvent);

		/** @type {ReactiveElement} */
		const hostAsElement = this.host;
		// eslint-disable-next-line prefer-destructuring
		const renderRoot = hostAsElement.renderRoot;
		if (renderRoot) {
			renderRoot.removeEventListener(
				'focusout',
				this.#handleInnerFocusOutEvent,
			);
		}
	}

	/**
	 * @param {MouseEvent | TouchEvent} event
	 */
	#onEvent = (event) => {
		if (!this.active) {
			return;
		}

		const isInside = isInsideElement(event, this.host);

		if (!isInside) {
			event.stopPropagation();
			this.host.dispatchEvent(new CustomEvent('xb:interact-out'));
		}
	};

	/**
	 * @param {FocusEvent} event
	 */
	#handleInnerFocusOutEvent = (event) => {
		if (!this.active) {
			return;
		}

		/**
		 * The target element is the element that lost focus.
		 */
		const { relatedTarget } = event;

		/**
		 * FIXME: when the user navigate to a different frame, the relatedTarget is null,
		 * the same happens when, for example in the date picker, the user navigates, via
		 * keyboard to the previous or next month.
		 * With the event alone we can't tell the difference to act accordingly, that's
		 * why we check if the relatedTarget, which is the new element receiving focus, is
		 * not null
		 */
		if (!relatedTarget || !this.host.shadowRoot) {
			return;
		}

		const doesHostContainRelatedTarget =
			this.host.shadowRoot.contains(relatedTarget) ||
			this.host.contains(relatedTarget);

		if (!doesHostContainRelatedTarget) {
			event.stopPropagation();
			this.host.dispatchEvent(new CustomEvent('xb:interact-out'));
		}
	};

	/**
	 * @param {FocusEvent} event
	 */
	#onFocusOutEvent = (event) => {
		if (!this.active) {
			return;
		}

		const { relatedTarget } = event;

		/**
		 * FIXME: when the user navigate to a different frame, the relatedTarget is null,
		 * the same happens when, for example in the date picker, the user navigates, via
		 * keyboard to the previous or next month.
		 * With the event alone we can't tell the difference to act accordingly, that's
		 * why we check if the relatedTarget, which is the new element receiving focus, is
		 * not null
		 */
		if (!relatedTarget) {
			return;
		}

		if (!this.host.contains(relatedTarget)) {
			event.stopPropagation();
			this.host.dispatchEvent(new CustomEvent('xb:interact-out'));
		}
	};
}

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('../xb-element').default} XBElement
 */

/**
 * @typedef {ReactiveControllerHost & XBElement} BoundaryControllerHost
 */
