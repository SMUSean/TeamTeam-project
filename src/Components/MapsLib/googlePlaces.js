/**
 * @file googlePlaces.js
 * @description Utilities for interacting with Google Places API.
 * Provides functions for place search, place details, and photo retrieval.
 * 
 * @author Afif Mahmud
 */

function hasGooglePlaces() {
    return !!(window.google && window.google.maps && window.google.maps.places);
}

export function createPlacesService(mapInstance) {
    if (!hasGooglePlaces()) {
        throw new Error(
            "[googlePlaces] Google Maps Places library is not available. Ensure libraries:['places'] is passed to useJsApiLoader and Places API is enabled."
        );
    }
    return new window.google.maps.places.PlacesService(mapInstance);
}

export function textSearchAsync(service, request) {
    return new Promise((resolve, reject) => {
        service.textSearch(request, (results, status) => {
            const OK = window.google.maps.places.PlacesServiceStatus.OK;
            if (status === OK && results && results.length > 0) {
                resolve({ status, results });
            } else {
                reject({ status, results });
            }
        });
    });
}

export function nearbySearchAsync(service, request) {
    return new Promise((resolve, reject) => {
        service.nearbySearch(request, (results, status) => {
            const OK = window.google.maps.places.PlacesServiceStatus.OK;
            if (status === OK && results && results.length > 0) {
                resolve({ status, results });
            } else {
                reject({ status, results });
            }
        });
    });
}

export function getDetailsAsync(service, request) {
    return new Promise((resolve, reject) => {
        service.getDetails(request, (place, status) => {
            const OK = window.google.maps.places.PlacesServiceStatus.OK;
            if (status === OK && place) {
                resolve({ status, place });
            } else {
                reject({ status, place });
            }
        });
    });
}

export async function findPlaceWithFallback(service, { position, query, radius }) {
    const textSearchReq = {
        location: position,
        radius,
        query,
    };
    try {
        const { results } = await textSearchAsync(service, textSearchReq);
        if (!results || results.length === 0) {
            throw { status: "ZERO_RESULTS" };
        }
        return results[0];
    } catch (textErr) {
        const nearbyReq = {
            location: position,
            radius,
            keyword: query,
        };
        try {
            const { results } = await nearbySearchAsync(service, nearbyReq);
            if (!results || results.length === 0) {
                throw { status: "ZERO_RESULTS" };
            }
            return results[0];
        } catch (nearbyErr) {
            const textStatus = textErr?.status || "UNKNOWN";
            const nearbyStatus = nearbyErr?.status || "UNKNOWN";
            const error = new Error(
                `Could not find place via Places search. textSearch status=${textStatus}, nearbySearch status=${nearbyStatus}`
            );
            error.textStatus = textStatus;
            error.nearbyStatus = nearbyStatus;
            throw error;
        }
    }
}
