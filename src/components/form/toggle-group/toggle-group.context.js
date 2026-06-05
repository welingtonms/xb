import { createContext } from '@lit/context';

/**
 * @type {ToggleGroupContext}
 */
export const toggleGroupContext = createContext( Symbol( 'toggle-group' ) );

/**
 * @typedef {Object} ToggleGroupContext
 * @property {boolean} disabled
 * @property {SelectionType} type
 */

/** @typedef {import('@lit/context').Context<Symbol, ToggleGroupContext>} ToggleGroupContext */
/** @typedef {import('../../../utils/selection').SelectionType} SelectionType */
