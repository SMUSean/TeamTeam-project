/**
 * @file MarkerWithData.jsx
 * @description Component that renders a map marker with associated data, place details, and interactive features.
 * 
 * @author Afif Mahmud, Ashesh Pahari
 */
import React, { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";

import { usePlaceDetails, useStaticMarkerDetails } from "./placeDetails";
import Hovercard from "./hovercard";
import MarkerDetailModal from "./MarkerDetailModal";
import { getPinIcon } from "./config";

// Prefer live Google Places details when available; otherwise fall back to static marker config
function buildMarkerModel(markerConfig, placeData, fallbackData) {
    const hasPlaceQuery =
        typeof markerConfig.placeQuery === "string" &&
        markerConfig.placeQuery.trim().length > 0;

    const placeDetails = placeData?.placeDetails;
    const placeError = placeData?.placeError;
    const placeHasValidResult = hasPlaceQuery && !!placeDetails && !placeError;

    const chosen = placeHasValidResult ? placeData : fallbackData || null;

    const markerPosition =
        chosen?.markerPosition || markerConfig.position;

    const combinedLoading =
        (placeData?.placeLoading ?? false) ||
        (fallbackData?.placeLoading ?? false);

    const combinedError = placeHasValidResult
        ? placeData?.placeError || null
        : fallbackData?.placeError || placeData?.placeError || null;

    return {
        id: markerConfig.id,
        markerTitle: markerConfig.title,
        position: markerPosition,
        placeDetails: chosen?.placeDetails || null,
        placeLoading: combinedLoading,
        placeError: combinedError,
    };
}

export default function MarkerWithData({
    map,
    markerConfig,
    hoveredMarkerId,
    openHover,
    scheduleHoverClose,
    speakingMarkerId,
    onStartNarration,
    onStopNarration,
}) {
    const [showDetailModal, setShowDetailModal] = useState(false);

    if (markerConfig.pinVisible === false) {
        return null;
    }

    const placeData = usePlaceDetails({
        map,
        markerConfig,
    });

    const fallbackData = useStaticMarkerDetails({
        map,
        markerConfig,
    });

    const model = buildMarkerModel(markerConfig, placeData, fallbackData);

    const hasHovercard =
        !!model.placeDetails ||
        !!model.placeError ||
        !!model.placeLoading;

    if (!model.position) {
        return null;
    }

    // Resolve native Google Maps pin icon (defaults to standard red pin)
    const icon =
        getPinIcon(markerConfig.pinStyle, markerConfig.pinColor) || undefined;

    const hasNarration = !!markerConfig.desc;
    const isSpeaking = speakingMarkerId === markerConfig.id;
    const hasClickText = !!markerConfig.clickText;
    const hoverText = markerConfig.hoverText;

    const handleMarkerClick = () => {
        if (hasClickText) {
            setShowDetailModal(true);
        }
    };

    return (
        <>
            {/* Native Google Maps Marker with hover-based InfoWindow */}
            <Marker
                key={model.id}
                position={model.position}
                title={model.markerTitle}
                icon={icon}
                onMouseOver={hasHovercard ? () => openHover(model.id) : undefined}
                onMouseOut={hasHovercard ? scheduleHoverClose : undefined}
                onClick={hasClickText ? handleMarkerClick : undefined}
            >
                {hasHovercard && hoveredMarkerId === model.id && (
                    <InfoWindow
                        position={model.position}
                        onCloseClick={scheduleHoverClose}
                    >
                        <div
                            onMouseEnter={() => openHover(model.id)}
                            onMouseLeave={scheduleHoverClose}
                        >
                            <Hovercard
                                markerTitle={model.markerTitle}
                                placeDetails={model.placeDetails}
                                placeLoading={model.placeLoading}
                                placeError={model.placeError}
                                hoverText={hoverText}
                                hasNarration={hasNarration}
                                isSpeaking={isSpeaking}
                                onPlay={
                                    hasNarration
                                        ? () =>
                                              onStartNarration(
                                                  markerConfig.id,
                                                  markerConfig.desc
                                              )
                                        : undefined
                                }
                                onStop={
                                    hasNarration
                                        ? () => onStopNarration()
                                        : undefined
                                }
                            />
                        </div>
                    </InfoWindow>
                )}
            </Marker>

            <MarkerDetailModal
                isOpen={showDetailModal}
                onClose={() => setShowDetailModal(false)}
                title={model.markerTitle}
                content={markerConfig.clickText}
            />
        </>
    );
}


