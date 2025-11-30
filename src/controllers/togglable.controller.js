import { StackableController } from './stackable-controller';

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('lit').ReactiveController} ReactiveController
 */

/**
 * @typedef {{
 * 	active?: boolean;
 * 	controllerType: string;
 * }} ToggleableControllerOptions
 */

/**
 * A controller that can be toggled on/off and manages its lifecycle.
 * @implements {ReactiveController}
 */
export class ToggleableController {
	/**
	 * @type {ReactiveControllerHost}
	 */
	host;

	/**
	 * @type {StackableController}
	 */
	stack;

	/**
	 * @param {ReactiveControllerHost} host
	 * @param {[ToggleableControllerOptions]} options
	 */
	constructor( host, options ) {
		const active = Boolean(options?.active ?? false);

		this.stack = StackableController.getInstance(options?.controllerType);

		if (active) {
			this.stack.pushController(this);
		}

		(this.host = host).addController(this);
	}

	get active() {
		return this.stack.isActive(this);
	}

	connect() {
		this.host.addController(this);
	}

	hostConnected() {
		if (this.active) {
			this.activate();
		}
	}

	hostDisconnected() {
		if (this.active) {
			this.deactivate();
		}
	}

	activate() {
		if (this.active) {
			return;
		}

		this.stack.pushController(this);
	}

	deactivate() {
		if (!this.active) {
			return;
		}

		this.stack.popController(this);
	}
}
