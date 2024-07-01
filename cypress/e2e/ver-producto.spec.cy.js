describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8080/')
    cy.contains('Productos').should('be.visible')
    cy.get('[data-testid="producto-1"]').should('be.visible')
    cy.get('[data-testid="producto-1"]').click()
    cy.get('[data-testid="producto-image-1"]').should('be.visible')
    cy.get('[data-testid="producto-name-1"]').should('be.visible')
    cy.get('[data-testid="producto-price-1"]').should('be.visible')
    
  })
})