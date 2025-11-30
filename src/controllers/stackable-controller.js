/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('lit').ReactiveController} ReactiveController
 */

import createLogger from '../utils/logger';

const logger = createLogger('stackable-controller');

/**
 * This class is used to manage the context of a controller.
 * It is specially useful when we have nested components that need to handle
 * events via the same controller.
 */
export class StackableController {
    /** @type {Map<string, StackableController>} */
	static instances = new Map();

	controllerStack = [];

    /**
     * @param {string} controllerType
     * @returns {StackableController}
     */
	static getInstance(controllerType) {
		if (!this.instances.has(controllerType)) {
			this.instances.set(controllerType, new StackableController());
		}

		return this.instances.get(controllerType);
	}

    /**
     * @param {ReactiveController} controller
     */
	pushController(controller) {
		if (this.isActive(controller)) {
			logger.debug('pushController', 'Controller already active', controller);
			return;
		}

		if (this.hasController(controller)) {
			logger.debug('pushController', 'Controller already in stack', controller);
			return;
		}

		this.controllerStack.push(controller);
	}

	getActiveController() {
		if (this.controllerStack.length === 0) {
			return null;
		}

		return this.controllerStack[this.controllerStack.length - 1];
	}

    /**
     * @param {ReactiveController} controller
     */
	popController(controller) {
		if (this.controllerStack.length === 0) {
			return;
		}

		do {
			const poppedController = this.controllerStack.pop();

			if (poppedController === controller) {
				break;
			}
		} while (this.controllerStack.length > 0);
	}

    /**
     * @param {ReactiveController} controller
     */
	isActive(controller) {
		if (this.controllerStack.length === 0) {
			return false;
		}

		return this.controllerStack[this.controllerStack.length - 1] === controller;
	}

    /**
     * @param {ReactiveController} controller
     */
	hasController(controller) {
		return this.controllerStack.includes(controller);
	}
}
