import { useEffect, useCallback, useState } from 'react';
import styles from './TicketDetail.module.css';
import { getTicketComponent } from '../../utils/ticketRegistry';
import type { TicketData } from '../../types';

interface TicketDetailProps {
  ticket: TicketData;
  onClose: () => void;
}

export function TicketDetail({ ticket, onClose }: TicketDetailProps) {
  const [zoomedPhoto, setZoomedPhoto] = useState<string | null>(null);

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
