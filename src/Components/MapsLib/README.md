
# Config-Driven Google Maps Trail Library

A reusable, config-driven mapping **library** built on the Google Maps JavaScript API and `@react-google-maps/api`.
End users can render an interactive map, markers, trails, and zones **by editing configuration values only**, without modifying internal React components.

The system is intentionally **unpackaged and transparent**, allowing teams to either use it as a plug-and-play library or extend internal modules directly.

---

## Overview

This library renders a live Google Map that highlights key points of interest along trails or regions.
Everything—markers, trails, regions, colors, icons, and behavior—is dynamically generated from a **single configuration file**.

No manual wiring of markers, trails, or zones is required inside components.

---

## Key Features

- Config-only setup via `config.js`
- Dynamic rendering of all markers, trails, and regions
- Google Places integration for known markers
- Street View / static fallback for custom markers
- Interactive hovercards with rich metadata
- Audio narration using Web Speech API
- Trail generation via shared trail codes
- Polygon-based zones and regions
- Toggle UI for trails, regions, and Google POIs
- Fully unpackaged, extendable architecture

---

## Project Structure

```
src/Components/GoogleMapView.jsx

src/Components/MapsLib/
├── config.js
├── MapRenderer.jsx
├── MarkerWithData.jsx
├── hovercard.jsx
├── placeDetails.js
├── googlePlaces.js
├── geolocation.js
├── TrailSegment.jsx
├── MapToolbar.jsx
├── locationStatus.jsx
├── narrationAdapter.js
└── placeDetailsTest.jsx
```

---

## Quick Start

### 1. Enable Required Google APIs

Enable the following in Google Cloud:
- Google Maps JavaScript API
- Places API

### 2. Provide an API Key

Example using Vite:

```
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

---

### 3. Mount the Map Component

Import and mount the top-level map view:

```jsx
import GoogleMapView from "./Components/GoogleMapView";

export default function App() {
  return (
    <div className="w-screen h-screen">
      <GoogleMapView />
    </div>
  );
}
```

---

### 4. Configure the Map

Open:

```
src/Components/MapsLib/config.js
```

From this file you can:
- Add, remove, or modify markers
- Define trails and zones
- Control pin styles, colors, and visibility
- Control zoom levels and initial map center

Reload the app—no component changes required.

---

## How the System Works

1. **GoogleMapView**
    - Loads Google Maps
    - Manages UI state (show/hide trails, regions, Google POIs)

2. **MapRenderer**
    - Renders regions dynamically from `MAP_REGIONS`
    - Renders markers by looping over `MAP_MARKERS`
    - Builds trail segments automatically from shared `trailCodes`

3. **MarkerWithData**
    - Resolves marker data:
        - Uses Google Places when `placeQuery` is provided
        - Falls back to Street View / static data otherwise

4. **Hovercard**
    - Displays place data, photos, and narration controls

5. **NarrationAdapter**
    - Handles play/stop logic for text-to-speech narration

---

## Configuration Guide

### Markers

Markers are defined in `MAP_MARKERS`.

```js
myMarker: {
  id: "my-marker",
  position: { lat: 44.0, lng: -63.0 },
  title: "My Marker",
  placeQuery: "Exact Google Maps place name",
  searchRadiusMeters: 200,
  trailCodes: ["A"],
  pinStyle: "Blue",
  pinColor: "Green",
  pinVisible: true,
  intro: "",
  desc: "Narration text",
}
```

Each marker supports:
- Google Places-backed or fully custom data
- Optional narration
- Visual customization
- Participation in trail geometry

---

### Trails

Trails are created using shared trail codes.

Rules:
- Each trail code must appear on exactly **two markers**
- One trail segment is drawn per code
- Invisible connector markers can be used for shaping trails

Example:

```
[A] → [A,B] → [B,C] → [C]
```

---

### Regions (Zones)

Regions are polygonal areas defined using coordinate arrays.

```js
MAP_REGIONS = {
  parkArea: {
    id: "park-area",
    path: [
      [44.68, -63.87],
      [44.69, -63.86],
      [44.67, -63.85],
    ],
  },
};
```

- Rendered as filled polygons with dashed borders
- Non-interactive (do not block marker clicks)

---

### Map Centering & Zoom

```js
MAP_DEFAULT_ZOOM = 12;
MAP_USER_ZOOM = 14;
MAP_PRIMARY_MARKER_ID = "connectorMarker3";
```

- Initial map center is derived from `MAP_PRIMARY_MARKER_ID`
- User-location zoom can differ for context

---

### Google POIs vs Custom Markers

Toolbar toggles Google’s native POIs:

- **On** → Google businesses and landmarks visible
- **Off** → Only custom markers visible

---

### Pin Styles & Colors

Pins are SVG-based and fully configurable.

#### Colors

```js
PIN_COLORS = {
  Default: "#2563eb",
  Green: "#069735",
};
```

#### Styles

```js
PIN_STYLES = {
  Default: null,
  Blue: { template, scaledSize, anchor },
  Restaurant: { template, scaledSize, anchor },
};
```

---

### Hovercards & Place Data

Hovercards may show:
- Images (when Places provides photos)
- Ratings and review counts
- Address, phone, website
- Narration controls

Note: Some Google Maps POIs do not expose photos via the Places API.

---

### Narration (Text-to-Speech)

- Uses the Web Speech API
- Controlled via the `desc` field
- Play/Stop toggle with interruption support
- Proximity-based narration hook exposed (not auto-enabled)

---

## Debugging & Diagnostics

### PlaceDetailsTest

`placeDetailsTest.jsx` allows inspection of:
- Data source path (Places vs fallback)
- Photo availability
- Mapped place fields

Example:

```jsx
<PlaceDetailsTest markerKey="aspotoganTrailhead" map={mapInstance} />
```

Check the browser console for detailed logs.

---

## Common Configuration Recipes

### Add a New POI Marker

```js
newPOI: {
  id: "new-poi",
  position: { lat: 44.0, lng: -63.0 },
  title: "New POI",
  placeQuery: "New POI Name",
  searchRadiusMeters: 200,
  trailCodes: [],
  pinStyle: "Blue",
  pinColor: "Default",
  pinVisible: true,
  intro: "",
  desc: "Narration text",
}
```

---

### Add an Invisible Trail Connector

```js
connector: {
  id: "connector",
  position: { lat: 44.0, lng: -63.0 },
  trailCodes: ["B", "C"],
  pinVisible: false,
}
```

---

### Add a New Zone

```js
MAP_REGIONS.newZone = {
  id: "new-zone",
  path: [
    [44.1, -63.1],
    [44.2, -63.2],
    [44.3, -63.1],
  ],
};
```

---

## Known Limitations

- Google Places does not guarantee photo availability
- Trail codes must map to exactly two markers
- Dense marker layouts may require visual adjustments

---

## Development Notes

- This library is intentionally not packaged as an npm module
- All modules are readable, editable, and replaceable
- Designed to scale from a single trail to full geographic storytelling systems

