describe("Do Login", () => {
  it("should do Login", () => {
    cy.visit("/login");
    cy.get('[data-cy="login"]').should("be.visible");

    cy.get('[data-cy="login"]').type("ygoazambuja");
    cy.get('[data-cy="password"]').type("ygoazambuja");
    cy.get('[data-cy="loginButton"]').click();
  });

  it("should choose profile", () => {
    // cy.url().should("include", "/perfis");
    cy.get(".title > span")
      .should("be.visible")
      .and("contain", "Quem está assistindo ?");

    cy.get(":nth-child(1) > .profile-card__avatar > img").click();
  });

  it("should choose movie", () => {
    // cy.url().should("eq", "http://localhost:5050/");
    cy.get(".navigation-list__title > :nth-child(2)")
      .should("be.visible")
      .and("contain", "Jera-IMDB");
  });
});
