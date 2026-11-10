describe('Fauna Flora Funga Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3080/faunaflorafunga');
  });

  it('should display the correct page title', () => {
    cy.get('h1').should('contain', 'Fauna / Flora / Funga');
  });

  it('should display all cards', () => {
    cy.get('.flex.flex-col.md\\:flex-row > div').should('have.length', 3);
  });
});
