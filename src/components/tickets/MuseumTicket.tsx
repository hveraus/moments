import styles from './MuseumTicket.module.css';
import type { TicketComponentProps } from '../../utils/ticketRegistry';

export function MuseumTicket({ data }: TicketComponentProps) {
  return (
    <div className={styles.ticket}>
      <div className={styles.left}>
        <div className={styles.museumName}>{data.museumName}</div>
        <div className={styles.museumNameEn}>{data.museumNameEn}</div>
        <div className={styles.separator} />
        <div className={styles.typeRow}>
          <span className={styles.type}>{data.type}</span>
          <span className={styles.typeEn}>{data.typeEn}</span>
        </div>
        <div className={styles.categoryRow}>
          <span className={styles.category}>{data.category}</span>
          <span className={styles.price}>{data.price}</span>
        </div>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>日期</span>
            <span className={styles.infoValue}>{data.date}</span>
          </div>
          {data.time && (
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>时间</span>
              <span className={styles.infoValue}>{data.time}</span>
            </div>
          )}
        </div>
        <div className={styles.ticketNo}>{data.ticketNo}</div>
      </div>
      <div className={styles.stub}>
        <div className={styles.stubText}>{data.type}</div>
        <div className={styles.stubPrice}>{data.price}</div>
      </div>
    </div>
  );
}
