import { useEffect, useState, useRef, useCallback } from 'react';
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
  onClose: () => void;
}

export function TripMap({ locations, onClose }: TripMapProps) {
  if (locations.length === 0) return null;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const center: [number, number] = [
    locations.reduce((s, l) => s + l.lat, 0) / locations.length,
    locations.reduce((s, l) => s + l.lng, 0) / locations.length,
  ];

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="关闭地图">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
        <MapContainer
          center={center}
          zoom={11}
          className={styles.map}
          scrollWheelZoom={true}
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
    </div>
  );
}
