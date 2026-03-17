import styles from './TempleTicket.module.css';
import type { TicketComponentProps } from '../../utils/ticketRegistry';

export function TempleTicket({ data }: TicketComponentProps) {
  return (
    <div className={styles.ticket}>
      <div className={styles.border}>
        <div className={styles.inner}>
          <div className={styles.topDecor}>✦ ✦ ✦</div>
          <div className={styles.templeName}>{data.templeName}</div>
          <div className={styles.templeNameEn}>{data.templeNameEn}</div>
          <div className={styles.divider} />
          <div className={styles.type}>{data.type}</div>
          <div className={styles.typeEn}>{data.typeEn}</div>
          <div className={styles.price}>{data.price}</div>
          <div className={styles.date}>{data.date}</div>
          {data.blessing && (
            <div className={styles.blessing}>{data.blessing}</div>
          )}
          <div className={styles.bottomDecor}>✦ ✦ ✦</div>
        </div>
      </div>
    </div>
  );
}
