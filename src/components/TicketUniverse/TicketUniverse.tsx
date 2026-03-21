import { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import styles from './TicketUniverse.module.css';
import { getTicketComponent } from '../../utils/ticketRegistry';
import type { TicketData, Trip } from '../../types';

interface TicketUniverseProps {
  trips: Trip[];
  onTicketClick: (ticket: TicketData) => void;
}

interface OrbitTicket {
  ticket: TicketData;
  orbit: number;
  angle: number;
  index: number;
}

const ORBIT_SPEEDS = [50, 70, 90]; // seconds per revolution
const TICKET_SCALE_DESKTOP = [0.26, 0.22, 0.19];
const TICKET_SCALE_MOBILE = [0.20, 0.17, 0.15];
export function TicketUniverse({ trips, onTicketClick }: TicketUniverseProps) {
  const [entered, setEntered] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const animRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const [, forceUpdate] = useState(0);
  const [headerBottom, setHeaderBottom] = useState(340);

  useEffect(() => {
    // Measure where the header ends
    const measure = () => {
      const viewBtns = document.querySelectorAll('button');
      let maxBottom = 340;
      viewBtns.forEach((btn) => {
        const text = btn.textContent || '';
        if (text.includes('票根宇宙') || text.includes('时间线')) {
          maxBottom = Math.max(maxBottom, btn.getBoundingClientRect().bottom);
        }
      });
      setHeaderBottom(maxBottom + 10); // small gap
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setEntered(true));
    });
  }, []);

  // Animation loop
  useEffect(() => {
    startTimeRef.current = performance.now();
    let running = true;
    const tick = () => {
      if (!running) return;
      forceUpdate((n) => n + 1);
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  // Compute center and orbit sizes based on viewport
  const viewportH = typeof window !== 'undefined' ? window.innerHeight : 800;
  const viewportW = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const isMobile = viewportW < 640;
  const TICKET_SCALE = isMobile ? TICKET_SCALE_MOBILE : TICKET_SCALE_DESKTOP;
  const centerY = headerBottom + (viewportH - headerBottom) / 2;
  const centerX = viewportW / 2;

  // Scale orbits to fit available space
  const availableH = (viewportH - headerBottom) / 2 - 30;
  const availableW = viewportW / 2 - 60;
  const ORBITS = [
    { rx: Math.min(130, availableW * 0.33), ry: Math.min(65, availableH * 0.33) },
    { rx: Math.min(240, availableW * 0.62), ry: Math.min(120, availableH * 0.62) },
    { rx: Math.min(350, availableW * 0.92), ry: Math.min(175, availableH * 0.92) },
  ];

  const orbitTickets = useMemo<OrbitTicket[]>(() => {
    const allTickets = trips.flatMap((t) => t.tickets);
    const result: OrbitTicket[] = [];
    const total = allTickets.length;
    const inner = Math.min(6, Math.ceil(total * 0.25));
    const middle = Math.min(8, Math.ceil(total * 0.33));

    let idx = 0;
    for (let i = 0; i < inner && idx < total; i++, idx++) {
      result.push({ ticket: allTickets[idx], orbit: 0, angle: (360 / inner) * i, index: idx });
    }
    const midCount = Math.min(middle, total - idx);
    for (let i = 0; i < midCount && idx < total; i++, idx++) {
      result.push({ ticket: allTickets[idx], orbit: 1, angle: (360 / midCount) * i + 20, index: idx });
    }
    const outerCount = total - idx;
    for (let i = 0; i < outerCount; i++, idx++) {
      result.push({ ticket: allTickets[idx], orbit: 2, angle: (360 / outerCount) * i + 40, index: idx });
    }
    return result;
  }, [trips]);

  const handleClick = useCallback(
    (ticket: TicketData) => onTicketClick(ticket),
    [onTicketClick],
  );

  const elapsed = (performance.now() - startTimeRef.current) / 1000;

  return (
    <div className={`${styles.universe} ${entered ? styles.entered : ''}`}>
      {/* Center glow */}
      <div className={styles.centerGlow} style={{ top: centerY }}>
        <div className={styles.centerCore} />
        <div className={styles.centerPulse} />
        <div className={styles.centerRays} />
      </div>

      {/* Orbit ring visuals */}
      {ORBITS.map((o, i) => (
        <div
          key={i}
          className={styles.orbitRing}
          style={{
            top: centerY,
            width: o.rx * 2,
            height: o.ry * 2,
          }}
        />
      ))}

      {/* Tickets */}
      {orbitTickets.map((ot) => {
        const orbit = ORBITS[ot.orbit];
        const speed = ORBIT_SPEEDS[ot.orbit];
        const direction = ot.orbit === 1 ? -1 : 1;
        const angleRad =
          ((ot.angle + (elapsed / speed) * 360 * direction) % 360) *
          (Math.PI / 180);

        const x = Math.cos(angleRad) * orbit.rx;
        const y = Math.sin(angleRad) * orbit.ry;

        // Depth simulation: tickets at top of ellipse are "further away"
        const depth = Math.sin(angleRad); // -1 (top/far) to 1 (bottom/near)
        const depthScale = 0.7 + 0.3 * ((depth + 1) / 2); // 0.7 to 1.0
        const zIndex = Math.round((depth + 1) * 50);
        const opacity = 0.5 + 0.5 * ((depth + 1) / 2); // 0.5 to 1.0

        const scale = TICKET_SCALE[ot.orbit] * depthScale;
        const isHovered = hoveredId === ot.ticket.id;
        const TicketComponent = getTicketComponent(ot.ticket.template);

        return (
          <div
            key={ot.ticket.id}
            className={`${styles.ticketSlot} ${isHovered ? styles.ticketHovered : ''}`}
            style={{
              top: centerY,
              left: centerX,
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${isHovered ? scale * 1.8 : scale})`,
              zIndex: isHovered ? 200 : zIndex,
              opacity: entered ? (isHovered ? 1 : opacity) : 0,
              transitionDelay: entered ? '0s' : `${ot.index * 0.04}s`,
            }}
            onMouseEnter={() => setHoveredId(ot.ticket.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleClick(ot.ticket)}
          >
            <TicketComponent data={ot.ticket.data} />
            {isHovered && (
              <div className={styles.ticketLabel}>{ot.ticket.title}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
