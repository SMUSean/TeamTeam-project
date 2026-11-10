describe('Ecosystem Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3080/ecosystem');
  });

  it('Light mode background correct color', () => {
    cy.get('main') // Select the element
    .should('have.css', 'background-color', 'rgb(219, 152, 52)'); // Check if correct color
  })
  it('Dark mode background correct color', () => {
    cy.get('[data-testid="darkmode-toggle"]').click(); // Set Dark mode
    cy.get('main') // Select the element
    .should('have.css', 'background-color', 'rgb(42, 32, 48)'); // Check if correct color
  })
  
})