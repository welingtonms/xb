import { createContext } from '@lit/context';

/**
 * @type {RadioGroupContext}
 */
export const radioGroupContext = createContext( Symbol( 'radio-group' ) );

/**
 * @typedef {Object} RadioGroupContext
 * @property {boolean} disabled
 */

/** @typedef {import('@lit/context').Context<Symbol, RadioGroupContext>} RadioGroupContext */

// import { createContext } from '@lit/context';

// export type AccordionContext = {
// 	disabled: boolean;
// 	expanded: boolean;
// };

// export const accordionContext = createContext<AccordionContext>(
// 	Symbol('accordion'),
// );
