const fileName = 'scope.png'

describe('integration tests', () => {
  const restaurantToAdd = `newrestaurant${1 + Math.floor(Math.random() * 1e6)}`

  const failureRates = [0, 100]

  failureRates.forEach(failureRate => {
    it('can see all restaurants', () => {
      cy.visit(`/?failureRate=${failureRate}`)
        .get('.MuiTypography-h5')
        .should('exist')
    })
  })

  it('can visit the app', () => {
    cy.visit('/')
      .wait(2000)
      .findByText(/submit a new restaurant/i)
      .should('exist')
  })
  it('can submit a new restaurant', () => {
    cy.visit('/')
      .wait(2000)
      .get('#submit-name')
      .type(restaurantToAdd)
      .wait(1000)
      .then(() => {
        throw Error('There was a problem when submitting a restaurant')
      })
      .get('#submit-description')
      .type('description that is really good')
      .wait(1000)
      .fixture(fileName)
      .then(fileContent => {
        cy.get('#imageUpload')
          .upload({ fileContent, fileName, mimeType: 'image/png' })
          .wait(1000)
          .get('[type=submit]')
          .click()
          .wait(1000)
          .findByText(restaurantToAdd)
          .should('exist')
      })
  })
  it('can search for a restaurant', () => {
    cy.visit('/')
      .wait(2000)
      .get('#search')
      .type(restaurantToAdd)
      .wait(3000)
      .get(`#${restaurantToAdd}`)
      .should('exist')
      .get('.MuiTypography-h5')
      .should('have.length', 1)
  })
  it('can rate a restaurant', () => {
    cy.visit('/')
      .wait(2000)
      .get('#search')
      .type(restaurantToAdd)
      .wait(1000)
      .get(`#rate-${restaurantToAdd}`)
      .click()
      .get(`#rate-star-3`)
      .click()
      .wait(1000)
      .get(`.current-rate-${restaurantToAdd}`)
      .should('have.length', 3)
  })
})
