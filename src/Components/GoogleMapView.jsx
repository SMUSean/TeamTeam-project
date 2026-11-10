/**
 * @file GoogleMapView.jsx
 * @description Main container component for the Google Maps integration.
 * This component manages all map-related state, user interactions, and coordinates
 * between various map features including markers, regions, trails, geolocation,
 * narration, and proximity detection.
 * 
 * Key Responsibilities:
 * - Loads Google Maps API and manages loading state
 * - Manages map instance and viewport state (center, zoom)
 * - Handles user location tracking and geolocation permissions
 * - Coordinates hover interactions for markers and regions
 * - Manages audio narration for markers and proximity-based audio
 * - Provides toggle controls for map layer visibility
 * 
 * @author Afif Mahmud
 */

import React, {
    useCallback,
    useRef,
    useState,
    useMemo,
} from "react";
import { useJsApiLoader } from "@react-google-maps/api";

import { useGeolocation } from "./MapsLib/geolocation";
import {
    MAP_MARKERS,
    MAP_DEFAULT_ZOOM,
    MAP_USER_ZOOM,
    MAP_PRIMARY_MARKER_ID,
    buildMapOptions,
} from "./MapsLib/config";
import MapRenderer from "./MapsLib/MapRenderer";
import { startNarration, stopNarration } from "./MapsLib/narrationAdapter";
import { useProximityDetection } from "./MapsLib/proximityDetection";

// Default zoom levels for different map states
const DEFAULT_ZOOM = MAP_DEFAULT_ZOOM;  // Zoom when using default center
const USER_ZOOM = MAP_USER_ZOOM;       // Zoom when centered on user location

// Get primary marker (usually the main site location) for default center
const PRIMARY_MARKER = MAP_MARKERS[MAP_PRIMARY_MARKER_ID];
const DEFAULT_CENTER = PRIMARY_MARKER.position;

/**
 * GoogleMapView Component
 * @description Main map view component that orchestrates all map functionality.
 * 
 * @returns {JSX.Element} The rendered map view with all features
 */
export default function GoogleMapView() {
    // Load Google Maps JavaScript API
    // This hook handles loading the API script and provides loading/error states
    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
        libraries: ["places"], // Load Places library for place details
    });

    // Map instance reference (used for programmatic map control)
    const [map, setMap] = useState(null);
    
    // Visibility toggles for map layers
    const [showRegion, setShowRegion] = useState(true);        // Show region polygons
    const [showTrail, setShowTrail] = useState(true);          // Show trail segments
    const [showGoogleMarkers, setShowGoogleMarkers] = useState(true); // Show Google's default markers
    const [trackUser, setTrackUser] = useState(false);          // Track user location continuously

    // Hover state management for interactive elements
    const [hoveredMarkerId, setHoveredMarkerId] = useState(null);  // Currently hovered marker
    const [hoveredRegionId, setHoveredRegionId] = useState(null);  // Currently hovered region
    
    // Refs to store timeout IDs for delayed hover close (prevents flickering)
    const hoverTimeoutRef = useRef(null);
    const regionHoverTimeoutRef = useRef(null);

    // Track which marker is currently playing narration
    // Used to show visual feedback and prevent multiple narrations simultaneously
    const [speakingMarkerId, setSpeakingMarkerId] = useState(null);

    /**
     * Geolocation hook - manages user location and map centering
     * Automatically requests location permission and updates map center/zoom
     * Returns location status, errors, and current user position
     */
    const {
        center,           // Current map center coordinates
        zoom,            // Current map zoom level
        locationStatus,  // Status: "using-default" | "requesting" | "using-user" | "unsupported" | "error"
        geoError,        // Error object if geolocation fails
        permissionState, // Permission state: "granted" | "prompt" | "denied" | null
        userLocation,    // Current user coordinates {lat, lng} or null
    } = useGeolocation({
        defaultCenter: DEFAULT_CENTER,  // Fallback center if location unavailable
        defaultZoom: DEFAULT_ZOOM,      // Zoom level for default center
        userZoom: USER_ZOOM,             // Zoom level when centered on user
        trackUser: trackUser,           // Whether to continuously track user movement
    });

    /**
     * Proximity detection for "Talking Trees" feature
     * Detects when user is near points of interest and can trigger audio narration
     * Only active when user tracking is enabled
     */
    const { nearbyPOIs, closestPOI } = useProximityDetection(
        trackUser ? userLocation : null, // Only detect when tracking is enabled
        MAP_MARKERS,                      // All markers to check proximity against
        3,                                // 3 meters threshold for "nearby"
        15000                             // Check every 15 seconds
    );

    // Track which POI is currently playing audio via proximity detection
    const [proximityPlayingPOIId, setProximityPlayingPOIId] = useState(null);

    /**
     * Memoized map options - rebuilds when showGoogleMarkers changes
     * Controls map styling, controls, and default marker visibility
     */
    const mapOptions = useMemo(
        () => buildMapOptions(showGoogleMarkers),
        [showGoogleMarkers]
    );

    /**
     * Callback when Google Map instance loads
     * Stores the map instance for programmatic control
     */
    const onLoad = useCallback((mapInstance) => {
        setMap(mapInstance);
    }, []);

    /**
     * Callback when Google Map unmounts
     * Cleans up map instance reference
     */
    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    /**
     * Opens hover card for a marker immediately
     * Cancels any pending close timeout to prevent flickering
     * 
     * @param {string} markerId - ID of the marker to show hover card for
     */
    const openHover = useCallback(
        (markerId) => {
            // Cancel any pending close timeout
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
                hoverTimeoutRef.current = null;
            }
            setHoveredMarkerId(markerId);
        },
        []
    );

    /**
     * Schedules hover card to close after a short delay
     * This delay prevents flickering when mouse moves between elements
     * Delay: 150ms
     */
    const scheduleHoverClose = useCallback(() => {
        // Clear any existing timeout
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        // Schedule close after delay
        hoverTimeoutRef.current = setTimeout(() => {
            setHoveredMarkerId(null);
        }, 150);
    }, []);

    /**
     * Opens hover info for a region immediately
     * Similar to openHover but for region polygons
     * 
     * @param {string} regionId - ID of the region to show info for
     */
    const openRegionHover = useCallback((regionId) => {
        // Cancel any pending close timeout
        if (regionHoverTimeoutRef.current) {
            clearTimeout(regionHoverTimeoutRef.current);
            regionHoverTimeoutRef.current = null;
        }
        setHoveredRegionId(regionId);
    }, []);

    /**
     * Schedules region hover info to close after a short delay
     * Prevents flickering when mouse moves between region elements
     */
    const scheduleRegionHoverClose = useCallback(() => {
        // Clear any existing timeout
        if (regionHoverTimeoutRef.current) {
            clearTimeout(regionHoverTimeoutRef.current);
        }
        // Schedule close after delay
        regionHoverTimeoutRef.current = setTimeout(() => {
            setHoveredRegionId(null);
        }, 150);
    }, []);

    /**
     * Handler to start narration for a marker
     * Called when user clicks the narration button on a marker's hover card
     * 
     * @param {string} markerId - ID of the marker being narrated
     * @param {string} text - Text content to narrate (speech synthesis)
     */
    const handleStartNarration = useCallback((markerId, text) => {
        if (!text) return; // Skip if no text provided

        startNarration(text, {
            onStart: () => {
                // Mark this marker as currently speaking
                setSpeakingMarkerId(markerId);
            },
            onEnd: () => {
                // Clear speaking state only if this marker is still the active one
                // (prevents race conditions if user clicks multiple markers quickly)
                setSpeakingMarkerId((current) =>
                    current === markerId ? null : current
                );
            },
        });
    }, []);

    /**
     * Handler to stop all narration
     * Stops any active narration and clears all speaking states
     */
    const handleStopNarration = useCallback(() => {
        stopNarration();                    // Stop speech synthesis
        setSpeakingMarkerId(null);          // Clear marker narration state
        setProximityPlayingPOIId(null);     // Clear proximity narration state
    }, []);

    /**
     * Handler for proximity-based audio playback
     * Called automatically when user gets close to a POI (if tracking enabled)
     * 
     * @param {string} poiId - ID of the point of interest
     * @param {string} text - Text content to narrate
     */
    const handleProximityPlayAudio = useCallback((poiId, text) => {
        if (!text) return; // Skip if no text provided

        startNarration(text, {
            onStart: () => {
                // Mark this POI as currently playing
                setProximityPlayingPOIId(poiId);
            },
            onEnd: () => {
                // Clear proximity playing state
                setProximityPlayingPOIId(null);
            },
        });
    }, []);

    if (loadError) {
        return <div>Failed to load Google Maps.</div>;
    }

    if (!isLoaded) {
        return <div>Loading map…</div>;
    }

    return (
        <MapRenderer
            center={center}
            zoom={zoom}
            mapOptions={mapOptions}
            mapInstance={map}
            // visibility flags
            showRegion={showRegion}
            showTrail={showTrail}
            showGoogleMarkers={showGoogleMarkers}
            trackUser={trackUser}
            // markers config (fully dynamic from config.js)
            markersConfig={MAP_MARKERS}
            // location status
            locationStatus={locationStatus}
            geoError={geoError}
            userLocation={userLocation}
            // hover state
            hoveredMarkerId={hoveredMarkerId}
            openHover={openHover}
            scheduleHoverClose={scheduleHoverClose}
            hoveredRegionId={hoveredRegionId}
            openRegionHover={openRegionHover}
            scheduleRegionHoverClose={scheduleRegionHoverClose}
            // narration state
            speakingMarkerId={speakingMarkerId}
            onStartNarration={handleStartNarration}
            onStopNarration={handleStopNarration}
            // proximity state
            nearbyPOIs={nearbyPOIs}
            closestPOI={closestPOI}
            proximityPlayingPOIId={proximityPlayingPOIId}
            onProximityPlayAudio={handleProximityPlayAudio}
            onProximityStopAudio={handleStopNarration}
            // toggles
            onToggleRegion={() => setShowRegion((prev) => !prev)}
            onToggleTrail={() => setShowTrail((prev) => !prev)}
            onToggleGoogleMarkers={() =>
                setShowGoogleMarkers((prev) => !prev)
            }
            onToggleUserTracking={() => setTrackUser((prev) => !prev)}
            // map lifecycle
            onLoadMap={onLoad}
            onUnmountMap={onUnmount}
        />
    );
}
