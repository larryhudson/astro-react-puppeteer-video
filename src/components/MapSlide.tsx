import React from "react";
import type { ElementRef } from "react";
import maplibregl from "maplibre-gl";
import type { StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "@src/styles/map.css";
import { layersWithLabels, layersWithoutLabels } from "@src/protomaps-style";
import {
  getCurrentTiming,
  getStartTimeForTiming,
  getCurrentTimingProgress,
} from "@src/utils/timing-utils";

const mapLibreMapStyle: StyleSpecification = {
  version: 8,
  glyphs:
    "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
  sources: {
    "protomaps-mvt": {
      type: "vector",
      tiles: [
        "https://pmtiles.larryhudson.net/paris-v2-20240217/{z}/{x}/{y}.mvt",
      ],
      maxzoom: 15,
      attribution:
        '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>',
    },
  },
  //  one of light, dark, white, black, grayscale or debug.
  layers: layersWithLabels,
};

export default function MapSlide({
  currentTimeSecs,
  initialFocus,
  places = [],
  moveAnimations = [],
}: {
  currentTimeSecs: number;
  initialFocus: {
    lat: number;
    lng: number;
    zoom: number;
  };
  places: Array<{
    lat: number;
    lng: number;
    name: string;
  }>;
  moveAnimations: Array<{
    durationSecs: number;
    delaySecs: number | undefined;
    from: {
      lat: number;
      lng: number;
    };
    to: {
      lat: number;
      lng: number;
    };
  }>;
}) {
  const moveAnimationsWithStartTimes = React.useMemo(() => {
    return moveAnimations.map((moveAnimation) => {
      const startTime = getStartTimeForTiming(moveAnimations, moveAnimation);
      const endTime =
        startTime + moveAnimation.durationSecs + (moveAnimation.delaySecs || 0);
      return {
        ...moveAnimation,
        startTime,
        endTime,
      };
    });
  }, [moveAnimations]);

  const totalDurationSecs = React.useMemo(() => {
    return moveAnimationsWithStartTimes.reduce((acc, moveAnimation) => {
      return Math.max(acc, moveAnimation.endTime);
    }, 0);
  }, [moveAnimationsWithStartTimes]);

  const mapContainer = React.useRef<ElementRef<"div">>(null);
  const map = React.useRef<maplibregl.Map | null>(null);
  const [mapReady, setMapReady] = React.useState(false);

  const [mapCenterCoords, setMapCenterCoords] = React.useState([]);

  // when the component is loaded, we want to initialise the map
  React.useEffect(() => {
    if (map.current) {
      return;
    }

    console.log("Initialising the map");

    map.current = new maplibregl.Map({
      container: mapContainer.current!,
      style: mapLibreMapStyle,
      center: [initialFocus.lng, initialFocus.lat],
      zoom: initialFocus.zoom,
      preserveDrawingBuffer: true,
    });

    if (places.length > 0) {
      for (const place of places) {
        const marker = new maplibregl.Marker()
          .setLngLat([place.lng, place.lat])
          .addTo(map.current);
      }
    }

    map.current.on("load", () => {
      setMapReady(true);
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  React.useEffect(() => {
    if (currentTimeSecs > totalDurationSecs) {
      return;
    }

    if (currentTimeSecs < 0) {
      return;
    }

    const currentAnimation = getCurrentTiming(moveAnimations, currentTimeSecs);
    if (!currentAnimation) return;

    const progress = getCurrentTimingProgress(currentTimeSecs, moveAnimations);

    const lat =
      currentAnimation.from.lat +
      (currentAnimation.to.lat - currentAnimation.from.lat) * progress;
    const lng =
      currentAnimation.from.lng +
      (currentAnimation.to.lng - currentAnimation.from.lng) * progress;

    setMapCenterCoords([lat, lng]);
    map.current?.flyTo({
      center: [lng, lat],
      essential: true,
    });

  }, [currentTimeSecs]);

  // when map coords change, dispatch a 'setDirty' event
  React.useEffect(() => {
    if (mapCenterCoords.length === 0) {
      return;
    }
    document.dispatchEvent(new CustomEvent("setDirty"));
  }, [mapCenterCoords]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
      {mapReady && <div id="slide-ready"></div>}
    </div>
  );
}
