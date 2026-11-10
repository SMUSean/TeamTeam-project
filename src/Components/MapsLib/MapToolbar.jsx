/**
 * @file MapToolbar.jsx
 * @description Toolbar component providing toggle controls for map layer visibility.
 * Allows users to show/hide regions, trails, Google markers, and user tracking.
 * 
 * @author Afif Mahmud
 */

import React from "react";

export default function MapToolbar({
                                       showRegion,
                                       showTrail,
                                       showGoogleMarkers,
                                       trackUser,
                                       onToggleRegion,
                                       onToggleTrail,
                                       onToggleGoogleMarkers,
                                       onToggleUserTracking,
                                   }) {
    return (
        <div className="pointer-events-auto inline-flex items-center gap-3 rounded-full bg-white/95 shadow-lg border border-gray-200 px-6 py-3">
            <button
                type="button"
                onClick={onToggleUserTracking}
                className={`text-sm font-semibold rounded-full border shadow-sm px-6 py-2.5 transition-colors duration-150 ${
                    trackUser
                        ? "bg-green-600 text-white border-green-600 hover:bg-green-700"
                        : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
                }`}
            >
                YOU ARE HERE
            </button>

            <button
                type="button"
                onClick={onToggleRegion}
                className={`text-sm font-semibold rounded-full border shadow-sm px-6 py-2.5 transition-colors duration-150 ${
                    showRegion
                        ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                        : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
                }`}
            >
                {showRegion ? "Hide regions" : "Show regions"}
            </button>

            <button
                type="button"
                onClick={onToggleTrail}
                className={`text-sm font-semibold rounded-full border shadow-sm px-6 py-2.5 transition-colors duration-150 ${
                    showTrail
                        ? "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700"
                        : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
                }`}
            >
                {showTrail ? "Hide trail" : "Show trail"}
            </button>

            <button
                type="button"
                onClick={onToggleGoogleMarkers}
                className={`text-sm font-semibold rounded-full border shadow-sm px-6 py-2.5 transition-colors duration-150 ${
                    showGoogleMarkers
                        ? "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
                        : "bg-yellow-500 text-white border-yellow-500 hover:bg-yellow-600"
                }`}
            >
                {showGoogleMarkers ? "Hide Google markers" : "Show Google markers"}
            </button>
        </div>
    );
}
