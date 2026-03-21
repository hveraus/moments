import { useState, useMemo, useEffect, useRef } from 'react';
import styles from './App.module.css';
import { Background } from './components/Background/Background';
import { Header } from './components/Header/Header';
import { TripSection } from './components/TripSection/TripSection';
import { TicketDetail } from './components/TicketDetail/TicketDetail';
import { TicketUniverse } from './components/TicketUniverse/TicketUniverse';
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';
import { Timeline } from './components/Timeline/Timeline';
import type { Theme } from './components/ThemeToggle/ThemeToggle';
import type { AppData, TicketData } from './types';
import appData from './generated/data.json';

const data = appData as unknown as AppData;

type SortOrder = 'newest' | 'oldest';
type ViewMode = 'timeline' | 'universe';

function App() {
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);
  const [theme, setTheme] = useState<Theme>('night');
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');
  const savedThemeRef = useRef<Theme>(theme);

  // Apply theme to root element for CSS variable switching
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Force night theme in universe mode
  useEffect(() => {
    if (viewMode === 'universe') {
      savedThemeRef.current = theme;
      setTheme('night');
    } else {
      setTheme(savedThemeRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'night' ? 'day' : 'night');
  };

  const sortedTrips = useMemo(() => {
    const trips = [...data.trips];
    if (sortOrder === 'oldest') {
      trips.reverse();
    }
    return trips;
  }, [sortOrder]);

  return (
    <div className={styles.root}>
      <Background theme={theme} />
      <div className={styles.overlay} />
      {viewMode === 'timeline' && (
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      )}
      {viewMode === 'timeline' && <Timeline trips={sortedTrips} />}
      <div className={styles.container}>
        <div className={styles.inner}>
          <Header
            site={data.site}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
            viewMode={viewMode}
            onViewChange={setViewMode}
          />
          {viewMode === 'timeline' &&
            sortedTrips.map((trip) => (
              <TripSection
                key={trip.slug}
                trip={trip}
                onTicketClick={setSelectedTicket}
              />
            ))
          }
        </div>
      </div>
      {viewMode === 'universe' && (
        <TicketUniverse
          trips={data.trips}
          onTicketClick={setSelectedTicket}
        />
      )}
      {selectedTicket && (
        <TicketDetail
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </div>
  );
}

export default App;
