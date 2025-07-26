/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      loginViaUI(): Chainable<void>;
      logout(): Chainable<void>;
    }
  }
}

export {};
