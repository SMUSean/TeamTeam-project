export const MAP_MARKERS = {
    sobeySchool: {
        id: "sobey-school",
        position: {
            lat: 44.630529952981384,
            lng: -63.58090810033596,
        },
        title: "Sobey School of Business",
        placeQuery: "Sobey School of Business at Saint Mary's University",
        searchRadiusMeters: 300,
        trailCodes: ["A", "B"],
        pinStyle: "Default",
        pinColor: "Default",
        pinVisible: true,
        intro: "",
        desc: "This is Sobey's School of Business at Saint Mary's University",
    },
    customMarker1: {
        id: "customMarker1",
        position: {
            lat: 44.630851032848895,
            lng: -63.57436036512946,
        },
        title: "Custom Marker 1",
        placeQuery: "",
        searchRadiusMeters: 100,
        trailCodes: ["A"],
        pinStyle: "Blue",
        pinColor: "Green",
        pinVisible: true,
    },
    customMarker2: {
        id: "customMarker2",
        position: {
            lat: 44.63348439464885,
            lng: -63.5805615098316,
        },
        title: "Custom Marker 2",
        placeQuery: "Halifax Haven Guest Home",
        searchRadiusMeters: 100,
        trailCodes: ["B", "C"],
        pinStyle: "Restaurant",
        pinColor: "Default",
        pinVisible: true,
    },
    customMarker3: {
        id: "customMarker3",
        position: {
            lat: 44.63239239499751,
            lng: -63.57857936369087,
        },
        title: "Dauphinee Centre",
        placeQuery: "Dauphinee Centre",
        searchRadiusMeters: 100,
        trailCodes: ["C"],
        pinStyle: "Blue",
        pinColor: "Default",
        pinVisible: true,
        intro: "",
        desc: "This is Dauphinee Centre at Saint Mary's University",
    },
};

export const MAP_REGIONS = {
    campusTrailArea: {
        id: "campus-trail-area",
        path: [
            [44.63262871569977, -63.58316857154234],
            [44.63387438125159, -63.578121648843656],
            [44.63261649677311, -63.57824303176481],
            [44.63006825238318, -63.57757542569844],
            [44.62978210778457, -63.58019274493589],
            [44.629549951696326, -63.58176313647834],
        ],
    },
    customArea: {
        id: "custom-area",
        path: [
            [44.630529952981384, -63.58090810033596],
            [44.63348439464885, -63.5805615098316],
            [44.63239239499751, -63.57857936369087],
        ],
    },
};

// Map container style
export const MAP_CONTAINER_STYLE = { width: "100%", height: "100%" };

// Zoom configuration
export const MAP_DEFAULT_ZOOM = 12;
export const MAP_USER_ZOOM = 14;

// Map centering at load
export const MAP_PRIMARY_MARKER_ID = "connectorMarker3";


// Region border dash symbol
export const MAP_REGION_DASH_SYMBOL = {
    path: "M 0,-1 0,1",
    strokeOpacity: 1,
    scale: 2,
    strokeColor: "#2563eb",
};

// Map options builder
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

// Region polygon style
export const MAP_REGION_POLYGON_OPTIONS = {
    fillColor: "#3b82f6",
    fillOpacity: 0.08,
    strokeColor: "#2563eb",
    strokeOpacity: 0.6,
    strokeWeight: 1,
    clickable: false,
};

// Region border polyline style
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

// Trail polyline style
export const MAP_TRAIL_POLYLINE_OPTIONS = {
    strokeColor: "#c52266",
    strokeOpacity: 0.9,
    strokeWeight: 4,
};



// Colors (name -> hex)
export const PIN_COLORS = {
    Default: "#2563eb",   // blue-ish
    Green: "#069735",     // emerald/green
};

// SVG templates with a {{COLOR}} placeholder
const BLUE_PIN_SVG_TEMPLATE =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" ' +
    'viewBox="0 0 24 24" fill="{{COLOR}}">' +
    '<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>' +
    "</svg>";

const RES_PIN_SVG_TEMPLATE =
    '<svg xmlns="http://www.w3.org/2000/svg" height="800px" width="800px" ' +
    'version="1.1" viewBox="0 0 405.345 405.345" xml:space="preserve">' +
    // solid white background
    '<rect width="405.345" height="405.345" fill="white" fill-opacity="0"/>' +
    '<g><g><g>' +
    '<path style="fill:{{COLOR}};" d="M202.174,83.476c-39.97,0-72.465,32.515-72.465,72.475c0,39.95,32.496,72.475,72.465,72.475c39.96,0,72.465-32.525,72.465-72.475S242.134,83.476,202.174,83.476z M202.174,223.336c-37.205,0-67.395-30.17-67.395-67.375c0-37.215,30.19-67.385,67.395-67.385c37.215,0,67.375,30.16,67.375,67.385C269.559,193.166,239.369,223.336,202.174,223.336z M45.539,0v314.287h98.864l58.259,91.058l58.269-91.058h98.874V0H45.539z M116.226,124.247L116.226,124.247c-0.381,12.506-14.079,17.283-14.079,17.283v25.109h0.02l-0.01,57.761c0,0-5.54,7.171-12.711,0v-82.89h0.166c-8.363-3.556-14.538-4.778-14.929-17.274h-0.059V85.079h6.272l3.068,37.85h7.406l0.928-38.631h6.028l0.733,38.631h8.705l1.993-37.85h6.507l0.029,39.159L116.226,124.247L116.226,124.247z M202.174,235.324c-43.77,0-79.373-35.593-79.373-79.353c0-43.78,35.593-79.363,79.373-79.363c43.761,0,79.373,35.593,79.373,79.363C281.537,199.731,245.935,235.324,202.174,235.324z M328.776,151.76h-15.359v77.692h-17.733V82.489h17.733C313.417,82.489,337.608,113.148,328.776,151.76z M226.551,155.951c0,13.463-10.913,24.377-24.377,24.377s-24.377-10.913-24.377-24.377c0-13.463,10.913-24.377,24.377-24.377S226.551,142.488,226.551,155.951z"/>' +
    "</g></g></g></svg>";


// Pins
export const PIN_STYLES = {
    // Use the default Google Maps pin
    Default: null,

    Blue: {
        template: BLUE_PIN_SVG_TEMPLATE,
        scaledSize: { width: 36, height: 36 },
        anchor: { x: 12, y: 24 },
    },

    Restaurant: {
        template: RES_PIN_SVG_TEMPLATE,
        scaledSize: { width: 38, height: 38 },
        anchor: { x: 18, y: 36 },
    },
};

// Helper to build a Google Maps Marker icon object from style + color
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

// Debugging
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
