/**
 * Modal component for displaying detailed marker information on click
 * 
 * @author Samson Mate
 */
import React from "react";

export default function MarkerDetailModal({ isOpen, onClose, title, content }) {
    if (!isOpen || !content) {
        return null;
    }

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10000,
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    padding: "24px",
                    maxWidth: "500px",
                    maxHeight: "80vh",
                    overflowY: "auto",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "16px",
                    }}
                >
                    <h2
                        style={{
                            fontSize: "1.25rem",
                            fontWeight: "600",
                            margin: 0,
                            color: "#111827",
                        }}
                    >
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: "none",
                            border: "none",
                            fontSize: "24px",
                            cursor: "pointer",
                            color: "#6b7280",
                            padding: "0",
                            width: "32px",
                            height: "32px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        ×
                    </button>
                </div>
                <div
                    style={{
                        fontSize: "0.9rem",
                        lineHeight: "1.6",
                        color: "#374151",
                    }}
                >
                    {content}
                </div>
            </div>
        </div>
    );
}

