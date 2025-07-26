/// <reference types="cypress" />

// Custom command for login via UI
Cypress.Commands.add("loginViaUI", () => {
  cy.visit("/sign-in");
  // Wait for form to load
  cy.get("form").should("be.visible");
  // Fill in email field (using the form field structure)
  cy.get('input[type="email"]').type("test@example.com");
  // Fill in password field
  cy.get('input[type="password"]').first().type("password123");
  // Submit the form
  cy.get('button[type="submit"]').click();
  // Wait for redirect to home page (not /jobs)
  cy.url().should("include", "/");
});

// Custom command for logout
Cypress.Commands.add("logout", () => {
  // Clear all cookies and localStorage to simulate logout
  cy.clearCookies();
  cy.clearLocalStorage();
  // Visit the sign-in page to ensure we're logged out
  cy.visit("/sign-in");
});

export {};
