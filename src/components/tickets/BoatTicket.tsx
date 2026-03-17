import styles from './BoatTicket.module.css';
import type { TicketComponentProps } from '../../utils/ticketRegistry';

export function BoatTicket({ data }: TicketComponentProps) {
  return (
    <div className={styles.ticket}>
      <div className={styles.wave} />
      <div className={styles.content}>
        <div className={styles.icon}>⛴</div>
        <div className={styles.boatName}>{data.boatName}</div>
        <div className={styles.boatNameEn}>{data.boatNameEn}</div>
        <div className={styles.route}>{data.route}</div>
        {data.flag && <div className={styles.flag}>{data.flag}</div>}
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
        <div className={styles.footer}>
          <span className={styles.ticketNo}>{data.ticketNo}</span>
          <span className={styles.price}>{data.price}</span>
        </div>
      </div>
    </div>
  );
}
