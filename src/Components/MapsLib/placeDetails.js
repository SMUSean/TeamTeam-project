/**
 * @file placeDetails.js
 * @description Hooks and utilities for fetching Google Places data and static marker details.
 * Provides place information, photos, and fallback data for map markers.
 * 
 * @author Afif Mahmud
 */

import { useEffect, useState } from "react";
import {
    createPlacesService,
    findPlaceWithFallback,
    getDetailsAsync,
} from "./googlePlaces";

export function usePlaceDetails({ map, markerConfig }) {
    const [markerPosition, setMarkerPosition] = useState(markerConfig.position);
    const [placeDetails, setPlaceDetails] = useState(null);
    const [placeLoading, setPlaceLoading] = useState(false);
    const [placeError, setPlaceError] = useState(null);

    useEffect(() => {
        if (!map) {
            return;
        }
        if (!markerConfig || !markerConfig.position || !markerConfig.placeQuery) {
            setMarkerPosition(markerConfig.position);
            setPlaceDetails(null);
            setPlaceLoading(false);
            setPlaceError(null);
            return;
        }

        let cancelled = false;

        async function run() {
            try {
                setPlaceLoading(true);
                setPlaceError(null);

                const service = createPlacesService(map);
                const basePosition = markerConfig.position;
                const query = markerConfig.placeQuery;
                const radius = markerConfig.searchRadiusMeters ?? 300;

                const placeResult = await findPlaceWithFallback(service, {
                    position: basePosition,
                    query,
                    radius,
                });

                if (cancelled) return;

                const placeId = placeResult.place_id;
                if (!placeId) {
                    throw new Error("Search result missing place_id.");
                }

                const { place } = await getDetailsAsync(service, {
                    placeId,
                    fields: [
                        "name",
                        "formatted_address",
                        "website",
                        "formatted_phone_number",
                        "rating",
                        "user_ratings_total",
                        "photos",
                        "geometry",
                    ],
                });

                if (cancelled) return;

                if (place.geometry && place.geometry.location) {
                    const exactPos = place.geometry.location.toJSON();
                    setMarkerPosition(exactPos);
                }

                const photoUrl =
                    place.photos && place.photos.length > 0
                        ? place.photos[0].getUrl({ maxWidth: 600, maxHeight: 300 })
                        : null;

                setPlaceDetails({
                    name: place.name || markerConfig.title || "",
                    address: place.formatted_address || "",
                    website: place.website || "",
                    phone: place.formatted_phone_number || "",
                    rating: place.rating ?? null,
                    ratingCount: place.user_ratings_total ?? null,
                    photoUrl,
                });
                setPlaceLoading(false);
            } catch (err) {
                if (cancelled) return;
                setPlaceLoading(false);
                setPlaceError(err.message || "Failed to load place details.");
            }
        }

        run();

        return () => {
            cancelled = true;
        };
    }, [map, markerConfig]);

    return {
        markerPosition,
        placeDetails,
        placeLoading,
        placeError,
    };
}

export function useStaticMarkerDetails({ map, markerConfig }) {
    const [markerPosition] = useState(markerConfig.position);
    const [placeDetails, setPlaceDetails] = useState(null);
    const [placeLoading, setPlaceLoading] = useState(false);
    const [placeError, setPlaceError] = useState(null);

    useEffect(() => {
        if (!map) {
            return;
        }
        if (!window.google || !window.google.maps) {
            return;
        }

        let cancelled = false;

        function run() {
            setPlaceLoading(true);
            setPlaceError(null);

            const geocoder = new window.google.maps.Geocoder();
            const { lat, lng } = markerConfig.position;
            const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
            const streetViewUrl =
                `https://maps.googleapis.com/maps/api/streetview` +
                `?size=600x300&location=${lat},${lng}&key=${apiKey}`;

            geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                if (cancelled) return;

                let address = "";
                if (status === "OK" && results && results.length > 0) {
                    address = results[0].formatted_address;
                } else if (status !== "ZERO_RESULTS") {
                    setPlaceError(`Reverse geocoding failed: ${status}`);
                }

                setPlaceDetails({
                    name: markerConfig.title || "",
                    address,
                    website: "",
                    phone: "",
                    rating: null,
                    ratingCount: null,
                    photoUrl: streetViewUrl,
                });
                setPlaceLoading(false);
            });
        }

        run();

        return () => {
            cancelled = true;
        };
    }, [map, markerConfig]);

    return {
        markerPosition,
        placeDetails,
        placeLoading,
        placeError,
    };
}

