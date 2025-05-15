describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('app is running')
  })
})

describe('Login Page Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '**').as('anyRequest')
    cy.visit('/')
    cy.wait('@anyRequest')
  })

  it('should load login page correctly', () => {
    cy.visit('/')
    cy.waitForAngular()
    cy.url().should('include', '/login')
  })

  it('should login with valid credentials', () => {
    cy.loginByUI('test@example.com', 'password123')
    cy.url().should('not.include', '/login')
  })

  it('should show error with invalid credentials', () => {
    cy.loginByUI('wrong@email.com', 'wrongpass')
    cy.contains('Credenciais inválidas').should('be.visible')
  })
})
