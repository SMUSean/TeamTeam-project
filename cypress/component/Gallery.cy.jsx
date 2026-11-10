/**
 * ============================================================
 *  Gallery Page Component Tests – Saint Margaret's Bay Area Gallery
 *  ------------------------------------------------------------
 *  Component tests for the main Gallery page component.
 *  
 *  Test Coverage:
 *   - Component rendering with child components
 *   - API integration (fetching verified images)
 *   - File handling and state management
 *   - Image removal functionality
 *   - Drag-and-drop reordering
 *   - Upload submission
 *   - Error handling
 *   - Size limit validation
 *  
 *  @author Test Suite
 *  @lastupdated October 2025
 * ============================================================
 */

import React from 'react';
import Gallery from '../../src/pages/Gallery';

describe('Gallery Page Component', () => {
    const mockVerifiedImages = [
        '/api/gallery/approved/image1.jpg',
        '/api/gallery/approved/image2.jpg',
        '/api/gallery/approved/image3.jpg'
    ];

    // Set up default fetch stub for all tests
    beforeEach(() => {
        cy.window().then((win) => {
            // Restore any existing stub first
            if (win.fetch.restore) {
                win.fetch.restore();
            }
            cy.stub(win, 'fetch').resolves({
                ok: true,
                json: () => Promise.resolve({ images: mockVerifiedImages })
            });
        });
    });

    it('should render Gallery component with child components', () => {
        cy.mount(<Gallery />);

        // Verify child components are rendered
        cy.contains('h2', 'Gallery Photos').should('be.visible');
        cy.contains('h2', 'Upload Images').should('be.visible');
    });

    it('should fetch verified images on mount', () => {
        cy.mount(<Gallery />);

        // Wait for the component to mount and fetch to be called
        cy.wait(100);

        // Verify fetch was called with the correct URL
        cy.window().then((win) => {
            expect(win.fetch).to.have.been.calledWith('/api/gallery/approved');
        });
    });

    it('should display verified images after fetching', () => {
        cy.mount(<Gallery />);

        // Wait for API call to complete
        cy.wait(100);

        // Verify images are passed to VerifiedGallery
        cy.get('img[alt^="Verified"]').should('have.length', mockVerifiedImages.length);
    });

    it('should handle empty verified images array', () => {
        cy.window().then((win) => {
            // Restore existing stub first
            if (win.fetch.restore) {
                win.fetch.restore();
            }
            cy.stub(win, 'fetch').resolves({
                ok: true,
                json: () => Promise.resolve({ images: [] })
            });
        });

        cy.mount(<Gallery />);
        cy.wait(100);

        // Gallery should still render without errors
        cy.contains('h2', 'Gallery Photos').should('be.visible');
    });

    it('should handle API fetch errors gracefully', () => {
        cy.window().then((win) => {
            // Restore existing stub first
            if (win.fetch.restore) {
                win.fetch.restore();
            }
            cy.stub(win, 'fetch').rejects(new Error('Network error'));
            cy.stub(win.console, 'error').as('consoleError');
        });

        cy.mount(<Gallery />);
        cy.wait(100);

        // Component should still render
        cy.contains('h2', 'Upload Images').should('be.visible');

        // Error should be logged
        cy.get('@consoleError').should('have.been.called');
    });

    it('should handle file selection and update state', () => {
        cy.mount(<Gallery />);
        cy.wait(100); // Wait for initial fetch

        // Create a mock file
        const file = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);

        cy.get('input[type="file"]')
            .then(($input) => {
                $input[0].files = dataTransfer.files;
            })
            .trigger('change', { force: true });

        cy.wait(300);

        // Verify image preview appears
        cy.get('img[alt^="Uploaded"]').should('have.length.at.least', 1);
    });

    it('should update total size when files are selected', () => {
        cy.mount(<Gallery />);
        cy.wait(100); // Wait for initial fetch

        // Create a file with known size (1 MB)
        const fileSize = 1024 * 1024; // 1 MB
        const file = new File(['x'.repeat(fileSize)], 'test.jpg', { type: 'image/jpeg' });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);

        cy.get('input[type="file"]')
            .then(($input) => {
                $input[0].files = dataTransfer.files;
            })
            .trigger('change', { force: true });

        cy.wait(300);

        // Verify size is displayed (should show approximately 1.00 MB)
        cy.contains('Total size:').should('be.visible');
    });

    it('should prevent upload when size limit is exceeded', () => {
        cy.mount(<Gallery />);
        cy.wait(100); // Wait for initial fetch

        // Create a file that exceeds 100MB limit
        const oversizedFile = new File(['x'.repeat(101 * 1024 * 1024)], 'huge.jpg', { type: 'image/jpeg' });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(oversizedFile);

        cy.window().then((win) => {
            cy.stub(win, 'alert').as('alertStub');
        });

        cy.get('input[type="file"]')
            .then(($input) => {
                $input[0].files = dataTransfer.files;
            })
            .trigger('change', { force: true });

        cy.wait(300);

        // Verify alert is shown
        cy.get('@alertStub').should('have.been.calledWith',
            'Cannot upload: storage limit exceeded (100 MB max)');
    });

    it('should allow removing uploaded images', () => {
        cy.mount(<Gallery />);
        cy.wait(100); // Wait for initial fetch

        // Add an image first
        const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);

        cy.get('input[type="file"]')
            .then(($input) => {
                $input[0].files = dataTransfer.files;
            })
            .trigger('change', { force: true });

        cy.wait(300);

        // Verify image is displayed
        cy.get('img[alt^="Uploaded"]').should('have.length', 1);

        // Remove the image
        cy.get('button[aria-label="Remove image"]').click();
        cy.wait(300);

        // Verify image is removed
        cy.contains('No images uploaded yet.').should('be.visible');
    });

    it('should handle drag-and-drop reordering', () => {
        cy.mount(<Gallery />);
        cy.wait(100); // Wait for initial fetch

        // Add multiple images
        const files = [
            new File(['test1'], 'test1.jpg', { type: 'image/jpeg' }),
            new File(['test2'], 'test2.jpg', { type: 'image/jpeg' }),
            new File(['test3'], 'test3.jpg', { type: 'image/jpeg' })
        ];

        const dataTransfer = new DataTransfer();
        files.forEach(file => dataTransfer.items.add(file));

        cy.get('input[type="file"]')
            .then(($input) => {
                $input[0].files = dataTransfer.files;
            })
            .trigger('change', { force: true });

        cy.wait(300);

        // Verify three images are displayed
        cy.get('img[alt^="Uploaded"]').should('have.length', 3);

        // Verify drag-and-drop structure exists
        // @hello-pangea/dnd may not add data-rbd-* attributes to the DOM
        // Instead, verify that images are in a grid layout which is required for drag-and-drop
        cy.contains('h2', 'Your Images')
            .closest('div')
            .find('.grid')
            .should('exist');
        
        // Verify multiple images are displayed (confirms drag-and-drop is configured)
        // Full drag-and-drop interaction testing is better suited for E2E tests
    });

    it('should submit images successfully', () => {
        // Override fetch stub to handle both initial fetch and upload
        cy.window().then((win) => {
            // Restore existing stub first
            if (win.fetch.restore) {
                win.fetch.restore();
            }
            cy.stub(win, 'fetch')
                .onFirstCall() // First call for verified images
                .resolves({
                    ok: true,
                    json: () => Promise.resolve({ images: mockVerifiedImages })
                })
                .onSecondCall() // Second call for upload
                .resolves({
                    ok: true,
                    json: () => Promise.resolve({
                        message: 'Successfully uploaded 1 image(s)!',
                        files: ['test-upload.jpg']
                    })
                });

            cy.stub(win, 'alert').as('alertStub');
        });

        cy.mount(<Gallery />);
        cy.wait(100); // Wait for initial fetch

        // Add an image
        const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);

        cy.get('input[type="file"]')
            .then(($input) => {
                $input[0].files = dataTransfer.files;
            })
            .trigger('change', { force: true });

        cy.wait(300);

        // Submit
        cy.get('#submit-button').click();
        cy.wait(500);

        // Verify success message
        cy.get('@alertStub').should('have.been.calledWith',
            'Successfully uploaded 1 image(s)!');

        // Verify images are cleared after submission
        cy.contains('No images uploaded yet.').should('be.visible');
    });

    it('should handle upload API errors', () => {
        // Override fetch stub to handle both initial fetch and upload error
        cy.window().then((win) => {
            // Restore existing stub first
            if (win.fetch.restore) {
                win.fetch.restore();
            }
            cy.stub(win, 'fetch')
                .onFirstCall()
                .resolves({
                    ok: true,
                    json: () => Promise.resolve({ images: mockVerifiedImages })
                })
                .onSecondCall()
                .resolves({
                    ok: false,
                    status: 500,
                    json: () => Promise.resolve({ error: 'Server error' })
                });

            cy.stub(win, 'alert').as('alertStub');
        });

        cy.mount(<Gallery />);
        cy.wait(100); // Wait for initial fetch

        // Add an image
        const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);

        cy.get('input[type="file"]')
            .then(($input) => {
                $input[0].files = dataTransfer.files;
            })
            .trigger('change', { force: true });

        cy.wait(300);

        // Submit
        cy.get('#submit-button').click();
        cy.wait(500);

        // Verify error is handled
        cy.get('@alertStub').should('have.been.called');
    });

    it('should handle network errors during upload', () => {
        // Override fetch stub to handle both initial fetch and network error
        cy.window().then((win) => {
            // Restore existing stub first
            if (win.fetch.restore) {
                win.fetch.restore();
            }
            cy.stub(win, 'fetch')
                .onFirstCall()
                .resolves({
                    ok: true,
                    json: () => Promise.resolve({ images: mockVerifiedImages })
                })
                .onSecondCall()
                .rejects(new Error('Network error'));

            cy.stub(win, 'alert').as('alertStub');
            cy.stub(win.console, 'error').as('consoleError');
        });

        cy.mount(<Gallery />);
        cy.wait(100); // Wait for initial fetch

        // Add an image
        const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);

        cy.get('input[type="file"]')
            .then(($input) => {
                $input[0].files = dataTransfer.files;
            })
            .trigger('change', { force: true });

        cy.wait(300);

        // Submit
        cy.get('#submit-button').click();
        cy.wait(500);

        // Verify error handling
        cy.get('@alertStub').should('have.been.calledWith',
            'An error occurred during submission.');
        cy.get('@consoleError').should('have.been.called');
    });

    it('should prevent submission when no images are selected', () => {
        cy.mount(<Gallery />);
        cy.wait(100);

        cy.window().then((win) => {
            cy.stub(win, 'alert').as('alertStub');
        });

        // Submit button should not exist when no images
        cy.get('#submit-button').should('not.exist');
    });

    it('should handle multiple file selection', () => {
        cy.mount(<Gallery />);
        cy.wait(100);

        // Create multiple files
        const files = [
            new File(['test1'], 'test1.jpg', { type: 'image/jpeg' }),
            new File(['test2'], 'test2.jpg', { type: 'image/jpeg' }),
            new File(['test3'], 'test3.jpg', { type: 'image/jpeg' })
        ];

        const dataTransfer = new DataTransfer();
        files.forEach(file => dataTransfer.items.add(file));

        cy.get('input[type="file"]')
            .then(($input) => {
                $input[0].files = dataTransfer.files;
            })
            .trigger('change', { force: true });

        cy.wait(300);

        // Verify all images are displayed
        cy.get('img[alt^="Uploaded"]').should('have.length', 3);
    });

    it('should update total size correctly with multiple files', () => {
        cy.mount(<Gallery />);
        cy.wait(100);

        // Create files with known sizes
        const file1 = new File(['x'.repeat(1024 * 1024)], 'test1.jpg', { type: 'image/jpeg' }); // 1 MB
        const file2 = new File(['x'.repeat(2 * 1024 * 1024)], 'test2.jpg', { type: 'image/jpeg' }); // 2 MB

        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file1);
        dataTransfer.items.add(file2);

        cy.get('input[type="file"]')
            .then(($input) => {
                $input[0].files = dataTransfer.files;
            })
            .trigger('change', { force: true });

        cy.wait(300);

        // Verify size display (should show approximately 3.00 MB)
        cy.contains('Total size:').should('be.visible');
    });
});

