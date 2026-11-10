describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3080/NaturalBurial')
  })
  
  it('renders the sections', () => {
    cy.contains("Natural Burial").should('exist')
    cy.contains("Burial Options").should('exist')
    cy.contains("Marker Options").should('exist')
  })
  
  it('shows the Natural Burial section', () => {
    cy.contains("Natural Burial").scrollIntoView()
    cy.get('button[aria-label="Read out loud"]').first().should('be.visible')
    cy.get('button[aria-label="Read out loud"]').first().click()
  })
  
  it('shows the Burial Options section', () => {
    cy.contains("Burial Options").scrollIntoView()
    cy.get('img[alt="Pinebox"]').should('be.visible')
    cy.get('img[alt="Shroud"]').should('be.visible')
  })
  
  it('shows the Marker Options section', () => {
    cy.contains("Marker Options").scrollIntoView()
    cy.get('img[alt="Small Bush"]').should('be.visible')
    cy.get('img[alt="GPS Coordinate"]').should('be.visible')
    cy.get('img[alt="Wood Post"]').should('be.visible')
  })
})