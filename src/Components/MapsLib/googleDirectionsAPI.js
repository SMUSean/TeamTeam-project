/**
 * @file googleDirectionsAPI.js
 * @description Utilities for interacting with Google Directions API.
 * Provides functions to check API availability and request walking routes between points.
 * 
 * @author Afif Mahmud
 */

/**
 * Returns true if the Google Maps Directions API is available on window.
 */
export function isDirectionsApiAvailable() {
    return !!(
        typeof window !== "undefined" &&
        window.google &&
        window.google.maps &&
        window.google.maps.DirectionsService &&
        window.google.maps.TravelMode &&
        window.google.maps.DirectionsStatus
    );
}

/**
 * Requests a walking route between origin and destination.
 *
 * @param {{ origin: google.maps.LatLngLiteral, destination: google.maps.LatLngLiteral }} params
 * @returns {Promise<google.maps.DirectionsResult>}
 */
export function getWalkingRoute({ origin, destination }) {
    if (!isDirectionsApiAvailable()) {
        const error = new Error("Directions API unavailable");
        error.status = "DIRECTIONS_API_UNAVAILABLE";
        return Promise.reject(error);
    }

    const directionsService = new window.google.maps.DirectionsService();

    const request = {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.WALKING,
    };

    return new Promise((resolve, reject) => {
        directionsService.route(request, (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
                resolve(result);
            } else {
                const error = new Error(`Directions request failed with status: ${status}`);
                error.status = status;
                reject(error);
            }
        });
    });
}

/**
 * Extracts an overview path from a DirectionsResult as an array
 * of { lat, lng } objects suitable for use as a Polyline path.
 *
 * @param {google.maps.DirectionsResult} result
 * @returns {Array<{lat: number, lng: number}> | null}
 */
export function extractOverviewPath(result) {
    if (!result || !Array.isArray(result.routes) || result.routes.length === 0) {
        return null;
    }

    const route = result.routes[0];

    if (!route || !route.overview_path) {
        return null;
    }

    return route.overview_path.map((latLng) => ({
        lat: latLng.lat(),
        lng: latLng.lng(),
    }));
}
