import * as React from 'react';
import { createComponent as litCreateComponent } from '@lit/react';

/**
 * @param {Omit<Options, 'react'>} args
 */
function createComponent(args) {
	return litCreateComponent({
		react: React,
		...args,
	});
}

export default createComponent;

/**
 * @typedef {import('@lit/react').EventName} EventName
 * @typedef {Record<string, EventName | string>} EventNames // based on node_modules/@lit/react/create-component.d.ts
 * @typedef {import('@lit/react').Options<HTMLElement, EventNames>} Options
 */
