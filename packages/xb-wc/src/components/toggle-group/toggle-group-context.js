import { createContext } from '@lit-labs/context';

/** @type {import('@lit-labs/context').Context<symbol, ToggleGroupContext>} */
export const toggleGroupContext = createContext( Symbol( 'toggleGroup' ) );

/**
 * @typedef {Object} ToggleGroupContext
 * @property {boolean} disabled
 * @property {ElementSize} size
 * @property {SelectionType} selection
 */

/**
 * @typedef {import('../../styles/size.styles').ElementSize} ElementSize
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionType} SelectionType
 */
