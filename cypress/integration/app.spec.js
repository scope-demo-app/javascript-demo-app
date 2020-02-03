describe('app', () => {
  it('can visit the app', () => {
    cy.visit('/')
      .findByText(/submit a new restaurant/i)
      .should('exist')
  })
})
