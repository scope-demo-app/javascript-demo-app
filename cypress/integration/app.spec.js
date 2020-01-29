describe('app', () => {
  it('can click through the tabs', () => {
    cy.visit('/')
      .get('.tab1')
      .should('exist')
  })
})
