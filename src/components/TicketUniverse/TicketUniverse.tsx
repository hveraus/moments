import { useMemo, useState, useCallback } from 'react';
import styles from './TicketUniverse.module.css';
import { getTicketComponent } from '../../utils/ticketRegistry';
import type { TicketData, Trip } from '../../types';

interface TicketUniverseProps {
  trips: Trip[];
  onTicketClick: (ticket: TicketData) => void;
}

interface OrbitTicket {
  ticket: TicketData;
  orbit: number;     // 0, 1, 2
  angle: number;     // degrees around the orbit
  index: number;     // stagger index for entrance animation
}

export function TicketUniverse({ trips, onTicketClick }: TicketUniverseProps) {
  const [entered, setEntered] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Trigger entrance animation after mount
  useState(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setEntered(true));
    });
  });

  // Flatten all tickets and assign to orbits
  const orbitTickets = useMemo<OrbitTicket[]>(() => {
    const allTickets = trips.flatMap((t) => t.tickets);
    const result: OrbitTicket[] = [];
    // Distribute: inner 6, middle 8, outer 10 (or proportionally if fewer)
    const total = allTickets.length;
    const inner = Math.min(6, Math.ceil(total * 0.25));
    const middle = Math.min(8, Math.ceil(total * 0.33));
    // outer gets the rest

    let idx = 0;
    // Inner orbit
    for (let i = 0; i < inner && idx < total; i++, idx++) {
      result.push({
        ticket: allTickets[idx],
        orbit: 0,
        angle: (360 / inner) * i,
        index: idx,
      });
    }
    // Middle orbit
    const midCount = Math.min(middle, total - idx);
    for (let i = 0; i < midCount && idx < total; i++, idx++) {
      result.push({
        ticket: allTickets[idx],
        orbit: 1,
        angle: (360 / midCount) * i + 15, // offset
        index: idx,
      });
    }
    // Outer orbit
    const outerCount = total - idx;
    for (let i = 0; i < outerCount; i++, idx++) {
      result.push({
        ticket: allTickets[idx],
        orbit: 2,
        angle: (360 / outerCount) * i + 30, // offset
        index: idx,
      });
    }
    return result;
  }, [trips]);

  const handleClick = useCallback(
    (ticket: TicketData) => {
      onTicketClick(ticket);
    },
    [onTicketClick],
  );

  return (
    <div className={`${styles.universe} ${entered ? styles.entered : ''}`}>
      {/* Center glow */}
      <div className={styles.centerGlow}>
        <div className={styles.centerCore} />
        <div className={styles.centerPulse} />
        <div className={styles.centerRays} />
      </div>

      {/* Orbit rings (visual only) */}
      <div className={`${styles.orbitRing} ${styles.ring0}`} />
      <div className={`${styles.orbitRing} ${styles.ring1}`} />
      <div className={`${styles.orbitRing} ${styles.ring2}`} />

      {/* Orbit containers - each rotates at different speed */}
      {[0, 1, 2].map((orbitIndex) => (
        <div
          key={orbitIndex}
          className={`${styles.orbitTrack} ${styles[`orbit${orbitIndex}`]}`}
        >
          {orbitTickets
            .filter((ot) => ot.orbit === orbitIndex)
            .map((ot) => {
              const TicketComponent = getTicketComponent(ot.ticket.template);
              const isHovered = hoveredId === ot.ticket.id;
              return (
                <div
                  key={ot.ticket.id}
                  className={`${styles.ticketOrbitSlot} ${isHovered ? styles.ticketHovered : ''}`}
                  style={{
                    '--angle': `${ot.angle}deg`,
                    '--delay': `${ot.index * 0.04}s`,
                  } as React.CSSProperties}
                  onMouseEnter={() => setHoveredId(ot.ticket.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleClick(ot.ticket)}
                >
                  <div className={styles.ticketCard}>
                    <TicketComponent data={ot.ticket.data} />
                  </div>
                  {isHovered && (
                    <div className={styles.ticketLabel}>{ot.ticket.title}</div>
                  )}
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
}
