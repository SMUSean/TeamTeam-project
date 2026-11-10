import React from "react";
import Ecosystem from "../../src/pages/Ecosystem";

describe("Ecosystem Component", () => {
  it("renders the Ecosystem page", () => {
    cy.mount(<Ecosystem />);

    // Check heading exists
    cy.contains("Ecosystem").should("exist");
  });

  it("renders descriptive text", () => {
    cy.mount(<Ecosystem />);

    cy.contains(
      "This woodland conservation site is home to a diverse and vibrant ecosystem"
    ).should("exist");
  });

  it("clicks the main text-to-speech button", () => {
    cy.mount(<Ecosystem />);

    // Click the FIRST TTS button (ecosystem intro)
    cy.get('button[aria-label="Read out loud"]').first().click();

    // Simple assertion: button should still exist after click
    cy.get('button[aria-label="Read out loud"]').first().should("exist");
  });

  it("renders flora, fauna, and fungi sections", () => {
    cy.mount(<Ecosystem />);

    cy.contains("Flora").should("exist");
    cy.contains("Fauna").should("exist");
    cy.contains("Fungi").should("exist");
  });
});
