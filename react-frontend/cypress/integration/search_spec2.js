describe('Verify Search Functionality', function () {
  it('displays proper message if no search results', function () {
    cy.visit('localhost:3001')

    cy.get('[data-cy=searchbar]').click()
      .type('asdf')
      
    cy.get('.drawing')

  })

})