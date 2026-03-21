import { useEffect, useState, useRef } from 'react';
import { MapContainer, CircleMarker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { LatLngBoundsExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { TripLocation } from '../../types';
import styles from './TripMap.module.css';

const TILES = {
  night: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
  },
  day: {
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
  },
};

function useTheme() {
  const [theme, setTheme] = useState<'night' | 'day'>(
    () => (document.documentElement.getAttribute('data-theme') as 'night' | 'day') || 'night',
  );
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const t = document.documentElement.getAttribute('data-theme') as 'night' | 'day';
      if (t) setTheme(t);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);
  return theme;
}

function ThemeTileLayer() {
  const map = useMap();
  const tileRef = useRef<L.TileLayer | null>(null);
  const theme = useTheme();

  useEffect(() => {
    if (tileRef.current) {
      map.removeLayer(tileRef.current);
    }
    const { url, attribution } = TILES[theme];
    const layer = L.tileLayer(url, { attribution });
    layer.addTo(map);
    tileRef.current = layer;
    return () => {
      if (tileRef.current) {
        map.removeLayer(tileRef.current);
        tileRef.current = null;
      }
    };
  }, [map, theme]);

  return null;
}

function FitBounds({ locations }: { locations: TripLocation[] }) {
  const map = useMap();
  useEffect(() => {
    if (locations.length === 0) return;
    const bounds: LatLngBoundsExpression = locations.map(
      (loc) => [loc.lat, loc.lng] as [number, number],
    );
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
  }, [map, locations]);
  return null;
}

interface TripMapProps {
  locations: TripLocation[];
}

export function TripMap({ locations }: TripMapProps) {
  if (locations.length === 0) return null;

  const center: [number, number] = [
    locations.reduce((s, l) => s + l.lat, 0) / locations.length,
    locations.reduce((s, l) => s + l.lng, 0) / locations.length,
  ];

  return (
    <div className={styles.mapWrap}>
      <MapContainer
        center={center}
        zoom={11}
        className={styles.map}
        scrollWheelZoom={false}
        zoomControl={false}
        attributionControl={false}
      >
        <ThemeTileLayer />
        <FitBounds locations={locations} />
        {locations.map((loc) => (
          <CircleMarker
            key={`${loc.lat}-${loc.lng}`}
            center={[loc.lat, loc.lng]}
            radius={6}
            pathOptions={{
              color: '#fff',
              weight: 2,
              fillColor: '#e74c3c',
              fillOpacity: 0.9,
            }}
          >
            <Popup>
              <span className={styles.popupText}>{loc.name}</span>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
