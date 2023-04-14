// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import mount from './mount';

// reference: https://docs.cypress.io/guides/component-testing/styling-components#Rules-for-Setting-Up-Your-Styles
import '@welingtonms/xb-tokens/dist/tokens/web/xb/variables.css';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       mount: typeof mount
//     }
//   }
// }

Cypress.Commands.add( 'mount', mount );

// Example use:
// cy.mount(<MyComponent />)
