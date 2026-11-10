/**
 * ============================================================
 *  ImageCard Component Tests – Saint Margaret's Bay Area Gallery
 *  ------------------------------------------------------------
 *  Component tests for the ImageCard component.
 *  
 *  Test Coverage:
 *   - Basic rendering with image source and alt text
 *   - Display without remove button (read-only mode)
 *   - Display with remove button (editable mode)
 *   - Remove button functionality
 *  
 *  @author Test Suite
 *  @lastupdated October 2025
 * ============================================================
 */

import React from 'react';
import ImageCard from '../../src/Components/ImageCard';

describe('ImageCard Component', () => {
    const defaultProps = {
        src: 'https://via.placeholder.com/300',
        alt: 'Test image'
    };

    it('should render with image source and alt text', () => {
        cy.mount(<ImageCard {...defaultProps} />);
        
        cy.get('img')
            .should('be.visible')
            .should('have.attr', 'src', defaultProps.src)
            .should('have.attr', 'alt', defaultProps.alt);
    });

    it('should not display remove button when onRemove is not provided', () => {
        cy.mount(<ImageCard {...defaultProps} />);
        
        cy.get('button[aria-label="Remove image"]').should('not.exist');
    });

    it('should display remove button when onRemove is provided', () => {
        const onRemove = cy.stub();
        cy.mount(<ImageCard {...defaultProps} onRemove={onRemove} />);
        
        cy.get('button[aria-label="Remove image"]')
            .should('be.visible')
            .should('contain', 'X');
    });

    it('should call onRemove when remove button is clicked', () => {
        const onRemove = cy.stub();
        cy.mount(<ImageCard {...defaultProps} onRemove={onRemove} />);
        
        cy.get('button[aria-label="Remove image"]')
            .click()
            .then(() => {
                expect(onRemove).to.have.been.calledOnce;
            });
    });
});

