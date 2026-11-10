/// <reference types="cypress" />
import React from "react";
import Home from "../../src/pages/Home";

describe("Home Component", () => {
  beforeEach(() => {
    cy.mount(<Home />);
  });

  it("renders the hero heading", () => {
    cy.contains("Welcome to the").should("exist");
    cy.contains("Woodland Conservation Site").should("exist");
  });

  it("shows the hero image", () => {
    cy.get('img[alt="Woodland Conservation"]').should("exist");
  });

  it("renders the What We Do section", () => {
    cy.contains("What We Do").should("exist");
  });

  it("renders all three cards", () => {
    cy.contains("Conservation Projects").should("exist");
    cy.contains("Sustainable Practices").should("exist");
    cy.contains("Wildlife Protection").should("exist");
  });

  //
  // 🔊 TTS (text-to-speech) tests — no mocking, no protection
  //

  it("speech button in hero can be clicked", () => {
    cy.get('button[aria-label="Read out loud"]').first().click();
  });

  it("speech button can be clicked twice (toggle)", () => {
    const btn = cy.get('button[aria-label="Read out loud"]').first();
    btn.click();
    btn.click();
  });

  it("each card speech button can be clicked", () => {
    cy.get('button[aria-label="Read out loud"]').each((button) => {
      cy.wrap(button).click();
    });
  });
});
