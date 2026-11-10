// cypress/e2e/sitemap_basic.cy.js

describe('Site Map page – basic render', () => {
    beforeEach(() => {
        // Make sure your dev server is running at this URL
        cy.visit('http://localhost:3080/sitemap');
    });

    it('shows the map toolbar with all controls', () => {
        // Region toggle
        cy.contains('Hide regions').should('exist');

        // Trail toggle
        cy.contains('Hide trail').should('exist');

        // Google markers toggle
        cy.contains('Hide Google markers').should('exist');
    });
});
