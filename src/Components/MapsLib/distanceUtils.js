/**
 * Distance calculation utilities using the Haversine formula
 * to calculate distances between GPS coordinates.
 * 
 * @author Samson Mate
 */

/**
 * Calculate the distance between two points on Earth using the Haversine formula.
 * 
 * @param {Object} point1 - First point with lat and lng
 * @param {number} point1.lat - Latitude of first point
 * @param {number} point1.lng - Longitude of first point
 * @param {Object} point2 - Second point with lat and lng
 * @param {number} point2.lat - Latitude of second point
 * @param {number} point2.lng - Longitude of second point
 * @returns {number} Distance in meters
 */
export function calculateDistance(point1, point2) {
    if (!point1 || !point2 || 
        typeof point1.lat !== 'number' || typeof point1.lng !== 'number' ||
        typeof point2.lat !== 'number' || typeof point2.lng !== 'number') {
        return Infinity;
    }

    const R = 6371000; // Earth's radius in meters
    const dLat = toRadians(point2.lat - point1.lat);
    const dLng = toRadians(point2.lng - point1.lng);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(point1.lat)) *
        Math.cos(toRadians(point2.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
}

/**
 * Convert degrees to radians
 * @param {number} degrees - Angle in degrees
 * @returns {number} Angle in radians
 */
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

