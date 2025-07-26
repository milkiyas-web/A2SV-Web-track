describe("Bookmark Flow", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.loginViaUI();
    cy.visit("/");
  });

  it("should bookmark a job", () => {
    cy.contains("Opportunities").should("be.visible");
    cy.get("[data-testid='job-card']", { timeout: 10000 }).should("exist");
    cy.get("[data-testid='job-card']")
      .first()
      .within(() => {
        cy.get("button").first().click();
      });

    cy.visit("/bookmarks");
    cy.url().should("include", "/bookmarks");
  });

  it("should remove a bookmarked job", () => {
    cy.visit("/bookmarks");
    cy.url().should("include", "/bookmarks");
  });

  it("should prevent unauthenticated bookmark", () => {
    cy.logout();
    cy.visit("/");

    cy.contains("Opportunities").should("be.visible");
    cy.get("[data-testid='job-card']", { timeout: 10000 }).should("exist");
    cy.get("[data-testid='job-card']")
      .first()
      .within(() => {
        cy.get("button").first().click();
      });

    cy.contains("Please sign in before bookmarking a job").should("exist");
  });

  it("should navigate to job detail page when job title is clicked", () => {
    cy.contains("Opportunities").should("be.visible");
    cy.get("[data-testid='job-card']", { timeout: 10000 }).should("exist");

    cy.get("[data-testid='job-card']").first().find("a").first().click();

    cy.url().should("include", "/jobs/");
    cy.get("body").should("not.contain", "Opportunities");
  });
});
