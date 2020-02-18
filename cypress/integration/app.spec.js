const fileName = 'scope.png'

describe('integration tests', () => {
  const restaurantToAdd = `newrestaurant${1 + Math.floor(Math.random() * 1e6)}`

  it('can visit the app', () => {
    cy.visit('/')
      .findByText(/submit a new restaurant/i)
      .should('exist')
  })
  it('can submit a new restaurant', () => {
    cy.visit('/')
      .get('#submit-name')
      .type(restaurantToAdd)
      .get('#submit-description')
      .type('description that is really good')
      .fixture(fileName)
      .then(fileContent => {
        cy.get('#imageUpload')
          .upload({ fileContent, fileName, mimeType: 'image/png' })
          .get('[type=submit]')
          .click()
          .findByText(restaurantToAdd)
          .should('exist')
      })
  })
  it('can search for a restaurant', () => {
    cy.visit('/')
      .get('#search')
      .type(restaurantToAdd)
      .get(`#${restaurantToAdd}`)
      .should('exist')
      .get('.MuiTypography-h5')
      .should('have.length', 1)
  })
  it('can rate a restaurant', () => {
    cy.visit('/')
      .get('#search')
      .type(restaurantToAdd)
      .get(`#rate-${restaurantToAdd}`)
      .click()
      .get(`#rate-star-3`)
      .click()
      .get(`.current-rate-${restaurantToAdd}`)
      .should('have.length', 3)
  })
  it('can delete a restaurant', () => {
    cy.visit('/')
      .get('#search')
      .type(restaurantToAdd)
      .get(`#delete-${restaurantToAdd}`)
      .click()
      .findByText(restaurantToAdd)
      .should('not.exist')
  })

  it('can submit and delete a restaurant with an empty image', () => {
    const emptyImageRestaurant = `empty${1 + Math.floor(Math.random() * 1e6)}`
    cy.visit('/')
      .get('#submit-name')
      .type(emptyImageRestaurant)
      .get('#submit-description')
      .type('description that is really good')
      .get('[type=submit]')
      .click()
      .then(() => {
        cy.findByText(emptyImageRestaurant)
          .should('exist')
          .get(`#delete-${emptyImageRestaurant}`)
          .click()
          .wait(1000)
          .findByText(emptyImageRestaurant)
          .should('not.exist')
      })
  })
})
