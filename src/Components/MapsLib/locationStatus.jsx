/**
 * @file locationStatus.jsx
 * @description Component that displays the current geolocation status to the user.
 * Shows messages for requesting, success, errors, and permission states.
 * 
 * @author Afif Mahmud
 */

import React from "react";

export default function LocationStatus({ locationStatus, geoError }) {
    const getText = () => {
        switch (locationStatus) {
            case "requesting":
                return "Requesting your location…";
            case "using-user":
                return "Centering map to your approximate position.";
            case "unsupported":
                return "Geolocation is not supported by your browser.";
            case "error":
                if (!geoError) {
                    return "An unknown error occurred while retrieving your location.";
                }
                if (geoError.reason === "permission-denied") {
                    return "Location permission was denied. Showing default campus view.";
                }
                if (geoError.reason === "timeout") {
                    return "Location request timed out. Showing default campus view.";
                }
                if (geoError.reason === "position-unavailable") {
                    return "Location position is unavailable. Showing default campus view.";
                }
                return "An error occurred while retrieving your location.";
            case "using-default":
            default:
                return "Showing default campus view.";
        }
    };

    return (
        <div className="text-[11px] text-gray-700">
            {getText()}
        </div>
    );
}
