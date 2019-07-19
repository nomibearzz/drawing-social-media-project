describe('Verify Search Functionality', function () {
  it('displays proper message if no search results', function () {
    cy.visit('localhost:3001')

    cy.get('[data-cy=searchbar]').click()
      .type('asdf')

    //should get the message containing how many results are there 
    cy.get('[data-cy=count-message]').should('have.value', '0')
      
    cy.get('[data-cy=message]')

  })

})