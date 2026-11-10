// cypress/e2e/sitemap_toolbar_toggles.cy.js

describe('Site Map page – map toolbar toggles', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3080/sitemap');
    });

    it('toggles region visibility label when clicked', () => {
        cy.contains('Hide regions').click();
        cy.contains('Show regions').should('exist');
    });

    it('toggles trail visibility label when clicked', () => {
        cy.contains('Hide trail').click();
        cy.contains('Show trail').should('exist');
    });

    it('toggles Google markers visibility label when clicked', () => {
        cy.contains('Hide Google markers').click();
        cy.contains('Show Google markers').should('exist');
    });
});
