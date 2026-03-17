import { useState, useEffect, useCallback } from 'react';
import styles from './Timeline.module.css';
import type { Trip } from '../../types';

interface TimelineProps {
  trips: Trip[];
}

function formatShortDate(start: string): string {
  const d = new Date(start);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function Timeline({ trips }: TimelineProps) {
  const [activeSlug, setActiveSlug] = useState<string>('');

  // IntersectionObserver to detect which section is in view
  useEffect(() => {
    const sections = trips.map(t => document.getElementById(`trip-${t.slug}`)).filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const id = visible[0].target.id.replace('trip-', '');
          setActiveSlug(id);
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0, 0.25, 0.5],
      }
    );

    sections.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [trips]);

  const handleClick = useCallback((slug: string) => {
    const el = document.getElementById(`trip-${slug}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <nav className={styles.timeline}>
      <div className={styles.line} />

      <ul className={styles.list}>
        {trips.map((trip) => (
          <li key={trip.slug} className={styles.item}>
            <button
              className={`${styles.dot} ${activeSlug === trip.slug ? styles.active : ''}`}
              onClick={() => handleClick(trip.slug)}
              aria-label={`跳转到 ${trip.title}`}
            />
            <div
              className={`${styles.label} ${activeSlug === trip.slug ? styles.active : ''}`}
              onClick={() => handleClick(trip.slug)}
            >
              <span className={styles.place}>{trip.title}</span>
              <span className={styles.date}>{formatShortDate(trip.startDate)}</span>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}
