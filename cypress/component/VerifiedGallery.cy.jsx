/**
 * ============================================================
 *  VerifiedGallery Component Tests – Saint Margaret's Bay Area Gallery
 *  ------------------------------------------------------------
 *  Component tests for the VerifiedGallery component.
 *  
 *  Test Coverage:
 *   - Rendering with empty images array
 *   - Rendering with single image
 *   - Rendering with multiple images
 *   - Display of section header
 *   - Grid layout structure
 *  
 *  @author Test Suite
 *  @lastupdated October 2025
 * ============================================================
 */

import React from 'react';
import VerifiedGallery from '../../src/Components/VerifiedGallery';

describe('VerifiedGallery Component', () => {
    it('should render section header', () => {
        cy.mount(<VerifiedGallery images={[]} />);
        
        cy.contains('h2', 'Gallery Photos').should('be.visible');
    });

    it('should render with empty images array', () => {
        cy.mount(<VerifiedGallery images={[]} />);
        
        // Should still show the header
        cy.contains('h2', 'Gallery Photos').should('be.visible');
        
        // Grid should exist but be empty
        cy.get('.grid').should('exist');
    });

    it('should render single image', () => {
        const images = ['/api/gallery/approved/test-image.jpg'];
        cy.mount(<VerifiedGallery images={images} />);
        
        cy.get('img[alt^="Verified"]')
            .should('have.length', 1)
            .first()
            .should('have.attr', 'src', images[0]);
    });

    it('should render multiple images in grid', () => {
        const images = [
            '/api/gallery/approved/image1.jpg',
            '/api/gallery/approved/image2.jpg',
            '/api/gallery/approved/image3.jpg'
        ];
        cy.mount(<VerifiedGallery images={images} />);
        
        cy.get('img[alt^="Verified"]').should('have.length', 3);
        
        // Verify each image has correct src
        images.forEach((src, index) => {
            cy.get('img[alt^="Verified"]').eq(index).should('have.attr', 'src', src);
        });
    });

    it('should use ImageCard component for each image', () => {
        const images = ['/api/gallery/approved/test.jpg'];
        cy.mount(<VerifiedGallery images={images} />);
        
        // ImageCard should not have remove button (onRemove not provided)
        cy.get('button[aria-label="Remove image"]').should('not.exist');
        
        // Image should be visible
        cy.get('img').should('be.visible');
    });

    it('should have responsive grid layout classes', () => {
        cy.mount(<VerifiedGallery images={['/api/gallery/approved/test.jpg']} />);
        
        cy.get('.grid')
            .should('have.class', 'grid')
            .should('have.class', 'gap-6');
    });
});

