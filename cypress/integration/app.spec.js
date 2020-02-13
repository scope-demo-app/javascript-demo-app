const fileName = 'scope.png'

describe('integration tests', () => {
  const restaurantToAdd = `newrestaurant${1 + Math.floor(Math.random() * 1e6)}`

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
  it('can delete a restaurant', () => {
    cy.visit('/')
      .wait(2000)
      .get('#search')
      .type(restaurantToAdd)
      .wait(1000)
      .get(`#delete-${restaurantToAdd}`)
      .click()
      .wait(1000)
      .findByText(restaurantToAdd)
      .should('not.exist')
  })
  it('can submit and delete a restaurant with a long name', () => {
    const longerThanUsualName = `${restaurantToAdd}${restaurantToAdd}`
    cy.visit('/')
      .wait(2000)
      .get('#submit-name')
      .type(longerThanUsualName)
      .wait(1000)
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
          .findByText(longerThanUsualName)
          .should('exist')
          .get(`#delete-${longerThanUsualName}`)
          .click()
          .wait(1000)
          .findByText(longerThanUsualName)
          .should('not.exist')
      })
  })
  it('can see the details of the restaurants', function() {
    cy.visit('/')
      .wait(2000)
      .get('.MuiCardActionArea-root')
      .each(element => {
        cy.wrap(element)
          .click()
          .within(() => {
            cy.get('.MuiTypography-root.MuiTypography-h5.MuiTypography-gutterBottom')
              .invoke('text')
              .then(restaurantName => {
                cy.wrap(restaurantName).as('restaurantName')
              })
          })
          .then(() => {
            cy.get('.MuiDialogTitle-root')
              .should('have.text', this.restaurantName)
              .click()
              .wait(500)
              .get('#close')
              .click()
          })
      })
  })
  it('can search for a specific restaurant', () => {
    cy.visit('/')
      .wait(2000)
      .get('#search')
      .type('La fábrica 21')
      .wait(3000)
      .get('.MuiTypography-h5')
      .should('have.length', 1)
  })
  it('can submit and delete a restaurant with an empty image', () => {
    cy.visit('/')
      .wait(2000)
      .get('#submit-name')
      .type('empty-image-restaurant')
      .wait(1000)
      .get('#submit-description')
      .type('description that is really good')
      .wait(1000)
      .get('[type=submit]')
      .click()
      .wait(2000)
      .findByText('empty-image-restaurant')
      .should('exist')
      .get(`#delete-empty-image-restaurant`)
      .click()
      .wait(1000)
      .findByText('empty-image-restaurant')
      .should('not.exist')
  })
})
