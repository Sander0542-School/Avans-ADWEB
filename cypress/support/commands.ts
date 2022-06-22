Cypress.Commands.add("login", () => {
  const email = "admin@cypress.test";
  const password = "Password1234";

  cy.logout();

  cy.get('#loginEmail').type(email, {force: true});
  cy.get('#loginPassword').type(password, {force: true});
  cy.get('#loginEmailPassword').click({force: true});

  cy.contains(email);
})

Cypress.Commands.add('logout', () => {
  cy.visit('/');

  cy.get('#userMenu').then(($elem) => {
    cy.get('#userMenu').click();
    cy.get('#logout').click();
  })
})

Cypress.Commands.add('openCheckbook', (checkbookName) => {
  cy.visit('/checkbooks');

  cy.contains('tr', checkbookName)
    .find('button')
    .contains('View')
    .click()
})
