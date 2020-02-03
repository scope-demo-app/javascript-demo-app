describe('app', () => {
  it('can visit the app', () => {
    cy.visit('/')
      .getByText(/submit a new restaurant/i)
      .should('exist')
  })
})
