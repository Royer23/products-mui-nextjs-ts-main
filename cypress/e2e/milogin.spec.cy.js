describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8080/')
    cy.contains('Ingresar').should('be.visible')
    cy.get('[data-testid="ingresar"]').should('be.visible')
    cy.get('[data-testid="ingresar"]').click()
    cy.contains('Inicio de Sesión').should('be.visible')
    cy.get('#email').type('user1@example.com')
    cy.get('#contrasena').type('password123')
    cy.get('[data-testid="iniciar-sesion"]').click()
    cy.contains('Mi Aplicación de Productos').should('be.visible')
  })
})
