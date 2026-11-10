// cypress/component/LocationStatus.cy.jsx

import React from 'react';
import LocationStatus from '@/Components/MapsLib/locationStatus.jsx';

describe('LocationStatus component', () => {
    it('shows requesting message when status is "requesting"', () => {
        cy.mount(<LocationStatus locationStatus="requesting" geoError={null} />);
        cy.contains('Requesting your location').should('be.visible');
    });

    it('shows using-user message when status is "using-user"', () => {
        cy.mount(<LocationStatus locationStatus="using-user" geoError={null} />);
        cy.contains('Centering map to your approximate position.').should('be.visible');
    });

    it('shows unsupported message when status is "unsupported"', () => {
        cy.mount(<LocationStatus locationStatus="unsupported" geoError={null} />);
        cy.contains('Geolocation is not supported by your browser.').should('be.visible');
    });

    it('shows permission-denied error when geoError.reason is "permission-denied"', () => {
        cy.mount(
            <LocationStatus
                locationStatus="error"
                geoError={{ reason: 'permission-denied' }}
            />
        );
        cy.contains('Location permission was denied.').should('be.visible');
    });

    it('shows timeout error when geoError.reason is "timeout"', () => {
        cy.mount(
            <LocationStatus
                locationStatus="error"
                geoError={{ reason: 'timeout' }}
            />
        );
        cy.contains('Location request timed out.').should('be.visible');
    });

    it('shows position-unavailable error when geoError.reason is "position-unavailable"', () => {
        cy.mount(
            <LocationStatus
                locationStatus="error"
                geoError={{ reason: 'position-unavailable' }}
            />
        );
        cy.contains('Location position is unavailable.').should('be.visible');
    });

    it('falls back to default view message when using-default or unknown', () => {
        cy.mount(<LocationStatus locationStatus="using-default" geoError={null} />);
        cy.contains('Showing default campus view.').should('be.visible');
    });
});
