/**
 * @file MapRenderer.jsx
 * @description Main map rendering component that displays the Google Map with all overlays,
 * including regions, trails, markers, user location, and interactive controls.
 * 
 * This component serves as the central renderer for the map view, orchestrating the display
 * of various map elements based on configuration and user interactions. It handles:
 * - Region polygons with hover effects
 * - Trail segments connecting markers
 * - Custom POI markers with narration support
 * - User location tracking
 * - Interactive toolbars and controls
 * 
 * @author Afif Mahmud
 */

import React from "react";
import {
    GoogleMap,
    Polyline,
    Polygon,
    InfoWindow,
} from "@react-google-maps/api";

import {
    MAP_REGIONS,
    MAP_CONTAINER_STYLE,
    MAP_REGION_POLYGON_OPTIONS,
    MAP_REGION_BORDER_POLYLINE_OPTIONS,
    MAP_LEGEND,
} from "./config";
import LocationStatus from "./locationStatus";
import MapToolbar from "./MapToolbar";
import MarkerWithData from "./MarkerWithData";
import TrailSegment from "./TrailSegment";
import PlaceDetailsTest from "./placeDetailsTest";
import NorthArrow from "./NorthArrow";
import ProximityAudioButton from "./ProximityAudioButton";
import { Marker } from "@react-google-maps/api";

// Container style for the Google Map component
const containerStyle = MAP_CONTAINER_STYLE;

/**
 * Builds trail segments from marker configuration
 * 
 * This function processes markers that have trailCodes and creates line segments
 * between pairs of markers that share the same trail code. Trail codes are used
 * to connect markers visually on the map, representing walking paths.
 * 
 * @param {Object} markersConfig - Configuration object containing all map markers
 * @returns {Array} Array of trail segment objects with code, origin, and destination
 * 
 * @example
 * // If two markers both have trailCodes: ["A"], this creates a segment
 * // connecting those two markers with code "A"
 */
function buildTrailSegments(markersConfig) {
    // Extract all marker objects from the configuration
    const markers = Object.values(markersConfig);

    // Map to group markers by their trail codes
    // Key: trail code (string), Value: array of markers with that code
    const codeMap = new Map();

    // Group markers by their trail codes
    markers.forEach((marker) => {
        const codes = marker.trailCodes || []; // Get trail codes, default to empty array
        codes.forEach((code) => {
            // Initialize array for this trail code if it doesn't exist
            if (!codeMap.has(code)) {
                codeMap.set(code, []);
            }
            // Add this marker to the list for this trail code
            codeMap.get(code).push(marker);
        });
    });

    const segments = [];

    // Create segments only for trail codes that have exactly 2 markers
    // (a trail segment connects two points)
    for (const [code, markerList] of codeMap.entries()) {
        if (markerList.length === 2) {
            const [m1, m2] = markerList;
            segments.push({
                code,                    // Trail code identifier
                origin: m1.position,    // Starting point of the trail segment
                destination: m2.position, // Ending point of the trail segment
            });
        }
    }

    return segments;
}

/**
 * MapRenderer Component
 * 
 * Main component that renders the Google Map with all overlays and interactive elements.
 * This is a presentational component that receives all state and handlers as props from
 * the parent GoogleMapView component.
 * 
 * @param {Object} props - Component properties
 * @param {{lat: number, lng: number}} props.center - Map center coordinates
 * @param {number} props.zoom - Map zoom level
 * @param {Object} props.mapOptions - Google Maps API options
 * @param {Object} props.mapInstance - Google Maps instance reference
 * @param {boolean} props.showRegion - Whether to display region polygons
 * @param {boolean} props.showTrail - Whether to display trail segments
 * @param {boolean} props.showGoogleMarkers - Whether to show Google's default markers
 * @param {boolean} props.trackUser - Whether to track and display user location
 * @param {Object} props.markersConfig - Configuration object for all map markers
 * @param {string} props.locationStatus - Current geolocation status
 * @param {Object|null} props.geoError - Geolocation error object if any
 * @param {{lat: number, lng: number}|null} props.userLocation - Current user location
 * @param {string|null} props.hoveredMarkerId - ID of currently hovered marker
 * @param {Function} props.openHover - Handler to open marker hover card
 * @param {Function} props.scheduleHoverClose - Handler to close marker hover card
 * @param {string|null} props.hoveredRegionId - ID of currently hovered region
 * @param {Function} props.openRegionHover - Handler to open region hover info
 * @param {Function} props.scheduleRegionHoverClose - Handler to close region hover info
 * @param {string|null} props.speakingMarkerId - ID of marker currently playing narration
 * @param {Function} props.onStartNarration - Handler to start marker narration
 * @param {Function} props.onStopNarration - Handler to stop marker narration
 * @param {Array} props.nearbyPOIs - Array of nearby points of interest
 * @param {Object|null} props.closestPOI - Closest point of interest to user
 * @param {string|null} props.proximityPlayingPOIId - ID of POI playing via proximity
 * @param {Function} props.onProximityPlayAudio - Handler to play proximity audio
 * @param {Function} props.onProximityStopAudio - Handler to stop proximity audio
 * @param {Function} props.onToggleRegion - Toggle region visibility
 * @param {Function} props.onToggleTrail - Toggle trail visibility
 * @param {Function} props.onToggleGoogleMarkers - Toggle Google markers visibility
 * @param {Function} props.onToggleUserTracking - Toggle user location tracking
 * @param {Function} props.onLoadMap - Callback when map loads
 * @param {Function} props.onUnmountMap - Callback when map unmounts
 * 
 * @returns {JSX.Element} The rendered map with all overlays
 */
export default function MapRenderer({
                                        center,
                                        zoom,
                                        mapOptions,
                                        mapInstance,

                                        showRegion,
                                        showTrail,
                                        showGoogleMarkers,
                                        trackUser,

                                        markersConfig,

                                        locationStatus,
                                        geoError,
                                        userLocation,

                                        hoveredMarkerId,
                                        openHover,
                                        scheduleHoverClose,
                                        hoveredRegionId,
                                        openRegionHover,
                                        scheduleRegionHoverClose,

                                        speakingMarkerId,
                                        onStartNarration,
                                        onStopNarration,

                                        nearbyPOIs,
                                        closestPOI,
                                        proximityPlayingPOIId,
                                        onProximityPlayAudio,
                                        onProximityStopAudio,

                                        onToggleRegion,
                                        onToggleTrail,
                                        onToggleGoogleMarkers,
                                        onToggleUserTracking,

                                        onLoadMap,
                                        onUnmountMap,
                                    }) {
    // Build trail segments from marker configuration
    // This creates visual connections between markers that share trail codes
    const trailSegments = buildTrailSegments(markersConfig);

    /**
     * Calculate the center point (centroid) of a region path
     * Used to position InfoWindow popups at the center of region polygons
     * 
     * @param {Array} path - Array of coordinate points defining the region boundary
     * @returns {{lat: number, lng: number}|null} Center coordinates or null if invalid
     */
    const getRegionCenter = (path) => {
        if (!path || path.length === 0) return null;
        
        // Sum all coordinates
        const sum = path.reduce(
            (acc, pt) => ({
                lat: acc.lat + pt.lat,
                lng: acc.lng + pt.lng,
            }),
            { lat: 0, lng: 0 }
        );
        
        // Return average (centroid)
        return {
            lat: sum.lat / path.length,
            lng: sum.lng / path.length,
        };
    };

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 relative">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={zoom}
                    onLoad={onLoadMap}
                    onUnmount={onUnmountMap}
                    options={mapOptions}
                >
                    {/* Render region polygons if showRegion is enabled */}
                    {showRegion &&
                        Object.values(MAP_REGIONS).map((region) => {
                            const rawPath = region.path || [];

                            // Normalize path coordinates to {lat, lng} format
                            // Handles both array format [lat, lng] and object format {lat, lng}
                            const path = rawPath
                                .map((pt) => {
                                    // Handle array format: [latitude, longitude]
                                    if (Array.isArray(pt) && pt.length >= 2) {
                                        const [lat, lng] = pt;
                                        return { lat, lng };
                                    }
                                    // Handle object format: {lat: number, lng: number}
                                    if (
                                        pt &&
                                        typeof pt === "object" &&
                                        Number.isFinite(pt.lat) &&
                                        Number.isFinite(pt.lng)
                                    ) {
                                        return { lat: pt.lat, lng: pt.lng };
                                    }
                                    return null;
                                })
                                // Filter out invalid coordinates
                                .filter(
                                    (p) =>
                                        p &&
                                        Number.isFinite(p.lat) &&
                                        Number.isFinite(p.lng)
                                );

                            // Validate path has at least 2 points (minimum for a polygon)
                            if (path.length < 2) {
                                console.warn(
                                    "[MapRenderer] Skipping region with invalid or empty path:",
                                    region.id,
                                    region.path
                                );
                                return null;
                            }

                            // Create border path by closing the polygon (add first point at end)
                            const borderPath = [...path, path[0]];
                            // Calculate center for InfoWindow positioning
                            const regionCenter = getRegionCenter(path);
                            // Check if this region is currently being hovered
                            const isHovered = hoveredRegionId === region.id;

                            return (
                                <React.Fragment key={region.id}>
                                    <Polygon
                                        path={path}
                                        options={{
                                            ...MAP_REGION_POLYGON_OPTIONS,
                                            clickable: true,
                                        }}
                                        onMouseOver={() => openRegionHover(region.id)}
                                        onMouseOut={scheduleRegionHoverClose}
                                    />
                                    <Polyline
                                        path={borderPath}
                                        options={MAP_REGION_BORDER_POLYLINE_OPTIONS}
                                    />
                                    {isHovered && regionCenter && region.title && (
                                        <InfoWindow
                                            position={regionCenter}
                                            onCloseClick={scheduleRegionHoverClose}
                                        >
                                            <div
                                                onMouseEnter={() => openRegionHover(region.id)}
                                                onMouseLeave={scheduleRegionHoverClose}
                                                style={{
                                                    fontFamily:
                                                        "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                                                    fontSize: "0.9rem",
                                                    fontWeight: "600",
                                                    color: "#111827",
                                                    padding: "4px 0",
                                                }}
                                            >
                                                {region.title}
                                            </div>
                                        </InfoWindow>
                                    )}
                                </React.Fragment>
                            );
                        })}

                    {/* Dynamically render ALL markers from MAP_MARKERS */}
                    {Object.values(markersConfig).map((markerConfig) => (
                        <MarkerWithData
                            key={markerConfig.id}
                            map={mapInstance}
                            markerConfig={markerConfig}
                            hoveredMarkerId={hoveredMarkerId}
                            openHover={openHover}
                            scheduleHoverClose={scheduleHoverClose}
                            speakingMarkerId={speakingMarkerId}
                            onStartNarration={onStartNarration}
                            onStopNarration={onStopNarration}
                        />
                    ))}

                    {/* Dynamically render ALL trail segments */}
                    {showTrail &&
                        trailSegments.map((segment) => (
                            <TrailSegment
                                key={segment.code}
                                map={mapInstance}
                                origin={segment.origin}
                                destination={segment.destination}
                                showTrail={showTrail}
                            />
                        ))}

                    {/* User position marker */}
                    {userLocation && trackUser && (
                        <Marker
                            position={userLocation}
                            icon={{
                                url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(
                                    '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">' +
                                    '<circle cx="16" cy="16" r="12" fill="#2563eb" fill-opacity="0.3" stroke="#2563eb" stroke-width="2"/>' +
                                    '<circle cx="16" cy="16" r="6" fill="#2563eb"/>' +
                                    '<line x1="16" y1="4" x2="16" y2="10" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>' +
                                    '<line x1="16" y1="22" x2="16" y2="28" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>' +
                                    '<line x1="4" y1="16" x2="10" y2="16" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>' +
                                    '<line x1="22" y1="16" x2="28" y2="16" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>' +
                                    '</svg>'
                                ),
                                scaledSize: { width: 32, height: 32 },
                                anchor: { x: 16, y: 16 },
                            }}
                            zIndex={1000}
                        />
                    )}
                </GoogleMap>

                {/* True North Arrow */}
                <NorthArrow />

                {/* Proximity Audio Button */}
                <ProximityAudioButton
                    closestPOI={closestPOI}
                    nearbyPOIs={nearbyPOIs}
                    onPlayAudio={onProximityPlayAudio}
                    isPlaying={!!proximityPlayingPOIId}
                    onStopAudio={onProximityStopAudio}
                />

                {/* PlaceDetailsTest debug overlay (change markerKey to test others) */}
                <div className="pointer-events-none absolute left-3 top-20 z-20" style={{display: "none"}}>
                    <div className="pointer-events-auto">
                        <PlaceDetailsTest
                            // Try "aspotoganTrailhead" vs "sobeySchool"
                            markerKey="sobeySchool"
                            map={mapInstance}
                        />
                    </div>
                </div>

                {/* Centered toolbar overlay on top of the map */}
                <div className="pointer-events-none absolute inset-x-0 top-4 flex justify-center z-10">
                    <MapToolbar
                        showRegion={showRegion}
                        showTrail={showTrail}
                        showGoogleMarkers={showGoogleMarkers}
                        trackUser={trackUser}
                        onToggleRegion={onToggleRegion}
                        onToggleTrail={onToggleTrail}
                        onToggleGoogleMarkers={onToggleGoogleMarkers}
                        onToggleUserTracking={onToggleUserTracking}
                    />
                </div>

                {/* Bottom status and legend */}
                <div className="absolute left-3 bottom-3 right-3 pointer-events-none" style={{display: "none"}}>
                    <div className="bg-white/95 border border-gray-200 shadow-sm rounded-lg px-3 py-2 flex flex-col gap-1 pointer-events-auto">
                        <LocationStatus
                            locationStatus={locationStatus}
                            geoError={geoError}
                        />

                        <div className="flex flex-wrap gap-2 items-center" >
                            <div className="flex items-center gap-1 text-[10px] text-gray-500">
                                <span
                                    className={`inline-block h-2 w-2 rounded-full mr-1 ${MAP_LEGEND.region.colorClass}`}
                                />
                                <span>{MAP_LEGEND.region.label}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-gray-500">
                                <span
                                    className={`inline-block h-2 w-2 rounded-full mr-1 ${MAP_LEGEND.trail.colorClass}`}
                                />
                                <span>{MAP_LEGEND.trail.label}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-gray-500">
                                <span
                                    className={`inline-block h-2 w-2 rounded-full mr-1 ${MAP_LEGEND.customMarker.colorClass}`}
                                />
                                <span>{MAP_LEGEND.customMarker.label}</span>
                            </div>
                        </div>

                        <div className="text-[9px] text-gray-400">
                            Location is approximate. Trail is a suggested walking
                            route and may not reflect actual paths or accessibility.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
