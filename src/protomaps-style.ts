// I was having trouble importing this directly from the "protomaps-themes-base"
// npm library so I copied and pasted this from the library

function labels_layers(source, t) {
    return [
        {
            id: "physical_line_waterway_label",
            type: "symbol",
            source,
            "source-layer": "physical_line",
            minzoom: 13,
            filter: ["all", ["in", "pmap:kind", "river", "stream"]],
            layout: {
                "symbol-placement": "line",
                "text-font": ["Noto Sans Regular"],
                "text-field": ["get", "name"],
                "text-size": 12,
                "text-letter-spacing": 0.3
            },
            paint: {
                "text-color": t.waterway_label
            }
        },
        {
            id: "physical_point_peak",
            type: "symbol",
            source,
            "source-layer": "physical_point",
            filter: ["any", ["==", "pmap:kind", "peak"]],
            layout: {
                "text-font": ["Noto Sans Italic"],
                "text-field": ["get", "name"],
                "text-size": ["interpolate", ["linear"], ["zoom"], 10, 8, 16, 12],
                "text-letter-spacing": 0.1,
                "text-max-width": 9
            },
            paint: {
                "text-color": t.peak_label,
                "text-halo-width": 1.5
            }
        },
        {
            id: "roads_labels_minor",
            type: "symbol",
            source,
            "source-layer": "roads",
            minzoom: 15,
            filter: ["any", ["in", "pmap:kind", "minor_road", "other", "path"]],
            layout: {
                "symbol-sort-key": ["get", "pmap:min_zoom"],
                "symbol-placement": "line",
                "text-font": ["Noto Sans Regular"],
                "text-field": ["get", "name"],
                "text-size": 12
            },
            paint: {
                "text-color": t.roads_label_minor,
                "text-halo-color": t.roads_label_minor_halo,
                "text-halo-width": 2
            }
        },
        {
            id: "physical_point_ocean",
            type: "symbol",
            source,
            "source-layer": "physical_point",
            filter: [
                "any",
                [
                    "in",
                    "pmap:kind",
                    "sea",
                    "ocean",
                    "lake",
                    "water",
                    "bay",
                    "strait",
                    "fjord"
                ]
            ],
            layout: {
                "text-font": ["Noto Sans Medium"],
                "text-field": ["get", "name"],
                "text-size": ["interpolate", ["linear"], ["zoom"], 3, 10, 10, 12],
                "text-letter-spacing": 0.1,
                "text-max-width": 9,
                "text-transform": "uppercase"
            },
            paint: {
                "text-color": t.ocean_label
            }
        },
        {
            id: "physical_point_lakes",
            type: "symbol",
            source,
            "source-layer": "physical_point",
            filter: ["any", ["in", "pmap:kind", "lake", "water"]],
            layout: {
                "text-font": ["Noto Sans Medium"],
                "text-field": ["get", "name"],
                "text-size": ["interpolate", ["linear"], ["zoom"], 3, 0, 6, 12, 10, 12],
                "text-letter-spacing": 0.1,
                "text-max-width": 9
            },
            paint: {
                "text-color": t.ocean_label
            }
        },
        {
            id: "roads_labels_major",
            type: "symbol",
            source,
            "source-layer": "roads",
            minzoom: 11,
            filter: [
                "any",
                ["in", "pmap:kind", "highway", "major_road", "medium_road"]
            ],
            layout: {
                "symbol-sort-key": ["get", "pmap:min_zoom"],
                "symbol-placement": "line",
                "text-font": ["Noto Sans Regular"],
                "text-field": ["get", "name"],
                "text-size": 12
            },
            paint: {
                "text-color": t.roads_label_major,
                "text-halo-color": t.roads_label_major_halo,
                "text-halo-width": 2
            }
        },
        {
            id: "places_subplace",
            type: "symbol",
            source,
            "source-layer": "places",
            filter: ["==", "pmap:kind", "neighbourhood"],
            layout: {
                "symbol-sort-key": ["get", "pmap:min_zoom"],
                "text-field": "{name}",
                "text-font": ["Noto Sans Regular"],
                "text-max-width": 7,
                "text-letter-spacing": 0.1,
                "text-padding": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    5,
                    2,
                    8,
                    4,
                    12,
                    18,
                    15,
                    20
                ],
                "text-size": [
                    "interpolate",
                    ["exponential", 1.2],
                    ["zoom"],
                    11,
                    8,
                    14,
                    14,
                    18,
                    24
                ],
                "text-transform": "uppercase"
            },
            paint: {
                "text-color": t.subplace_label,
                "text-halo-color": t.subplace_label_halo,
                "text-halo-width": 2
            }
        },
        {
            id: "pois_important",
            type: "symbol",
            source,
            "source-layer": "pois",
            filter: ["any", ["<", ["get", "pmap:min_zoom"], 13]],
            layout: {
                "symbol-sort-key": ["get", "pmap:min_zoom"],
                "text-font": ["Noto Sans Regular"],
                "text-field": ["get", "name"],
                "text-size": 11,
                "text-max-width": 9,
                "icon-padding": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    0,
                    2,
                    14,
                    2,
                    16,
                    20,
                    17,
                    2,
                    22,
                    2
                ]
            },
            paint: {
                "text-color": t.subplace_label,
                "text-halo-color": t.subplace_label_halo,
                "text-halo-width": 1.5
            }
        },
        {
            id: "places_locality_circle",
            type: "circle",
            source,
            "source-layer": "places",
            filter: ["==", "pmap:kind", "locality"],
            paint: {
                "circle-radius": 2,
                "circle-stroke-width": 1.5,
                "circle-stroke-color": t.city_circle_stroke,
                "circle-color": t.city_circle,
                "circle-translate": [-6, 0]
            },
            maxzoom: 8
        },
        {
            id: "places_locality",
            type: "symbol",
            source,
            "source-layer": "places",
            filter: ["==", "pmap:kind", "locality"],
            layout: {
                "text-field": "{name}",
                "text-font": [
                    "case",
                    ["<=", ["get", "pmap:min_zoom"], 5],
                    ["literal", ["Noto Sans Medium"]],
                    ["literal", ["Noto Sans Regular"]]
                ],
                "text-padding": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    5,
                    3,
                    8,
                    7,
                    12,
                    11
                ],
                "text-size": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    2,
                    [
                        "case",
                        ["<", ["get", "pmap:population_rank"], 13],
                        8,
                        [">=", ["get", "pmap:population_rank"], 13],
                        13,
                        0
                    ],
                    4,
                    [
                        "case",
                        ["<", ["get", "pmap:population_rank"], 13],
                        10,
                        [">=", ["get", "pmap:population_rank"], 13],
                        15,
                        0
                    ],
                    6,
                    [
                        "case",
                        ["<", ["get", "pmap:population_rank"], 12],
                        11,
                        [">=", ["get", "pmap:population_rank"], 12],
                        17,
                        0
                    ],
                    8,
                    [
                        "case",
                        ["<", ["get", "pmap:population_rank"], 11],
                        11,
                        [">=", ["get", "pmap:population_rank"], 11],
                        18,
                        0
                    ],
                    10,
                    [
                        "case",
                        ["<", ["get", "pmap:population_rank"], 9],
                        12,
                        [">=", ["get", "pmap:population_rank"], 9],
                        20,
                        0
                    ],
                    15,
                    [
                        "case",
                        ["<", ["get", "pmap:population_rank"], 8],
                        12,
                        [">=", ["get", "pmap:population_rank"], 8],
                        22,
                        0
                    ]
                ],
                "icon-padding": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    0,
                    2,
                    8,
                    4,
                    10,
                    8,
                    12,
                    6,
                    22,
                    2
                ],
                "text-anchor": ["step", ["zoom"], "left", 8, "center"],
                "text-radial-offset": 0.2
            },
            paint: {
                "text-color": t.city_label,
                "text-halo-color": t.city_label_halo,
                "text-halo-width": 1
            }
        },
        {
            id: "places_region",
            type: "symbol",
            source,
            "source-layer": "places",
            filter: ["==", "pmap:kind", "region"],
            layout: {
                "symbol-sort-key": ["get", "pmap:min_zoom"],
                "text-field": [
                    "step",
                    ["zoom"],
                    ["get", "name:short"],
                    5,
                    ["get", "name"]
                ],
                "text-font": ["Noto Sans Regular"],
                "text-size": ["interpolate", ["linear"], ["zoom"], 3, 11, 7, 24],
                "text-radial-offset": 0.2,
                "text-anchor": "center",
                "text-transform": "uppercase"
            },
            paint: {
                "text-color": t.state_label,
                "text-halo-color": t.state_label_halo,
                "text-halo-width": 2
            }
        },
        {
            id: "places_country",
            type: "symbol",
            source,
            "source-layer": "places",
            filter: ["==", "pmap:kind", "country"],
            layout: {
                "symbol-sort-key": ["get", "pmap:min_zoom"],
                "text-field": "{name}",
                "text-font": ["Noto Sans Medium"],
                "text-size": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    2,
                    [
                        "case",
                        ["<", ["get", "pmap:population_rank"], 10],
                        8,
                        [">=", ["get", "pmap:population_rank"], 10],
                        12,
                        0
                    ],
                    6,
                    [
                        "case",
                        ["<", ["get", "pmap:population_rank"], 8],
                        10,
                        [">=", ["get", "pmap:population_rank"], 8],
                        18,
                        0
                    ],
                    8,
                    [
                        "case",
                        ["<", ["get", "pmap:population_rank"], 7],
                        11,
                        [">=", ["get", "pmap:population_rank"], 7],
                        20,
                        0
                    ]
                ],
                "icon-padding": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    0,
                    2,
                    14,
                    2,
                    16,
                    20,
                    17,
                    2,
                    22,
                    2
                ],
                "text-transform": "uppercase"
            },
            paint: {
                "text-color": t.country_label
            }
        }
    ];
}

function nolabels_layers(source: string, t: Record<string, string>) {
    return [
        {
            id: "background",
            type: "background",
            paint: {
                "background-color": t.background
            }
        },
        {
            id: "earth",
            type: "fill",
            source,
            "source-layer": "earth",
            paint: {
                "fill-color": t.earth
            }
        },
        {
            id: "landuse_park",
            type: "fill",
            source,
            "source-layer": "landuse",
            filter: [
                "any",
                [
                    "in",
                    "pmap:kind",
                    "national_park",
                    "park",
                    "cemetery",
                    "protected_area",
                    "nature_reserve",
                    "forest",
                    "golf_course"
                ]
            ],
            paint: {
                "fill-color": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    0,
                    t.park_a,
                    12,
                    t.park_b
                ]
            }
        },
        {
            id: "landuse_hospital",
            type: "fill",
            source,
            "source-layer": "landuse",
            filter: ["any", ["==", "pmap:kind", "hospital"]],
            paint: {
                "fill-color": t.hospital
            }
        },
        {
            id: "landuse_industrial",
            type: "fill",
            source,
            "source-layer": "landuse",
            filter: ["any", ["==", "pmap:kind", "industrial"]],
            paint: {
                "fill-color": t.industrial
            }
        },
        {
            id: "landuse_school",
            type: "fill",
            source,
            "source-layer": "landuse",
            filter: ["any", ["in", "pmap:kind", "school", "university", "college"]],
            paint: {
                "fill-color": t.school
            }
        },
        {
            id: "landuse_beach",
            type: "fill",
            source,
            "source-layer": "landuse",
            filter: ["any", ["in", "pmap:kind", "beach"]],
            paint: {
                "fill-color": t.beach
            }
        },
        {
            id: "landuse_zoo",
            type: "fill",
            source,
            "source-layer": "landuse",
            filter: ["any", ["in", "pmap:kind", "zoo"]],
            paint: {
                "fill-color": t.zoo
            }
        },
        {
            id: "landuse_military",
            type: "fill",
            source,
            "source-layer": "landuse",
            filter: [
                "any",
                ["in", "pmap:kind", "military", "naval_base", "airfield"]
            ],
            paint: {
                "fill-color": t.zoo
            }
        },
        {
            id: "natural_wood",
            type: "fill",
            source,
            "source-layer": "natural",
            filter: ["any", ["in", "pmap:kind", "wood", "nature_reserve", "forest"]],
            paint: {
                "fill-color": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    0,
                    t.wood_a,
                    12,
                    t.wood_b
                ]
            }
        },
        {
            id: "natural_scrub",
            type: "fill",
            source,
            "source-layer": "natural",
            filter: ["in", "pmap:kind", "scrub", "grassland", "grass"],
            paint: {
                "fill-color": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    0,
                    t.scrub_a,
                    12,
                    t.scrub_b
                ]
            }
        },
        {
            id: "natural_glacier",
            type: "fill",
            source,
            "source-layer": "natural",
            filter: ["==", "pmap:kind", "glacier"],
            paint: {
                "fill-color": t.glacier
            }
        },
        {
            id: "natural_sand",
            type: "fill",
            source,
            "source-layer": "natural",
            filter: ["==", "pmap:kind", "sand"],
            paint: {
                "fill-color": t.sand
            }
        },
        {
            id: "landuse_aerodrome",
            type: "fill",
            source,
            "source-layer": "landuse",
            filter: ["any", ["in", "pmap:kind", "aerodrome"]],
            paint: {
                "fill-color": t.aerodrome
            }
        },
        {
            id: "transit_runway",
            type: "line",
            source,
            "source-layer": "transit",
            filter: ["any", ["in", "pmap:kind_detail", "runway"]],
            paint: {
                "line-color": t.runway,
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    10,
                    0,
                    12,
                    4,
                    18,
                    30
                ]
            }
        },
        {
            id: "transit_taxiway",
            type: "line",
            source,
            "source-layer": "transit",
            minzoom: 13,
            filter: ["any", ["in", "pmap:kind_detail", "taxiway"]],
            paint: {
                "line-color": t.runway,
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    13,
                    0,
                    13.5,
                    1,
                    15,
                    6
                ]
            }
        },
        {
            id: "water",
            type: "fill",
            source,
            "source-layer": "water",
            paint: {
                "fill-color": t.water
            }
        },
        {
            id: "physical_line_stream",
            type: "line",
            source,
            "source-layer": "physical_line",
            minzoom: 14,
            filter: ["all", ["in", "pmap:kind", "stream"]],
            paint: {
                "line-color": t.water,
                "line-width": 0.5
            }
        },
        {
            id: "physical_line_river",
            type: "line",
            source,
            "source-layer": "physical_line",
            minzoom: 9,
            filter: ["all", ["in", "pmap:kind", "river"]],
            paint: {
                "line-color": t.water,
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    9,
                    0,
                    9.5,
                    1,
                    18,
                    12
                ]
            }
        },
        {
            id: "landuse_pedestrian",
            type: "fill",
            source,
            "source-layer": "landuse",
            filter: ["any", ["==", "pmap:kind", "pedestrian"]],
            paint: {
                "fill-color": t.pedestrian
            }
        },
        {
            id: "landuse_pier",
            type: "fill",
            source,
            "source-layer": "landuse",
            filter: ["any", ["==", "pmap:kind", "pier"]],
            paint: {
                "fill-color": t.pier
            }
        },
        {
            id: "roads_tunnels_other_casing",
            type: "line",
            source,
            "source-layer": "roads",
            filter: [
                "all",
                ["<", "pmap:level", 0],
                ["in", "pmap:kind", "other", "path"]
            ],
            paint: {
                "line-color": t.tunnel_other_casing,
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    14,
                    0,
                    20,
                    7
                ]
            }
        },
        {
            id: "roads_tunnels_minor_casing",
            type: "line",
            source,
            "source-layer": "roads",
            filter: [
                "all",
                ["<", "pmap:level", 0],
                ["==", "pmap:kind", "minor_road"]
            ],
            paint: {
                "line-color": t.tunnel_minor_casing,
                "line-dasharray": [3, 2],
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    11,
                    0,
                    12.5,
                    0.5,
                    15,
                    2,
                    18,
                    11
                ],
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    12,
                    0,
                    12.5,
                    1
                ]
            }
        },
        {
            id: "roads_tunnels_link_casing",
            type: "line",
            source,
            "source-layer": "roads",
            filter: ["all", ["<", "pmap:level", 0], ["==", "pmap:link", 1]],
            paint: {
                "line-color": t.tunnel_link_casing,
                "line-dasharray": [3, 2],
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    13,
                    0,
                    13.5,
                    1,
                    18,
                    11
                ],
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    12,
                    0,
                    12.5,
                    1
                ]
            }
        },
        {
            id: "roads_tunnels_medium_casing",
            type: "line",
            source,
            "source-layer": "roads",
            filter: [
                "all",
                ["<", "pmap:level", 0],
                ["==", "pmap:kind", "medium_road"]
            ],
            paint: {
                "line-color": t.tunnel_medium_casing,
                "line-dasharray": [3, 2],
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    7,
                    0,
                    7.5,
                    0.5,
                    18,
                    13
                ],
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    10,
                    0,
                    10.5,
                    1
                ]
            }
        },
        {
            id: "roads_tunnels_major_casing",
            type: "line",
            source,
            "source-layer": "roads",
            filter: [
                "all",
                ["<", "pmap:level", 0],
                ["==", "pmap:kind", "major_road"]
            ],
            paint: {
                "line-color": t.tunnel_major_casing,
                "line-dasharray": [3, 2],
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    7,
                    0,
                    7.5,
                    0.5,
                    18,
                    13
                ],
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    9,
                    0,
                    9.5,
                    1
                ]
            }
        },
        {
            id: "roads_tunnels_highway_casing",
            type: "line",
            source,
            "source-layer": "roads",
            filter: [
                "all",
                ["<", "pmap:level", 0],
                ["==", "pmap:kind", "highway"],
                ["!=", "pmap:link", 1]
            ],
            paint: {
                "line-color": t.tunnel_highway_casing,
                "line-dasharray": [6, 0.5],
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    3,
                    0,
                    3.5,
                    0.5,
                    18,
                    15
                ],
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    7,
                    0,
                    7.5,
                    1,
                    20,
                    15
                ]
            }
        },
        {
            id: "roads_tunnels_other",
            type: "line",
            source,
            "source-layer": "roads",
            filter: [
                "all",
                ["<", "pmap:level", 0],
                ["in", "pmap:kind", "other", "path"]
            ],
            paint: {
                "line-color": t.tunnel_other,
                "line-dasharray": [4.5, 0.5],
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    14,
                    0,
                    20,
                    7
                ]
            }
        },
        {
            id: "roads_tunnels_minor",
            type: "line",
            source,
            "source-layer": "roads",
            filter: [
                "all",
                ["<", "pmap:level", 0],
                ["==", "pmap:kind", "minor_road"]
            ],
            paint: {
                "line-color": t.tunnel_minor,
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    11,
                    0,
                    12.5,
                    0.5,
                    15,
                    2,
                    18,
                    11
                ]
            }
        },
        {
            id: "roads_tunnels_link",
            type: "line",
            source,
            "source-layer": "roads",
            filter: ["all", ["<", "pmap:level", 0], ["==", "pmap:link", 1]],
            paint: {
                "line-color": t.tunnel_minor,
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    13,
                    0,
                    13.5,
                    1,
                    18,
                    11
                ]
            }
        },
        {
            id: "roads_tunnels_medium",
            type: "line",
            source,
            "source-layer": "roads",
            filter: [
                "all",
                ["<", "pmap:level", 0],
                ["==", "pmap:kind", "medium_road"]
            ],
            paint: {
                "line-color": t.tunnel_medium,
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    7,
                    0,
                    12,
                    1.2,
                    15,
                    3,
                    18,
                    13
                ]
            }
        },
        {
            id: "roads_tunnels_major",
            type: "line",
            source,
            "source-layer": "roads",
            filter: [
                "all",
                ["<", "pmap:level", 0],
                ["==", "pmap:kind", "major_road"]
            ],
            paint: {
                "line-color": t.tunnel_major,
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    6,
                    0,
                    12,
                    1.6,
                    15,
                    3,
                    18,
                    13
                ]
            }
        },
        {
            id: "roads_tunnels_highway",
            type: "line",
            source,
            "source-layer": "roads",
            filter: [
                "all",
                ["<", "pmap:level", 0],
                ["==", "pmap:kind", "highway"],
                ["!=", "pmap:link", 1]
            ],
            paint: {
                "line-color": t.tunnel_highway,
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    3,
                    0,
                    6,
                    1.1,
                    12,
                    1.6,
                    15,
                    5,
                    18,
                    15
                ]
            }
        },
        {
            id: "buildings",
            type: "fill",
            source,
            "source-layer": "buildings",
            paint: {
                "fill-color": t.buildings,
                "fill-opacity": 0.5
            }
        },
        {
            id: "transit_pier",
            type: "line",
            source,
            "source-layer": "transit",
            filter: ["any", ["==", "pmap:kind", "pier"]],
            paint: {
                "line-color": t.transit_pier,
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    12,
                    0,
                    12.5,
                    0.5,
                    20,
                    16
                ]
            }
        },
        {
            id: "roads_minor_service_casing",
            type: "line",
            source,
            "source-layer": "roads",
            minzoom: 13,
            filter: [
                "all",
                ["==", "pmap:level", 0],
                ["==", "pmap:kind", "minor_road"],
                ["==", "pmap:kind_detail", "service"]
            ],
            paint: {
                "line-color": t.minor_service_casing,
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    13,
                    0,
                    18,
                    8
                ],
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    13,
                    0,
                    13.5,
                    0.8
                ]
            }
        },
        {
            id: "roads_minor_casing",
            type: "line",
            source,
            "source-layer": "roads",
            filter: [
                "all",
                ["==", "pmap:level", 0],
                ["==", "pmap:kind", "minor_road"],
                ["!=", "pmap:kind_detail", "service"]
            ],
            paint: {
                "line-color": t.minor_casing,
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    11,
                    0,
                    12.5,
                    0.5,
                    15,
                    2,
                    18,
                    11
                ],
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    12,
                    0,
                    12.5,
                    1
                ]
            }
        },
        {
            id: "roads_link_casing",
            type: "line",
            source,
            "source-layer": "roads",
            minzoom: 13,
            filter: ["all", ["==", "pmap:link", 1]],
            paint: {
                "line-color": t.minor_casing,
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    13,
                    0,
                    13.5,
                    1,
                    18,
                    11
                ],
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    13,
                    0,
                    13.5,
                    1.5
                ]
            }
        },
        {
            id: "roads_medium_casing",
            type: "line",
            source,
            "source-layer": "roads",
            filter: [
                "all",
                ["==", "pmap:level", 0],
                ["==", "pmap:kind", "medium_road"]
            ],
            paint: {
                "line-color": t.medium_casing,
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    7,
                    0,
                    12,
                    1.2,
                    15,
                    3,
                    18,
                    13
                ],
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    10,
                    0,
                    10.5,
                    1.5
                ]
            }
        },
        {
            id: "roads_major_casing_late",
            type: "line",
            source,
            "source-layer": "roads",
            minzoom: 12,
            filter: [
                "all",
                ["==", "pmap:level", 0],
                ["==", "pmap:kind", "major_road"]
            ],
            paint: {
                "line-color": t.major_casing_late,
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    6,
                    0,
                    12,
                    1.6,
                    15,
                    3,
                    18,
                    13
                ],
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    9,
                    0,
                    9.5,
                    1
                ]
            }
        },
        {
            id: "roads_highway_casing_late",
            type: "line",
            source,
            "source-layer": "roads",
            minzoom: 12,
            filter: [
                "all",
                ["==", "pmap:level", 0],
                ["==", "pmap:kind", "highway"],
                ["!=", "pmap:link", 1]
            ],
            paint: {
                "line-color": t.highway_casing_late,
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    3,
                    0,
                    3.5,
                    0.5,
                    18,
                    15
                ],
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    7,
                    0,
                    7.5,
                    1,
                    20,
                    15
                ]
            }
        },
        {
            id: "roads_other",
            type: "line",
            source,
            "source-layer": "roads",
            filter: [
                "all",
                ["==", "pmap:level", 0],
                ["in", "pmap:kind", "other", "path"]
            ],
            paint: {
                "line-color": t.other,
                "line-dasharray": [3, 1],
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    14,
                    0,
                    20,
                    7
                ]
            }
        },
        {
            id: "roads_link",
            type: "line",
            source,
            "source-layer": "roads",
            filter: ["all", ["==", "pmap:link", 1]],
            paint: {
                "line-color": t.link,
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    13,
                    0,
                    13.5,
                    1,
                    18,
                    11
                ]
            }
        },
        {
            id: "roads_minor_service",
            type: "line",
            source,
            "source-layer": "roads",
            filter: [
                "all",
                ["==", "pmap:level", 0],
                ["==", "pmap:kind", "minor_road"],
                ["==", "pmap:kind_detail", "service"]
            ],
            paint: {
                "line-color": t.minor_service,
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    13,
                    0,
                    18,
                    8
                ]
            }
        },
        {
            id: "roads_minor",
            type: "line",
            source,
            "source-layer": "roads",
            filter: [
                "all",
                ["==", "pmap:level", 0],
                ["==", "pmap:kind", "minor_road"],
                ["!=", "pmap:kind_detail", "service"]
            ],
            paint: {
                "line-color": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    11,
                    t.minor_a,
                    16,
                    t.minor_b
                ],
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    11,
                    0,
                    12.5,
                    0.5,
                    15,
                    2,
                    18,
                    11
                ]
            }
        },
        {
            id: "roads_medium",
            type: "line",
            source,
            "source-layer": "roads",
            filter: [
                "all",
                ["==", "pmap:level", 0],
                ["==", "pmap:kind", "medium_road"]
            ],
            paint: {
                "line-color": t.medium,
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    7,
                    0,
                    12,
                    1.2,
                    15,
                    3,
                    18,
                    13
                ]
            }
        },
        {
            id: "roads_major_casing_early",
            type: "line",
            source,
            "source-layer": "roads",
            maxzoom: 12,
            filter: [
                "all",
                ["==", "pmap:level", 0],
                ["==", "pmap:kind", "major_road"]
            ],
            paint: {
                "line-color": t.major_casing_early,
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    7,
                    0,
                    7.5,
                    0.5,
                    18,
                    13
                ],
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    9,
                    0,
                    9.5,
                    1
                ]
            }
        },
        {
            id: "roads_major",
            type: "line",
            source,
            "source-layer": "roads",
            filter: [
                "all",
                ["==", "pmap:level", 0],
                ["==", "pmap:kind", "major_road"]
            ],
            paint: {
                "line-color": t.major,
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    6,
                    0,
                    12,
                    1.6,
                    15,
                    3,
                    18,
                    13
                ]
            }
        },
        {
            id: "roads_highway_casing_early",
            type: "line",
            source,
            "source-layer": "roads",
            maxzoom: 12,
            filter: [
                "all",
                ["==", "pmap:level", 0],
                ["==", "pmap:kind", "highway"],
                ["!=", "pmap:link", 1]
            ],
            paint: {
                "line-color": t.highway_casing_early,
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    3,
                    0,
                    3.5,
                    0.5,
                    18,
                    15
                ],
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    7,
                    0,
                    7.5,
                    1
                ]
            }
        },
        {
            id: "roads_highway",
            type: "line",
            source,
            "source-layer": "roads",
            filter: [
                "all",
                ["==", "pmap:level", 0],
                ["==", "pmap:kind", "highway"],
                ["!=", "pmap:link", 1]
            ],
            paint: {
                "line-color": t.highway,
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    3,
                    0,
                    6,
                    1.1,
                    12,
                    1.6,
                    15,
                    5,
                    18,
                    15
                ]
            }
        },
        {
            id: "transit_railway",
            type: "line",
            source,
            "source-layer": "transit",
            filter: ["all", ["==", "pmap:kind", "rail"]],
            paint: {
                "line-dasharray": [0.3, 0.75],
                "line-opacity": 0.5,
                "line-color": t.railway,
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    3,
                    0,
                    6,
                    0.15,
                    18,
                    9
                ]
            }
        },
        {
            id: "boundaries_country",
            type: "line",
            source,
            "source-layer": "boundaries",
            filter: ["<=", "pmap:min_admin_level", 2],
            paint: {
                "line-color": t.boundaries,
                "line-width": 1,
                "line-dasharray": [3, 2]
            }
        },
        {
            id: "boundaries",
            type: "line",
            source,
            "source-layer": "boundaries",
            filter: [">", "pmap:min_admin_level", 2],
            paint: {
                "line-color": t.boundaries,
                "line-width": 0.5,
                "line-dasharray": [3, 2]
            }
        },
        {
            id: "roads_bridges_other_casing",
            type: "line",
            source,
            "source-layer": "roads",
            minzoom: 12,
            filter: [
                "all",
                [">", "pmap:level", 0],
                ["in", "pmap:kind", "other", "path"]
            ],
            paint: {
                "line-color": t.bridges_other_casing,
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    14,
                    0,
                    20,
                    7
                ]
            }
        },
        {
            id: "roads_bridges_link_casing",
            type: "line",
            source,
            "source-layer": "roads",
            minzoom: 12,
            filter: ["all", [">", "pmap:level", 0], ["==", "pmap:link", 1]],
            paint: {
                "line-color": t.bridges_minor_casing,
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    13,
                    0,
                    13.5,
                    1,
                    18,
                    11
                ],
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    12,
                    0,
                    12.5,
                    1.5
                ]
            }
        },
        {
            id: "roads_bridges_minor_casing",
            type: "line",
            source,
            "source-layer": "roads",
            minzoom: 12,
            filter: [
                "all",
                [">", "pmap:level", 0],
                ["==", "pmap:kind", "minor_road"]
            ],
            paint: {
                "line-color": t.bridges_minor_casing,
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    11,
                    0,
                    12.5,
                    0.5,
                    15,
                    2,
                    18,
                    11
                ],
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    13,
                    0,
                    13.5,
                    0.8
                ]
            }
        },
        {
            id: "roads_bridges_medium_casing",
            type: "line",
            source,
            "source-layer": "roads",
            minzoom: 12,
            filter: [
                "all",
                [">", "pmap:level", 0],
                ["==", "pmap:kind", "medium_road"]
            ],
            paint: {
                "line-color": t.bridges_medium_casing,
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    7,
                    0,
                    12,
                    1.2,
                    15,
                    3,
                    18,
                    13
                ],
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    10,
                    0,
                    10.5,
                    1.5
                ]
            }
        },
        {
            id: "roads_bridges_major_casing",
            type: "line",
            source,
            "source-layer": "roads",
            minzoom: 12,
            filter: [
                "all",
                [">", "pmap:level", 0],
                ["==", "pmap:kind", "major_road"]
            ],
            paint: {
                "line-color": t.bridges_major_casing,
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    7,
                    0,
                    7.5,
                    0.5,
                    18,
                    10
                ],
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    9,
                    0,
                    9.5,
                    1.5
                ]
            }
        },
        {
            id: "roads_bridges_other",
            type: "line",
            source,
            "source-layer": "roads",
            minzoom: 12,
            filter: [
                "all",
                [">", "pmap:level", 0],
                ["in", "pmap:kind", "other", "path"]
            ],
            paint: {
                "line-color": t.bridges_other,
                "line-dasharray": [2, 1],
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    14,
                    0,
                    20,
                    7
                ]
            }
        },
        {
            id: "roads_bridges_minor",
            type: "line",
            source,
            "source-layer": "roads",
            minzoom: 12,
            filter: [
                "all",
                [">", "pmap:level", 0],
                ["==", "pmap:kind", "minor_road"]
            ],
            paint: {
                "line-color": t.bridges_minor,
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    11,
                    0,
                    12.5,
                    0.5,
                    15,
                    2,
                    18,
                    11
                ]
            }
        },
        {
            id: "roads_bridges_link",
            type: "line",
            source,
            "source-layer": "roads",
            minzoom: 12,
            filter: ["all", [">", "pmap:level", 0], ["==", "pmap:link", 1]],
            paint: {
                "line-color": t.bridges_minor,
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    13,
                    0,
                    13.5,
                    1,
                    18,
                    11
                ]
            }
        },
        {
            id: "roads_bridges_medium",
            type: "line",
            source,
            "source-layer": "roads",
            minzoom: 12,
            filter: [
                "all",
                [">", "pmap:level", 0],
                ["==", "pmap:kind", "medium_road"]
            ],
            paint: {
                "line-color": t.bridges_medium,
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    7,
                    0,
                    12,
                    1.2,
                    15,
                    3,
                    18,
                    13
                ]
            }
        },
        {
            id: "roads_bridges_major",
            type: "line",
            source,
            "source-layer": "roads",
            minzoom: 12,
            filter: [
                "all",
                [">", "pmap:level", 0],
                ["==", "pmap:kind", "major_road"]
            ],
            paint: {
                "line-color": t.bridges_major,
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    6,
                    0,
                    12,
                    1.6,
                    15,
                    3,
                    18,
                    13
                ]
            }
        },
        {
            id: "roads_bridges_highway_casing",
            type: "line",
            source,
            "source-layer": "roads",
            minzoom: 12,
            filter: [
                "all",
                [">", "pmap:level", 0],
                ["==", "pmap:kind", "highway"],
                ["!=", "pmap:link", 1]
            ],
            paint: {
                "line-color": t.bridges_highway_casing,
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    3,
                    0,
                    3.5,
                    0.5,
                    18,
                    15
                ],
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    7,
                    0,
                    7.5,
                    1,
                    20,
                    15
                ]
            }
        },
        {
            id: "roads_bridges_highway",
            type: "line",
            source,
            "source-layer": "roads",
            filter: [
                "all",
                [">", "pmap:level", 0],
                ["==", "pmap:kind", "highway"],
                ["!=", "pmap:link", 1]
            ],
            paint: {
                "line-color": t.bridges_highway,
                "line-width": [
                    "interpolate",
                    ["exponential", 1.6],
                    ["zoom"],
                    3,
                    0,
                    6,
                    1.1,
                    12,
                    1.6,
                    15,
                    5,
                    18,
                    15
                ]
            }
        }
    ];
}

var LIGHT = {
    background: "#cccccc",
    earth: "#e0e0e0",
    park_a: "#cfddd5",
    park_b: "#9cd3b4",
    hospital: "#e4dad9",
    industrial: "#d1dde1",
    school: "#e4ded7",
    wood_a: "#d0ded0",
    wood_b: "#a0d9a0",
    pedestrian: "#e3e0d4",
    scrub_a: "#cedcd7",
    scrub_b: "#99d2bb",
    glacier: "#e7e7e7",
    sand: "#e2e0d7",
    beach: "#e8e4d0",
    aerodrome: "#dadbdf",
    runway: "#e9e9ed",
    water: "#80deea",
    pier: "#e0e0e0",
    zoo: "#c6dcdc",
    military: "#dcdcdc",
    tunnel_other_casing: "#e0e0e0",
    tunnel_minor_casing: "#e0e0e0",
    tunnel_link_casing: "#e0e0e0",
    tunnel_medium_casing: "#e0e0e0",
    tunnel_major_casing: "#e0e0e0",
    tunnel_highway_casing: "#e0e0e0",
    tunnel_other: "#d5d5d5",
    tunnel_minor: "#d5d5d5",
    tunnel_link: "#d5d5d5",
    tunnel_medium: "#d5d5d5",
    tunnel_major: "#d5d5d5",
    tunnel_highway: "#d5d5d5",
    transit_pier: "#e0e0e0",
    buildings: "#cccccc",
    minor_service_casing: "#e0e0e0",
    minor_casing: "#e0e0e0",
    link_casing: "#e0e0e0",
    medium_casing: "#e0e0e0",
    major_casing_late: "#e0e0e0",
    highway_casing_late: "#e0e0e0",
    other: "#ebebeb",
    minor_service: "#ebebeb",
    minor_a: "#ebebeb",
    minor_b: "#ffffff",
    link: "#ffffff",
    medium: "#f5f5f5",
    major_casing_early: "#e0e0e0",
    major: "#ffffff",
    highway_casing_early: "#e0e0e0",
    highway: "#ffffff",
    railway: "#a7b1b3",
    boundaries: "#adadad",
    waterway_label: "#ffffff",
    bridges_other_casing: "#e0e0e0",
    bridges_minor_casing: "#e0e0e0",
    bridges_link_casing: "#e0e0e0",
    bridges_medium_casing: "#e0e0e0",
    bridges_major_casing: "#e0e0e0",
    bridges_highway_casing: "#e0e0e0",
    bridges_other: "#ebebeb",
    bridges_minor: "#ffffff",
    bridges_link: "#ffffff",
    bridges_medium: "#f0eded",
    bridges_major: "#f5f5f5",
    bridges_highway: "#ffffff",
    roads_label_minor: "#91888b",
    roads_label_minor_halo: "#ffffff",
    roads_label_major: "#938a8d",
    roads_label_major_halo: "#ffffff",
    ocean_label: "#ffffff",
    peak_label: "#7e9aa0",
    subplace_label: "#8f8f8f",
    subplace_label_halo: "#e0e0e0",
    city_circle: "#ffffff",
    city_circle_stroke: "#a3a3a3",
    city_label: "#5c5c5c",
    city_label_halo: "#e0e0e0",
    state_label: "#b3b3b3",
    state_label_halo: "#e0e0e0",
    country_label: "#a3a3a3"
};

const source = "protomaps-mvt";
const theme = LIGHT;
export const layersWithLabels = nolabels_layers(source, theme).concat(labels_layers(source, theme));
export const layersWithoutLabels = nolabels_layers(source, theme);