import { useEffect, useCallback, useState, useMemo } from 'react';
import styles from './TicketDetail.module.css';
import { getTicketComponent } from '../../utils/ticketRegistry';
import type { TicketData } from '../../types';

interface TicketDetailProps {
  ticket: TicketData;
  onClose: () => void;
}

interface TapeStrip {
  top: number;    // px from top of ticketWrap
  left: number;   // % from left
  rotate: number; // deg
  width: number;  // px
  opacity: number;
}

// 4 种胶带组合方案，用 ticket ID 哈希决定用哪套
const TAPE_CONFIGS: TapeStrip[][] = [
  // 0: 经典左右角，微重叠
  [
    { top: -10, left: 18, rotate: -34, width: 62, opacity: 0.55 },
    { top: -10, left: 68, rotate: 34,  width: 62, opacity: 0.52 },
  ],
  // 1: 左角两张轻微重叠 + 右角一张
  [
    { top: -12, left: 14, rotate: -38, width: 58, opacity: 0.58 },
    { top:  -4, left: 19, rotate: -22, width: 54, opacity: 0.48 },
    { top:  -8, left: 70, rotate: 32,  width: 60, opacity: 0.54 },
  ],
  // 2: 顶部居中 + 左角
  [
    { top:  -6, left: 36, rotate:  4,  width: 68, opacity: 0.50 },
    { top:  -9, left: 12, rotate: -36, width: 60, opacity: 0.56 },
  ],
  // 3: 左角、顶部偏右、右角三张，顶部和右角微重叠
  [
    { top: -11, left: 15, rotate: -33, width: 60, opacity: 0.54 },
    { top:  -7, left: 55, rotate:  8,  width: 64, opacity: 0.50 },
    { top:  -5, left: 67, rotate: 30,  width: 58, opacity: 0.52 },
  ],
];

function hashId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = ((h << 5) - h) + id.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function TicketDetail({ ticket, onClose }: TicketDetailProps) {
  const [zoomedPhoto, setZoomedPhoto] = useState<string | null>(null);

  const tapes = useMemo<TapeStrip[]>(() => {
    const idx = hashId(ticket.id) % TAPE_CONFIGS.length;
    return TAPE_CONFIGS[idx];
  }, [ticket.id]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoomedPhoto) {
          setZoomedPhoto(null);
        } else {
          onClose();
        }
      }
    },
    [onClose, zoomedPhoto]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const TicketComponent = getTicketComponent(ticket.template);

  return (
    <>
      <div className={styles.backdrop} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
          <div className={styles.ticketWrap}>
            {/* 胶带条 */}
            {tapes.map((t, i) => (
              <div
                key={i}
                className={styles.tape}
                style={{
                  top: t.top,
                  left: `${t.left}%`,
                  width: t.width,
                  opacity: t.opacity,
                  transform: `rotate(${t.rotate}deg)`,
                }}
              />
            ))}
            <TicketComponent data={ticket.data} />
          </div>
          <h3 className={styles.title}>{ticket.title}</h3>
          {ticket.description && (
            <p className={styles.description}>{ticket.description}</p>
          )}
          {ticket.photos.length > 0 && (
            <div className={styles.photos}>
              <p className={styles.photosLabel}>PHOTOS</p>
              <div className={styles.photoGrid}>
                {ticket.photos.map((photo, i) => (
                  <img
                    key={i}
                    src={photo}
                    alt=""
                    className={styles.photo}
                    onClick={() => setZoomedPhoto(photo)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {zoomedPhoto && (
        <div
          className={styles.lightbox}
          onClick={() => setZoomedPhoto(null)}
        >
          <img src={zoomedPhoto} alt="" className={styles.lightboxImg} />
          <button className={styles.lightboxClose} onClick={() => setZoomedPhoto(null)}>×</button>
        </div>
      )}
    </>
  );
}
