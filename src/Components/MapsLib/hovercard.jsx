/**
 * Small card used inside the InfoWindow hover tooltip.
 *
 * Props:
 *  - markerTitle: fallback title
 *  - placeDetails: place details object from usePlaceDetails
 *  - placeLoading: boolean
 *  - placeError: string | null
 *  - hoverText: string (optional) — custom text to show on hover
 *  - hasNarration: boolean (optional) — whether this marker has a desc to narrate
 *  - isSpeaking: boolean (optional) — whether this marker is currently being narrated
 *  - onPlay: () => void (optional) — called to start narration
 *  - onStop: () => void (optional) — called to stop narration
 * 
 * @author Afif Mahmud
 */
import React from "react";

export default function Hovercard({
                                      markerTitle,
                                      placeDetails,
                                      placeLoading,
                                      placeError,
                                      hoverText,
                                      hasNarration,
                                      isSpeaking,
                                      onPlay,
                                      onStop,
                                  }) {
    // If hoverText is provided, show it as a simple text display
    if (hoverText) {
        return (
            <div
                style={{
                    maxWidth: "260px",
                    fontFamily:
                        "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: "0.9rem",
                    color: "#111827",
                    padding: "8px",
                }}
            >
                <div style={{fontWeight: 600}}>
                    {hoverText}
                </div>
            </div>
        );
    }

    if (placeLoading && !placeDetails) {
        return <div>Loading place info…</div>;
    }

    if (placeError && !placeDetails) {
        return <div>{placeError}</div>;
    }

    const details = placeDetails || {};
    const {
        name,
        address,
        website,
        phone,
        rating,
        ratingCount,
        photoUrl,
    } = details;

    const showNarrationButton =
        !!hasNarration && (typeof onPlay === "function" || typeof onStop === "function");

    return (
        <div
            style={{
                maxWidth: "260px",
                fontFamily:
                    "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: "0.8rem",
                color: "#111827",
            }}
        >
            {photoUrl && (
                <div
                    style={{
                        marginBottom: "0.4rem",
                        borderRadius: "0.375rem",
                        overflow: "hidden",
                    }}
                >
                    <img
                        src={photoUrl}
                        alt={name || markerTitle}
                        style={{
                            display: "block",
                            width: "100%",
                            height: "auto",
                        }}
                    />
                </div>
            )}

            <div style={{fontWeight: 600, marginBottom: "0.15rem"}}>
                {name || markerTitle}
            </div>

            {rating != null && (
                <div style={{marginBottom: "0.25rem"}}>
                    <span style={{fontWeight: 500}}>
                        {rating.toFixed(1)}
                    </span>
                    {ratingCount != null && (
                        <span> · {ratingCount} reviews</span>
                    )}
                </div>
            )}

            {address && (
                <div style={{marginBottom: "0.25rem"}}>{address}</div>
            )}

            {phone && (
                <div style={{marginBottom: "0.25rem"}}>{phone}</div>
            )}

            {website && (
                <div style={{marginBottom: "0.25rem"}}>
                    <a
                        href={website}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            color: "#2563eb",
                            textDecoration: "underline",
                        }}
                    >
                        Website
                    </a>
                </div>
            )}

            {showNarrationButton && (
                <div style={{marginTop: "0.35rem"}}>
                    {isSpeaking ? (
                        <button
                            type="button"
                            onClick={onStop}
                            style={{
                                padding: "0.25rem 0.5rem",
                                borderRadius: "0.375rem",
                                border: "none",
                                backgroundColor: "#dc2626", // red-600
                                color: "#ffffff",
                                fontSize: "0.75rem",
                                cursor: "pointer",
                            }}
                        >
                            Stop Audio
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={onPlay}
                            style={{
                                padding: "0.25rem 0.5rem",
                                borderRadius: "0.375rem",
                                border: "none",
                                backgroundColor: "#16a34a", // emerald-600
                                color: "#ffffff",
                                fontSize: "0.75rem",
                                cursor: "pointer",
                            }}
                        >
                            Play Audio
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
