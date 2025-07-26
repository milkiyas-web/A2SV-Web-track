/// <reference types="cypress" />

// Custom command for login via UI
Cypress.Commands.add("loginViaUI", () => {
  cy.visit("/sign-in");
  cy.get("form").should("be.visible");
  cy.get('input[type="email"]').type("test@example.com");
  cy.get('input[type="password"]').first().type("password123");
  cy.get('button[type="submit"]').click();
  cy.url().should("include", "/");
});

Cypress.Commands.add("logout", () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.visit("/sign-in");
});

export {};
