import styles from './Certificate.module.css';
import type { TicketComponentProps } from '../../utils/ticketRegistry';

export function Certificate({ data }: TicketComponentProps) {
  return (
    <div className={styles.ticket}>
      <div className={styles.borderOuter}>
        <div className={styles.borderInner}>
          <div className={styles.content}>
            <div className={styles.titleJa}>{data.title}</div>
            <div className={styles.titleEn}>{data.titleEn}</div>
            <div className={styles.ornament}>◆</div>
            <div className={styles.shrine}>{data.shrine}</div>
            <div className={styles.shrineEn}>{data.shrineEn}</div>
            {data.message && (
              <p className={styles.message}>{data.message}</p>
            )}
            <div className={styles.dateSection}>
              <div className={styles.dateJa}>{data.date}</div>
              <div className={styles.dateWestern}>{data.dateWestern}</div>
            </div>
            <div className={styles.seal}>印</div>
          </div>
        </div>
      </div>
    </div>
  );
}
