describe("Do Login", () => {
  it("complete login to home", () => {
    cy.visit("/login");
    cy.get('[data-cy="login"]').should("be.visible");

    cy.get('[data-cy="login"]').type("ygoazambuja");
    cy.get('[data-cy="password"]').type("ygoazambuja");
    cy.get('[data-cy="loginButton"]').click();

    // cy.url().should("include", "/perfis");
    cy.get(".title > span")
      .should("be.visible")
      .and("contain", "Quem está assistindo ?");

    cy.get(":nth-child(1) > .profile-card__avatar > img").click();
    // cy.url().should("eq", "http://localhost:5050/");
    cy.get(".navigation-list__title > :nth-child(2)")
      .should("be.visible")
      .and("contain", "Jera-IMDB");
  });
});
