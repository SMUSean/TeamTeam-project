/**
 * ============================================================
 * Gallery Page E2E Tests – Saint Margaret's Bay Area Gallery
 * ------------------------------------------------------------
 * End-to-end tests for the Gallery page functionality.
 *
 * Test Coverage:
 *  - Page loading and initial state
 *  - Gallery image display
 *  - Enlarged image preview
 *  - Closing the image preview
 *
 * Note:
 *  Images are currently loaded from the public/images folder.
 *  Backend image storage and upload functionality have not
 *  yet been implemented.
 *
 *  @author Lee Jonah
 *  @lastupdated November 2026
 * ============================================================
 */

describe("Gallery Page", () => {
  // ============================================================
  // PAGE LOADING AND INITIAL STATE TESTS
  // ============================================================

  beforeEach(() => {
    cy.visit("/gallery");
  });

  it("should load the gallery page successfully", () => {
    cy.url().should("include", "/gallery");
    cy.contains("h2", "Gallery Photos").should("be.visible");
  });

  // ============================================================
  // VERIFIED GALLERY DISPLAY TESTS
  // ============================================================

  it("should retrieve approved images from the backend", () => {
    // Monitor the real backend request without mocking it
    cy.intercept("GET", "/api/gallery/approved").as("getApprovedImages");

    // Reload the page to trigger the API request
    cy.reload();

    // Wait for the backend response
    cy.wait("@getApprovedImages").then((interception) => {
      // Accept HTTP 200 (OK) or 304 (Not Modified)
      expect(interception.response.statusCode).to.be.oneOf([200, 304]);

      // HTTP 304 responses may not contain a body
      if (interception.response.statusCode === 200) {
        // Verify the response contains an images array
        expect(interception.response.body)
          .to.have.property("images")
          .that.is.an("array");
      }
    });
  });

  it("should display approved images from the backend", () => {
    // Find all approved images displayed in the Gallery
    cy.get('img[alt^="Verified"]').should("have.length.at.least", 1);

    // Verify that the first approved image is visible
    cy.get('img[alt^="Verified"]').first().should("be.visible");
  });

  it("should load approved images successfully", () => {
    // Find the approved images in the Gallery
    cy.get('img[alt^="Verified"]')
      .should("have.length.at.least", 1)
      .each(($img) => {
        // Verify the image has a valid source attribute
        cy.wrap($img).should("have.attr", "src").and("not.be.empty");

        // Verify the browser successfully loaded the image
        cy.wrap($img).should(($image) => {
          expect($image[0].naturalWidth).to.be.greaterThan(0);
        });
      });
  });

  // ============================================================
  // IMAGE LIGHTBOX TESTS
  // ============================================================

  it("should enlarge an image when clicked", () => {
    // Click the first approved image in the Gallery
    cy.get('button[aria-label^="Enlarge gallery image"]').first().click();

    // Verify that the lightbox dialog appears
    cy.get('[role="dialog"]').should("be.visible");

    // Verify that the enlarged image is displayed
    cy.get('[role="dialog"]')
      .find('img[alt="Enlarged gallery photograph"]')
      .should("be.visible");
  });

  it("should display uploader information in the lightbox", () => {
    // Open the first approved image
    cy.get('button[aria-label^="Enlarge gallery image"]').first().click();

    // Verify the uploader information is displayed
    cy.get('[role="dialog"]').within(() => {
      cy.contains("Uploaded by").should("be.visible");
      cy.contains("WoodlandUser").should("be.visible");
    });
  });

  it("should close the lightbox when the close button is clicked", () => {
    // Open the first approved image
    cy.get('button[aria-label^="Enlarge gallery image"]').first().click();

    // Verify the lightbox is open
    cy.get('[role="dialog"]').should("be.visible");

    // Click the close button
    cy.get('button[aria-label="Close enlarged image"]').click();

    // Verify the lightbox has been removed
    cy.get('[role="dialog"]').should("not.exist");
  });

  it("should close the lightbox when clicking outside the image", () => {
    // Open the first approved image
    cy.get('button[aria-label^="Enlarge gallery image"]').first().click();

    // Verify the lightbox is open
    cy.get('[role="dialog"]').should("be.visible");

    // Click the dark background outside the image
    cy.get('[role="presentation"]').last().click("topLeft");

    // Verify the lightbox closes
    cy.get('[role="dialog"]').should("not.exist");
  });

  it("should close the lightbox when Escape is pressed", () => {
    // Open the first approved image
    cy.get('button[aria-label^="Enlarge gallery image"]').first().click();

    // Verify the lightbox is open
    cy.get('[role="dialog"]').should("be.visible");

    // Press Escape to close the lightbox
    cy.get("body").type("{esc}");

    // Verify the lightbox closes
    cy.get('[role="dialog"]').should("not.exist");
  });

  it("should enlarge the correct gallery image", () => {
    // Get the source URL of the first approved image
    cy.get('img[alt^="Verified"]')
      .first()
      .invoke("attr", "src")
      .then((originalSrc) => {
        // Click the first approved image
        cy.get('button[aria-label^="Enlarge gallery image"]').first().click();

        // Verify the enlarged image uses the same source URL
        cy.get('[role="dialog"]')
          .find('img[alt="Enlarged gallery photograph"]')
          .should("have.attr", "src", originalSrc);
      });
  });

  //TODO: Add tests for the upload section once backend upload functionality is implemented.
});
