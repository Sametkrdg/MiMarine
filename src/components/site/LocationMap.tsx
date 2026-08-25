"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

export type MapMarker = {
  id: string;
  lat: number;
  lng: number;
  /** Shown in the popup. */
  city: string;
  role: string;
};

/**
 * Map of one or more places — the dealer network, or the yard on the contact
 * page.
 *
 * Leaflet with OpenStreetMap tiles — chosen because it needs no account, no
 * API key and no payment card. Leaflet touches `window` on construction, so it
 * is imported inside an effect rather than at module scope.
 *
 * Attribution is required by the OSM tile usage policy and is rendered by the
 * tile layer itself; do not remove it.
 */
export default function LocationMap({
  markers,
  className = "h-[320px] lg:h-[520px]",
  zoom = 9,
}: {
  markers: MapMarker[];
  className?: string;
  /** Used when there is only one marker to frame. */
  zoom?: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || markers.length === 0) return;

    let cancelled = false;
    // Holds the created map so the cleanup can tear it down even if the import
    // resolves after unmount.
    let map: import("leaflet").Map | null = null;

    void (async () => {
      const L = await import("leaflet");
      if (cancelled || !containerRef.current) return;

      map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        attributionControl: true,
      });

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Brand-coloured pin, so no image asset has to resolve through the bundler.
      const icon = L.divIcon({
        className: "",
        html: '<span style="display:block;width:12px;height:12px;border-radius:50%;background:#5B54A6;border:2px solid #FBFAF8;box-shadow:0 0 0 1px #171717"></span>',
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });

      const bounds = L.latLngBounds([]);
      for (const marker of markers) {
        const pin = L.marker([marker.lat, marker.lng], { icon }).addTo(map);
        pin.bindPopup(
          `<strong style="font-weight:400">${marker.city}</strong><br>${marker.role}`,
        );
        bounds.extend([marker.lat, marker.lng]);
      }

      if (markers.length === 1) {
        map.setView([markers[0].lat, markers[0].lng], zoom);
      } else {
        map.fitBounds(bounds, { padding: [48, 48] });
      }
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [markers, zoom]);

  return (
    <div
      ref={containerRef}
      className={`w-full border border-ink bg-surface ${className}`}
      // Leaflet paints its own panes; keep it below the summary chip.
      style={{ zIndex: 0 }}
    />
  );
}
