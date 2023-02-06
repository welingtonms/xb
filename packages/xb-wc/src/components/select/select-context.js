import { ContextProvider, ContextRoot, createContext } from '@lit-labs/context';

export const root = new ContextRoot();
/** @type {import('@lit-labs/context').Context<,SelectContext>} */
export const selectContext = createContext( 'select' );

/**
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionState} SelectionState
 */

/**
 * @typedef {Object} SelectContext
 * @property {boolean} multiple
 * @property {boolean} disabled
 * @property {boolean} loading
 * @property {SelectionState} selection
 */
