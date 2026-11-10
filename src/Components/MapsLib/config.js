/**
 * Map configuration
 *
 * This file is the ONLY place an end user needs to touch to:
 *  - Define which markers (points of interest) appear on the map
 *  - Control trails between markers
 *  - Define park / region polygons
 *  - Control default zoom, centering, colors, and pin styles
 *
 * No React components need to be edited to:
 *  - Add / remove markers
 *  - Change trail connections
 *  - Change pin visibility, colors, or styles
 *  - Change regions (zones) on the map
 *
 * All structures below are *pure data* and are read by the map library at runtime.
 * 
 * @author Afif Mahmud
 */

/**
 * MAP_MARKERS
 *
 * Purpose:
 *  - Defines all markers (points on the map), including:
 *    • their coordinates
 *    • whether they are "known" markers backed by Google Places
 *    • which trail segments they belong to
 *    • how they look (pin style and color)
 *    • whether they are visible to the user
 *    • custom narration text and intro text
 *
 * Shape:
 *  - Top-level: object keyed by a logical marker key (e.g. "lewisLakeTrailhead")
 *  - Each marker entry:
 *      {
 *        id: string                // unique ID string for this marker (used as a stable key)
 *        position: { lat, lng }    // required. The exact coordinate of the marker.
 *
 *        title: string             // label shown in the UI (marker label + hovercard title).
 *
 *        placeQuery: string        // if non-empty, the system treats this as a "known" marker.
 *                                  //  - It calls Google Places using this string plus searchRadiusMeters.
 *                                  //  - If Places returns a match, its data (name, photos, etc.) is used.
 *                                  //  - If empty, or if Places fails, we fall back to static / Street View data.
 *
 *        searchRadiusMeters: number // radius around position to search for a matching placeQuery.
 *                                   // Typically 100–300m for precise objects (buildings, trailheads).
 *
 *        trailCodes: string[]      // each string represents a virtual "trail segment" label.
 *                                  //  - For each letter (e.g. "A"), the system finds EXACTLY TWO markers
 *                                  //    that contain "A" in their trailCodes.
 *                                  //  - It then draws a trail segment (polyline / Directions API route)
 *                                  //    between those two markers.
 *                                  //  - If a code appears for 0, 1, or more than 2 markers, it is ignored.
 *                                  //  - This allows you to stitch together a chain of segments:
 *                                  //      ["A"] ←→ ["A","B"] ←→ ["B","C"] ←→ ...
 *
 *        pinStyle: string          // name of the pin style from PIN_STYLES (see below).
 *                                  //  - "Default" means use the native Google Maps pin.
 *                                  //  - "Blue", "Restaurant", etc. are custom SVG markers.
 *
 *        pinColor: string          // name of the pin color from PIN_COLORS (see below).
 *                                  //  - Used to fill the SVG color placeholder ({{COLOR}}).
 *                                  //  - Also used as the background color for the text label
 *                                  //    rendered under the marker.
 *
 *        pinVisible: boolean       // if false, the marker participates in trails but is not rendered:
 *                                  //  - used for "connector" markers that exist only to define trail
 *                                  //    geometry, not to show an actual POI to the user.
 *
 *        intro: string             // reserved for future use (short subtitle / intro for hovercard).
 *
 *        desc: string              // narration text. When non-empty:
 *                                  //  - The hovercard shows a "Play narration" button.
 *                                  //  - When clicked, desc is spoken using the Web Speech API.
 *      }
 *
 * Usage patterns:
 *  - Add a VISUAL POI marker:
 *      - Provide position, title, (optional) placeQuery, searchRadiusMeters, pinStyle, pinColor,
 *        pinVisible: true, and optional desc.
 *
 *  - Add a CONNECTOR marker to help build trails:
 *      - Provide position and trailCodes only.
 *      - Set pinVisible: false so the user does not see it.
 *
 *  - Convert a static marker into a "known" place:
 *      - Fill in placeQuery with the exact place name as it appears in Google Maps.
 *      - Optionally adjust searchRadiusMeters if the place is a bit away from your coordinate.
 */

export const MAP_MARKERS = {
    lewisLakeTrailhead: {
        id: "lewis-lake-trailhead",
        position: {
            lat: 44.679457,
            lng: -63.833187,
        },
        // Human-friendly name shown on the label and in hovercard.
        title: "Lewis Lake Trailhead",

        // Empty string → this marker does NOT request Google Places.
        // It will rely on static / Street View details if configured.
        placeQuery: "",

        // Radius (in meters) for any Places lookups.
        // Has no effect when placeQuery is empty.
        searchRadiusMeters: 100,

        // This marker participates in trail segment "A".
        // The system will connect it to exactly one other marker that also has "A".
        trailCodes: ["A"],

        // Use the native Google Maps pin (no svg override).
        pinStyle: "Default",

        // Use the default color (see PIN_COLORS).
        pinColor: "Default",

        // Marker is visible on the map.
        pinVisible: true,

        // Reserved for future short text visible in hovercard.
        intro: "",

        // Narration text read aloud when user presses the "Play" button in hovercard.
        desc: "This is the start of the lake trailhead",
    },

    lionsClubMemorialShelter: {
        id: "lions-club-memorial-shelter",
        position: {
            lat: 44.69264061394988,
            lng: -63.841398624357915,
        },
        title: "St. Margaret's Bay Lions Club Memorial Shelter",

        // Non-empty → treated as a known place.
        // The map library will query Google Places for this text near "position"
        // within searchRadiusMeters and use the best match.
        placeQuery: "St. Margaret's Bay Lions Club Memorial Shelter",

        // Slightly larger radius to capture the correct POI even if the coordinates
        // are slightly offset.
        searchRadiusMeters: 300,

        // This marker sits on both "A" and "B" trail segments:
        //  - It will connect to the marker that has trailCodes: ["A"]
        //  - It will also connect to the marker that has trailCodes: ["B", ...]
        trailCodes: ["A", "B"],

        // Use a custom blue SVG pin.
        pinStyle: "Blue",

        // Use the default configured color for Blue pins.
        pinColor: "Default",

        // Visible POI on the map.
        pinVisible: true,

        intro: "",
        // No narration text yet; the hovercard will not show a play button.
        desc: "",
    },

    // Connector markers below:
    //  - participate in trails but are not visible to the user.
    //  - only "position" and "trailCodes" matter for geometry.

    connectorMarker1: {
        id: "connector-marker1",
        position: {
            lat: 44.689716,
            lng: -63.879885,
        },
        title: "",
        placeQuery: "",
        searchRadiusMeters: 100,
        // Connects trail "B" to "C": B ↔ connectorMarker1 ↔ C
        trailCodes: ["B", "C"],
        pinStyle: "Blue",
        pinColor: "Default",
        // Hidden from the user.
        pinVisible: false,
        intro: "",
        desc: "",
    },

    connectorMarker2: {
        id: "connector-marker2",
        position: {
            lat: 44.708948,
            lng: -63.902544,
        },
        title: "",
        placeQuery: "",
        searchRadiusMeters: 100,
        trailCodes: ["C", "D"],
        pinStyle: "Blue",
        pinColor: "Default",
        pinVisible: false,
        intro: "",
        desc: "",
    },

    connectorMarker3: {
        id: "connector-marker3",
        position: {
            lat: 44.657788,
            lng: -63.948327,
        },
        title: "",
        placeQuery: "",
        searchRadiusMeters: 100,
        trailCodes: ["D", "E"],
        pinStyle: "Blue",
        pinColor: "Default",
        pinVisible: false,
        intro: "",
        desc: "",
    },

    connectorMarker4: {
        id: "connector-marker4",
        position: {
            lat: 44.672331,
            lng: -63.968241,
        },
        title: "",
        placeQuery: "",
        searchRadiusMeters: 100,
        trailCodes: ["E", "F"],
        pinStyle: "Blue",
        pinColor: "Default",
        pinVisible: false,
        intro: "",
        desc: "",
    },

    connectorMarker5: {
        id: "connector-marker5",
        position: {
            lat: 44.651877,
            lng: -64.001155,
        },
        title: "",
        placeQuery: "",
        searchRadiusMeters: 100,
        trailCodes: ["F", "G"],
        pinStyle: "Blue",
        pinColor: "Default",
        pinVisible: false,
        intro: "",
        desc: "",
    },

    connectorMarker6: {
        id: "connector-marker6",
        position: {
            lat: 44.638097,
            lng: -64.024203,
        },
        title: "",
        placeQuery: "",
        searchRadiusMeters: 100,
        trailCodes: ["G", "H"],
        pinStyle: "Blue",
        pinColor: "Default",
        pinVisible: false,
        intro: "",
        desc: "",
    },

    connectorMarker7: {
        id: "connector-marker7",
        position: {
            lat: 44.637819,
            lng: -64.073329,
        },
        title: "",
        placeQuery: "",
        searchRadiusMeters: 100,
        trailCodes: ["H", "I"],
        pinStyle: "Blue",
        pinColor: "Default",
        pinVisible: false,
        intro: "",
        desc: "",
    },

    aspotoganTrailhead: {
        id: "aspotogan-trailhead",
        position: {
            lat: 44.63575628980088,
            lng: -64.07239811570055,
        },
        title: "St. Margaret's Bay Trail to Aspotogan Trail",

        // Known marker using Google Places.
        placeQuery: "St. Margaret's Bay Trail to Aspotogan Trail",
        searchRadiusMeters: 300,

        // Terminates trail "I" which was passed through connectorMarker7.
        trailCodes: ["I"],

        pinStyle: "Blue",
        pinColor: "Default",
        pinVisible: true,
        intro: "",
        desc: "End of St. Margaret's Bay Trail, leads to Aspotogan Trail",
    },

    picnicTables: {
        id: "picnic-tables",
        position: {
            lat: 44.692721,
            lng: -63.856432,
        },
        title: "Picnic Tables",

        // No placeQuery: this is a pure custom POI.
        // It will not call Google Places; any content shown is fully user-defined
        // or from fallback Street View, if implemented.
        placeQuery: "",
        searchRadiusMeters: 100,

        // No trailCodes: this marker does not participate in trail rendering.
        trailCodes: [],

        // Use a "Restaurant" pin style (custom SVG) to visually distinguish amenities.
        pinStyle: "Restaurant",

        // Use the "Green" color (see PIN_COLORS).
        pinColor: "Green",

        // Visible spot on the map.
        pinVisible: true,

        intro: "",
        desc: "Picnic location beside Hubley Mill Lake",
    },

    sobeySchool: {
        id: "sobey-school",
        position: {
            lat: 44.630529952981384,
            lng: -63.58090810033596,
        },
        title: "Sobey School of Business",

        // Known marker backed by Google Places.
        placeQuery: "Sobey School of Business at Saint Mary's University",
        searchRadiusMeters: 300,

        // No trail codes here; this marker is independent of the trail system.
        trailCodes: [],

        pinStyle: "Default",
        pinColor: "Default",

        // Currently hidden: useful as a test or example known marker
        // that does not distract in this map instance.
        pinVisible: false,

        intro: "",
        desc: "This is Sobey's School of Business at Saint Mary's University",
    },

    // Site Map POI Markers
    trailhead: {
        id: "trailhead",
        position: {
            // TODO: Update with actual trailhead coordinates in rewilding area
            lat: 44.690,
            lng: -63.870,
        },
        title: "Trailhead",
        placeQuery: "",
        searchRadiusMeters: 100,
        trailCodes: [],
        pinStyle: "Blue",
        pinColor: "Default",
        pinVisible: true,
        intro: "",
        desc: "",
        hoverText: "Trailhead",
        clickText: "",
    },

    farmhouseFoundation: {
        id: "farmhouse-foundation",
        position: {
            // TODO: Update with actual farmhouse foundation coordinates in rewilding area
            lat: 44.688,
            lng: -63.868,
        },
        title: "Farmhouse Foundation",
        placeQuery: "",
        searchRadiusMeters: 100,
        trailCodes: [],
        pinStyle: "Blue",
        pinColor: "Default",
        pinVisible: true,
        intro: "",
        desc: "This foundation is a remnant of the original farmhouse that once stood on this site. Built in the early 1900s, it served as the main residence for the farming family who worked this land. The foundation stones have been preserved as a historical marker of the site's agricultural past.",
        hoverText: "Farmhouse Foundation",
        clickText: "This foundation is a remnant of the original farmhouse that once stood on this site. Built in the early 1900s, it served as the main residence for the farming family who worked this land. The foundation stones have been preserved as a historical marker of the site's agricultural past.",
    },

    well: {
        id: "well",
        position: {
            // TODO: Update with actual well coordinates in rewilding area
            lat: 44.692,
            lng: -63.870,
        },
        title: "Well",
        placeQuery: "",
        searchRadiusMeters: 100,
        trailCodes: [],
        pinStyle: "Blue",
        pinColor: "Default",
        pinVisible: true,
        intro: "",
        desc: "This well was the primary water source for the farmhouse and surrounding agricultural operations. Dug by hand in the late 1800s, it provided fresh water for both the family and livestock. The well has since been capped for safety but remains as a testament to the self-sufficient nature of early farming life.",
        hoverText: "Well",
        clickText: "This well was the primary water source for the farmhouse and surrounding agricultural operations. Dug by hand in the late 1800s, it provided fresh water for both the family and livestock. The well has since been capped for safety but remains as a testament to the self-sufficient nature of early farming life.",
    },

    sittingArea: {
        id: "sitting-area",
        position: {
            // TODO: Update with actual sitting area coordinates in rewilding area
            lat: 44.686,
            lng: -63.872,
        },
        title: "Sitting Area",
        placeQuery: "",
        searchRadiusMeters: 100,
        trailCodes: [],
        pinStyle: "Blue",
        pinColor: "Default",
        pinVisible: true,
        intro: "",
        desc: "This peaceful sitting area provides a quiet space for reflection and observation. Visitors can rest here while observing the rewilding process, watching native plants and wildlife return to the area. The area is designed to minimize human impact while allowing for contemplation of nature's restoration.",
        hoverText: "Sitting Area",
        clickText: "This peaceful sitting area provides a quiet space for reflection and observation. Visitors can rest here while observing the rewilding process, watching native plants and wildlife return to the area. The area is designed to minimize human impact while allowing for contemplation of nature's restoration.",
    },

    yellowBirch: {
        id: "yellow-birch",
        position: {
            // TODO: Update with actual yellow birch coordinates in yellow birch area
            lat: 44.694,
            lng: -63.865,
        },
        title: "Coastal Yellow Birch",
        placeQuery: "",
        searchRadiusMeters: 100,
        trailCodes: [],
        pinStyle: "Blue",
        pinColor: "Green",
        pinVisible: true,
        intro: "",
        desc: "The Coastal Yellow Birch (Betula alleghaniensis) is a significant native tree species in this region. These trees are important indicators of healthy forest ecosystems and provide habitat for numerous bird and mammal species. The yellow birch is particularly valued for its distinctive golden-yellow bark and its role in maintaining biodiversity in coastal forest environments.",
        hoverText: "Coastal Yellow Birch",
        clickText: "The Coastal Yellow Birch (Betula alleghaniensis) is a significant native tree species in this region. These trees are important indicators of healthy forest ecosystems and provide habitat for numerous bird and mammal species. The yellow birch is particularly valued for its distinctive golden-yellow bark and its role in maintaining biodiversity in coastal forest environments.",
    },
};

/**
 * MAP_REGIONS
 *
 * Purpose:
 *  - Defines large polygonal areas (zones) such as parks, campus boundaries,
 *    or administrative regions.
 *
 * Shape:
 *  - Top-level: object keyed by a logical region key (e.g. "parkArea").
 *  - Each region entry:
 *      {
 *        id: string,
 *        path: Array<[lat, lng]>
 *      }
 *
 *  - The map library:
 *      • Converts each [lat, lng] pair into a LatLngLiteral.
 *      • Renders a filled Polygon using MAP_REGION_POLYGON_OPTIONS.
 *      • Renders a dashed border Polyline using MAP_REGION_BORDER_POLYLINE_OPTIONS.
 */

export const MAP_REGIONS = {
    parkArea: {
        id: "park-area",
        title: "Park Area",
        // Ordered list of vertices defining the polygon boundary.
        // The map library closes the polygon automatically.
        path: [
            [44.687995, -63.877191],
            [44.690966, -63.873125],
            [44.692412, -63.867052],
            [44.700501, -63.859475],
            [44.700900, -63.853696],
            [44.700187, -63.849009],
            [44.687570, -63.832263],
            [44.682183, -63.844940],
            [44.687026, -63.849716],
            [44.684405, -63.866167],
        ],
    },
    // Site borders - TODO: Update with actual site boundary coordinates
    siteBorders: {
        id: "site-borders",
        title: "Site Borders",
        path: [
            [44.680, -63.880],
            [44.700, -63.880],
            [44.700, -63.830],
            [44.680, -63.830],
        ],
    },
    // Rewilding area - TODO: Update with actual rewilding area coordinates
    rewildingArea: {
        id: "rewilding-area",
        title: "Rewilding Area",
        path: [
            [44.685, -63.875],
            [44.695, -63.875],
            [44.695, -63.865],
            [44.685, -63.865],
        ],
    },
    // Yellow birch area - TODO: Update with actual yellow birch area coordinates
    yellowBirchArea: {
        id: "yellow-birch-area",
        title: "Yellow Birch Area",
        path: [
            [44.690, -63.870],
            [44.698, -63.870],
            [44.698, -63.860],
            [44.690, -63.860],
        ],
    },
};

/**
 * MAP_CONTAINER_STYLE
 *
 * Purpose:
 *  - Controls the CSS dimensions of the GoogleMap container.
 *  - Typically left as full width/height of its parent.
 */

export const MAP_CONTAINER_STYLE = { width: "100%", height: "100%" };

/**
 * Zoom configuration
 *
 * MAP_DEFAULT_ZOOM:
 *  - Zoom level used when centering on the default marker at map load.
 *
 * MAP_USER_ZOOM:
 *  - Zoom level used when centering on the user's location (if permission granted),
 *    so you can zoom out slightly to provide more context.
 */

export const MAP_DEFAULT_ZOOM = 12;
export const MAP_USER_ZOOM = 14;

/**
 * MAP_PRIMARY_MARKER_ID
 *
 * Purpose:
 *  - Controls which marker the map centers on initially.
 *  - Must match one of the MAP_MARKERS keys (NOT the marker's "id" field).
 *
 * Example:
 *  - "connectorMarker3" → map centers roughly in the middle of the trail.
 *  - "lewisLakeTrailhead" → map centers at the start of the trail.
 */

export const MAP_PRIMARY_MARKER_ID = "connectorMarker3";

/**
 * MAP_REGION_DASH_SYMBOL
 *
 * Purpose:
 *  - Defines the dash segment used for region borders.
 *  - Used by MAP_REGION_BORDER_POLYLINE_OPTIONS via `icons` array.
 */

export const MAP_REGION_DASH_SYMBOL = {
    path: "M 0,-1 0,1",
    strokeOpacity: 1,
    scale: 2,
    strokeColor: "#2563eb",
};

/**
 * buildMapOptions(showGoogleMarkers)
 *
 * Purpose:
 *  - Returns the options object passed into the <GoogleMap> component.
 *  - Allows enabling/disabling Google's own POI markers and labels.
 *
 * Parameters:
 *  - showGoogleMarkers: boolean
 *      • true  → keep Google's default POI markers and labels.
 *      • false → hide business POIs so only custom markers are visible.
 */

export function buildMapOptions(showGoogleMarkers) {
    return {
        disableDefaultUI: false,
        clickableIcons: showGoogleMarkers,
        styles: showGoogleMarkers
            ? []
            : [
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }],
                },
                {
                    featureType: "poi.business",
                    elementType: "all",
                    stylers: [{ visibility: "off" }],
                },
            ],
    };
}

/**
 * MAP_REGION_POLYGON_OPTIONS
 *
 * Purpose:
 *  - Visual styling for the filled polygon regions.
 *
 * Notes:
 *  - clickable: false ensures the region does not intercept mouse events,
 *    so markers and map clicks still work underneath.
 */

export const MAP_REGION_POLYGON_OPTIONS = {
    fillColor: "#3b82f6",
    fillOpacity: 0.08,
    strokeColor: "#2563eb",
    strokeOpacity: 0.6,
    strokeWeight: 1,
    clickable: true,
};

/**
 * MAP_REGION_BORDER_POLYLINE_OPTIONS
 *
 * Purpose:
 *  - Visual styling for region borders (dashed outline).
 *
 * Notes:
 *  - Uses MAP_REGION_DASH_SYMBOL to draw a dashed line around the polygon.
 *  - clickable: false so the border does not block clicks on markers.
 */

export const MAP_REGION_BORDER_POLYLINE_OPTIONS = {
    strokeColor: "#2563eb",
    strokeOpacity: 0,
    strokeWeight: 2,
    icons: [
        {
            icon: MAP_REGION_DASH_SYMBOL,
            offset: "0",
            repeat: "12px",
        },
    ],
    clickable: false,
};

/**
 * MAP_TRAIL_POLYLINE_OPTIONS
 *
 * Purpose:
 *  - Visual styling for rendered trail segments between markers.
 *
 * Notes:
 *  - Color and line thickness can be adjusted freely here without touching components.
 */

export const MAP_TRAIL_POLYLINE_OPTIONS = {
    strokeColor: "#c52266",
    strokeOpacity: 0.9,
    strokeWeight: 4,
};

/**
 * PIN_COLORS
 *
 * Purpose:
 *  - Defines named colors that can be referenced by markers via `pinColor`.
 *  - Used to:
 *      • Fill SVG pins by substituting {{COLOR}} in the template.
 *      • Color the label background beneath each marker.
 *
 * To add a new color:
 *  - Add an entry here, e.g. "Red: '#dc2626'".
 *  - Use `pinColor: "Red"` in MAP_MARKERS.
 */

export const PIN_COLORS = {
    Default: "#2563eb", // blue-ish
    Green: "#069735", // emerald/green
};

/**
 * SVG templates
 *
 * Purpose:
 *  - Base SVG markup for custom pin styles.
 *  - Each uses the placeholder string "{{COLOR}}" which will be replaced at runtime
 *    with a hex color from PIN_COLORS.
 *
 * Notes:
 *  - These templates are converted into data URLs in getPinIcon().
 */

const BLUE_PIN_SVG_TEMPLATE =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" ' +
    'viewBox="0 0 24 24" fill="{{COLOR}}">' +
    '<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>' +
    "</svg>";

const RES_PIN_SVG_TEMPLATE =
    '<svg xmlns="http://www.w3.org/2000/svg" height="800px" width="800px" ' +
    'version="1.1" viewBox="0 0 405.345 405.345" xml:space="preserve">' +
    // solid background (opacity 0 here: transparent; change if needed).
    '<rect width="405.345" height="405.345" fill="white" fill-opacity="0"/>' +
    '<g><g><g>' +
    '<path style="fill:{{COLOR}};" d="M202.174,83.476c-39.97,0-72.465,32.515-72.465,72.475c0,39.95,32.496,72.475,72.465,72.475c39.96,0,72.465-32.525,72.465-72.475S242.134,83.476,202.174,83.476z M202.174,223.336c-37.205,0-67.395-30.17-67.395-67.375c0-37.215,30.19-67.385,67.395-67.385c37.215,0,67.375,30.16,67.375,67.385C269.559,193.166,239.369,223.336,202.174,223.336z M45.539,0v314.287h98.864l58.259,91.058l58.269-91.058h98.874V0H45.539z M116.226,124.247L116.226,124.247c-0.381,12.506-14.079,17.283-14.079,17.283v25.109h0.02l-0.01,57.761c0,0-5.54,7.171-12.711,0v-82.89h0.166c-8.363-3.556-14.538-4.778-14.929-17.274h-0.059V85.079h6.272l3.068,37.85h7.406l0.928-38.631h6.028l0.733,38.631h8.705l1.993-37.85h6.507l0.029,39.159L116.226,124.247L116.226,124.247z M202.174,235.324c-43.77,0-79.373-35.593-79.373-79.353c0-43.78,35.593-79.363,79.373-79.363c43.761,0,79.373,35.593,79.373,79.363C281.537,199.731,245.935,235.324,202.174,235.324z M328.776,151.76h-15.359v77.692h-17.733V82.489h17.733C313.417,82.489,337.608,113.148,328.776,151.76z M226.551,155.951c0,13.463-10.913,24.377-24.377,24.377s-24.377-10.913-24.377-24.377c0-13.463,10.913-24.377,24.377-24.377S226.551,142.488,226.551,155.951z"/>' +
    "</g></g></g></svg>";

/**
 * PIN_STYLES
 *
 * Purpose:
 *  - Defines named pin styles that markers can reference via their `pinStyle` field.
 *
 * Entries:
 *  - Default:
 *      • null → tells the map to use the native Google pin.
 *
 *  - Blue:
 *      • Uses BLUE_PIN_SVG_TEMPLATE for a custom circular pin.
 *
 *  - Restaurant:
 *      • Uses RES_PIN_SVG_TEMPLATE for a larger, emblem-style pin.
 *
 * To add a new style:
 *  - Create a new SVG template constant with {{COLOR}} placeholder.
 *  - Add an entry here with that template, plus scaledSize and anchor.
 */

export const PIN_STYLES = {
    // Use the default Google Maps pin
    Default: null,

    Blue: {
        template: BLUE_PIN_SVG_TEMPLATE,
        // Size of the rendered pin in pixels.
        scaledSize: { width: 36, height: 36 },
        // Anchor point in pixels (x,y) relative to the top-left of the icon.
        // This should align the "tip" of the pin at the marker's LatLng.
        anchor: { x: 12, y: 24 },
    },

    Restaurant: {
        template: RES_PIN_SVG_TEMPLATE,
        scaledSize: { width: 38, height: 38 },
        anchor: { x: 18, y: 36 },
    },
};

/**
 * getPinIcon(pinStyleName, pinColorName)
 *
 * Purpose:
 *  - Builds a full Google Maps Marker icon object from:
 *      • a named style in PIN_STYLES
 *      • a named color in PIN_COLORS
 *
 * Behaviour:
 *  - If pinStyleName is "Default" or falsy:
 *      → returns null (meaning "use the default Google Maps icon").
 *
 *  - Otherwise:
 *      → Looks up the style in PIN_STYLES.
 *      → Replaces all {{COLOR}} placeholders in the template with the hex from PIN_COLORS.
 *      → Encodes the SVG as a data URL (data:image/svg+xml).
 *      → Returns an object with url, scaledSize, anchor.
 *
 * Usage:
 *  - Called by MarkerWithData to compute the final `icon` prop for <Marker>.
 *  - End users do NOT need to change this function for most use cases.
 */

export function getPinIcon(pinStyleName, pinColorName) {
    if (!pinStyleName || pinStyleName === "Default") {
        return null;
    }

    const baseStyle = PIN_STYLES[pinStyleName];
    if (!baseStyle || !baseStyle.template) {
        return null;
    }

    const color =
        (pinColorName && PIN_COLORS[pinColorName]) || PIN_COLORS.Default;

    const svg = baseStyle.template.replace(/{{COLOR}}/g, color);

    const url = "data:image/svg+xml;utf8," + encodeURIComponent(svg);

    return {
        url,
        scaledSize: baseStyle.scaledSize,
        anchor: baseStyle.anchor,
    };
}

/**
 * MAP_LEGEND
 *
 * Purpose:
 *  - Defines labels and Tailwind classes used in the on-map legend component.
 *  - Purely cosmetic; changing labels or classes does not affect behavior.
 *
 * Fields:
 *  - region: label + colorClass for region boundaries
 *  - trail: label + colorClass for trail polylines
 *  - customMarker: label + colorClass for custom markers
 */

export const MAP_LEGEND = {
    region: {
        label: "Region boundary",
        colorClass: "bg-blue-500",
    },
    trail: {
        label: "Walking trail (suggested)",
        colorClass: "bg-emerald-500",
    },
    customMarker: {
        label: "Custom marker",
        colorClass: "bg-orange-500",
    },
};

