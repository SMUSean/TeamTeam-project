/**
 * Proximity-based audio button component
 * Shows "Play Audio" button when user is within 3 meters of POI(s)
 * 
 * @author Samson Mate
 */
import React from "react";

export default function ProximityAudioButton({
    closestPOI,
    nearbyPOIs,
    onPlayAudio,
    isPlaying,
    onStopAudio,
}) {
    if (!closestPOI || nearbyPOIs.length === 0) {
        return null;
    }

    // Determine which POI to play audio for
    // Priority: closest POI, or if multiple, use the one with desc text
    const targetPOI = closestPOI;
    const hasAudio = !!targetPOI.desc;

    if (!hasAudio) {
        return null;
    }

    return (
        <div
            style={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1000,
                pointerEvents: "auto",
            }}
        >
            <div
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                }}
            >
                {nearbyPOIs.length > 1 && (
                    <div
                        style={{
                            fontSize: "0.75rem",
                            color: "#6b7280",
                            textAlign: "center",
                        }}
                    >
                        Multiple points nearby. Playing: {targetPOI.title}
                    </div>
                )}
                {isPlaying ? (
                    <button
                        onClick={onStopAudio}
                        style={{
                            padding: "10px 20px",
                            borderRadius: "6px",
                            border: "none",
                            backgroundColor: "#dc2626",
                            color: "#ffffff",
                            fontSize: "0.9rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "background-color 0.2s",
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#b91c1c")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#dc2626")}
                    >
                        Stop Audio
                    </button>
                ) : (
                    <button
                        onClick={() => onPlayAudio(targetPOI.id, targetPOI.desc)}
                        style={{
                            padding: "10px 20px",
                            borderRadius: "6px",
                            border: "none",
                            backgroundColor: "#16a34a",
                            color: "#ffffff",
                            fontSize: "0.9rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "background-color 0.2s",
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#15803d")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#16a34a")}
                    >
                        Play Audio
                    </button>
                )}
            </div>
        </div>
    );
}

