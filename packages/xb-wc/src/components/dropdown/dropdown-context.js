import { createContext } from '@lit-labs/context';

/** @type {import('@lit-labs/context').Context<symbol, DropdownContext>} */
export const dropdownContext = createContext( Symbol( 'dropdown' ) );

/**
 * @typedef {Object} DropdownContext
 * @property {boolean} open
 * @property {boolean} disabled
 */
