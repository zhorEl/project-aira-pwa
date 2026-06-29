"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useTheme } from "next-themes";
import { farms, cooperatives, MAP_CENTER } from "@/lib/mock-data";
import { MapFallback } from "./map-fallback";

export interface MapLayerState {
  heatmap: boolean;
  farms: boolean;
  cooperatives: boolean;
  boundaries: boolean;
  validation: boolean;
}

const varietyColors: Record<string, string> = {
  Arabica: "#5f8a3f",
  Robusta: "#a86f3f",
  Excelsa: "#bb8757",
  Liberica: "#915a34",
};

export function CoffeeMap({
  layers,
  className,
  interactive = true,
}: {
  layers: MapLayerState;
  className?: string;
  interactive?: boolean;
}) {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { resolvedTheme } = useTheme();
  const [ready, setReady] = useState(false);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    if (!token || !container.current || map.current) return;
    mapboxgl.accessToken = token;
    map.current = new mapboxgl.Map({
      container: container.current,
      style:
        resolvedTheme === "dark"
          ? "mapbox://styles/mapbox/dark-v11"
          : "mapbox://styles/mapbox/outdoors-v12",
      center: [MAP_CENTER.lng, MAP_CENTER.lat],
      zoom: 9.5,
      attributionControl: false,
    });
    if (interactive) {
      map.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "bottom-right");
    }
    map.current.on("load", () => {
      setupSources(map.current!);
      setReady(true);
    });
    return () => {
      map.current?.remove();
      map.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Toggle layer visibility
  useEffect(() => {
    if (!ready || !map.current) return;
    const m = map.current;
    const set = (id: string, visible: boolean) => {
      if (m.getLayer(id)) m.setLayoutProperty(id, "visibility", visible ? "visible" : "none");
    };
    set("farms-heat", layers.heatmap);
    set("farms-points", layers.farms);
    set("coop-points", layers.cooperatives);
    set("farm-boundaries", layers.boundaries);
    set("farm-boundaries-line", layers.boundaries);
    set("validation-points", layers.validation);
  }, [layers, ready]);

  if (!token) {
    return <MapFallback layers={layers} className={className} />;
  }

  return <div ref={container} className={className} />;
}

function setupSources(m: mapboxgl.Map) {
  const farmFeatures = {
    type: "FeatureCollection",
    features: farms.map((f) => ({
      type: "Feature",
      properties: {
        name: f.name,
        variety: f.variety,
        production: f.annualProduction,
        color: varietyColors[f.variety],
        status: f.status,
      },
      geometry: { type: "Point", coordinates: [f.location.lng, f.location.lat] },
    })),
  } as GeoJSON.FeatureCollection;

  const boundaryFeatures = {
    type: "FeatureCollection",
    features: farms.map((f) => ({
      type: "Feature",
      properties: { variety: f.variety, color: varietyColors[f.variety] },
      geometry: {
        type: "Polygon",
        coordinates: [[...f.boundary.map((p) => [p.lng, p.lat]), [f.boundary[0].lng, f.boundary[0].lat]]],
      },
    })),
  } as GeoJSON.FeatureCollection;

  const coopFeatures = {
    type: "FeatureCollection",
    features: cooperatives.map((c) => ({
      type: "Feature",
      properties: { name: c.name, members: c.members },
      geometry: { type: "Point", coordinates: [c.location.lng, c.location.lat] },
    })),
  } as GeoJSON.FeatureCollection;

  m.addSource("farms", { type: "geojson", data: farmFeatures });
  m.addSource("boundaries", { type: "geojson", data: boundaryFeatures });
  m.addSource("coops", { type: "geojson", data: coopFeatures });

  // Heatmap
  m.addLayer({
    id: "farms-heat",
    type: "heatmap",
    source: "farms",
    paint: {
      "heatmap-weight": ["interpolate", ["linear"], ["get", "production"], 0, 0, 6000, 1],
      "heatmap-intensity": 1.1,
      "heatmap-radius": 28,
      "heatmap-opacity": 0.7,
      "heatmap-color": [
        "interpolate", ["linear"], ["heatmap-density"],
        0, "rgba(0,0,0,0)",
        0.2, "#dff0cf",
        0.4, "#a3c389",
        0.6, "#5f8a3f",
        0.8, "#a86f3f",
        1, "#74452c",
      ],
    },
  });

  // Boundaries
  m.addLayer({
    id: "farm-boundaries",
    type: "fill",
    source: "boundaries",
    layout: { visibility: "none" },
    paint: { "fill-color": ["get", "color"], "fill-opacity": 0.18 },
  });
  m.addLayer({
    id: "farm-boundaries-line",
    type: "line",
    source: "boundaries",
    layout: { visibility: "none" },
    paint: { "line-color": ["get", "color"], "line-width": 1.5, "line-opacity": 0.6 },
  });

  // Farm points
  m.addLayer({
    id: "farms-points",
    type: "circle",
    source: "farms",
    layout: { visibility: "none" },
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["get", "production"], 0, 4, 6000, 10],
      "circle-color": ["get", "color"],
      "circle-stroke-width": 1.5,
      "circle-stroke-color": "#fff",
      "circle-opacity": 0.85,
    },
  });

  // Validation (pending/flagged) points
  m.addLayer({
    id: "validation-points",
    type: "circle",
    source: "farms",
    filter: ["in", ["get", "status"], ["literal", ["pending", "flagged"]]],
    layout: { visibility: "none" },
    paint: {
      "circle-radius": 7,
      "circle-color": "#f59e0b",
      "circle-stroke-width": 2,
      "circle-stroke-color": "#fff",
    },
  });

  // Coop points
  m.addLayer({
    id: "coop-points",
    type: "circle",
    source: "coops",
    layout: { visibility: "none" },
    paint: {
      "circle-radius": 8,
      "circle-color": "#496d2f",
      "circle-stroke-width": 2.5,
      "circle-stroke-color": "#fff",
    },
  });

  // Popups
  const popup = new mapboxgl.Popup({ closeButton: false, offset: 12 });
  m.on("mouseenter", "farms-points", (e) => {
    m.getCanvas().style.cursor = "pointer";
    const f = e.features?.[0];
    if (!f) return;
    const p = f.properties!;
    popup
      .setLngLat((f.geometry as GeoJSON.Point).coordinates as [number, number])
      .setHTML(
        `<div style="padding:10px 12px;font-family:var(--font-sans)">
          <div style="font-weight:600;font-size:13px">${p.name}</div>
          <div style="color:var(--muted-foreground);font-size:12px;margin-top:2px">${p.variety} · ${Number(p.production).toLocaleString()} kg/yr</div>
        </div>`
      )
      .addTo(m);
  });
  m.on("mouseleave", "farms-points", () => {
    m.getCanvas().style.cursor = "";
    popup.remove();
  });
}
