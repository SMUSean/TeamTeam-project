/**
 * @file SiteMap.jsx
 * @description Site map page with GPS tracking, site boundaries, and POI markers.
 * This page provides a full-screen interactive map view of the conservation site,
 * displaying regions, trails, points of interest, and user location tracking.
 * 
 * The page uses a full viewport height layout to maximize map visibility and
 * prevent scrolling, ensuring the map component has proper dimensions for rendering.
 * 
 * @author Afif Mahmud
 */

import React from "react";
import GoogleMapView from "../Components/GoogleMapView.jsx";

/**
 * SiteMapPage Component
 * @description Main page component that renders the interactive map view.
 * Uses a full viewport height container to provide an immersive map experience.
 * 
 * Layout Structure:
 * - Outer container: Full viewport height, flex column layout
 * - Main section: Flexible height, contains the map
 * - Map container: Full height/width, prevents overflow
 * 
 * @returns {JSX.Element} The site map page with embedded Google Map
 */
export default function SiteMapPage() {
    return (
        <div style={{ 
            height: "100vh",        // Full viewport height
            width: "100%",          // Full width
            display: "flex",        // Flexbox layout
            flexDirection: "column", // Stack children vertically
            overflow: "hidden"      // Prevent page-level scrolling
        }}>
            <main style={{ 
                flex: 1,            // Take remaining vertical space
                minHeight: 0,       // Allow flex shrinking below content size
                overflow: "hidden"  // Prevent scrolling in main container
            }}>
                {/* Map container: Google Maps requires explicit height to render properly */}
                <div style={{ 
                    height: "100%",     // Fill parent height
                    width: "100%",     // Fill parent width
                    overflow: "hidden"  // Prevent overflow scrolling
                }}>
                    <GoogleMapView />
                </div>
            </main>
        </div>
    );
}
