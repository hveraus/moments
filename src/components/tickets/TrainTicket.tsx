import styles from './TrainTicket.module.css';
import type { TicketComponentProps } from '../../utils/ticketRegistry';

export function TrainTicket({ data }: TicketComponentProps) {
  return (
    <div className={styles.ticket}>
      <div className={styles.header}>
        <div className={styles.badge}>乗車券</div>
        <span className={styles.trainNo}>{data.ticketNo}</span>
      </div>
      <div className={styles.trainName}>{data.trainName}</div>
      <div className={styles.trainNameEn}>{data.trainNameEn}</div>
      <div className={styles.route}>
        <div className={styles.station}>
          <span className={styles.stationLabel}>乗車駅</span>
          <span className={styles.stationName}>{data.from}</span>
        </div>
        <div className={styles.arrow}>→</div>
        <div className={styles.station}>
          <span className={styles.stationLabel}>降車駅</span>
          <span className={styles.stationName}>{data.to}</span>
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>日期</span>
          <span className={styles.detailValue}>{data.date}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>时间</span>
          <span className={styles.detailValue}>{data.time}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>车厢</span>
          <span className={styles.detailValue}>{data.car}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>座位</span>
          <span className={styles.detailValue}>{data.seat}</span>
        </div>
      </div>
      <div className={styles.footer}>
        <span className={styles.price}>{data.price}</span>
      </div>
    </div>
  );
}
