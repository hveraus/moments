import { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import styles from './TicketDrawer.module.css';
import { getTicketComponent } from '../../utils/ticketRegistry';
import type { TicketData, Trip } from '../../types';

interface TicketDrawerProps {
  trips: Trip[];
  onTicketClick: (ticket: TicketData) => void;
}

const CARD_SCALE = 0.75;
const HOVER_LIFT = 80; // px to lift card upward on hover

export function TicketDrawer({ trips, onTicketClick }: TicketDrawerProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [scrollPos, setScrollPos] = useState(2); // start a few cards in
  const [entered, setEntered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const allTickets = useMemo(
    () => trips.flatMap((t) => t.tickets),
    [trips],
  );

  const totalCards = allTickets.length;

  // Entrance animation
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setEntered(true));
    });
  }, []);

  // Wheel handler for scrolling through cards
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScrollPos((prev) => {
        const delta = e.deltaY * 0.006; // normalize scroll speed
        return Math.max(0, Math.min(totalCards - 1, prev + delta));
      });
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [totalCards]);

  const handleClick = useCallback(
    (ticket: TicketData) => onTicketClick(ticket),
    [onTicketClick],
  );

  // Layout: vanishing point at top-center, cards fan out toward bottom
  const viewportH = typeof window !== 'undefined' ? window.innerHeight : 800;
  const vanishY = viewportH * 0.62; // vanishing point Y (far cards converge here)
  const nearY = viewportH * 0.92; // nearest card Y position
  const totalDepth = (nearY - vanishY); // compressed Y range

  return (
    <div className={styles.drawer} ref={containerRef}>
      <div className={styles.fadeMask} />
      {allTickets.map((ticket, i) => {
        // depth: 0 = nearest (bottom), 1 = furthest (top/vanishing point)
        const rawDepth = i - scrollPos;

        // Cards behind the viewer (scrolled past) are hidden
        if (rawDepth < -0.5) return null;
        // Cards too far away are hidden
        if (rawDepth > 10) return null;

        // Map depth to 0-1 range (0=near, 1=far)
        const t = Math.max(0, rawDepth / 10);

        // Non-linear: cards bunch up more toward vanishing point
        const tCurved = Math.pow(t, 0.6);

        const y = nearY - tCurved * totalDepth;

        const scale = CARD_SCALE * (1 - t * 0.55); // shrink with distance
        const opacity = Math.max(0, 1 - t * 1.3);
        const brightness = 0.55 + 0.45 * (1 - t);

        const isHovered = hoveredId === ticket.id;
        const TicketComponent = getTicketComponent(ticket.template);

        const hoverY = isHovered ? -HOVER_LIFT : 0;
        const hoverScale = isHovered ? scale * 1.4 : scale;

        return (
          <div
            key={ticket.id}
            className={`${styles.card} ${isHovered ? styles.cardHovered : ''}`}
            style={{
              top: y,
              transform: `translate(-50%, -100%) scale(${hoverScale}) translateY(${hoverY}px)`,
              zIndex: isHovered ? 200 : Math.round((1 - t) * 100),
              opacity: entered ? opacity : 0,
              filter: isHovered ? 'brightness(1.1)' : `brightness(${brightness})`,
              transitionDelay: entered ? '0s' : `${i * 0.04}s`,
            }}
            onMouseEnter={() => setHoveredId(ticket.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleClick(ticket)}
          >
            <TicketComponent data={ticket.data} />
            {isHovered && (
              <div className={styles.label}>{ticket.title}</div>
            )}
          </div>
        );
      })}

      {entered && (
        <div className={styles.scrollHint}>
          滚动浏览票根
        </div>
      )}
    </div>
  );
}
