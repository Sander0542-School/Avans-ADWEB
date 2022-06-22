describe('Login test', () => {
  it('Test login and logout', () => {
    cy.login()
    cy.logout()
  })
})
