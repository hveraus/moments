import { useMemo, useRef, useEffect, useState, useCallback } from 'react';
import styles from './TicketSlot.module.css';
import { getTicketComponent } from '../../utils/ticketRegistry';
import type { TicketData } from '../../types';

interface TicketSlotProps {
  ticket: TicketData;
  onClick: () => void;
}

export function TicketSlot({ ticket, onClick }: TicketSlotProps) {
  const ref = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const tilt = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < ticket.id.length; i++) {
      hash = ((hash << 5) - hash) + ticket.id.charCodeAt(i);
      hash |= 0;
    }
    return (hash % 7) - 3;
  }, [ticket.id]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    // Skip 3D tilt on touch devices
    if (e.pointerType === 'touch') return;

    const el = tiltRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;   // 0~1
    const y = (e.clientY - rect.top) / rect.height;    // 0~1
    const rotateY = (x - 0.5) * 30;   // -15 ~ 15 deg
    const rotateX = (0.5 - y) * 30;   // -15 ~ 15 deg (inverted)

    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // Update shine layer
    if (shineRef.current) {
      shineRef.current.style.opacity = '1';
      shineRef.current.style.background =
        `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.3) 0%, transparent 60%)`;
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (tiltRef.current) {
      tiltRef.current.style.transform = `rotate(${tilt}deg)`;
    }
    if (shineRef.current) {
      shineRef.current.style.opacity = '0';
    }
  }, [tilt]);

  const TicketComponent = getTicketComponent(ticket.template);

  return (
    <div ref={ref} className={`${styles.slot} ${visible ? styles.visible : ''}`}>
      <div
        ref={tiltRef}
        className={styles.tiltWrap}
        style={{ transform: `rotate(${tilt}deg)` }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className={styles.clickable} onClick={onClick} role="button" tabIndex={0}>
          <TicketComponent data={ticket.data} />
        </div>
        <div className={styles.shine} ref={shineRef} />
        {ticket.photos.length > 0 && (
          <div className={styles.photoBadge}>{ticket.photos.length}</div>
        )}
        <div className={styles.tooltip}>{ticket.title}</div>
      </div>
    </div>
  );
}
