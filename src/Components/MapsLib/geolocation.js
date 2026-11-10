/**
 * Handles browser geolocation and permission state.
 *
 * Options:
 *  - defaultCenter, defaultZoom
 *  - userZoom
 *  - trackUser (boolean) – if true, continuously tracks user location
 *
 * Returns:
 *  - center, zoom
 *  - locationStatus: "using-default" | "requesting" | "using-user" | "unsupported" | "error"
 *  - geoError: { code, message, reason } | null
 *  - permissionState: "granted" | "prompt" | "denied" | null
 *  - userLocation: { lat, lng } | null
 * 
 * @author Afif Mahmud
 */
import { useEffect, useState, useRef } from "react";

export function useGeolocation({ defaultCenter, defaultZoom, userZoom, trackUser = false }) {
    const [center, setCenter] = useState(defaultCenter);
    const [zoom, setZoom] = useState(defaultZoom);
    const [locationStatus, setLocationStatus] = useState("using-default");
    const [geoError, setGeoError] = useState(null);
    const [permissionState, setPermissionState] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const watchIdRef = useRef(null);

    useEffect(() => {
        if ("permissions" in navigator && navigator.permissions?.query) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then((result) => {
                    setPermissionState(result.state);
                    result.onchange = () => {
                        setPermissionState(result.state);
                    };
                })
                .catch(() => {});
        }
    }, []);

    useEffect(() => {
        // Clean up any existing watch
        if (watchIdRef.current !== null) {
            navigator.geolocation.clearWatch(watchIdRef.current);
            watchIdRef.current = null;
        }

        setCenter(defaultCenter);
        setZoom(defaultZoom);

        if (!navigator.geolocation) {
            setLocationStatus("unsupported");
            setGeoError({
                code: 0,
                reason: "unsupported",
                message: "Geolocation is not supported by this browser.",
            });
            return;
        }

        const handlePosition = (position) => {
            const { latitude, longitude } = position.coords;
            const location = { lat: latitude, lng: longitude };
            setUserLocation(location);
            
            if (!trackUser) {
                // Only update center/zoom on initial load if not tracking
                setCenter(location);
                setZoom(userZoom ?? defaultZoom);
            }
            
            setLocationStatus("using-user");
            setGeoError(null);
        };

        const handleError = (error) => {
            let reason = "unknown";
            if (error.code === error.PERMISSION_DENIED) {
                reason = "permission-denied";
            } else if (error.code === error.POSITION_UNAVAILABLE) {
                reason = "position-unavailable";
            } else if (error.code === error.TIMEOUT) {
                reason = "timeout";
            }
            setGeoError({
                code: error.code,
                reason,
                message: error.message,
            });
            setLocationStatus("error");
            setUserLocation(null);
        };

        const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
        };

        if (trackUser) {
            // Continuous tracking
            setLocationStatus("requesting");
            watchIdRef.current = navigator.geolocation.watchPosition(
                handlePosition,
                handleError,
                options
            );
        } else {
            // One-time position
            setLocationStatus("requesting");
            navigator.geolocation.getCurrentPosition(
                handlePosition,
                handleError,
                options
            );
        }

        return () => {
            if (watchIdRef.current !== null) {
                navigator.geolocation.clearWatch(watchIdRef.current);
                watchIdRef.current = null;
            }
        };
    }, [defaultCenter, defaultZoom, userZoom, trackUser]);

    return {
        center,
        zoom,
        locationStatus,
        geoError,
        permissionState,
        userLocation,
    };
}
