describe("Home Page - Woodland Conservation Site", () => {
  beforeEach(() => {
    // Update URL if your app runs on a different port/path
    cy.visit("/");
  });

  it("loads the home page and displays hero heading", () => {
    cy.contains("Welcome to the").should("exist");
    cy.contains("Woodland Conservation Site").should("exist");
  });

  it("shows the hero image", () => {
    cy.get('img[alt="Woodland Conservation"]').should("be.visible");
  });

  it("displays the What We Do section", () => {
    cy.contains("What We Do").should("exist");
  });

  it("renders all three info cards", () => {
    cy.contains("Conservation Projects").should("exist");
    cy.contains("Sustainable Practices").should("exist");
    cy.contains("Wildlife Protection").should("exist");
  });

  //
  // 🔊 Basic TTS tests (no mocking, just clicks)
  //
  it("speech button in the hero section can be clicked", () => {
    cy.get('button[aria-label="Read out loud"]').first().click();
  });

  it("speech button toggles when clicked twice", () => {
    const btn = cy.get('button[aria-label="Read out loud"]').first();
    btn.click();
    btn.click();
  });

  it("all card speech buttons can be clicked", () => {
    cy.get('button[aria-label="Read out loud"]').each((button) => {
      cy.wrap(button).click();
    });
  });
});
