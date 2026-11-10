/**
 * @file placeDetailsTest.jsx
 * @description Diagnostic helper for inspecting how a MAP_MARKERS entry is resolved
 * (Places vs fallback/static) and what data is available, including photos.
 * 
 * Usage: mount this inside MapRenderer (see below) and change `markerKey`
 * to test different MAP_MARKERS entries.
 * 
 * @author Afif Mahmud
 */

import React, { useEffect, useMemo } from "react";
import { MAP_MARKERS } from "./config";
import { usePlaceDetails, useStaticMarkerDetails } from "./placeDetails";

function decidePath(markerConfig, placeData, fallbackData) {
    if (!markerConfig) {
        return {
            path: "No markerConfig",
            chosen: null,
            hasPlaceQuery: false,
            placeHasValidResult: false,
        };
    }

    const hasPlaceQuery =
        typeof markerConfig.placeQuery === "string" &&
        markerConfig.placeQuery.trim().length > 0;

    const placeDetails = placeData?.placeDetails;
    const placeError = placeData?.placeError;
    const placeHasValidResult = hasPlaceQuery && !!placeDetails && !placeError;

    let path;
    let chosen;

    if (placeHasValidResult) {
        path = "Places (known marker)";
        chosen = placeData;
    } else if (fallbackData && fallbackData.placeDetails) {
        path = "Fallback (static / Street View)";
        chosen = fallbackData;
    } else {
        path = "None (no usable Places or fallback result)";
        chosen = null;
    }

    return {
        path,
        chosen,
        hasPlaceQuery,
        placeHasValidResult,
    };
}

export default function PlaceDetailsTest({ markerKey, map }) {
    // This log confirms the component is rendering and whether map is available.
    console.log(
        "[PlaceDetailsTest] render",
        { markerKey, hasMap: !!map }
    );

    const markerConfig = useMemo(
        () => MAP_MARKERS[markerKey],
        [markerKey]
    );

    const placeData = usePlaceDetails({
        map,
        markerConfig,
    });

    const fallbackData = useStaticMarkerDetails({
        map,
        markerConfig,
    });

    const decision = decidePath(markerConfig, placeData, fallbackData);

    useEffect(() => {
        if (!markerConfig) {
            console.group(
                `PlaceDetailsTest: MISSING markerKey "${markerKey}"`
            );
            console.error(
                `No MAP_MARKERS entry found for key "${markerKey}".`
            );
            console.groupEnd();
            return;
        }

        console.group(`PlaceDetailsTest: ${markerKey}`);

        console.log("Marker config:", markerConfig);
        console.log("placeQuery:", markerConfig.placeQuery);
        console.log("searchRadiusMeters:", markerConfig.searchRadiusMeters);

        console.log("\nRaw placeData (usePlaceDetails):", placeData);
        console.log("Raw fallbackData (useStaticMarkerDetails):", fallbackData);

        console.log("\nDecision:");
        console.log("  hasPlaceQuery:", decision.hasPlaceQuery);
        console.log("  placeHasValidResult:", decision.placeHasValidResult);
        console.log("  selectedPath:", decision.path);

        const chosenDetails = decision.chosen?.placeDetails || null;
        console.log("\nChosen placeDetails object:", chosenDetails);

        if (!chosenDetails) {
            console.warn(
                "No chosen placeDetails. This marker will not show image/photo derived from placeDetails."
            );
        } else {
            const {
                name,
                address,
                website,
                phone,
                rating,
                ratingCount,
                photoUrl,
                photos,
            } = chosenDetails;

            console.log("\nChosen core fields:");
            console.log("  name:", name);
            console.log("  address:", address);
            console.log("  website:", website);
            console.log("  phone:", phone);
            console.log("  rating:", rating);
            console.log("  ratingCount:", ratingCount);

            console.log("\nPhoto-related fields (mapped model):");
            console.log("  photoUrl:", photoUrl);
            console.log("  photos:", photos);

            if (!photoUrl) {
                if (Array.isArray(photos) && photos.length > 0) {
                    console.warn(
                        "photos[] exists but photoUrl is missing. Check usePlaceDetails to ensure it derives photoUrl from photos[0]."
                    );
                } else {
                    console.warn(
                        "No photoUrl and no photos[] on the mapped placeDetails. Either the Places result had no photos, or the mapping stripped them."
                    );
                }
            } else {
                console.log(
                    "photoUrl is present. Hovercard SHOULD be able to render an image using this URL."
                );
            }
        }

        console.groupEnd();
    }, [markerKey, markerConfig, placeData, fallbackData, decision]);

    if (!markerConfig) {
        return (
            <div
                style={{
                    padding: "0.5rem",
                    fontSize: "0.8rem",
                    color: "#b91c1c",
                    background: "#fef2f2",
                    border: "1px solid #fecaca",
                    borderRadius: "0.375rem",
                    maxWidth: "320px",
                }}
            >
                PlaceDetailsTest: unknown markerKey "{markerKey}" (see console).
            </div>
        );
    }

    return (
        <div
            style={{
                padding: "0.5rem",
                fontSize: "0.75rem",
                color: "#111827",
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "0.375rem",
                maxWidth: "320px",
            }}
        >
            <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>
                PlaceDetailsTest
            </div>
            <div style={{ marginBottom: "0.25rem" }}>
                Marker key: <code>{markerKey}</code>
            </div>
            <div style={{ marginBottom: "0.25rem" }}>
                Current path:{" "}
                <span style={{ fontWeight: 500 }}>{decision.path}</span>
            </div>
            <div style={{ fontSize: "0.7rem", color: "#6b7280" }}>
                See browser console (All levels) for full diagnostic output.
            </div>
        </div>
    );
}
