describe('template spec', () => {
  it('querying commands on cypress.io example site', () => {
    // GO to cypress test page
    cy.visit('https://example.cypress.io')
    cy.get('a').contains('Querying').click({ force: true });

    //Click around the Quering page, and assert the text
    cy.get('#query-btn').should('contain', 'Button')
    cy.get('.query-btn').should('contain', 'Button')
    cy.get('#querying .well>button:first').should('contain', 'Button')

    cy.go("back")
    cy.get('a').contains('Actions').click({ force: true });
    cy.get('.action-form')
      .find('[type="text"]').scrollIntoView().type('HALFOFF')
    cy.get('.action-form').submit()
      .next().should('contain', 'Your form has been submitted!')
  })

  it('mock data for an angular page', () => {
    cy.intercept('GET', '**/tags', { fixture: 'tags.json' }).as('tags')
    cy.intercept('GET', '**/articles*', { fixture: 'articles.json' })
      .as('articles')
    cy.visit('https://angular.realworld.io/')

    //check tags
    cy.get('.tag-list', { timeout: 10000 })
      .should('contain', 'cypress')
      .and('contain', 'selenium')

    //check articles
    cy.get('app-favorite-button.pull-xs-right').contains('10')
    cy.get('.author').contains('testersdock')
    cy.get('.preview-link > p').contains('This is a test description')
  })
})