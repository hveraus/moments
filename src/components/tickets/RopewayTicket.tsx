import styles from './RopewayTicket.module.css';
import type { TicketComponentProps } from '../../utils/ticketRegistry';

export function RopewayTicket({ data }: TicketComponentProps) {
  return (
    <div className={styles.ticket}>
      <div className={styles.top}>
        <div className={styles.icon}>🚡</div>
        <div className={styles.name}>{data.name}</div>
        <div className={styles.nameEn}>{data.nameEn}</div>
      </div>
      <div className={styles.body}>
        <div className={styles.typeRow}>
          <span className={styles.type}>{data.type}</span>
          <span className={styles.typeEn}>{data.typeEn}</span>
        </div>
        <div className={styles.category}>{data.category}</div>
        <div className={styles.price}>{data.price}</div>
        <div className={styles.details}>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>日期</span>
            <span className={styles.detailValue}>{data.date}</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>时间</span>
            <span className={styles.detailValue}>{data.time}</span>
          </div>
        </div>
        <div className={styles.ticketNo}>{data.ticketNo}</div>
      </div>
    </div>
  );
}
