/**
 * @file directionsAdapter.js
 * @description Hook for managing walking trail paths between markers using Google Directions API.
 * 
 * @author Afif Mahmud
 */

import { useEffect, useState } from "react";
import {
    isDirectionsApiAvailable,
    getWalkingRoute,
    extractOverviewPath,
} from "./googleDirectionsAPI";

/**
 * useWalkingTrail
 *
 * Manages walking-trail state and side-effects:
 * - checks Directions API availability
 * - calls getWalkingRoute with origin/destination
 * - extracts overview path
 * - handles cancellation and error states
 *
 * @param {Object} params
 * @param {google.maps.Map | null} params.map
 * @param {boolean} params.enabled
 * @param {google.maps.LatLngLiteral | null | undefined} params.origin
 * @param {google.maps.LatLngLiteral | null | undefined} params.destination
 */
export function useWalkingTrail({ map, enabled, origin, destination }) {
    const [trailPath, setTrailPath] = useState(null);
    const [trailLoading, setTrailLoading] = useState(false);
    const [trailError, setTrailError] = useState(null);

    useEffect(() => {
        // Reset whenever prerequisites are not met
        if (!map || !enabled || !origin || !destination) {
            setTrailPath(null);
            setTrailLoading(false);
            setTrailError(null);
            return;
        }

        if (!isDirectionsApiAvailable()) {
            setTrailError("Google Maps DirectionsService is not available.");
            setTrailPath(null);
            setTrailLoading(false);
            return;
        }

        let cancelled = false;

        setTrailLoading(true);
        setTrailError(null);

        getWalkingRoute({
            origin,
            destination,
        })
            .then((result) => {
                if (cancelled) {
                    return;
                }

                const path = extractOverviewPath(result);

                if (path && path.length > 0) {
                    setTrailPath(path);
                } else {
                    setTrailPath(null);
                    setTrailError("Route computed, but overview path is missing.");
                }
            })
            .catch((error) => {
                if (cancelled) {
                    return;
                }

                const status = (error && error.status) || "UNKNOWN_ERROR";

                setTrailPath(null);
                setTrailError(`Failed to compute route: ${status}`);
            })
            .finally(() => {
                if (!cancelled) {
                    setTrailLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [map, enabled, origin, destination]);

    return { trailPath, trailLoading, trailError };
}
