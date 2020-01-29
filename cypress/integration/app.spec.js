describe('app', () => {
  it('can click through the tabs', () => {
    cy.visit('/')
      .findByText(/tab 1/i)
      .should('exist')
  })
})
