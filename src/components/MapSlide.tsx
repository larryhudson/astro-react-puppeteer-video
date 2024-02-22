import React from "react"
import type { ElementRef } from 'react';
import maplibregl from 'maplibre-gl';
import type { StyleSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import '@src/styles/map.css';
import { layersWithLabels, layersWithoutLabels } from "@src/protomaps-style";
import type { GeoJSON } from 'geojson';
import { addGeoJSONLayer } from '@src/utils/map-utils';

const mapLibreMapStyle: StyleSpecification = {
    version: 8,
    glyphs: 'https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf',
    sources: {
        "protomaps-mvt": {
            type: "vector",
            tiles: ["https://pmtiles.larryhudson.net/paris-v2-20240217/{z}/{x}/{y}.mvt"],
            maxzoom: 15,
            attribution: '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>'
        }
    },
    //  one of light, dark, white, black, grayscale or debug.
    layers: layersWithLabels
}

export default function MapSlide({
    currentTimeSecs,
    initialFocus,
    places = [],
    moveAnimations = []
}: {
    currentTimeSecs: number,
    initialFocus: {
        lat: number,
        lng: number,
        zoom: number
    },
    places: Array<{
        lat: number,
        lng: number,
        name: string
    }>,
    moveAnimations: Array<{
        startSecs: number,
        endSecs: number,
        from: {
            lat: number,
            lng: number
        },
        to: {
            lat: number,
            lng: number
        }
    }>
}) {
    const mapContainer = React.useRef<ElementRef<"div">>(null);
    const map = React.useRef<maplibregl.Map | null>(null);
    const [mapReady, setMapReady] = React.useState(false);

    // when the component is loaded, we want to initialise the map
    React.useEffect(() => {
        if (map.current) {
            return
        }

        console.log("Initialising the map")

        map.current = new maplibregl.Map({
            container: mapContainer.current!,
            style: mapLibreMapStyle,
            center: [initialFocus.lng, initialFocus.lat],
            zoom: initialFocus.zoom,
            preserveDrawingBuffer: true
        });

        if (places.length > 0) {
            for (const place of places) {
                const marker = new maplibregl.Marker()
                    .setLngLat([place.lng, place.lat])
                    .addTo(map.current);
            }
        }

        map.current.on('load', () => { setMapReady(true); });

        return () => {
            map.current?.remove();
            map.current = null;
        }
    }, []);

    React.useEffect(() => {
        const currentAnimation = moveAnimations.find(animation => {
            return animation.startSecs <= currentTimeSecs && animation.endSecs > currentTimeSecs
        })
        if (!currentAnimation) return;

        // calculate the coordinates of the position between 'to' and 'from' based on the current time
        const progress = (currentTimeSecs - currentAnimation.startSecs) / (currentAnimation.endSecs - currentAnimation.startSecs);

        const lat = currentAnimation.from.lat + (currentAnimation.to.lat - currentAnimation.from.lat) * progress;
        const lng = currentAnimation.from.lng + (currentAnimation.to.lng - currentAnimation.from.lng) * progress;

        console.log("Moving to", lat, lng)

        map.current?.flyTo({
            center: [lng, lat],
            essential: true
        });
    }, [currentTimeSecs])

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
            {mapReady && <div id="map-is-ready"></div>}
        </div>
    );
}