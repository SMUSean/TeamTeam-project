describe('Ecommerce Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3080/ecommerce');
  });

  it('should display the correct page title', () => {
    cy.get('h1').should('contain', 'eCommerce: Support Local Conservation');
  });

  it('should display all products', () => {
    cy.get('.grid > div').should('have.length', 2);
  });

  it('should display product details correctly', () => {
    cy.get('.grid > div').first().within(() => {
      cy.get('h2').should('contain', 'Native Tree Sapling');
      cy.get('p').should('contain', 'Support reforestation by purchasing a native tree sapling.');
      cy.get('span').should('contain', '$15.00');
    });
  });
});
