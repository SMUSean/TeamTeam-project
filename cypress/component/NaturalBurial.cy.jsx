import React from 'react'
import NaturalBurial from '../../src/pages/NaturalBurial'

describe('<NaturalBurial />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<NaturalBurial />)
    cy.contains("Natural Burial").should('exist')
    cy.contains("Burial Options").should('exist')
    cy.contains("Marker Options").should('exist')
  })
  
  it('renders the marker options', () => {
    cy.get('img[alt="Small Bush"]').should('exist')
    cy.get('img[alt="GPS Coordinate"]').should('exist')
    cy.get('img[alt="Wood Post"]').should('exist')
  })
})