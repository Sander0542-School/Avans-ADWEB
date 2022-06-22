describe('Homepage test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Checkbook')
    cy.contains('home works!')
  })
})
