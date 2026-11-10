/**
 * @file TrailSegment.jsx
 * @description Component that renders a trail segment (polyline) between two markers.
 * Uses Google Directions API to calculate walking paths between points.
 * 
 * @author Afif Mahmud
 */

import React from "react";
import { Polyline } from "@react-google-maps/api";

import { useWalkingTrail } from "./directionsAdapter";
import { MAP_TRAIL_POLYLINE_OPTIONS } from "./config";

export default function TrailSegment({ map, origin, destination, showTrail }) {
    const {
        trailPath,
        trailLoading,
        trailError,
    } = useWalkingTrail({
        map,
        enabled: showTrail,
        origin,
        destination,
    });

    if (!showTrail || !trailPath || trailPath.length === 0) {
        return null;
    }

    return <Polyline path={trailPath} options={MAP_TRAIL_POLYLINE_OPTIONS} />;
}
