/**
 * True North arrow component displayed on the map
 * 
 * @author Samson Mate
 */
import React from "react";

export default function NorthArrow() {
    return (
        <div
            style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                zIndex: 10,
                pointerEvents: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                padding: "8px",
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
        >
            <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 2L15 8H9L12 2Z"
                    fill="#dc2626"
                    stroke="#991b1b"
                    strokeWidth="1"
                />
                <line
                    x1="12"
                    y1="8"
                    x2="12"
                    y2="20"
                    stroke="#dc2626"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>
            <span
                style={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    color: "#dc2626",
                    marginTop: "2px",
                }}
            >
                N
            </span>
        </div>
    );
}

