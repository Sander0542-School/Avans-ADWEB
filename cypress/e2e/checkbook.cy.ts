describe('Checkbook test', () => {
  let checkbookName: string;
  let categoryName: string = "Groceries";

  before(() => {
    checkbookName = `Checkbook ${new Date().getTime()}`;
  })

  beforeEach(() => {
    cy.login();
  })

  it(('Visits the checkbook'), () => {
    cy.visit('/checkbooks');

    cy.contains(checkbookName).should('not.exist');
  })

  it('Create the checkbook', () => {
    cy.visit('/checkbooks');

    cy.contains('Add checkbook').click();

    cy.get('input[formcontrolname="name"]').type(checkbookName);
    cy.get('input[formcontrolname="description"]').type('Cypress Checkbook');
    cy.get('button').contains('Save').click();

    cy.contains(checkbookName);
  })

  it(('Archive and restore checkbook'), () => {
    cy.visit('/checkbooks');

    cy.contains('tr', checkbookName)
      .find('button')
      .contains('Archive')
      .click()

    cy.contains('tr', checkbookName).should('not.exist');

    cy.get('a')
      .contains('Archived Checkbooks')
      .click();

    cy.contains('tr', checkbookName)
      .find('button')
      .contains('Restore')
      .click()

    cy.get('a').contains('Checkbooks').click();
    cy.contains(checkbookName);
  })

  it('Create category', () => {
    cy.openCheckbook(checkbookName);

    cy.get('div[role="tab"]').contains('Categories').click();

    cy.get('button').contains('Add Category').click();

    cy.get('input[formcontrolname="name"]').type(categoryName);
    cy.get('input[formcontrolname="budget"]').type('150');
    cy.get('button').contains('Save').click();

    cy.contains('app-category-transactions', categoryName)
  })

  it('Edit category', () => {
    cy.openCheckbook(checkbookName);

    cy.get('div[role="tab"]').contains('Categories').click();

    cy.contains('app-category-transactions', categoryName)
      .contains('button', 'Edit')
      .click()

    cy.get('input[formcontrolname="name"]').clear().type(categoryName);
    cy.get('input[formcontrolname="budget"]').clear().type('200');
    cy.get('button').contains('Save').click();

    cy.contains('app-category-transactions', categoryName)
      .contains('Budget: 200')
  })

  it('Create transaction', () => {
    cy.openCheckbook(checkbookName);

    cy.get('div[role="tab"]').contains('Categories').click();

    cy.contains('app-category-transactions', categoryName)
      .find('button')
      .contains('Add transaction')
      .click();

    cy.get('input[formcontrolname="value"]').type('75');
    cy.get('button').contains('Save').click();

    cy.contains('app-category-transactions', categoryName)
      .contains('75')
  })

  it('Edit transaction', () => {
    cy.openCheckbook(checkbookName);

    cy.get('div[role="tab"]').contains('Categories').click();

    cy.contains('app-category-transactions', categoryName)
      .contains('mat-list-item', '75')
      .find('button')
      .contains('Edit')
      .click();

    cy.get('input[formcontrolname="value"]').clear().type('100');
    cy.get('button').contains('Save').click();

    cy.contains('app-category-transactions', categoryName)
      .contains('100')
  })

  it('Contains transaction', () => {
    cy.openCheckbook(checkbookName);

    cy.get('div[role="tab"]').contains('Transactions').click();

    cy.contains('mat-chip', '100')
  })

  it('Delete transaction', () => {
    cy.openCheckbook(checkbookName);

    cy.get('div[role="tab"]').contains('Categories').click();

    cy.contains('app-category-transactions', categoryName)
      .contains('mat-list-item', '100')
      .find('button')
      .contains('Delete')
      .click();

    cy.contains('app-category-transactions', categoryName)
      .contains('100')
      .should('not.exist');
  })

  it('Delete category', () => {
    cy.openCheckbook(checkbookName);

    cy.get('div[role="tab"]').contains('Categories').click();

    cy.contains('app-category-transactions', categoryName)
      .find('button')
      .contains('Delete')
      .click();

    cy.contains('app-category-transactions', categoryName)
      .should('not.exist');
  })
})
