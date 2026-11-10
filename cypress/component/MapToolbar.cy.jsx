// cypress/component/MapToolbar.cy.jsx

import React from 'react';
import MapToolbar from '@/Components/MapsLib/MapToolbar.jsx';

describe('MapToolbar component', () => {
    it('renders correct labels based on props', () => {
        const onToggleRegion = cy.stub().as('onToggleRegion');
        const onToggleTrail = cy.stub().as('onToggleTrail');
        const onToggleGoogleMarkers = cy.stub().as('onToggleGoogleMarkers');

        cy.mount(
            <MapToolbar
                showRegion={true}
                showTrail={true}
                showGoogleMarkers={true}
                onToggleRegion={onToggleRegion}
                onToggleTrail={onToggleTrail}
                onToggleGoogleMarkers={onToggleGoogleMarkers}
            />
        );

        cy.contains('Hide regions').should('be.visible');
        cy.contains('Hide trail').should('be.visible');
        cy.contains('Hide Google markers').should('be.visible');
    });

    it('calls the toggle callbacks when buttons are clicked', () => {
        const onToggleRegion = cy.stub().as('onToggleRegion');
        const onToggleTrail = cy.stub().as('onToggleTrail');
        const onToggleGoogleMarkers = cy.stub().as('onToggleGoogleMarkers');

        cy.mount(
            <MapToolbar
                showRegion={true}
                showTrail={false}
                showGoogleMarkers={false}
                onToggleRegion={onToggleRegion}
                onToggleTrail={onToggleTrail}
                onToggleGoogleMarkers={onToggleGoogleMarkers}
            />
        );

        cy.contains('Hide regions').click();
        cy.get('@onToggleRegion').should('have.been.calledOnce');

        cy.contains('Show trail').click();
        cy.get('@onToggleTrail').should('have.been.calledOnce');

        cy.contains('Show Google markers').click();
        cy.get('@onToggleGoogleMarkers').should('have.been.calledOnce');
    });
});
