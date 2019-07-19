describe('Verify Search Functionality', function () {
  it('suggests related match to entered keyword whether case sensitive or not', function () {
    cy.visit('localhost:3001')

    cy.get('[data-cy=searchbar]').click()
      .type('DANBO')

    cy.get('.drawing').within(() => {
      cy.get('h4')
        .contains('danbo')
    })

  })

})