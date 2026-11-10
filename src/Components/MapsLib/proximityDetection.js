/**
 * Hook for detecting proximity to POI markers
 * Calculates distance every 15 seconds and returns POIs within 3 meters
 * 
 * @author Samson Mate
 */
import { useEffect, useState, useRef } from "react";
import { calculateDistance } from "./distanceUtils";

/**
 * @param {Object} userLocation - Current user location { lat, lng } or null
 * @param {Object} markersConfig - Object of marker configurations
 * @param {number} proximityThresholdMeters - Distance threshold in meters (default: 3)
 * @param {number} checkIntervalMs - Interval for checking distance in milliseconds (default: 15000)
 * @returns {Object} - { nearbyPOIs: Array, closestPOI: Object | null }
 */
export function useProximityDetection(
    userLocation,
    markersConfig,
    proximityThresholdMeters = 3,
    checkIntervalMs = 15000
) {
    const [nearbyPOIs, setNearbyPOIs] = useState([]);
    const [closestPOI, setClosestPOI] = useState(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (!userLocation || !markersConfig) {
            setNearbyPOIs([]);
            setClosestPOI(null);
            return;
        }

        const checkProximity = () => {
            const visibleMarkers = Object.values(markersConfig).filter(
                (marker) => marker.pinVisible !== false
            );

            const distances = visibleMarkers
                .map((marker) => ({
                    marker,
                    distance: calculateDistance(userLocation, marker.position),
                }))
                .filter((item) => item.distance <= proximityThresholdMeters)
                .sort((a, b) => a.distance - b.distance);

            if (distances.length > 0) {
                setNearbyPOIs(distances.map((item) => item.marker));
                setClosestPOI(distances[0].marker);
            } else {
                setNearbyPOIs([]);
                setClosestPOI(null);
            }
        };

        // Check immediately
        checkProximity();

        // Then check every interval
        intervalRef.current = setInterval(checkProximity, checkIntervalMs);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [userLocation, markersConfig, proximityThresholdMeters, checkIntervalMs]);

    return {
        nearbyPOIs,
        closestPOI,
    };
}

